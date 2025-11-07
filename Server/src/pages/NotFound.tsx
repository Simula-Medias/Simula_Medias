import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="mx-auto max-w-2xl text-center space-y-8">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-primary/60 -z-10" />
        </div>

        {/* Error Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Página Não Encontrada
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida para outro endereço.
          </p>
          <p className="text-sm text-muted-foreground/70 font-mono bg-muted px-4 py-2 rounded-md inline-block">
            {location.pathname}
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center py-8">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-32 h-32 text-muted-foreground/30 animate-bounce" />
            </div>
            <div className="absolute inset-0 border-4 border-dashed border-muted-foreground/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </Button>
          
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="w-full sm:w-auto gap-2 group"
          >
            <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
            Página Inicial
          </Button>
        </div>

        {/* Help Text */}
        <div className="pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            Se você acredita que isso é um erro, entre em contato com o suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
