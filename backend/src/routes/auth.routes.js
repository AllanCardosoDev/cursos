import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'cursos-secret-key';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  try {
    const db = await getDb();
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    const valid = await bcrypt.compare(password, user.senha_hash);
    if (!valid) {
      return res.status(401).json({ message: 'E-mail ou senha inválidos' });
    }

    if (user.status !== 'ACTIVE') {
      return res.status(403).json({ message: 'Usuário bloqueado ou pendente' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, cargo: user.cargo },
      JWT_SECRET,
      { expiresIn: '8h' }
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
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  try {
    const db = await getDb();
    
    const [existing] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    
    await db.query(
      `INSERT INTO usuarios (nome, email, senha_hash, cargo, status) VALUES (?, ?, ?, 'student', 'ACTIVE')`,
      [name, email, hash]
    );

    res.status(201).json({ message: 'Cadastro realizado com sucesso' });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});

router.get('/me', authRequired, async (req, res) => {
  try {
    const db = await getDb();
    const [rows] = await db.query(
      'SELECT id, nome, email, cargo, status, criado_em FROM usuarios WHERE id = ?',
      [req.user.id]
    );
    
    if (rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Erro em /me:', err);
    res.status(500).json({ message: 'Erro interno' });
  }
});

export default router;
