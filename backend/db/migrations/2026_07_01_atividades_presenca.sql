-- Migration: Presenças + vínculo atividade↔curso
-- Data: 2026-07-01 (segunda leva, continuação da migration de apostilas)
-- Descrição: o instrutor precisa poder confirmar presença dos alunos nas
--            atividades práticas do curso, e essas presenças passam a contar
--            na regra "concluir todas as atividades para fazer a prova".
-- Idempotente (CREATE/ADD COLUMN IF NOT EXISTS).

-- 1. Vincular cada atividade a um curso (opcional — não compromete nada se nulo)
SET @col := (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'atividades'
    AND COLUMN_NAME = 'curso_id'
);
SET @ddl := IF(
  @col = 0,
  'ALTER TABLE atividades ADD COLUMN curso_id INT NULL AFTER tipo, ADD CONSTRAINT fk_atividades_curso FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL',
  'SELECT 1'
);
PREPARE stmt FROM @ddl;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. Tabela de presenças por atividade
CREATE TABLE IF NOT EXISTS presencas_atividade (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  atividade_id INT NOT NULL,
  presente TINYINT(1) DEFAULT 1,
  registrado_por INT NULL,
  registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_usuario_atividade (usuario_id, atividade_id),
  INDEX idx_atividade (atividade_id),
  INDEX idx_usuario (usuario_id),
  CONSTRAINT fk_pres_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_pres_atividade FOREIGN KEY (atividade_id) REFERENCES atividades(id) ON DELETE CASCADE,
  CONSTRAINT fk_pres_registrador FOREIGN KEY (registrado_por) REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
