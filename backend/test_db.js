import { getDb } from './db/database.js';

async function test() {
  console.log("Iniciando teste de conexão...");
  try {
    const db = await getDb();
    console.log("Obtendo conexão do pool...");
    const [rows] = await db.query("SELECT 1+1 AS result");
    console.log("Sucesso! Resultado:", rows[0].result);
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
  }
  process.exit(0);
}

test();
