import React from 'react';
import { Header } from '@/components/Header';

// --- Ícones SVG para a página ---

// Ícone para "Nossa Missão" (Alvo)
const MissionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v.01M12 12v.01M12 16v.01M12 21a9 9 0 009-9M3 12a9 9 0 019-9"
    />
  </svg>
);

// Ícone para "O Que Fazemos" (Calculadora)
const WhatWeDoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-green-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M12 17h.01M15 17h.01M15 10h.01M9 10h.01M12 3c-3.866 0-7 3.134-7 7v7h14v-7c0-3.866-3.134-7-7-7z"
    />
  </svg>
);

// Ícone para "Open Source" (Código)
const OpenSourceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-purple-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

// Ícone do GitHub para contribuição
const GitHubIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.165 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Componente Principal da Página "Sobre Nós" ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 font-inter">
        <Header />
      {/* Cabeçalho */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400">
            Sobre o Simula Médias
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Entendendo sua situação acadêmica de forma fácil e transparente.
          </p>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-6 py-16">
        {/* Seção: Nossa Missão */}
        <section className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <MissionIcon />
          </div>
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Nossa Missão
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            Nossa missão é fornecer aos estudantes uma ferramenta simples,
            intuitiva e gratuita para simular suas médias e notas. Acreditamos
            que, ao entender claramente sua situação em uma disciplina, o aluno
            pode tomar decisões mais informadas sobre seus estudos e reduzir a
            ansiedade acadêmica.
          </p>
        </section>

        {/* Grid de Features */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* O que fazemos */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <WhatWeDoIcon />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              O Que Fazemos?
            </h3>
            <p className="text-md leading-relaxed">
              Nossa plataforma permite que você insira as notas que já possui e
              simule notas futuras para ver como elas afetam sua média final.
              Seja para saber quanto precisa tirar na prova final ou para
              planejar o semestre, estamos aqui para ajudar a calcular sua
              situação e mostrar o caminho para a aprovação.
            </p>
          </div>

          {/* Por que Open Source? */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center md:text-left">
            <div className="flex justify-center md:justify-start mb-4">
              <OpenSourceIcon />
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
              Por Que Open-Source?
            </h3>
            <p className="text-md leading-relaxed">
              Este projeto é de código aberto porque acreditamos no poder da
              comunidade. Isso garante transparência total nas regras de cálculo,
              permite que qualquer pessoa contribua com melhorias e assegura que
              a ferramenta permanecerá sempre gratuita e acessível para todos os
              estudantes.
            </p>
          </div>
        </div>

        {/* Seção de Contribuição */}
        <section className="text-center bg-blue-50 dark:bg-blue-900/30 p-10 rounded-lg">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
            Faça Parte da Mudança
          </h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Gostou da iniciativa? Você pode nos ajudar a melhorar! Seja
            reportando bugs, sugerindo novas funcionalidades ou contribuindo
            diretamente com o código, sua ajuda é muito bem-vinda.
          </p>
          <a
            href="https://github.com/seu-usuario/seu-repositorio" // ATUALIZE COM O LINK REAL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
          >
            <GitHubIcon />
            <span className="ml-3">Veja nosso GitHub</span>
          </a>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p>
          Simula Médias - Um projeto de comunidade para estudantes.
        </p>
      </footer>
    </div>
  );
};

export default App;