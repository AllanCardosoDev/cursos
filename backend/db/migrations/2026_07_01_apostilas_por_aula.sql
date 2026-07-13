-- Migration: Apostilas por aula
-- Data: 2026-07-01
-- Descrição: registra progresso de leitura do PDF POR AULA (não por curso),
--            para viabilizar o "catálogo de apostilas" do aluno e a trava da prova final.
-- Idempotente (CREATE/ADD COLUMN IF NOT EXISTS).

-- 1. Tabela de progresso da apostila (uma linha por par usuário/aula)
CREATE TABLE IF NOT EXISTS progresso_aula_pdf (
  usuario_id INT NOT NULL,
  aula_id INT NOT NULL,
  pagina_atual INT DEFAULT 1,
  total_paginas INT DEFAULT 1,
  progresso_porcentagem INT DEFAULT 0,
  concluido TINYINT(1) DEFAULT 0,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, aula_id),
  INDEX idx_aula (aula_id),
  CONSTRAINT fk_pap_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_pap_aula FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Auditoria: quem criou cada aula (instrutor ou admin)
--    Adicionada em IF NOT EXISTS para reaplicações seguras.
SET @col_exists := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'aulas'
    AND COLUMN_NAME = 'criado_por'
);
SET @ddl := IF(
  @col_exists = 0,
  'ALTER TABLE aulas ADD COLUMN criado_por INT NULL AFTER ordem, ADD CONSTRAINT fk_aulas_criado_por FOREIGN KEY (criado_por) REFERENCES usuarios(id) ON DELETE SET NULL',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
