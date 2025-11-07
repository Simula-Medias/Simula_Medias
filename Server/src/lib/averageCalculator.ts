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

function _calculateGAAverage(grades: GradesMap): AverageResult {
  
  // IDs para as 2 provas (P1, P2)
  const P1_ID = 'ga_P1';
  const P2_ID = 'ga_P2';

  // IDs para os 2 testes (T1, T2)
  const TESTE_IDS = ['ga_T1', 'ga_T2'];

  // IDs para as 3 atividades (atv1, atv2, atv3)
  const ATV_IDS = ['ga_atv1', 'ga_atv2', 'ga_atv3'];

  // ---!!! FIM DA ÁREA DE AJUSTE !!!---

  // --- Helpers Locais ---
  
  // Helper para buscar uma nota. Se não existir, retorna 0.
  // Isso implementa a estratégia de "nota zero" para itens faltantes.
  const getZ = (id: string) => (typeof grades[id] === "number" ? (grades[id] as number) : 0);

  // Helper para calcular a média de uma lista de IDs (ex: (T1+T2)/2)
  // Trata notas ausentes como 0 e divide pelo número total de IDs.
  const getAverageZ = (ids: string[]): number => {
    if (!ids || ids.length === 0) {
      return 0;
    }
    const sum = ids.reduce((acc, id) => acc + getZ(id), 0);
    return sum / ids.length;
  };
  
  // --- Cálculo da Média ---

  // Pega as notas das provas
  const p1 = getZ(P1_ID); // 0,4 * P1
  const p2 = getZ(P2_ID); // 0,4 * P2

  // Calcula a média dos testes ( (T1+T2)/2 )
  const mediaTestes = getAverageZ(TESTE_IDS); // 0,15 * mediaTestes

  // Calcula a média das atividades ( (atv1+atv2+atv3)/3 )
  const mediaAtividades = getAverageZ(ATV_IDS); // 0,05 * mediaAtividades

  // Fórmula: Média=(0,4×P1)+(0,4×P2)+(0,15×((T1+T2)/2))+(0,05×((atv1+atv2+atv3)/3))
  const weightedTotal =
    (0.4 * p1) +
    (0.4 * p2) +
    (0.15 * mediaTestes) +
    (0.05 * mediaAtividades);

  // A soma dos pesos é 0.4 + 0.4 + 0.15 + 0.05 = 1.0
  const weightSum = 1.0;
  
  // A média é o total ponderado dividido pela soma dos pesos (que é 1)
  const average = weightedTotal / weightSum;

  return {
    average: average,
    weightedTotal: weightedTotal,
    weightSum: weightSum,
  };
}

/**
 * Lógica de cálculo específica para "Física I".
 * Regras:
 * 1. Média_Teórica = (0,4*P1)+(0,4*P2)+(0,2*((AtvT1+AtvT2)/2)
 * 2. Média_Prática = (0,45*((T1+T2+T3)/3))+(0,4*((AtvP1+AtvP2)/2)+(0,15*Proj)
 * 3. Média_final = raiz(Média_Teórica * Média_Prática)
 */
function _calculateFisicaIAverage(grades: GradesMap): AverageResult {

  // --- IDs Teóricos ---
  const P1_ID = 'f1_P1'; // Prova 1
  const P2_ID = 'f1_P2'; // Prova 2
  const ATV_TEORICA_IDS = ['f1_atvT1', 'f1_atvT2']; // Atividades Teóricas

  // --- IDs Práticos ---
  const TESTE_PRATICO_IDS = ['f1_T1', 'f1_T2', 'f1_T3']; // Testes Práticos (T1, T2, T3)
  const ATV_PRATICA_IDS = ['f1_atvP1', 'f1_atvP2']; // Atividades Práticas
  const PROJETO_ID = 'f1_proj'; // Projeto de Física

  // ---!!! FIM DA ÁREA DE AJUSTE !!!---

  // --- Helpers Locais ---
  const getZ = (id: string) => (typeof grades[id] === "number" ? (grades[id] as number) : 0);
  
  const getAverageZ = (ids: string[]): number => {
    if (!ids || ids.length === 0) {
      return 0;
    }
    const sum = ids.reduce((acc, id) => acc + getZ(id), 0);
    return sum / ids.length;
  };

  // --- 1. Calcular Média Teórica ---
  // Média_Teórica = (0,4*P1)+(0,4*P2)+(0,2*((AtvT1+AtvT2)/2)
  const p1 = getZ(P1_ID);
  const p2 = getZ(P2_ID);
  const mediaAtvTeorica = getAverageZ(ATV_TEORICA_IDS);
  
  const mediaTeorica = (0.4 * p1) + (0.4 * p2) + (0.2 * mediaAtvTeorica);

  // --- 2. Calcular Média Prática ---
  // Média_Prática = (0,45*((T1+T2+T3)/3))+(0,4*((AtvP1+AtvP2)/2)+(0,15*Proj)
  const mediaTestesPraticos = getAverageZ(TESTE_PRATICO_IDS);
  const mediaAtvPratica = getAverageZ(ATV_PRATICA_IDS);
  const proj = getZ(PROJETO_ID);

  const mediaPratica = (0.45 * mediaTestesPraticos) + (0.4 * mediaAtvPratica) + (0.15 * proj);

  // --- 3. Calcular Média Final ---
  // Média_final = raiz(Média_Teórica * Média_Prática)
  const baseSqrt = mediaTeorica * mediaPratica;
  // Garante que não tire raiz de número negativo (embora notas sejam >= 0)
  const mediaFinal = (baseSqrt >= 0) ? Math.sqrt(baseSqrt) : 0; 

  // Como é uma média geométrica, os valores de 'weightedTotal' e 'weightSum'
  // são simbólicos, assim como em Cálculo II.
  return {
    average: mediaFinal,
    weightedTotal: mediaFinal, // Valor simbólico
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

    case "Geometria Analítica e Álgebra Linear":
      return _calculateGAAverage(grades);

    case "Física I":
      return _calculateFisicaIAverage(grades);
    
    default:
  }
}

export default calculateDisciplineAverage;