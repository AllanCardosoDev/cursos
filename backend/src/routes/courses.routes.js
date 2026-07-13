import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired, requireRole } from '../middleware/auth.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { podeFazerProva, podeTentarProva, gateCompleto } from '../services/cursoGates.js';
import { pdfUpload, validatePdfMagicBytes } from '../middleware/uploadPdf.js';

// Rate limit em memória (suficiente para Node single-process atrás do IIS).
// Mantém no máximo 30 registros de progresso por minuto por usuário.
// Sem dependência externa para não inchar o package.json.
const PROGRESS_LIMIT_PER_MIN = 30;
const progressBuckets = new Map(); // userId -> array de timestamps
function rateLimitProgress(req, res, next) {
  const uid = req.user?.id;
  if (!uid) return next();
  const now = Date.now();
  const arr = progressBuckets.get(uid) || [];
  const fresh = arr.filter((t) => now - t < 60_000);
  if (fresh.length >= PROGRESS_LIMIT_PER_MIN) {
    return res.status(429).json({ message: 'Muitas atualizações de leitura. Aguarde alguns segundos.' });
  }
  fresh.push(now);
  progressBuckets.set(uid, fresh);
  next();
}

const currentDir = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

const router = express.Router();

// Listar todos os cursos
router.get('/', authRequired, async (req, res) => {
  try {
    const db = await getDb();
    const [courses] = await db.query('SELECT * FROM cursos ORDER BY id DESC');
    res.json(courses);
  } catch (err) {
    console.error('Erro ao listar cursos:', err);
    res.status(500).json({ message: 'Erro ao listar cursos' });
  }
});

// Detalhes de um curso (carrega módulos, lições/aulas e progresso do usuário logado)
router.get('/:id', authRequired, async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;

  try {
    const db = await getDb();
    
    // Pegar curso
    const [courses] = await db.query('SELECT * FROM cursos WHERE id = ?', [courseId]);
    const course = courses[0];
    if (!course) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    // Injetar progresso do curso de PDF
    const [pdfProgress] = await db.query(
      'SELECT pagina_atual, total_paginas, progresso_porcentagem, concluido FROM progresso_curso_pdf WHERE usuario_id = ? AND curso_id = ?',
      [userId, courseId]
    );

    if (pdfProgress.length > 0) {
      course.pdf_progress = {
        pagina_atual: pdfProgress[0].pagina_atual,
        total_paginas: pdfProgress[0].total_paginas,
        progresso_porcentagem: pdfProgress[0].progresso_porcentagem,
        concluido: pdfProgress[0].concluido === 1 || pdfProgress[0].concluido === true
      };
    } else {
      course.pdf_progress = {
        pagina_atual: 1,
        total_paginas: 1,
        progresso_porcentagem: 0,
        concluido: false
      };
    }

    // Pegar módulos
    const [modules] = await db.query('SELECT * FROM modulos WHERE curso_id = ? ORDER BY ordem ASC', [courseId]);
    
    // Pegar lições/aulas e progresso do aluno para as lições do curso
    const [lessons] = await db.query(`
      SELECT a.*,
             IF(up.concluido IS TRUE, TRUE, FALSE) AS completed,
             qa.nota AS quiz_score,
             qa.aprovado AS quiz_passed,
             pap.pagina_atual AS pdf_pagina_atual,
             pap.total_paginas AS pdf_total_paginas,
             pap.progresso_porcentagem AS pdf_progresso_porcentagem,
             pap.concluido AS pdf_concluido
      FROM aulas a
      JOIN modulos m ON a.modulo_id = m.id
      LEFT JOIN progresso_usuario up ON up.aula_id = a.id AND up.usuario_id = ?
      LEFT JOIN progresso_aula_pdf pap ON pap.aula_id = a.id AND pap.usuario_id = ?
      LEFT JOIN (
        SELECT aula_id, MAX(nota) AS nota, MAX(aprovado) AS aprovado
        FROM tentativas_avaliacao
        WHERE usuario_id = ?
        GROUP BY aula_id
      ) qa ON qa.aula_id = a.id
      WHERE m.curso_id = ?
      ORDER BY m.ordem ASC, a.ordem ASC
    `, [userId, userId, userId, courseId]);

    // Pegar também perguntas de quiz para lições/aulas que são provas (eh_prova_final)
    const [quizzes] = await db.query(`
      SELECT q.* 
      FROM questoes q
      JOIN aulas a ON q.aula_id = a.id
      JOIN modulos m ON a.modulo_id = m.id
      WHERE m.curso_id = ?
    `, [courseId]);

    // Organizar estrutura aninhada
    const modulesMap = {};
    modules.forEach(m => {
      modulesMap[m.id] = {
        ...m,
        lessons: []
      };
    });

    lessons.forEach(l => {
      if (modulesMap[l.modulo_id]) {
        // Se for exame, injetar as perguntas
        const lessonQuizzes = quizzes.filter(q => q.aula_id === l.id).map(q => ({
          id: q.id,
          questionText: q.enunciado,
          options: typeof q.alternativas === 'string' ? JSON.parse(q.alternativas) : q.alternativas,
          correctOption: q.alternativa_correta
        }));
        
        modulesMap[l.modulo_id].lessons.push({
          id: l.id,
          title: l.titulo,
          duration: l.duracao,
          text: l.texto,
          pdf_url: l.pdf_url,
          isFinalExam: l.eh_prova_final === 1 || l.eh_prova_final === true,
          completed: l.completed === 1 || l.completed === true,
          quiz_score: l.quiz_score,
          quiz_passed: l.quiz_passed === 1 || l.quiz_passed === true,
          pdf_lido: {
            pagina_atual: l.pdf_pagina_atual ?? 1,
            total_paginas: l.pdf_total_paginas ?? 1,
            progresso_porcentagem: l.pdf_progresso_porcentagem ?? 0,
            concluido: l.pdf_concluido === 1 || l.pdf_concluido === true
          },
          quiz: lessonQuizzes
        });
      }
    });

    course.modules = Object.values(modulesMap);

    // Regras combinadas da prova final (conteúdo + tentativas).
    course.exam_gate = await gateCompleto(userId, courseId);

    res.json(course);
  } catch (err) {
    console.error('Erro ao buscar curso:', err);
    res.status(500).json({ message: 'Erro ao carregar detalhes do curso' });
  }
});

// Criar novo curso (Apenas Administradores/Instrutores)
router.post('/', authRequired, requireRole('admin', 'instructor'), async (req, res) => {
  const { title, category, category_name, category_class, level, level_text, description, instructor, duration, apenas_pdf_texto, pdf_url } = req.body;
  
  if (!title || !category || !level || !instructor || !duration) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
  }

  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO cursos (titulo, categoria, categoria_nome, categoria_classe, nivel, nivel_texto, descricao, instrutor, duracao, apenas_pdf_texto, pdf_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, category, category_name || category, category_class || 'cat-general', level, level_text || level, description || '', instructor, duration, apenas_pdf_texto ? 1 : 0, pdf_url || null]);
    
    res.status(201).json({ message: 'Curso criado com sucesso', courseId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar curso:', err);
    res.status(500).json({ message: 'Erro ao salvar o curso' });
  }
});

// Registrar progresso em uma lição/aula (Aula Concluída)
router.post('/progress/:lessonId', authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;

  try {
    const db = await getDb();
    // Inserir ou ignorar se já completou
    await db.query(`
      INSERT IGNORE INTO progresso_usuario (usuario_id, aula_id, concluido)
      VALUES (?, ?, TRUE)
    `, [userId, lessonId]);

    res.json({ success: true, message: 'Progresso registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar progresso:', err);
    res.status(500).json({ message: 'Erro ao registrar progresso da aula' });
  }
});

// Enviar avaliação / Responder quiz
router.post('/quiz/:lessonId', authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;
  const { answers } = req.body; // Array com os índices das opções escolhidas

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: 'Respostas inválidas' });
  }

  try {
    const db = await getDb();

    // Pegar a aula e identificar o curso (para a trava de prova final)
    const [lessonRows] = await db.query(
      `SELECT a.id, a.eh_prova_final, m.curso_id
       FROM aulas a JOIN modulos m ON a.modulo_id = m.id
       WHERE a.id = ?`,
      [lessonId]
    );
    if (lessonRows.length === 0) {
      return res.status(404).json({ message: 'Aula não encontrada' });
    }
    const lessonRow = lessonRows[0];
    const ehProvaFinal = lessonRow.eh_prova_final === 1 || lessonRow.eh_prova_final === true;

    // Trava: se for prova final, exige conteúdo cumprido + tentativas disponíveis.
    if (ehProvaFinal) {
      const gate = await gateCompleto(userId, lessonRow.curso_id);
      if (!gate.liberado) {
        let msg = 'A Avaliação Final está bloqueada.';
        if (gate.motivo === 'atividades_pendentes') {
          msg = 'Conclua todas as apostilas e atividades práticas antes da prova final.';
        } else if (gate.motivo === 'tentativas_esgotadas') {
          msg = 'Você já utilizou as 2 tentativas desta prova. Procure o instrutor para destravar.';
        } else if (gate.motivo === 'prova_nao_cadastrada') {
          msg = 'Avaliação Final ainda não foi cadastrada para este curso.';
        }
        return res.status(403).json({ message: msg, gate });
      }
    }

    // Pegar o gabarito
    const [quizzes] = await db.query('SELECT id, alternativa_correta FROM questoes WHERE aula_id = ? ORDER BY id ASC', [lessonId]);
    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'Não há avaliação cadastrada para esta lição' });
    }

    let correctCount = 0;
    quizzes.forEach((q, idx) => {
      if (answers[idx] === q.alternativa_correta) {
        correctCount++;
      }
    });

    const score = (correctCount / quizzes.length) * 100;
    const passed = score >= 60.0; // Aproveitamento mínimo exigido de 60%

    // Salvar tentativa
    await db.query(`
      INSERT INTO tentativas_avaliacao (usuario_id, aula_id, nota, aprovado)
      VALUES (?, ?, ?, ?)
    `, [userId, lessonId, score, passed]);

    // Se passou na prova final, completa automaticamente a aula
    if (passed) {
      await db.query(`
        INSERT IGNORE INTO progresso_usuario (usuario_id, aula_id, concluido)
        VALUES (?, ?, TRUE)
      `, [userId, lessonId]);
    }

    res.json({
      success: true,
      score,
      passed,
      correctCount,
      totalQuestions: quizzes.length
    });
  } catch (err) {
    console.error('Erro ao submeter quiz:', err);
    res.status(500).json({ message: 'Erro ao processar respostas da avaliação' });
  }
});

// Rota para fazer upload de PDF (Apenas admin/instructor) — capa do curso
// Endurecida: fileFilter + limits + magic-bytes.
const pdfCapa = pdfUpload({ destino: 'capa' });
router.post(
  '/upload',
  authRequired,
  requireRole('admin', 'instructor'),
  pdfCapa.single('pdf'),
  validatePdfMagicBytes,
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }
    const relativePath = `/uploads/${req.file.filename}`;
    res.json({ url: relativePath });
  }
);

// Upload de apostila POR AULA (instrutor/admin)
// Cada aula pode ter sua própria apostila — é a "virar páginas de livro" do aluno.
const pdfApostila = pdfUpload({ destino: 'apostilas' });
router.post(
  '/lessons/:lessonId/pdf',
  authRequired,
  requireRole('admin', 'instructor'),
  pdfApostila.single('pdf'),
  validatePdfMagicBytes,
  async (req, res) => {
    const lessonId = req.params.lessonId;
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' });
    }
    // URL pública (servida por stream autenticado, ver GET /files/apostila/:aulaId)
    const relativePath = `/uploads/apostilas/${req.file.filename}`;

    try {
      const db = await getDb();
      const [lessonRows] = await db.query('SELECT id FROM aulas WHERE id = ?', [lessonId]);
      if (lessonRows.length === 0) {
        // apaga o arquivo recém-salvo pois a aula não existe
        try { fs.unlinkSync(req.file.path); } catch (_) {}
        return res.status(404).json({ message: 'Aula não encontrada' });
      }

      await db.query(
        'UPDATE aulas SET pdf_url = ?, criado_por = ? WHERE id = ?',
        [relativePath, req.user.id, lessonId]
      );

      res.status(201).json({ message: 'Apostila enviada com sucesso', url: relativePath });
    } catch (err) {
      console.error('Erro ao salvar apostila da aula:', err);
      try { fs.unlinkSync(req.file.path); } catch (_) {}
      res.status(500).json({ message: 'Erro ao salvar apostila da aula' });
    }
  }
);

// Destravar prova para um aluno (instrutor/admin)
// Apaga o histórico de tentativas da prova final do curso para liberar
// novas tentativas. Auditoria fica no log do servidor.
router.post(
  '/:id/unlock-exam',
  authRequired,
  requireRole('admin', 'instructor'),
  async (req, res) => {
    const courseId = req.params.id;
    const { aluno_id } = req.body;
    if (!aluno_id) {
      return res.status(400).json({ message: 'aluno_id é obrigatório' });
    }
    try {
      const db = await getDb();
      const [aulaRows] = await db.query(
        `SELECT a.id
         FROM aulas a JOIN modulos m ON a.modulo_id = m.id
         WHERE m.curso_id = ? AND a.eh_prova_final = 1
         LIMIT 1`,
        [courseId]
      );
      if (aulaRows.length === 0) {
        return res.status(404).json({ message: 'Curso não tem prova final cadastrada' });
      }
      const aulaId = aulaRows[0].id;

      const [del] = await db.query(
        'DELETE FROM tentativas_avaliacao WHERE usuario_id = ? AND aula_id = ?',
        [aluno_id, aulaId]
      );
      console.log(
        `[unlock-exam] curso=${courseId} aula=${aulaId} aluno=${aluno_id} por=${req.user.id} apagadas=${del.affectedRows}`
      );
      res.json({
        success: true,
        message: 'Tentativas da prova final liberadas para este aluno.',
        tentativas_apagadas: del.affectedRows,
      });
    } catch (err) {
      console.error('Erro ao destravar prova:', err);
      res.status(500).json({ message: 'Erro ao destravar prova do aluno' });
    }
  }
);

// Confirmar presença em uma atividade prática (instrutor/admin).
router.post(
  '/activities/:activityId/attendance',
  authRequired,
  requireRole('admin', 'instructor'),
  async (req, res) => {
    const activityId = req.params.activityId;
    const { aluno_id, presente } = req.body;
    if (!aluno_id) {
      return res.status(400).json({ message: 'aluno_id é obrigatório' });
    }
    try {
      const db = await getDb();
      const [ativRows] = await db.query('SELECT id FROM atividades WHERE id = ?', [activityId]);
      if (ativRows.length === 0) {
        return res.status(404).json({ message: 'Atividade não encontrada' });
      }
      await db.query(
        `INSERT INTO presencas_atividade (usuario_id, atividade_id, presente, registrado_por)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE presente = VALUES(presente), registrado_por = VALUES(registrado_por), registrado_em = CURRENT_TIMESTAMP`,
        [aluno_id, activityId, presente === false ? 0 : 1, req.user.id]
      );
      res.status(201).json({ success: true });
    } catch (err) {
      console.error('Erro ao registrar presença:', err);
      res.status(500).json({ message: 'Erro ao registrar presença' });
    }
  }
);

// Stream autenticado do PDF da apostila (substitui /uploads público para apostilas)
router.get('/files/apostila/:lessonId', authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  try {
    const db = await getDb();
    const [rows] = await db.query(
      `SELECT a.pdf_url, a.titulo, c.id AS curso_id, c.instrutor
       FROM aulas a
       JOIN modulos m ON a.modulo_id = m.id
       JOIN cursos c ON c.id = m.curso_id
       WHERE a.id = ?`,
      [lessonId]
    );
    if (rows.length === 0 || !rows[0].pdf_url) {
      return res.status(404).json({ message: 'Apostila não encontrada' });
    }
    const role = req.user.cargo;
    const isOwnerOrInstructor =
      role === 'admin' ||
      role === 'instructor' ||
      rows[0].instrutor === req.user.nome; // heurística simples
    // Sem heurística forte de matrícula hoje: aluno matriculado no curso tem acesso.
    // Mantemos aberto para alunos autenticados para preservar o fluxo atual;
    // quando houver tabela de matrículas, restringimos aqui.
    if (!isOwnerOrInstructor && role !== 'student') {
      return res.status(403).json({ message: 'Acesso negado à apostila' });
    }

    const filePath = path.join(
      typeof __dirname !== 'undefined' ? path.resolve(__dirname, '../') : process.cwd(),
      'uploads',
      'apostilas',
      path.basename(rows[0].pdf_url)
    );
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Arquivo físico não encontrado' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    console.error('Erro ao servir apostila:', err);
    res.status(500).json({ message: 'Erro ao servir apostila' });
  }
});

// Registrar progresso do PDF do curso (Páginas lidas)
router.post('/:id/pdf-progress', authRequired, async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const { pagina_atual, total_paginas } = req.body;

  if (!pagina_atual || !total_paginas) {
    return res.status(400).json({ message: 'Página atual e total de páginas são obrigatórios' });
  }

  const progresso_porcentagem = Math.min(100, Math.floor((pagina_atual / total_paginas) * 100));
  const concluido = progresso_porcentagem >= 100;

  try {
    const db = await getDb();
    
    // Inserir ou atualizar progresso
    await db.query(`
      INSERT INTO progresso_curso_pdf (usuario_id, curso_id, pagina_atual, total_paginas, progresso_porcentagem, concluido)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        pagina_atual = VALUES(pagina_atual), 
        total_paginas = VALUES(total_paginas), 
        progresso_porcentagem = VALUES(progresso_porcentagem), 
        concluido = VALUES(concluido)
    `, [userId, courseId, pagina_atual, total_paginas, progresso_porcentagem, concluido]);

    res.json({ 
      success: true, 
      pagina_atual, 
      total_paginas, 
      progresso_porcentagem, 
      concluido 
    });
  } catch (err) {
    console.error('Erro ao salvar progresso do PDF:', err);
    res.status(500).json({ message: 'Erro ao registrar progresso do PDF' });
  }
});

// Registrar progresso do PDF da AULA (apostila individual)
// Substitui o fluxo de apostila que antes ia para /:id/pdf-progress.
// Mantém rate limit por usuário.
router.post('/lessons/:lessonId/pdf-progress', authRequired, rateLimitProgress, async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;
  const { pagina_atual, total_paginas } = req.body;

  if (!Number.isFinite(pagina_atual) || !Number.isFinite(total_paginas) || total_paginas < 1) {
    return res.status(400).json({ message: 'pagina_atual e total_paginas são obrigatórios' });
  }

  const pagina = Math.max(1, Math.min(Math.floor(pagina_atual), Math.floor(total_paginas)));
  const total = Math.floor(total_paginas);
  const progresso_porcentagem = Math.min(100, Math.floor((pagina / total) * 100));
  const concluido = pagina >= total; // virou a última página

  try {
    const db = await getDb();

    // Inserir/atualizar progresso de leitura do PDF desta aula
    await db.query(
      `INSERT INTO progresso_aula_pdf
         (usuario_id, aula_id, pagina_atual, total_paginas, progresso_porcentagem, concluido)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         pagina_atual = VALUES(pagina_atual),
         total_paginas = VALUES(total_paginas),
         progresso_porcentagem = VALUES(progresso_porcentagem),
         concluido = VALUES(concluido)`,
      [userId, lessonId, pagina, total, progresso_porcentagem, concluido ? 1 : 0]
    );

    // Consistência: terminou a apostila ⇒ também marca a aula como concluída
    if (concluido) {
      await db.query(
        `INSERT IGNORE INTO progresso_usuario (usuario_id, aula_id, concluido)
         VALUES (?, ?, TRUE)`,
        [userId, lessonId]
      );
    }

    res.json({
      success: true,
      pagina_atual: pagina,
      total_paginas: total,
      progresso_porcentagem,
      concluido,
    });
  } catch (err) {
    console.error('Erro ao salvar progresso do PDF da aula:', err);
    res.status(500).json({ message: 'Erro ao registrar progresso da apostila' });
  }
});

// Criar novo módulo (Apenas Administradores/Instrutores)
router.post('/:id/modules', authRequired, requireRole('admin', 'instructor'), async (req, res) => {
  const courseId = req.params.id;
  const { title, order } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Título do módulo é obrigatório' });
  }

  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO modulos (curso_id, titulo, ordem) VALUES (?, ?, ?)
    `, [courseId, title, order || 0]);

    res.status(201).json({ message: 'Módulo criado com sucesso', moduleId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar módulo:', err);
    res.status(500).json({ message: 'Erro ao salvar o módulo' });
  }
});

// Criar nova aula/lição (Apenas Administradores/Instrutores)
router.post('/modules/:moduleId/lessons', authRequired, requireRole('admin', 'instructor'), async (req, res) => {
  const moduleId = req.params.moduleId;
  const { title, duration, text, pdf_url, is_final_exam, order } = req.body;

  if (!title || !duration || !text) {
    return res.status(400).json({ message: 'Título, duração e texto são obrigatórios' });
  }

  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO aulas (modulo_id, titulo, duracao, texto, pdf_url, eh_prova_final, ordem)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [moduleId, title, duration, text, pdf_url || null, is_final_exam ? 1 : 0, order || 0]);

    res.status(201).json({ message: 'Aula criada com sucesso', lessonId: result.insertId });
  } catch (err) {
    console.error('Erro ao criar aula:', err);
    res.status(500).json({ message: 'Erro ao salvar a aula' });
  }
});

// Criar nova questão de avaliação (Apenas Administradores/Instrutores)
router.post('/lessons/:lessonId/questions', authRequired, requireRole('admin', 'instructor'), async (req, res) => {
  const lessonId = req.params.lessonId;
  const { questionText, options, correctOption } = req.body;

  if (!questionText || !options || correctOption === undefined) {
    return res.status(400).json({ message: 'Enunciado, alternativas e opção correta são obrigatórios' });
  }

  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO questoes (aula_id, enunciado, alternativas, alternativa_correta)
      VALUES (?, ?, ?, ?)
    `, [lessonId, questionText, JSON.stringify(options), correctOption]);

    res.status(201).json({ message: 'Questão criada com sucesso' });
  } catch (err) {
    console.error('Erro ao criar questão:', err);
    res.status(500).json({ message: 'Erro ao salvar a questão' });
  }
});

export default router;
