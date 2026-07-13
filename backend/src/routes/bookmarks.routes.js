import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Listar todos os favoritos do usuário
router.get('/', authRequired, async (req, res) => {
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
    console.error('Erro ao listar favoritos:', err);
    res.status(500).json({ message: 'Erro ao carregar favoritos' });
  }
});

// Adicionar lição aos favoritos
router.post('/:lessonId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;

  try {
    const db = await getDb();
    await db.query('INSERT IGNORE INTO favoritos_usuario (usuario_id, aula_id) VALUES (?, ?)', [userId, lessonId]);
    res.json({ success: true, message: 'Adicionado aos favoritos' });
  } catch (err) {
    console.error('Erro ao favoritar aula:', err);
    res.status(500).json({ message: 'Erro ao favoritar' });
  }
});

// Remover lição dos favoritos
router.delete('/:lessonId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;

  try {
    const db = await getDb();
    await db.query('DELETE FROM favoritos_usuario WHERE usuario_id = ? AND aula_id = ?', [userId, lessonId]);
    res.json({ success: true, message: 'Removido dos favoritos' });
  } catch (err) {
    console.error('Erro ao remover favorito:', err);
    res.status(500).json({ message: 'Erro ao remover dos favoritos' });
  }
});

export default router;
