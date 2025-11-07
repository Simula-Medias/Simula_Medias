import { useState } from "react";
import { CourseSelector } from "@/components/CourseSelector";
import { GradeSimulator } from "@/components/GradeSimulator";
import { Header } from "@/components/Header";

interface Selection {
  course: string;
  semester: string;
  discipline: string;
}

const Index = () => {
  const [selection, setSelection] = useState<Selection | null>(null);

  const handleSelectionConfirm = (course: string, semester: string, discipline: string) => {
    setSelection({ course, semester, discipline });
  };

  const handleBack = () => {
    setSelection(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background py-12 px-4">
        {selection ? (
          <GradeSimulator
            course={selection.course}
            semester={selection.semester}
            discipline={selection.discipline}
            onBack={handleBack}
          />
        ) : (
          <CourseSelector onConfirm={handleSelectionConfirm} />
        )}
      </main>
    </div>
  );
};

export default Index;
