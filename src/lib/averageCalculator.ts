import { EvaluationActivity } from "./gradeConfig";

/**
 * Grades map keyed by activity id. Values can be numbers (0..10), or null/undefined
 * to indicate missing grades.
 */
export type GradesMap = Record<string, number | null | undefined>;

export interface AverageResult {
  average: number;
  weightedTotal: number;
  weightSum: number;
}

/**
 * Specific calculation logic for "Cálculo II".
 * Rules:
 * 1. Média Teorica = (0.25*P1)+(0.25*P2)+(0.25*P3)+(0.15*((T1+T2+T3)/3)+(0.1*(Soma Atv Teorica))
 * 2. Média da Prática = (0.50*((PROJ1+PROJ2)/2))+(0.50*(Soma Atv Pratica))
 * 3. Média Geral = Raiz Cúbica((Média Teorica^2) * Média Prática)
 */
function _calculateCalculoIIAverage(grades: GradesMap): AverageResult {
  
  // ---!!! IMPORTANTE: AJUSTE ESTES IDs !!!---
  // Edite os nomes ('p1', 't1', etc.) para que correspondam
  // exatamente aos IDs de notas usados no seu 'grades' map para Cálculo II.
  
  // IDs para as 3 provas teóricas
  const PROVA_IDS = ['calc2_p1', 'calc2_p2', 'calc2_p3'];

  // IDs para os 3 testes teóricos
  const TESTE_IDS = ['calc2_t1', 'calc2_t2', 'calc2_t3'];

  // IDs para os 2 projetos práticos
  const PROJETO_IDS = ['calc2_proj1', 'calc2_proj2'];
  
  // IDs para as "atividades" teóricas (para a média de 0.1)
  const ATV_TEORICA_IDS = ['calc2_atvT1', 'calc2_atvT2', 'calc2_atvT3'];

  // IDs para as "atividades" práticas (para a média de 0.5)
  const ATV_PRATICA_IDS = ['calc2_atvP1', 'calc2_atvP2', 'calc2_atvP3'];

  // ---!!! FIM DA ÁREA DE AJUSTE !!!---


  // Helper para buscar uma nota. Se não existir, retorna 0.
  // Isso implementa a estratégia de "nota zero" para itens faltantes.
  const getZ = (id: string) => (typeof grades[id] === "number" ? (grades[id] as number) : 0);

  // Helper para calcular a média de uma lista de IDs (ex: (T1+T2+T3)/3)
  // Trata notas ausentes como 0 e divide pelo número total de IDs.
  const getAverageZ = (ids: string[]): number => {
    if (!ids || ids.length === 0) {
      return 0;
    }
    const sum = ids.reduce((acc, id) => acc + getZ(id), 0);
    return sum / ids.length;
  };

  // --- 1. Calcular Média Teórica ---

  // Pega as 3 notas das provas individualmente
  const p1 = getZ(PROVA_IDS[0]);
  const p2 = getZ(PROVA_IDS[1]);
  const p3 = getZ(PROVA_IDS[2]);

  // Calcula a média dos testes ( (T1+T2+T3)/3 )
  const mediaTestes = getAverageZ(TESTE_IDS);
  
  // Calcula a média das atividades teóricas
  const mediaAtvTeorica = getAverageZ(ATV_TEORICA_IDS);

  const mediaTeorica =
    (0.25 * p1) +                                           // 25% da Prova 1
    (0.25 * p2) +                                           // 25% da Prova 2
    (0.25 * p3) +                                           // 25% da Prova 3
    (0.15 * mediaTestes) +                                  // 15% da média dos Testes
    (0.1 * mediaAtvTeorica);                                // 10% da média das Atividades Teóricas

  // --- 2. Calcular Média da Prática ---

  // Calcula a média dos projetos ( (PROJ1+PROJ2)/2 )
  const mediaProjetos = getAverageZ(PROJETO_IDS);
  
  // Calcula a média das atividades práticas
  const mediaAtvPratica = getAverageZ(ATV_PRATICA_IDS);

  const mediaPratica =
    (0.50 * mediaProjetos) +
    (0.50 * mediaAtvPratica);

  // --- 3. Calcular Média Geral ---
  
  let mediaGeral = 0;
  // (Média Teórica ^ 2) * Média Prática
  const baseCubicRoot = Math.pow(mediaTeorica, 2) * mediaPratica;
  
  // Calcula a raiz cúbica
  if (baseCubicRoot !== 0) {
    mediaGeral = Math.cbrt(baseCubicRoot);
  }

  // Para esta fórmula complexa, 'weightedTotal' e 'weightSum' não se aplicam
  // da forma tradicional. O mais importante é a 'average' final.
  // Retornamos a média geral e valores simbólicos para os outros campos.
  return {
    average: mediaGeral,
    weightedTotal: mediaGeral, // Valor simbólico
    weightSum: 1,              // Valor simbólico (evita divisão por zero)
  };
}


// --- Main Dispatcher ---

/**
 * Calculates the average for a given discipline by dispatching to the correct
 * calculation function. Falls back to the standard weighted average if no
 * specific calculator is found.
 *
 * @param disciplineName The name of the discipline.
 * @param activities The list of evaluation activities for the discipline.
 * @param grades The map of grades.
 * @returns An AverageResult object.
 */
export function calculateDisciplineAverage(
  disciplineName: string,
  activities: EvaluationActivity[],
  grades: GradesMap
): AverageResult {
  switch (disciplineName) {
    case "Cálculo II": // Alterado para usar a nova função
      return _calculateCalculoIIAverage(grades);

    default:
  }
}

export default calculateDisciplineAverage;