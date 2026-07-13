import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Enviar avaliação NPS para um curso
router.post('/:courseId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;
  const { score, comment } = req.body;

  if (score === undefined || typeof score !== 'number' || score < 0 || score > 10) {
    return res.status(400).json({ message: 'Nota do NPS deve ser um número entre 0 e 10' });
  }

  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO nps_curso (usuario_id, curso_id, nota, comentario)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE nota = VALUES(nota), comentario = VALUES(comentario), criado_em = CURRENT_TIMESTAMP
    `, [userId, courseId, score, comment || '']);

    res.json({ success: true, message: 'NPS registrado com sucesso' });
  } catch (err) {
    console.error('Erro ao registrar NPS:', err);
    res.status(500).json({ message: 'Erro ao salvar avaliação NPS' });
  }
});

export default router;
