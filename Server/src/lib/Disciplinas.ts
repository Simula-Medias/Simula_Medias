export const courses = [
  "Engenharia de Controle e Automação",
];

export const semesters = [
  "1º Semestre",
  "2º Semestre",
  "3º Semestre",
  "4º Semestre",
  "5º Semestre",
  "6º Semestre",
  "7º Semestre",
  "8º Semestre",
  "9º Semestre",
  "10º Semestre",
];

// Nested schema: curriculum[course][semester] = string[]
export const curriculum: Record<string, Record<string, string[]>> = {
  "Engenharia de Controle e Automação": {
    "2º Semestre": [
      "Cálculo II", "Geometria Analítica e Álgebra Linear", "Física I"
    ],
  },
};
