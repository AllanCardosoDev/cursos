import express from 'express';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Listar todas as notificações e se foram lidas pelo usuário logado
router.get('/', authRequired, async (req, res) => {
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
    console.error('Erro ao listar notificações:', err);
    res.status(500).json({ message: 'Erro ao carregar notificações' });
  }
});

// Marcar notificação como lida
router.put('/:id/read', authRequired, async (req, res) => {
  const userId = req.user.id;
  const notificationId = req.params.id;

  try {
    const db = await getDb();
    await db.query(`
      INSERT INTO notificacoes_usuario (usuario_id, notificacao_id, lido, lido_em)
      VALUES (?, ?, TRUE, CURRENT_TIMESTAMP)
      ON DUPLICATE KEY UPDATE lido = TRUE, lido_em = CURRENT_TIMESTAMP
    `, [userId, notificationId]);

    res.json({ success: true, message: 'Notificação marcada como lida' });
  } catch (err) {
    console.error('Erro ao ler notificação:', err);
    res.status(500).json({ message: 'Erro ao atualizar status da notificação' });
  }
});

export default router;
