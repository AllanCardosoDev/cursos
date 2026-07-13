var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/server.js
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express10 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_url2 = require("url");

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/auth.routes.js
var import_express = __toESM(require("express"), 1);
var import_bcryptjs = __toESM(require("bcryptjs"), 1);
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"), 1);

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/db/database.js
var import_promise = __toESM(require("mysql2/promise"), 1);
var pool;
async function getDb() {
  if (!pool) {
    pool = import_promise.default.createPool({
      host: "127.0.0.1",
      port: 3306,
      user: "cilomi",
      password: "Hv$32q56t",
      database: "cursos",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/middleware/auth.js
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var JWT_SECRET = process.env.JWT_SECRET || "cursos-secret-key";
function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token n\xE3o fornecido" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inv\xE1lido ou expirado" });
  }
}
function requireRole(...cargos) {
  return (req, res, next) => {
    if (!req.user || !cargos.includes(req.user.cargo)) {
      return res.status(403).json({ message: "Acesso n\xE3o autorizado" });
    }
    next();
  };
}

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/auth.routes.js
var router = import_express.default.Router();
var JWT_SECRET2 = process.env.JWT_SECRET || "cursos-secret-key";
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "E-mail e senha s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: "E-mail ou senha inv\xE1lidos" });
    }
    const valid = await import_bcryptjs.default.compare(password, user.senha_hash);
    if (!valid) {
      return res.status(401).json({ message: "E-mail ou senha inv\xE1lidos" });
    }
    if (user.status !== "ACTIVE") {
      return res.status(403).json({ message: "Usu\xE1rio bloqueado ou pendente" });
    }
    const token = import_jsonwebtoken2.default.sign(
      { id: user.id, email: user.email, cargo: user.cargo },
      JWT_SECRET2,
      { expiresIn: "8h" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo
      }
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, e-mail e senha s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    const [existing] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "E-mail j\xE1 cadastrado" });
    }
    const hash = await import_bcryptjs.default.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios (nome, email, senha_hash, cargo, status) VALUES (?, ?, ?, 'student', 'ACTIVE')`,
      [name, email, hash]
    );
    res.status(201).json({ message: "Cadastro realizado com sucesso" });
  } catch (err) {
    console.error("Erro no registro:", err);
    res.status(500).json({ message: "Erro ao registrar usu\xE1rio" });
  }
});
router.get("/me", authRequired, async (req, res) => {
  try {
    const db = await getDb();
    const [rows] = await db.query(
      "SELECT id, nome, email, cargo, status, criado_em FROM usuarios WHERE id = ?",
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Erro em /me:", err);
    res.status(500).json({ message: "Erro interno" });
  }
});
var auth_routes_default = router;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/courses.routes.js
var import_express2 = __toESM(require("express"), 1);
var import_multer = __toESM(require("multer"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_url = require("url");
var import_meta = {};
var currentDir = typeof __dirname !== "undefined" ? __dirname : import_path.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
var uploadsDir = typeof __dirname !== "undefined" ? import_path.default.resolve(currentDir, "../uploads") : import_path.default.resolve(currentDir, "../../../../uploads");
var storage = import_multer.default.diskStorage({
  destination: (req, file, cb) => {
    if (!import_fs.default.existsSync(uploadsDir)) {
      import_fs.default.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + import_path.default.extname(file.originalname));
  }
});
var upload = (0, import_multer.default)({ storage });
var router2 = import_express2.default.Router();
router2.get("/", authRequired, async (req, res) => {
  try {
    const db = await getDb();
    const [courses] = await db.query("SELECT * FROM cursos ORDER BY id DESC");
    res.json(courses);
  } catch (err) {
    console.error("Erro ao listar cursos:", err);
    res.status(500).json({ message: "Erro ao listar cursos" });
  }
});
router2.get("/:id", authRequired, async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  try {
    const db = await getDb();
    const [courses] = await db.query("SELECT * FROM cursos WHERE id = ?", [courseId]);
    const course = courses[0];
    if (!course) {
      return res.status(404).json({ message: "Curso n\xE3o encontrado" });
    }
    const [pdfProgress] = await db.query(
      "SELECT pagina_atual, total_paginas, progresso_porcentagem, concluido FROM progresso_curso_pdf WHERE usuario_id = ? AND curso_id = ?",
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
    const [modules] = await db.query("SELECT * FROM modulos WHERE curso_id = ? ORDER BY ordem ASC", [courseId]);
    const [lessons] = await db.query(`
      SELECT a.*, 
             IF(up.concluido IS TRUE, TRUE, FALSE) AS completed,
             qa.nota AS quiz_score,
             qa.aprovado AS quiz_passed
      FROM aulas a
      JOIN modulos m ON a.modulo_id = m.id
      LEFT JOIN progresso_usuario up ON up.aula_id = a.id AND up.usuario_id = ?
      LEFT JOIN (
        SELECT aula_id, MAX(nota) AS nota, MAX(aprovado) AS aprovado
        FROM tentativas_avaliacao
        WHERE usuario_id = ?
        GROUP BY aula_id
      ) qa ON qa.aula_id = a.id
      WHERE m.curso_id = ?
      ORDER BY m.ordem ASC, a.ordem ASC
    `, [userId, userId, courseId]);
    const [quizzes] = await db.query(`
      SELECT q.* 
      FROM questoes q
      JOIN aulas a ON q.aula_id = a.id
      JOIN modulos m ON a.modulo_id = m.id
      WHERE m.curso_id = ?
    `, [courseId]);
    const modulesMap = {};
    modules.forEach((m) => {
      modulesMap[m.id] = {
        ...m,
        lessons: []
      };
    });
    lessons.forEach((l) => {
      if (modulesMap[l.modulo_id]) {
        const lessonQuizzes = quizzes.filter((q) => q.aula_id === l.id).map((q) => ({
          id: q.id,
          questionText: q.enunciado,
          options: typeof q.alternativas === "string" ? JSON.parse(q.alternativas) : q.alternativas,
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
          quiz: lessonQuizzes
        });
      }
    });
    course.modules = Object.values(modulesMap);
    res.json(course);
  } catch (err) {
    console.error("Erro ao buscar curso:", err);
    res.status(500).json({ message: "Erro ao carregar detalhes do curso" });
  }
});
router2.post("/", authRequired, requireRole("admin", "instructor"), async (req, res) => {
  const { title, category, category_name, category_class, level, level_text, description, instructor, duration, apenas_pdf_texto, pdf_url } = req.body;
  if (!title || !category || !level || !instructor || !duration) {
    return res.status(400).json({ message: "Preencha todos os campos obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO cursos (titulo, categoria, categoria_nome, categoria_classe, nivel, nivel_texto, descricao, instrutor, duracao, apenas_pdf_texto, pdf_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [title, category, category_name || category, category_class || "cat-general", level, level_text || level, description || "", instructor, duration, apenas_pdf_texto ? 1 : 0, pdf_url || null]);
    res.status(201).json({ message: "Curso criado com sucesso", courseId: result.insertId });
  } catch (err) {
    console.error("Erro ao criar curso:", err);
    res.status(500).json({ message: "Erro ao salvar o curso" });
  }
});
router2.post("/progress/:lessonId", authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;
  try {
    const db = await getDb();
    await db.query(`
      INSERT IGNORE INTO progresso_usuario (usuario_id, aula_id, concluido)
      VALUES (?, ?, TRUE)
    `, [userId, lessonId]);
    res.json({ success: true, message: "Progresso registrado com sucesso" });
  } catch (err) {
    console.error("Erro ao salvar progresso:", err);
    res.status(500).json({ message: "Erro ao registrar progresso da aula" });
  }
});
router2.post("/quiz/:lessonId", authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;
  const { answers } = req.body;
  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Respostas inv\xE1lidas" });
  }
  try {
    const db = await getDb();
    const [quizzes] = await db.query("SELECT id, alternativa_correta FROM questoes WHERE aula_id = ? ORDER BY id ASC", [lessonId]);
    if (quizzes.length === 0) {
      return res.status(404).json({ message: "N\xE3o h\xE1 avalia\xE7\xE3o cadastrada para esta li\xE7\xE3o" });
    }
    let correctCount = 0;
    quizzes.forEach((q, idx) => {
      if (answers[idx] === q.alternativa_correta) {
        correctCount++;
      }
    });
    const score = correctCount / quizzes.length * 100;
    const passed = score >= 60;
    await db.query(`
      INSERT INTO tentativas_avaliacao (usuario_id, aula_id, nota, aprovado)
      VALUES (?, ?, ?, ?)
    `, [userId, lessonId, score, passed]);
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
    console.error("Erro ao submeter quiz:", err);
    res.status(500).json({ message: "Erro ao processar respostas da avalia\xE7\xE3o" });
  }
});
router2.post("/upload", authRequired, requireRole("admin", "instructor"), upload.single("pdf"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado" });
  }
  const relativePath = `/uploads/${req.file.filename}`;
  res.json({ url: relativePath });
});
router2.post("/:id/pdf-progress", authRequired, async (req, res) => {
  const courseId = req.params.id;
  const userId = req.user.id;
  const { pagina_atual, total_paginas } = req.body;
  if (!pagina_atual || !total_paginas) {
    return res.status(400).json({ message: "P\xE1gina atual e total de p\xE1ginas s\xE3o obrigat\xF3rios" });
  }
  const progresso_porcentagem = Math.min(100, Math.floor(pagina_atual / total_paginas * 100));
  const concluido = progresso_porcentagem >= 100;
  try {
    const db = await getDb();
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
    console.error("Erro ao salvar progresso do PDF:", err);
    res.status(500).json({ message: "Erro ao registrar progresso do PDF" });
  }
});
router2.post("/:id/modules", authRequired, requireRole("admin", "instructor"), async (req, res) => {
  const courseId = req.params.id;
  const { title, order } = req.body;
  if (!title) {
    return res.status(400).json({ message: "T\xEDtulo do m\xF3dulo \xE9 obrigat\xF3rio" });
  }
  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO modulos (curso_id, titulo, ordem) VALUES (?, ?, ?)
    `, [courseId, title, order || 0]);
    res.status(201).json({ message: "M\xF3dulo criado com sucesso", moduleId: result.insertId });
  } catch (err) {
    console.error("Erro ao criar m\xF3dulo:", err);
    res.status(500).json({ message: "Erro ao salvar o m\xF3dulo" });
  }
});
router2.post("/modules/:moduleId/lessons", authRequired, requireRole("admin", "instructor"), async (req, res) => {
  const moduleId = req.params.moduleId;
  const { title, duration, text, pdf_url, is_final_exam, order } = req.body;
  if (!title || !duration || !text) {
    return res.status(400).json({ message: "T\xEDtulo, dura\xE7\xE3o e texto s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO aulas (modulo_id, titulo, duracao, texto, pdf_url, eh_prova_final, ordem)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [moduleId, title, duration, text, pdf_url || null, is_final_exam ? 1 : 0, order || 0]);
    res.status(201).json({ message: "Aula criada com sucesso", lessonId: result.insertId });
  } catch (err) {
    console.error("Erro ao criar aula:", err);
    res.status(500).json({ message: "Erro ao salvar a aula" });
  }
});
router2.post("/lessons/:lessonId/questions", authRequired, requireRole("admin", "instructor"), async (req, res) => {
  const lessonId = req.params.lessonId;
  const { questionText, options, correctOption } = req.body;
  if (!questionText || !options || correctOption === void 0) {
    return res.status(400).json({ message: "Enunciado, alternativas e op\xE7\xE3o correta s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO questoes (aula_id, enunciado, alternativas, alternativa_correta)
      VALUES (?, ?, ?, ?)
    `, [lessonId, questionText, JSON.stringify(options), correctOption]);
    res.status(201).json({ message: "Quest\xE3o criada com sucesso" });
  } catch (err) {
    console.error("Erro ao criar quest\xE3o:", err);
    res.status(500).json({ message: "Erro ao salvar a quest\xE3o" });
  }
});
var courses_routes_default = router2;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/users.routes.js
var import_express3 = __toESM(require("express"), 1);
var router3 = import_express3.default.Router();
router3.get("/ranking", authRequired, async (req, res) => {
  try {
    const db = await getDb();
    const [ranking] = await db.query(`
      SELECT nome, xp, cargo FROM usuarios 
      WHERE status = 'ACTIVE' AND cargo = 'student'
      ORDER BY xp DESC, nome ASC 
      LIMIT 50
    `);
    res.json(ranking);
  } catch (err) {
    console.error("Erro ao buscar ranking:", err);
    res.status(500).json({ message: "Erro ao carregar o ranking" });
  }
});
router3.get("/me/profile", authRequired, async (req, res) => {
  const userId = req.user.id;
  try {
    const db = await getDb();
    const [userRows] = await db.query("SELECT id, nome, email, cargo, status, xp, criado_em FROM usuarios WHERE id = ?", [userId]);
    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: "Usu\xE1rio n\xE3o encontrado" });
    }
    const [progressRows] = await db.query("SELECT COUNT(*) AS total FROM progresso_usuario WHERE usuario_id = ? AND concluido = TRUE", [userId]);
    const completedLessons = progressRows[0].total;
    const [quizRows] = await db.query(`
      SELECT COUNT(*) AS total, AVG(nota) AS averageScore, MAX(nota) AS maxScore 
      FROM tentativas_avaliacao 
      WHERE usuario_id = ?
    `, [userId]);
    const totalQuizzes = quizRows[0].total || 0;
    const avgScore = quizRows[0].averageScore ? parseFloat(quizRows[0].averageScore).toFixed(1) : "0.0";
    const maxScore = quizRows[0].maxScore ? parseFloat(quizRows[0].maxScore).toFixed(1) : "0.0";
    const [notesRows] = await db.query("SELECT COUNT(*) AS total FROM anotacoes_usuario WHERE usuario_id = ?", [userId]);
    const [bookmarksRows] = await db.query("SELECT COUNT(*) AS total FROM favoritos_usuario WHERE usuario_id = ?", [userId]);
    const [commentsRows] = await db.query("SELECT COUNT(*) AS total FROM comentarios_aula WHERE usuario_id = ?", [userId]);
    res.json({
      user,
      stats: {
        completedLessons,
        completedQuizzes: totalQuizzes,
        avgScore,
        maxScore,
        notesCount: notesRows[0].total,
        bookmarksCount: bookmarksRows[0].total,
        commentsCount: commentsRows[0].total
      }
    });
  } catch (err) {
    console.error("Erro ao obter perfil:", err);
    res.status(500).json({ message: "Erro ao carregar o perfil" });
  }
});
router3.post("/xp", authRequired, async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Quantidade de XP inv\xE1lida" });
  }
  try {
    const db = await getDb();
    await db.query("UPDATE usuarios SET xp = xp + ? WHERE id = ?", [amount, userId]);
    const [rows] = await db.query("SELECT xp FROM usuarios WHERE id = ?", [userId]);
    res.json({ success: true, xp: rows[0].xp });
  } catch (err) {
    console.error("Erro ao adicionar XP:", err);
    res.status(500).json({ message: "Erro ao atualizar XP" });
  }
});
var users_routes_default = router3;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/notes.routes.js
var import_express4 = __toESM(require("express"), 1);
var router4 = import_express4.default.Router();
router4.get("/:lessonId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  try {
    const db = await getDb();
    const [rows] = await db.query("SELECT texto_anotacao FROM anotacoes_usuario WHERE usuario_id = ? AND aula_id = ?", [userId, lessonId]);
    if (rows.length === 0) {
      return res.json({ note_text: "" });
    }
    res.json({ note_text: rows[0].texto_anotacao });
  } catch (err) {
    console.error("Erro ao buscar anota\xE7\xE3o:", err);
    res.status(500).json({ message: "Erro ao carregar anota\xE7\xE3o" });
  }
});
router4.post("/:lessonId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  const { note_text } = req.body;
  if (note_text === void 0) {
    return res.status(400).json({ message: "Texto da anota\xE7\xE3o n\xE3o fornecido" });
  }
  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO anotacoes_usuario (usuario_id, aula_id, texto_anotacao)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE texto_anotacao = VALUES(texto_anotacao)
    `, [userId, lessonId, note_text]);
    res.json({ success: true, message: "Anota\xE7\xE3o salva com sucesso" });
  } catch (err) {
    console.error("Erro ao salvar anota\xE7\xE3o:", err);
    res.status(500).json({ message: "Erro ao salvar anota\xE7\xE3o" });
  }
});
var notes_routes_default = router4;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/bookmarks.routes.js
var import_express5 = __toESM(require("express"), 1);
var router5 = import_express5.default.Router();
router5.get("/", authRequired, async (req, res) => {
  const userId = req.user.id;
  try {
    const db = await getDb();
    const [bookmarks] = await db.query(`
      SELECT f.aula_id AS lesson_id, a.titulo AS lesson_title, c.id AS course_id, c.titulo AS course_title, m.titulo AS module_title
      FROM favoritos_usuario f
      JOIN aulas a ON f.aula_id = a.id
      JOIN modulos m ON a.modulo_id = m.id
      JOIN cursos c ON m.curso_id = c.id
      WHERE f.usuario_id = ?
      ORDER BY f.criado_em DESC
    `, [userId]);
    res.json(bookmarks);
  } catch (err) {
    console.error("Erro ao listar favoritos:", err);
    res.status(500).json({ message: "Erro ao carregar favoritos" });
  }
});
router5.post("/:lessonId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  try {
    const db = await getDb();
    await db.query("INSERT IGNORE INTO favoritos_usuario (usuario_id, aula_id) VALUES (?, ?)", [userId, lessonId]);
    res.json({ success: true, message: "Adicionado aos favoritos" });
  } catch (err) {
    console.error("Erro ao favoritar aula:", err);
    res.status(500).json({ message: "Erro ao favoritar" });
  }
});
router5.delete("/:lessonId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  try {
    const db = await getDb();
    await db.query("DELETE FROM favoritos_usuario WHERE usuario_id = ? AND aula_id = ?", [userId, lessonId]);
    res.json({ success: true, message: "Removido dos favoritos" });
  } catch (err) {
    console.error("Erro ao remover favorito:", err);
    res.status(500).json({ message: "Erro ao remover dos favoritos" });
  }
});
var bookmarks_routes_default = router5;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/comments.routes.js
var import_express6 = __toESM(require("express"), 1);
var router6 = import_express6.default.Router();
router6.get("/:lessonId", authRequired, async (req, res) => {
  const lessonId = req.params.lessonId;
  try {
    const db = await getDb();
    const [comments] = await db.query(`
      SELECT c.id, c.texto_comentario AS comment_text, c.criado_em AS created_at, u.nome AS user_name, u.cargo AS user_role
      FROM comentarios_aula c
      JOIN usuarios u ON c.usuario_id = u.id
      WHERE c.aula_id = ?
      ORDER BY c.criado_em DESC
    `, [lessonId]);
    res.json(comments);
  } catch (err) {
    console.error("Erro ao buscar coment\xE1rios:", err);
    res.status(500).json({ message: "Erro ao carregar coment\xE1rios" });
  }
});
router6.post("/:lessonId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  const { comment_text } = req.body;
  if (!comment_text || comment_text.trim() === "") {
    return res.status(400).json({ message: "O conte\xFAdo do coment\xE1rio n\xE3o pode estar vazio" });
  }
  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO comentarios_aula (aula_id, usuario_id, texto_comentario)
      VALUES (?, ?, ?)
    `, [lessonId, userId, comment_text]);
    const [newComment] = await db.query(`
      SELECT c.id, c.texto_comentario AS comment_text, c.criado_em AS created_at, u.nome AS user_name, u.cargo AS user_role
      FROM comentarios_aula c
      JOIN usuarios u ON c.usuario_id = u.id
      WHERE c.id = ?
    `, [result.insertId]);
    res.status(201).json(newComment[0]);
  } catch (err) {
    console.error("Erro ao enviar coment\xE1rio:", err);
    res.status(500).json({ message: "Erro ao publicar coment\xE1rio" });
  }
});
var comments_routes_default = router6;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/activities.routes.js
var import_express7 = __toESM(require("express"), 1);
var router7 = import_express7.default.Router();
router7.get("/", authRequired, async (req, res) => {
  const userId = req.user.id;
  try {
    const db = await getDb();
    const [activities] = await db.query(`
      SELECT a.id, a.titulo AS title, a.data AS date, a.hora AS time, a.local AS location, a.instrutor AS instructor, a.tipo AS type, a.vagas AS capacity, a.criado_em AS created_at,
             (SELECT COUNT(*) FROM inscricoes_atividade WHERE atividade_id = a.id) AS enrolled_count,
             IF((SELECT COUNT(*) FROM inscricoes_atividade WHERE atividade_id = a.id AND usuario_id = ?) > 0, TRUE, FALSE) AS registered
      FROM atividades a
      ORDER BY a.data ASC, a.hora ASC
    `, [userId]);
    res.json(activities);
  } catch (err) {
    console.error("Erro ao listar atividades:", err);
    res.status(500).json({ message: "Erro ao carregar atividades" });
  }
});
router7.post("/", authRequired, requireRole("admin"), async (req, res) => {
  const { title, date, time, location, instructor, type, capacity } = req.body;
  if (!title || !date || !time || !location || !instructor || !type || !capacity) {
    return res.status(400).json({ message: "Todos os campos s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO atividades (titulo, data, hora, local, instrutor, tipo, vagas)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [title, date, time, location, instructor, type, capacity]);
    res.status(201).json({ message: "Atividade pr\xE1tica agendada com sucesso", activityId: result.insertId });
  } catch (err) {
    console.error("Erro ao agendar atividade:", err);
    res.status(500).json({ message: "Erro ao agendar atividade" });
  }
});
router7.post("/:id/signup", authRequired, async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;
  try {
    const db = await getDb();
    const [activities] = await db.query("SELECT vagas AS capacity FROM atividades WHERE id = ?", [activityId]);
    if (activities.length === 0) {
      return res.status(404).json({ message: "Atividade n\xE3o encontrada" });
    }
    const capacity = activities[0].capacity;
    const [enrolled] = await db.query("SELECT COUNT(*) AS total FROM inscricoes_atividade WHERE atividade_id = ?", [activityId]);
    if (enrolled[0].total >= capacity) {
      return res.status(400).json({ message: "Vagas esgotadas para esta atividade" });
    }
    await db.query(`
      INSERT IGNORE INTO inscricoes_atividade (atividade_id, usuario_id)
      VALUES (?, ?)
    `, [activityId, userId]);
    res.json({ success: true, message: "Inscri\xE7\xE3o realizada com sucesso" });
  } catch (err) {
    console.error("Erro ao inscrever-se em atividade:", err);
    res.status(500).json({ message: "Erro ao processar inscri\xE7\xE3o" });
  }
});
router7.delete("/:id/signup", authRequired, async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;
  try {
    const db = await getDb();
    await db.query("DELETE FROM inscricoes_atividade WHERE atividade_id = ? AND usuario_id = ?", [activityId, userId]);
    res.json({ success: true, message: "Inscri\xE7\xE3o cancelada com sucesso" });
  } catch (err) {
    console.error("Erro ao cancelar inscri\xE7\xE3o:", err);
    res.status(500).json({ message: "Erro ao processar cancelamento" });
  }
});
router7.put("/:id", authRequired, requireRole("admin"), async (req, res) => {
  const activityId = req.params.id;
  const { title, date, time, location, instructor, type, capacity } = req.body;
  if (!title || !date || !time || !location || !instructor || !type || !capacity) {
    return res.status(400).json({ message: "Todos os campos s\xE3o obrigat\xF3rios" });
  }
  try {
    const db = await getDb();
    await db.query(`
      UPDATE atividades 
      SET titulo = ?, data = ?, hora = ?, local = ?, instrutor = ?, tipo = ?, vagas = ?
      WHERE id = ?
    `, [title, date, time, location, instructor, type, capacity, activityId]);
    res.json({ success: true, message: "Atividade atualizada com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar atividade:", err);
    res.status(500).json({ message: "Erro ao atualizar atividade" });
  }
});
router7.get("/:id/signups", authRequired, requireRole("admin", "instructor"), async (req, res) => {
  const activityId = req.params.id;
  try {
    const db = await getDb();
    const [signups] = await db.query(`
      SELECT u.id, u.nome AS name, u.cargo AS rank
      FROM inscricoes_atividade ia
      JOIN usuarios u ON ia.usuario_id = u.id
      WHERE ia.atividade_id = ?
      ORDER BY ia.inscrito_em ASC
    `, [activityId]);
    res.json(signups);
  } catch (err) {
    console.error("Erro ao buscar inscritos:", err);
    res.status(500).json({ message: "Erro ao buscar inscritos" });
  }
});
var activities_routes_default = router7;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/notifications.routes.js
var import_express8 = __toESM(require("express"), 1);
var router8 = import_express8.default.Router();
router8.get("/", authRequired, async (req, res) => {
  const userId = req.user.id;
  try {
    const db = await getDb();
    const [notifications] = await db.query(`
      SELECT n.id, n.titulo AS title, n.mensagem AS message, n.tipo AS type, n.criado_em AS created_at,
             IF(un.lido IS TRUE, TRUE, FALSE) AS is_read
      FROM notificacoes n
      LEFT JOIN notificacoes_usuario un ON un.notificacao_id = n.id AND un.usuario_id = ?
      ORDER BY n.criado_em DESC
      LIMIT 100
    `, [userId]);
    res.json(notifications);
  } catch (err) {
    console.error("Erro ao listar notifica\xE7\xF5es:", err);
    res.status(500).json({ message: "Erro ao carregar notifica\xE7\xF5es" });
  }
});
router8.put("/:id/read", authRequired, async (req, res) => {
  const userId = req.user.id;
  const notificationId = req.params.id;
  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO notificacoes_usuario (usuario_id, notificacao_id, lido, lido_em)
      VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE lido = TRUE, lido_em = CURRENT_TIMESTAMP
    `, [userId, notificationId]);
    res.json({ success: true, message: "Notifica\xE7\xE3o marcada como lida" });
  } catch (err) {
    console.error("Erro ao ler notifica\xE7\xE3o:", err);
    res.status(500).json({ message: "Erro ao atualizar status da notifica\xE7\xE3o" });
  }
});
var notifications_routes_default = router8;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/src/routes/nps.routes.js
var import_express9 = __toESM(require("express"), 1);
var router9 = import_express9.default.Router();
router9.post("/:courseId", authRequired, async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  const { score, comment } = req.body;
  if (score === void 0 || typeof score !== "number" || score < 0 || score > 10) {
    return res.status(400).json({ message: "Nota do NPS deve ser um n\xFAmero entre 0 e 10" });
  }
  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO nps_curso (usuario_id, curso_id, nota, comentario)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE nota = VALUES(nota), comentario = VALUES(comentario), criado_em = CURRENT_TIMESTAMP
    `, [userId, courseId, score, comment || ""]);
    res.json({ success: true, message: "NPS registrado com sucesso" });
  } catch (err) {
    console.error("Erro ao registrar NPS:", err);
    res.status(500).json({ message: "Erro ao salvar avalia\xE7\xE3o NPS" });
  }
});
var nps_routes_default = router9;

// //162.214.74.222/Vhosts/cbm.am.gov.br/httpdocs/cursos/backend/server.js
var import_meta2 = {};
var currentDir2 = typeof __dirname !== "undefined" ? __dirname : import_path2.default.dirname((0, import_url2.fileURLToPath)(import_meta2.url));
var uploadsDir2 = typeof __dirname !== "undefined" ? import_path2.default.resolve(currentDir2, "../uploads") : import_path2.default.resolve(currentDir2, "../../uploads");
if (!import_fs2.default.existsSync(uploadsDir2)) {
  import_fs2.default.mkdirSync(uploadsDir2, { recursive: true });
}
var app = (0, import_express10.default)();
app.use((0, import_cors.default)());
app.use(import_express10.default.json());
app.use((req, res, next) => {
  if (req.url.startsWith("/cursos/backend")) {
    req.url = req.url.replace("/cursos/backend", "");
  }
  next();
});
app.use("/uploads", import_express10.default.static(uploadsDir2));
app.use("/api/auth", auth_routes_default);
app.use("/api/courses", courses_routes_default);
app.use("/api/users", users_routes_default);
app.use("/api/notes", notes_routes_default);
app.use("/api/bookmarks", bookmarks_routes_default);
app.use("/api/comments", comments_routes_default);
app.use("/api/activities", activities_routes_default);
app.use("/api/notifications", notifications_routes_default);
app.use("/api/nps", nps_routes_default);
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "EAD CBMAM API rodando" });
});
app.use((req, res) => {
  res.status(404).json({ message: "Rota n\xE3o encontrada" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erro interno no servidor" });
});
var server_default = app;
if (process.env.NODE_ENV !== "production" || process.env.IISNODE_VERSION) {
  const PORT = process.env.PORT || 5e3;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta/pipe ${PORT}`);
  });
}
