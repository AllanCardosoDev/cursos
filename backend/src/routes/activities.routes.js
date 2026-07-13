import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Listar todas as atividades práticas e indicar se o aluno logado está inscrito
router.get('/', authRequired, async (req, res) => {
  const userId = req.user.id;

  try {
    const db = await getDb();
    
    // Obter todas as atividades com contagem de inscritos e flag de inscrição do aluno
    const [activities] = await db.query(`
      SELECT a.id, a.titulo AS title, a.data AS date, a.hora AS time, a.local AS location, a.instrutor AS instructor, a.tipo AS type, a.vagas AS capacity, a.criado_em AS created_at,
             (SELECT COUNT(*) FROM inscricoes_atividade WHERE atividade_id = a.id) AS enrolled_count,
             IF((SELECT COUNT(*) FROM inscricoes_atividade WHERE atividade_id = a.id AND usuario_id = ?) > 0, TRUE, FALSE) AS registered
      FROM atividades a
      ORDER BY a.data ASC, a.hora ASC
    `, [userId]);

    res.json(activities);
  } catch (err) {
    console.error('Erro ao listar atividades:', err);
    res.status(500).json({ message: 'Erro ao carregar atividades' });
  }
});

// Criar atividade prática (Apenas administradores)
router.post('/', authRequired, requireRole('admin'), async (req, res) => {
  const { title, date, time, location, instructor, type, capacity } = req.body;

  if (!title || !date || !time || !location || !instructor || !type || !capacity) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const db = await getDb();
    const [result] = await db.query(`
      INSERT INTO atividades (titulo, data, hora, local, instrutor, tipo, vagas)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [title, date, time, location, instructor, type, capacity]);

    res.status(201).json({ message: 'Atividade prática agendada com sucesso', activityId: result.insertId });
  } catch (err) {
    console.error('Erro ao agendar atividade:', err);
    res.status(500).json({ message: 'Erro ao agendar atividade' });
  }
});

// Inscrever-se em uma atividade prática
router.post('/:id/signup', authRequired, async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;

  try {
    const db = await getDb();
    
    // Verificar se atividade existe e se tem vagas
    const [activities] = await db.query('SELECT vagas AS capacity FROM atividades WHERE id = ?', [activityId]);
    if (activities.length === 0) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }
    
    const capacity = activities[0].capacity;

    const [enrolled] = await db.query('SELECT COUNT(*) AS total FROM inscricoes_atividade WHERE atividade_id = ?', [activityId]);
    if (enrolled[0].total >= capacity) {
      return res.status(400).json({ message: 'Vagas esgotadas para esta atividade' });
    }

    // Inserir registro
    await db.query(`
      INSERT IGNORE INTO inscricoes_atividade (atividade_id, usuario_id)
      VALUES (?, ?)
    `, [activityId, userId]);

    res.json({ success: true, message: 'Inscrição realizada com sucesso' });
  } catch (err) {
    console.error('Erro ao inscrever-se em atividade:', err);
    res.status(500).json({ message: 'Erro ao processar inscrição' });
  }
});

// Cancelar inscrição em atividade
router.delete('/:id/signup', authRequired, async (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;

  try {
    const db = await getDb();
    await db.query('DELETE FROM inscricoes_atividade WHERE atividade_id = ? AND usuario_id = ?', [activityId, userId]);
    res.json({ success: true, message: 'Inscrição cancelada com sucesso' });
  } catch (err) {
    console.error('Erro ao cancelar inscrição:', err);
    res.status(500).json({ message: 'Erro ao processar cancelamento' });
  }
});

// Editar atividade (Apenas administradores)
router.put('/:id', authRequired, requireRole('admin'), async (req, res) => {
  const activityId = req.params.id;
  const { title, date, time, location, instructor, type, capacity } = req.body;

  if (!title || !date || !time || !location || !instructor || !type || !capacity) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const db = await getDb();
    await db.query(`
      UPDATE atividades 
      SET titulo = ?, data = ?, hora = ?, local = ?, instrutor = ?, tipo = ?, vagas = ?
      WHERE id = ?
    `, [title, date, time, location, instructor, type, capacity, activityId]);

    res.json({ success: true, message: 'Atividade atualizada com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar atividade:', err);
    res.status(500).json({ message: 'Erro ao atualizar atividade' });
  }
});

// Obter inscritos em uma atividade (Apenas admin/instructor)
router.get('/:id/signups', authRequired, requireRole('admin', 'instructor'), async (req, res) => {
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
    console.error('Erro ao buscar inscritos:', err);
    res.status(500).json({ message: 'Erro ao buscar inscritos' });
  }
});

export default router;
