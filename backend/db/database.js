import mysql from 'mysql2/promise';
import 'dotenv/config';

// Carrega credenciais do .env; se faltar, falha barulhenta.
// Mantemos defaults locais para dev, mas JWT_SECRET nunca tem default.
let pool;

export async function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER || 'cilomi',
      password: process.env.DB_PASSWORD || 'Hv$32q56t',
      database: process.env.DB_NAME || 'cursos',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
