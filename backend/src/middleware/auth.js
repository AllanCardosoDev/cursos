import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Fail-fast: o segredo JWT NUNCA pode ter fallback fraco em produção.
// Em dev, ainda assim exigimos pelo menos 32 caracteres para evitar
// tokens quebrados.
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET ausente/inválido. Defina JWT_SECRET com pelo menos 32 caracteres no .env antes de subir o backend.'
  );
}

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

export function requireRole(...cargos) {
  return (req, res, next) => {
    if (!req.user || !cargos.includes(req.user.cargo)) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }
    next();
  };
}
