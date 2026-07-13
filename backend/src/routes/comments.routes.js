import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Listar comentários de uma aula
router.get('/:lessonId', authRequired, async (req, res) => {
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
    console.error('Erro ao buscar comentários:', err);
    res.status(500).json({ message: 'Erro ao carregar comentários' });
  }
});

// Enviar comentário em uma aula
router.post('/:lessonId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  const { comment_text } = req.body;

  if (!comment_text || comment_text.trim() === '') {
    return res.status(400).json({ message: 'O conteúdo do comentário não pode estar vazio' });
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
    console.error('Erro ao enviar comentário:', err);
    res.status(500).json({ message: 'Erro ao publicar comentário' });
  }
});

export default router;
