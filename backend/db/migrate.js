// Runner de migrations SQL do projeto.
// Lê arquivos em backend/db/migrations/ em ordem lexicográfica,
// aplica os que ainda não rodaram (idempotente) e registra em schema_migrations.
//
// Uso:  node backend/db/migrate.js
//
// Importante: este runner NÃO deve ser confundido com db/init.js,
// que faz DROP TABLE e serve apenas para reset local/dev.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { getDb } from './database.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(currentDir, 'migrations');

function splitStatements(sql) {
  // Quebra por `;` no fim de linha, ignorando linhas em branco e comentários `--`.
  // Não cobre procedures complexas, mas as migrations deste projeto são simples.
  const cleaned = sql
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n');
  return cleaned
    .split(/;\s*\n|;\s*$/gm)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

async function ensureMigrationsTable(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function getApplied(db) {
  const [rows] = await db.query('SELECT name FROM schema_migrations');
  return new Set(rows.map((r) => r.name));
}

async function run() {
  if (!fs.existsSync(migrationsDir)) {
    console.error(`Diretório de migrations não encontrado: ${migrationsDir}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('Nenhuma migration encontrada.');
    return;
  }

  const db = await getDb();
  await ensureMigrationsTable(db);
  const applied = await getApplied(db);

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`✓ ${file} (já aplicada)`);
      continue;
    }

    console.log(`→ aplicando ${file} ...`);
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, 'utf-8');
    const statements = splitStatements(sql);

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      for (const stmt of statements) {
        await conn.query(stmt);
      }
      await conn.query('INSERT INTO schema_migrations (name) VALUES (?)', [file]);
      await conn.commit();
      console.log(`✓ ${file} aplicada.`);
      count += 1;
    } catch (err) {
      await conn.rollback();
      console.error(`✗ Falha ao aplicar ${file}:`, err.message);
      process.exitCode = 1;
      return;
    } finally {
      conn.release();
    }
  }

  if (count === 0) {
    console.log('Banco já está atualizado.');
  } else {
    console.log(`${count} migration(s) aplicada(s).`);
  }
}

run().catch((err) => {
  console.error('Erro no runner de migrations:', err);
  process.exit(1);
});
