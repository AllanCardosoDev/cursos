import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Obter anotação de uma aula
router.get('/:lessonId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;

  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT texto_anotacao FROM anotacoes_usuario WHERE usuario_id = ? AND aula_id = ?', [userId, lessonId]);
    
    if (rows.length === 0) {
      return res.json({ note_text: '' });
    }
    res.json({ note_text: rows[0].texto_anotacao });
  } catch (err) {
    console.error('Erro ao buscar anotação:', err);
    res.status(500).json({ message: 'Erro ao carregar anotação' });
  }
});

// Salvar/Atualizar anotação de uma aula
router.post('/:lessonId', authRequired, async (req, res) => {
  const userId = req.user.id;
  const lessonId = req.params.lessonId;
  const { note_text } = req.body;

  if (note_text === undefined) {
    return res.status(400).json({ message: 'Texto da anotação não fornecido' });
  }

  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO anotacoes_usuario (usuario_id, aula_id, texto_anotacao)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE texto_anotacao = VALUES(texto_anotacao)
    `, [userId, lessonId, note_text]);

    res.json({ success: true, message: 'Anotação salva com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar anotação:', err);
    res.status(500).json({ message: 'Erro ao salvar anotação' });
  }
});

export default router;
