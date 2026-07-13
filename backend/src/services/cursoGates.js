// Regras de liberação do curso para a Avaliação Final.
// Centraliza dois gates distintos:
//   1) podeFazerProva  — aluno cumpriu TODAS as atividades didáticas
//                        do curso (apostilas viradas + presenças em
//                        atividades práticas vinculadas ao curso)?
//   2) podeTentarProva — aluno ainda tem tentativas disponíveis?
//                        (regra fechada com o usuário: 2 tentativas)
// As funções podem ser usadas juntas: só faz a prova se ambos retornarem OK.

import { getDb } from '../../db/database.js';

// Limite de tentativas da prova final por aluno/curso.
export const MAX_TENTATIVAS_PROVA = 2;

/**
 * Busca a aula de prova final do curso (a única aula com eh_prova_final=1).
 * Retorna {id, curso_id} ou null.
 */
async function getAulaProva(cursoId) {
  const db = await getDb();
  const [rows] = await db.query(
    `SELECT a.id, a.titulo
     FROM aulas a
     JOIN modulos m ON a.modulo_id = m.id
     WHERE m.curso_id = ? AND a.eh_prova_final = 1
     LIMIT 1`,
    [cursoId]
  );
  return rows[0] || null;
}

/**
 * podeFazerProva
 * Decide se o aluno tem direito a fazer a Avaliação Final (regra de conteúdo).
 *
 * Regra (fechada com o usuário, 2026-07-01):
 *   - TODAS as apostilas do curso (aulas com pdf_url) devem estar viradas
 *     até a última página pelo aluno (progresso_aula_pdf.concluido = 1).
 *   - TODAS as atividades práticas VINCULADAS ao curso (atividades.curso_id)
 *     devem ter presença confirmada para o aluno (presencas_atividade).
 *   - Se o curso não tiver apostilas nem atividades vinculadas, libera
 *     direto (cursos sem conteúdo extra não travam).
 *
 * @returns {Promise<{
 *   liberado:boolean,
 *   apostilas: {total:number, lidas:number, faltam:Array<{aula_id:number,titulo:string}>},
 *   atividades: {total:number, presentes:number, faltam:Array<{atividade_id:number,titulo:string}>}
 * }>}
 */
export async function podeFazerProva(userId, courseId) {
  const db = await getDb();

  // Apostilas
  const [apostRows] = await db.query(
    `SELECT
       SUM(CASE WHEN a.pdf_url IS NOT NULL AND a.pdf_url <> '' THEN 1 ELSE 0 END) AS total,
       SUM(CASE WHEN a.pdf_url IS NOT NULL AND a.pdf_url <> '' AND pap.concluido = 1 THEN 1 ELSE 0 END) AS lidas
     FROM aulas a
     JOIN modulos m ON a.modulo_id = m.id
     LEFT JOIN progresso_aula_pdf pap
       ON pap.aula_id = a.id AND pap.usuario_id = ?
     WHERE m.curso_id = ? AND a.eh_prova_final = 0`,
    [userId, courseId]
  );
  const totalApost = Number(apostRows[0]?.total ?? 0);
  const lidasApost = Number(apostRows[0]?.lidas ?? 0);

  let apostilasFaltam = [];
  if (lidasApost < totalApost) {
    const [pending] = await db.query(
      `SELECT a.id AS aula_id, a.titulo
       FROM aulas a
       JOIN modulos m ON a.modulo_id = m.id
       LEFT JOIN progresso_aula_pdf pap
         ON pap.aula_id = a.id AND pap.usuario_id = ?
       WHERE m.curso_id = ?
         AND a.eh_prova_final = 0
         AND a.pdf_url IS NOT NULL AND a.pdf_url <> ''
         AND (pap.concluido IS NULL OR pap.concluido = 0)
       ORDER BY m.ordem ASC, a.ordem ASC`,
      [userId, courseId]
    );
    apostilasFaltam = pending.map((p) => ({ aula_id: p.aula_id, titulo: p.titulo }));
  }

  // Atividades práticas do curso
  const [ativRows] = await db.query(
    `SELECT
       SUM(CASE WHEN atv.curso_id IS NOT NULL THEN 1 ELSE 0 END) AS total,
       SUM(CASE WHEN atv.curso_id IS NOT NULL AND p.presente = 1 THEN 1 ELSE 0 END) AS presentes
     FROM atividades atv
     LEFT JOIN presencas_atividade p
       ON p.atividade_id = atv.id AND p.usuario_id = ?`,
    [userId]
  );
  const totalAtiv = Number(ativRows[0]?.total ?? 0);
  const presAtiv = Number(ativRows[0]?.presentes ?? 0);

  // ATENÇÃO: a contagem acima considera TODAS as atividades com curso_id.
  // Para o gate correto, queremos só as do curso atual:
  let totalAtivCurso = 0;
  let presAtivCurso = 0;
  let atividadesFaltam = [];
  if (totalAtiv > 0) {
    const [cursoRows] = await db.query(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN p.presente = 1 THEN 1 ELSE 0 END) AS presentes
       FROM atividades atv
       LEFT JOIN presencas_atividade p
         ON p.atividade_id = atv.id AND p.usuario_id = ?
       WHERE atv.curso_id = ?`,
      [userId, courseId]
    );
    totalAtivCurso = Number(cursoRows[0]?.total ?? 0);
    presAtivCurso = Number(cursoRows[0]?.presentes ?? 0);

    if (presAtivCurso < totalAtivCurso) {
      const [pending] = await db.query(
        `SELECT atv.id AS atividade_id, atv.titulo
         FROM atividades atv
         LEFT JOIN presencas_atividade p
           ON p.atividade_id = atv.id AND p.usuario_id = ?
         WHERE atv.curso_id = ?
           AND (p.presente IS NULL OR p.presente = 0)`,
        [userId, courseId]
      );
      atividadesFaltam = pending.map((p) => ({ atividade_id: p.atividade_id, titulo: p.titulo }));
    }
  }

  const liberado = lidasApost >= totalApost && presAtivCurso >= totalAtivCurso &&
                   (totalApost + totalAtivCurso) > 0 || // exige ter algo pra concluir
                   (totalApost === 0 && totalAtivCurso === 0); // sem conteúdo → libera

  return {
    liberado,
    apostilas: { total: totalApost, lidas: lidasApost, faltam: apostilasFaltam },
    atividades: { total: totalAtivCurso, presentes: presAtivCurso, faltam: atividadesFaltam },
  };
}

/**
 * podeTentarProva
 * Decide se o aluno ainda tem tentativas disponíveis (regra de 2 tentativas).
 * Conta tentativas_avaliacao (qualquer nota, inclusive reprovações).
 *
 * @returns {Promise<{
 *   liberado:boolean,
 *   usadas:number,
 *   maximo:number,
 *   reprovacoes:number
 * }>}
 */
export async function podeTentarProva(userId, courseId) {
  const aulaProva = await getAulaProva(courseId);
  if (!aulaProva) {
    return { liberado: false, usadas: 0, maximo: MAX_TENTATIVAS_PROVA, reprovacoes: 0, motivo: 'prova_nao_cadastrada' };
  }
  const db = await getDb();
  const [rows] = await db.query(
    `SELECT COUNT(*) AS total,
            SUM(CASE WHEN aprovado = 0 THEN 1 ELSE 0 END) AS reprovacoes
     FROM tentativas_avaliacao
     WHERE usuario_id = ? AND aula_id = ?`,
    [userId, aulaProva.id]
  );
  const usadas = Number(rows[0]?.total ?? 0);
  const reprovacoes = Number(rows[0]?.reprovacoes ?? 0);

  if (usadas >= MAX_TENTATIVAS_PROVA) {
    return { liberado: false, usadas, maximo: MAX_TENTATIVAS_PROVA, reprovacoes, motivo: 'tentativas_esgotadas' };
  }
  return { liberado: true, usadas, maximo: MAX_TENTATIVAS_PROVA, reprovacoes };
}

/**
 * Helper combinado para a rota de submissão da prova.
 * Retorna o motivo do bloqueio (se houver) e o detalhamento.
 */
export async function gateCompleto(userId, courseId) {
  const conteudo = await podeFazerProva(userId, courseId);
  const tentativas = await podeTentarProva(userId, courseId);
  return {
    conteudo,
    tentativas,
    liberado: conteudo.liberado && tentativas.liberado,
    motivo: !conteudo.liberado
      ? 'atividades_pendentes'
      : !tentativas.liberado
        ? tentativas.motivo
        : null,
  };
}
