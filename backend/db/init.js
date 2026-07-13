import { getDb } from './database.js';
import bcrypt from 'bcryptjs';

async function initDb() {
  const db = await getDb();
  console.log("Limpando tabelas antigas para migração...");
  
  const tables = [
    'progresso_curso_pdf',
    'nps_curso',
    'notificacoes_usuario',
    'notificacoes',
    'inscricoes_atividade',
    'atividades',
    'comentarios_aula',
    'favoritos_usuario',
    'anotacoes_usuario',
    'tentativas_avaliacao',
    'progresso_usuario',
    'questoes',
    'aulas',
    'modulos',
    'cursos',
    'usuarios'
  ];
  
  for (const table of tables) {
    await db.query(`DROP TABLE IF EXISTS ${table}`);
  }
  
  console.log("Criando tabelas em Português-BR...");

  // 1. Criar tabela de usuários
  await db.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      cpf VARCHAR(20) UNIQUE,
      senha_hash VARCHAR(255),
      cargo ENUM('student', 'instructor', 'admin') DEFAULT 'student',
      status ENUM('ACTIVE', 'PENDING', 'BLOCKED') DEFAULT 'ACTIVE',
      xp INT DEFAULT 0,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Criar tabela de cursos
  await db.query(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      categoria VARCHAR(100) NOT NULL,
      categoria_nome VARCHAR(100) NOT NULL,
      categoria_classe VARCHAR(100) NOT NULL,
      nivel VARCHAR(50) NOT NULL,
      nivel_texto VARCHAR(100) NOT NULL,
      descricao TEXT NOT NULL,
      instrutor VARCHAR(255) NOT NULL,
      duracao INT NOT NULL,
      apenas_pdf_texto BOOLEAN DEFAULT FALSE,
      pdf_url VARCHAR(500) DEFAULT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Criar tabela de módulos
  await db.query(`
    CREATE TABLE IF NOT EXISTS modulos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      curso_id INT NOT NULL,
      titulo VARCHAR(255) NOT NULL,
      ordem INT DEFAULT 0,
      FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
    );
  `);

  // 4. Criar tabela de aulas (lições)
  await db.query(`
    CREATE TABLE IF NOT EXISTS aulas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      modulo_id INT NOT NULL,
      titulo VARCHAR(255) NOT NULL,
      duracao VARCHAR(50) NOT NULL,
      texto TEXT NOT NULL,
      pdf_url VARCHAR(500),
      eh_prova_final BOOLEAN DEFAULT FALSE,
      ordem INT DEFAULT 0,
      FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
    );
  `);

  // 5. Criar tabela de questões (quizzes)
  await db.query(`
    CREATE TABLE IF NOT EXISTS questoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      aula_id INT NOT NULL,
      enunciado TEXT NOT NULL,
      alternativas JSON NOT NULL,
      alternativa_correta INT NOT NULL,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  // 6. Criar tabela de progresso do usuário
  await db.query(`
    CREATE TABLE IF NOT EXISTS progresso_usuario (
      usuario_id INT NOT NULL,
      aula_id INT NOT NULL,
      concluido BOOLEAN DEFAULT TRUE,
      concluido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, aula_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  // 7. Criar tabela de tentativas de quiz / notas de provas
  await db.query(`
    CREATE TABLE IF NOT EXISTS tentativas_avaliacao (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      aula_id INT NOT NULL,
      nota DECIMAL(5,2) NOT NULL,
      aprovado BOOLEAN NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  // 8. Criar tabela de anotações de aula
  await db.query(`
    CREATE TABLE IF NOT EXISTS anotacoes_usuario (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      aula_id INT NOT NULL,
      texto_anotacao TEXT NOT NULL,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_usuario_aula (usuario_id, aula_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  // 9. Criar tabela de favoritos (bookmarks)
  await db.query(`
    CREATE TABLE IF NOT EXISTS favoritos_usuario (
      usuario_id INT NOT NULL,
      aula_id INT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, aula_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
    );
  `);

  // 10. Criar tabela de comentários/fórum
  await db.query(`
    CREATE TABLE IF NOT EXISTS comentarios_aula (
      id INT AUTO_INCREMENT PRIMARY KEY,
      aula_id INT NOT NULL,
      usuario_id INT NOT NULL,
      texto_comentario TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );
  `);

  // 11. Criar tabela de atividades práticas
  await db.query(`
    CREATE TABLE IF NOT EXISTS atividades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      data DATE NOT NULL,
      hora TIME NOT NULL,
      local VARCHAR(255) NOT NULL,
      instrutor VARCHAR(255) NOT NULL,
      tipo VARCHAR(50) NOT NULL,
      vagas INT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 12. Criar tabela de inscrições em atividades
  await db.query(`
    CREATE TABLE IF NOT EXISTS inscricoes_atividade (
      atividade_id INT NOT NULL,
      usuario_id INT NOT NULL,
      inscrito_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (atividade_id, usuario_id),
      FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );
  `);

  // 13. Criar tabela de notificações do sistema
  await db.query(`
    CREATE TABLE IF NOT EXISTS notificacoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      mensagem TEXT NOT NULL,
      tipo VARCHAR(50) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 14. Criar tabela de notificações por usuário
  await db.query(`
    CREATE TABLE IF NOT EXISTS notificacoes_usuario (
      usuario_id INT NOT NULL,
      notificacao_id INT NOT NULL,
      lido BOOLEAN DEFAULT FALSE,
      lido_em TIMESTAMP NULL,
      PRIMARY KEY (usuario_id, notificacao_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (notificacao_id) REFERENCES notificacoes(id) ON DELETE CASCADE
    );
  `);

  // 15. Criar tabela de NPS por curso
  await db.query(`
    CREATE TABLE IF NOT EXISTS nps_curso (
      usuario_id INT NOT NULL,
      curso_id INT NOT NULL,
      nota INT NOT NULL,
      comentario TEXT,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, curso_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
    );
  `);

  // 16. Criar tabela de progresso de leitura do PDF do curso
  await db.query(`
    CREATE TABLE IF NOT EXISTS progresso_curso_pdf (
      usuario_id INT NOT NULL,
      curso_id INT NOT NULL,
      pagina_atual INT DEFAULT 1,
      total_paginas INT DEFAULT 1,
      progresso_porcentagem INT DEFAULT 0,
      concluido BOOLEAN DEFAULT FALSE,
      atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (usuario_id, curso_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
    );
  `);

  console.log("Todas as tabelas verificadas/criadas com sucesso.");

  // Seeder opcional de usuários padrões se o banco estiver vazio
  const [usuariosCount] = await db.query('SELECT COUNT(*) AS total FROM usuarios');
  if (usuariosCount[0].total === 0) {
    console.log("Banco de usuários vazio. Rodando seed inicial de usuários...");
    await seedUsuarios(db);
  }

  // Seeder opcional de cursos padrões se o banco estiver vazio
  const [cursosCount] = await db.query('SELECT COUNT(*) AS total FROM cursos');
  if (cursosCount[0].total === 0) {
    console.log("Banco de cursos vazio. Rodando seed inicial de cursos...");
    await seedCursos(db);
  }

  // Seeder de atividades
  const [atividadesCount] = await db.query('SELECT COUNT(*) AS total FROM atividades');
  if (atividadesCount[0].total === 0) {
    console.log("Banco de atividades vazio. Rodando seed inicial...");
    await seedAtividades(db);
  }

  // Seeder de notificações
  const [notificacoesCount] = await db.query('SELECT COUNT(*) AS total FROM notificacoes');
  if (notificacoesCount[0].total === 0) {
    console.log("Banco de notificações vazio. Rodando seed inicial...");
    await seedNotificacoes(db);
  }

  process.exit(0);
}

async function seedUsuarios(db) {
  const hashSenha = await bcrypt.hash('123456', 10);
  
  // Inserir Aluno
  await db.query(`
    INSERT INTO usuarios (nome, email, cpf, senha_hash, cargo, status, xp)
    VALUES ('João Victor da Silva Oliveira', 'aluno@cbm.am.gov.br', '000.000.000-01', ?, 'student', 'ACTIVE', 2480)
  `, [hashSenha]);

  // Inserir Admin
  await db.query(`
    INSERT INTO usuarios (nome, email, cpf, senha_hash, cargo, status, xp)
    VALUES ('Maj. BM João Silva', 'admin@cbm.am.gov.br', '000.000.000-02', ?, 'admin', 'ACTIVE', 8920)
  `, [hashSenha]);

  // Inserir Instrutor
  await db.query(`
    INSERT INTO usuarios (nome, email, cpf, senha_hash, cargo, status, xp)
    VALUES ('Cap. QOBM Roberto Mendes', 'instrutor@cbm.am.gov.br', '000.000.000-03', ?, 'instructor', 'ACTIVE', 5000)
  `, [hashSenha]);

  console.log("Seed de usuários completado. Usuário aluno@cbm.am.gov.br / admin@cbm.am.gov.br / instrutor@cbm.am.gov.br senha:123456");
}

async function seedCursos(db) {
  // Curso 1: Combate a Incêndio
  const [courseResult1] = await db.query(`
    INSERT INTO cursos (titulo, categoria, categoria_nome, categoria_classe, nivel, nivel_texto, descricao, instrutor, duracao)
    VALUES (
      'Combate a Incêndio', 'hazmat', 'HAZMAT & Incêndio', 'cat-hazmat', 'Básico', 'Recruta → Cabo',
      'Doutrina de combate a incêndios estruturais e florestais. Princípios da combustão, táticas ofensivas e uso de agentes extintores.',
      'Cap. QOBM Roberto Mendes', 40
    )
  `);
  const courseId1 = courseResult1.insertId;

  // Módulo 1 do Curso 1
  const [moduleResult1_1] = await db.query(`
    INSERT INTO modulos (curso_id, titulo, ordem) VALUES (?, 'Introdução ao Combate a Incêndio', 1)
  `, [courseId1]);
  const moduleId1_1 = moduleResult1_1.insertId;

  // Lições do Módulo 1
  await db.query(`
    INSERT INTO aulas (modulo_id, titulo, duracao, texto, eh_prova_final, ordem)
    VALUES (?, 'Apresentação do Curso', '15min', 'Apresentação do curso de combate a incêndio básico do CBMAM. Diretrizes gerais e metodologias.', FALSE, 1)
  `, [moduleId1_1]);

  await db.query(`
    INSERT INTO aulas (modulo_id, titulo, duracao, texto, eh_prova_final, ordem)
    VALUES (?, 'Princípios do Fogo e Comportamento do Incêndio', '30min', 'O triângulo do fogo é composto por combustível, comburente (geralmente oxigênio) e calor. A quebra de um elemento causa a extinção imediata. Os métodos fundamentais são: resfriamento (redução da temperatura por água), abafamento (supressão do oxigênio) e isolamento (retirada de combustíveis). Os incêndios de classe A envolvem sólidos comuns como papel e madeira. Classe B são combustíveis líquidos e gases. Classe C envolve equipamentos elétricos e eletrônicos energizados.', FALSE, 2)
  `, [moduleId1_1]);

  // Módulo 2 do Curso 1
  const [moduleResult1_2] = await db.query(`
    INSERT INTO modulos (curso_id, titulo, ordem) VALUES (?, 'Táticas de Combate e Resgate', 2)
  `, [courseId1]);
  const moduleId1_2 = moduleResult1_2.insertId;

  await db.query(`
    INSERT INTO aulas (modulo_id, titulo, duracao, texto, eh_prova_final, ordem)
    VALUES (?, 'Combate Ofensivo e Defensivo', '20min', 'Métodos diretos e indiretos de aplicação de água. Ventilação tática hidráulica e mecânica.', FALSE, 1)
  `, [moduleId1_2]);

  // Módulo 3 do Curso 1 (Exame)
  const [moduleResult1_3] = await db.query(`
    INSERT INTO modulos (curso_id, titulo, ordem) VALUES (?, 'Homologação e Exame Final', 3)
  `, [courseId1]);
  const moduleId1_3 = moduleResult1_3.insertId;

  const [examResult1] = await db.query(`
    INSERT INTO aulas (modulo_id, titulo, duracao, texto, eh_prova_final, ordem)
    VALUES (?, 'Avaliação Final do Curso', '30min', 'Responda as questões da avaliação teórica oficial com aproveitamento mínimo de 60%.', TRUE, 1)
  `, [moduleId1_3]);
  const examId1 = examResult1.insertId;

  // Perguntas do Exame 1
  await db.query(`
    INSERT INTO questoes (aula_id, enunciado, alternativas, alternativa_correta)
    VALUES (
      ?, 'Qual é o método de extinção que remove o comburente do triângulo do fogo?',
      '["Resfriamento", "Abafamento", "Isolamento", "Reação em cadeia"]', 1
    )
  `, [examId1]);

  await db.query(`
    INSERT INTO questoes (aula_id, enunciado, alternativas, alternativa_correta)
    VALUES (
      ?, 'Quais são os três componentes fundamentais do Triângulo do Fogo?',
      '["Combustível, cinzas e fumaça", "Combustível, comburente e calor", "Comburente, calor e fagulhas", "Oxigênio, chama e água"]', 1
    )
  `, [examId1]);

  console.log("Seed de cursos completado.");
}

async function seedAtividades(db) {
  const activities = [
    ['Salvamento Aquático - Rio Negro', '2026-06-24', '08:00:00', 'Manaus - Praia da Ponta Negra', 'Cap. QOBM Marcos Lima', 'aquatico', 30],
    ['Simulado de Evacuação em Escola', '2026-06-28', '14:00:00', 'Escola Estadual Amazonas', 'Maj. QOBM João Silva', 'evacuacao', 20],
    ['Combate a Incêndio Florestal', '2026-07-02', '07:00:00', 'BR-319 Km 45', 'Cap. QOBM Roberto Mendes', 'florestal', 40],
    ['Rapel Tático - Torre de Treinamento', '2026-07-08', '09:00:00', 'Quartel do CBMAM', 'Cap. QOBM André Oliveira', 'altura', 15],
    ['APH - Triagem START', '2026-07-12', '10:00:00', 'Hospital 28 de Agosto', 'Ten. QOSM Carla Santos', 'medico', 25]
  ];

  for (const act of activities) {
    await db.query(`
      INSERT INTO atividades (titulo, data, hora, local, instrutor, tipo, vagas)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, act);
  }
  console.log("Seed de atividades completado.");
}

async function seedNotificacoes(db) {
  const notifications = [
    ['Nova diretriz de Salvamento em Altura', 'As inscrições para a etapa prática presencial do curso encerram no próximo dia 30/06.', 'alert'],
    ['Atualização das POPs 2026', 'Os novos Manuais de Procedimentos Operacionais Padrão foram adicionados ao módulo 1 do curso de Combate a Incêndio.', 'info']
  ];

  for (const notif of notifications) {
    await db.query(`
      INSERT INTO notificacoes (titulo, mensagem, tipo)
      VALUES (?, ?, ?)
    `, notif);
  }
  console.log("Seed de notificações completado.");
}

initDb().catch(err => {
  console.error("Erro ao inicializar o banco:", err);
  process.exit(1);
});
