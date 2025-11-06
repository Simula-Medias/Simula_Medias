export interface EvaluationActivity {
  id: string;
  name: string;
}

export const evaluationActivities: EvaluationActivity[] = [
  { id: "eva1", name: "Avaliação 1" },
  { id: "eva2", name: "Avaliação 2" },
  { id: "trab", name: "Trabalho" },
  { id: "part", name: "Participação" },
];

// Default activities used when a discipline has no specific config
export const defaultActivities: EvaluationActivity[] = [...evaluationActivities];

// Activities per-discipline (keyed by discipline name used in CourseSelector)
export const activitiesByDiscipline: Record<string, EvaluationActivity[]> = {
  "Cálculo II": [
    { id: "calc2_t1", name: "Teste 1" },
    { id: "calc2_p1", name: "Prova 1" },
    { id: "calc2_t2", name: "Teste 2" },
    { id: "calc2_p2", name: "Prova 2" },
    { id: "calc2_t3", name: "Teste 3" },
    { id: "calc2_p3", name: "Prova 3" },
    { id: "calc2_atvT1", name: "Atividade Teórica 1" },
    { id: "calc2_atvT2", name: "Atividade Teórica 2" },
    { id: "calc2_atvT3", name: "Atividade Teórica 3" },
    { id: "calc2_atvT4", name: "Atividade Teórica 4" },
    { id: "calc2_atvT5", name: "Atividade Teórica 5" },
    { id: "calc2_proj1", name: "Projeto 1" },
    { id: "calc2_proj2", name: "Projeto 2" },
    { id: "calc2_atvP1", name: "Atividade Prática 1" },
    { id: "calc2_atvP2", name: "Atividade Prática 2" },
    { id: "calc2_atvP3", name: "Atividade Prática 3" },

  ],
  // adicione outras disciplinas conforme necessário
};
