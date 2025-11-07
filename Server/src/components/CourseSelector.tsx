import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";
import { courses, semesters, curriculum } from "@/lib/Disciplinas";

interface CourseSelectorProps {
  onConfirm: (course: string, semester: string, discipline: string) => void;
}

export const CourseSelector = ({ onConfirm }: CourseSelectorProps) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState("");

  const availableDisciplines =
    selectedCourse && selectedSemester
      ? curriculum[selectedCourse]?.[selectedSemester] ?? []
      : [];

  const handleSubmit = () => {
    if (!selectedCourse || !selectedSemester || !selectedDiscipline) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    toast.success("Seleção confirmada!", {
      description: `${selectedCourse} - ${selectedSemester} - ${selectedDiscipline}`,
    });

    onConfirm(selectedCourse, selectedSemester, selectedDiscipline);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 px-4 md:px-6 lg:px-0 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          Simulador de Médias
        </h1>
        <p className="text-lg text-muted-foreground max-w-prose mx-auto">
          Selecione seu curso, semestre e disciplina. Na qual deseja simular/consultar
        </p>
      </div>

      <div className="bg-card/80 supports-[backdrop-filter]:backdrop-blur rounded-2xl p-6 md:p-8 border border-border/60 shadow-lg hover:shadow-xl transition-shadow duration-200 animate-scale-in md:grid md:grid-cols-3 md:gap-6">
        <div className="space-y-2 md:col-span-1 group">
          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-focus-within:text-foreground transition-colors">
            <GraduationCap className="w-4 h-4 text-primary" />
            Curso
          </label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="h-12 rounded-xl px-4 bg-background/80 border border-border/60 ring-1 ring-transparent shadow-sm hover:border-primary/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:ring-primary/40">
              <SelectValue placeholder="Selecione seu curso" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border/60 shadow-xl rounded-xl overflow-hidden">
              {courses.map((course) => (
                <SelectItem
                  key={course}
                  value={course}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground !py-2.5"
                >
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-1 group">
          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-focus-within:text-foreground transition-colors">
            <Calendar className="w-4 h-4 text-secondary" />
            Semestre
          </label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="h-12 rounded-xl px-4 bg-background/80 border border-border/60 ring-1 ring-transparent shadow-sm hover:border-secondary/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:ring-secondary/40">
              <SelectValue placeholder="Selecione o semestre" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border/60 shadow-xl rounded-xl overflow-hidden">
              {semesters.map((semester) => (
                <SelectItem
                  key={semester}
                  value={semester}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground !py-2.5"
                >
                  {semester}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-1 group">
          <label className="text-sm font-medium flex items-center gap-2 text-muted-foreground group-focus-within:text-foreground transition-colors">
            <BookOpen className="w-4 h-4 text-accent" />
            Disciplina
          </label>
          <Select
            value={selectedDiscipline}
            onValueChange={setSelectedDiscipline}
            disabled={!selectedCourse || !selectedSemester}
          >
            <SelectTrigger className="h-12 rounded-xl px-4 bg-background/80 border border-border/60 ring-1 ring-transparent shadow-sm hover:border-accent/50 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=open]:ring-accent/40 disabled:opacity-50">
              <SelectValue placeholder={
                selectedCourse
                  ? selectedSemester
                    ? "Selecione a disciplina"
                    : "Primeiro selecione o semestre"
                  : "Primeiro selecione um curso"
              } />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border/60 shadow-xl rounded-xl overflow-hidden">
              {availableDisciplines.map((discipline) => (
                <SelectItem
                  key={discipline}
                  value={discipline}
                  className="cursor-pointer focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground !py-2.5"
                >
                  {discipline}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!selectedCourse || !selectedSemester || !selectedDiscipline}
          className="w-full md:col-span-3 h-12 rounded-xl text-base font-semibold bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-elegant hover:shadow-xl focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          Confirmar Seleção
        </Button>
      </div>
    </div>
  );
};

