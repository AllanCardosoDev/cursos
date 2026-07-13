import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Obter ranking de XP
router.get('/ranking', authRequired, async (req, res) => {
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
    console.error('Erro ao buscar ranking:', err);
    res.status(500).json({ message: 'Erro ao carregar o ranking' });
  }
});

// Obter perfil consolidado com estatísticas
router.get('/me/profile', authRequired, async (req, res) => {
  const userId = req.user.id;

  try {
    const db = await getDb();
    
    // Obter dados básicos do usuário
    const [userRows] = await db.query('SELECT id, nome, email, cargo, status, xp, criado_em FROM usuarios WHERE id = ?', [userId]);
    const user = userRows[0];
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Aulas concluídas
    const [progressRows] = await db.query('SELECT COUNT(*) AS total FROM progresso_usuario WHERE usuario_id = ? AND concluido = TRUE', [userId]);
    const completedLessons = progressRows[0].total;

    // Estatísticas de Quiz
    const [quizRows] = await db.query(`
      SELECT COUNT(*) AS total, AVG(nota) AS averageScore, MAX(nota) AS maxScore 
      FROM tentativas_avaliacao 
      WHERE usuario_id = ?
    `, [userId]);
    
    const totalQuizzes = quizRows[0].total || 0;
    const avgScore = quizRows[0].averageScore ? parseFloat(quizRows[0].averageScore).toFixed(1) : "0.0";
    const maxScore = quizRows[0].maxScore ? parseFloat(quizRows[0].maxScore).toFixed(1) : "0.0";

    // Contadores de anotações e favoritos
    const [notesRows] = await db.query('SELECT COUNT(*) AS total FROM anotacoes_usuario WHERE usuario_id = ?', [userId]);
    const [bookmarksRows] = await db.query('SELECT COUNT(*) AS total FROM favoritos_usuario WHERE usuario_id = ?', [userId]);
    const [commentsRows] = await db.query('SELECT COUNT(*) AS total FROM comentarios_aula WHERE usuario_id = ?', [userId]);

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
    console.error('Erro ao obter perfil:', err);
    res.status(500).json({ message: 'Erro ao carregar o perfil' });
  }
});

// Adicionar XP
router.post('/xp', authRequired, async (req, res) => {
  const userId = req.user.id;
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Quantidade de XP inválida' });
  }

  try {
    const db = await getDb();
    await db.query('UPDATE usuarios SET xp = xp + ? WHERE id = ?', [amount, userId]);
    const [rows] = await db.query('SELECT xp FROM usuarios WHERE id = ?', [userId]);
    
    res.json({ success: true, xp: rows[0].xp });
  } catch (err) {
    console.error('Erro ao adicionar XP:', err);
    res.status(500).json({ message: 'Erro ao atualizar XP' });
  }
});

export default router;
