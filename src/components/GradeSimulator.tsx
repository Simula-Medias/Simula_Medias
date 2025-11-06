import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, Calculator, Trophy, TrendingUp, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { activitiesByDiscipline, defaultActivities, EvaluationActivity } from "@/lib/gradeConfig";
import { calculateDisciplineAverage, GradesMap } from "@/lib/averageCalculator";
import { useEffect } from "react";

interface GradeSimulatorProps {
  course: string;
  semester: string;
  discipline: string;
  onBack: () => void;
}

interface Grade {
  name: string;
  value: string;
}

export const GradeSimulator = ({ course, semester, discipline, onBack }: GradeSimulatorProps) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [average, setAverage] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [activitiesConfig, setActivitiesConfig] = useState<EvaluationActivity[]>([]);

  useEffect(() => {
  const key = discipline?.trim() ?? "";
  const config = activitiesByDiscipline[key] ?? defaultActivities;
  // normalize and ensure an id exists for each activity
    const norm = config.map((a) => {
      const act = a as Partial<EvaluationActivity>;
      const id = act.id ?? act.name?.replace(/\s+/g, "_").toLowerCase() ?? "";
      return { id, name: a.name } as EvaluationActivity;
    }) as EvaluationActivity[];
  const initial = norm.map((a) => ({ name: a.name, value: "" }));
  setActivitiesConfig(norm);
  setGrades(initial);
  setAverage(null);
  setInitialized(true);
  }, [discipline]);

  // Se não houver atividades configuradas, mostra aviso simples
  if (initialized && grades.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Card className="p-6 shadow-card border-border/50">
          <div className="space-y-4 text-center">
            <p className="text-lg font-semibold">Nenhuma atividade configurada para esta disciplina.</p>
            <p className="text-sm text-muted-foreground">Verifique a configuração em src/lib/gradeConfig.ts</p>
            <div className="mt-4">
              <Button onClick={onBack} variant="outline">Voltar</Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    // Permitir apenas números de 0 a 10
    const numValue = parseFloat(value);
    if (value === "" || (!isNaN(numValue) && numValue >= 0 && numValue <= 10)) {
      newGrades[index].value = value;
      setGrades(newGrades);
    }
  };

  const calculateAverage = () => {
    // Build grades map keyed by normalized activity id
    // Empty fields are treated as 0 per requested behavior
    const gradesMap: GradesMap = {};
    grades.forEach((g, i) => {
      const activity = activitiesConfig[i];
      const id = activity?.id ?? activity?.name.replace(/\s+/g, "_").toLowerCase();
      if (!id) return;
      gradesMap[id] = g.value === "" ? 0 : parseFloat(g.value);
    });

    // Delegate to averageCalculator
    const result = calculateDisciplineAverage(discipline, activitiesConfig, gradesMap);
    return result.average;
  };

  const handleCalculate = () => {
    const avg = calculateAverage();
    if (avg !== null) {
      setAverage(avg);
      const isPassed = avg >= 5;
      const message = isPassed
        ? `Parabéns! Sua média é ${avg.toFixed(2)} - Aprovado! 🎉`
        : `Sua média é ${avg.toFixed(2)} - Continue estudando! 📚`;

      if (isPassed) {
        toast.success(message);
      } else if (avg >= 5) {
        toast.warning(message);
      } else {
        toast.error(message);
      }
    }
  };

  const showResult = average !== null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in px-4 py-6">
      {/* Header com informações da seleção */}
      <div className="bg-gradient-to-br from-card via-card to-card/95 rounded-2xl shadow-2xl p-8 border border-border/40 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-3 flex-1 min-w-[250px]">
            <div className="flex items-center gap-2.5 text-muted-foreground/80 text-sm font-medium">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className="tracking-wide">Simulador de Média</span>
            </div>
            <h2 className="text-3xl font-bold text-foreground leading-tight tracking-tight">{discipline}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{course}</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="px-3 py-1 rounded-full bg-muted/50 font-medium">{semester}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="default"
            onClick={onBack}
            className="gap-2 hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md border-border/60"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>
      </div>

      {/* Formulário de notas */}
      <Card className="p-8 shadow-2xl border-border/40 rounded-2xl bg-gradient-to-br from-card to-card/95 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-4 border-b border-border/40">
            <div className="p-2 rounded-xl bg-primary/10">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Insira suas notas</h3>
          </div>

          <div className="space-y-4">
            {grades.map((grade, index) => (
              <div
                key={index}
                className="group grid grid-cols-1 md:grid-cols-3 gap-5 items-end p-5 rounded-xl bg-gradient-to-r from-muted/40 to-muted/20 border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="md:col-span-1 space-y-2">
                  <Label className="text-base font-semibold text-foreground flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    {grade.name}
                  </Label>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`grade-${index}`} className="text-sm font-semibold text-muted-foreground">
                    Nota (0-10)
                  </Label>
                  <Input
                    id={`grade-${index}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={grade.value}
                    onChange={(e) => handleGradeChange(index, e.target.value)}
                    placeholder="Digite a nota..."
                    className="h-12 text-lg font-semibold border-border/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleCalculate}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl hover:shadow-2xl rounded-xl"
            size="lg"
          >
            <Calculator className="w-6 h-6 mr-2" />
            Calcular Média Final
          </Button>
        </div>
      </Card>

      {/* Resultado */}
      {showResult && (
        <Card className="p-8 shadow-2xl border-border/40 animate-scale-in rounded-2xl bg-gradient-to-br from-card to-card/95 backdrop-blur-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3 pb-4 border-b border-border/40">
              <div className="p-2 rounded-xl bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Resultado da Avaliação</h3>
            </div>
            
            <div className="flex items-center justify-between p-8 rounded-2xl bg-gradient-to-br from-muted/30 via-muted/20 to-transparent border border-border/30 shadow-inner">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Sua Média Final</p>
                <p className="text-6xl font-black bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-sm">
                  {average.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">de 10.0 pontos possíveis</p>
              </div>
              <div className={`text-center p-6 rounded-2xl ${average >= 7 ? "bg-green-500/10" : average >= 5 ? "bg-yellow-500/10" : "bg-red-500/10"}`}>
                <Trophy className={`w-16 h-16 mb-3 mx-auto ${average >= 7 ? "text-green-600" : average >= 5 ? "text-yellow-600" : "text-red-600"}`} />
                <p className={`text-lg font-bold ${average >= 7 ? "text-green-600" : average >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                  {average >= 7 ? "Aprovado!" : average >= 5 ? "Recuperação" : "Reprovado"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Nota Mínima</p>
                <p className={`text-3xl font-black ${average >= 7 ? "text-green-600" : "text-muted-foreground"}`}>
                  7.0
                </p>
                <p className="text-xs text-muted-foreground mt-1">para aprovação</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sua Média</p>
                <p className={`text-3xl font-black ${average >= 7 ? "text-green-600" : average >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                  {average.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">média calculada</p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/30 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Diferença</p>
                <p className={`text-3xl font-black ${average >= 7 ? "text-green-600" : "text-red-600"}`}>
                  {average >= 7 ? "+" : ""}{(average - 7).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">pontos da média</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
