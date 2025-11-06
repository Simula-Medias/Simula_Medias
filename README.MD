# Simula Médias

Simulador open‑source para estudantes acompanharem e projetarem suas médias por disciplina, de forma simples, visual e transparente.

Este repositório é o ponto de partida para quem quer contribuir com o projeto — aqui você encontra visão geral, tecnologias, como rodar localmente, padrões de contribuição e como evoluir a aplicação.

> O aplicativo web está desenvolvido dentro da pasta `Server/` usando Vite + React + TypeScript.

## Sumário

- Visão geral
- Tecnologias
- Requisitos
- Como rodar localmente
- Scripts disponíveis
- Estrutura do projeto
- Convenções e padrões
- Como contribuir
- Deploy
- Roadmap (ideias)
- Licença

## Visão geral

O Simula Médias ajuda a responder perguntas como:

- Qual nota preciso tirar na próxima avaliação para ser aprovado?
- Se eu tirar X no trabalho e Y na prova, qual será minha média final?
- Como estou evoluindo ao longo do semestre?

Funcionalidades atuais:

- Seleção de curso/semestre/disciplina
- Simulação de notas com cálculo de média e regras configuráveis
- UI moderna com suporte a tema escuro e layout responsivo
- Navegação por rotas: página inicial e “Sobre nós”

## Tecnologias

Core do app (em `Server/`):

- Vite 5 (dev server e build)
- React 18 + TypeScript
- React Router v6 (rotas)
- Tailwind CSS 3 + tailwindcss-animate
- shadcn/ui (componentes baseados em Radix UI)
- TanStack Query (estado assíncrono)
- Outras libs úteis: date-fns, lucide-react, react-hook-form, zod

Config relevante:

- Porta de desenvolvimento: 8080 (ver `Server/vite.config.ts`)
- Alias `@` aponta para `Server/src`
- ESLint configurado em `Server/eslint.config.js`

## Requisitos

- Node.js 18+ (LTS recomendado)
- npm 9+ (ou pnpm/yarn, se preferir)

## Como rodar localmente

Na primeira execução:

```sh
cd Server
npm install
npm run dev
```

Depois de iniciar, acesse: <http://localhost:8080>

Build de produção e preview local:

```sh
npm run build
npm run preview
```

## Scripts disponíveis

- `npm run dev` — servidor de desenvolvimento (Vite)
- `npm run build` — build de produção
- `npm run build:dev` — build em modo development
- `npm run preview` — servidor para visualizar o build localmente
- `npm run lint` — checa o lint com ESLint

## Estrutura do projeto

Raiz do repositório:

```text
Simula_Medias/
	README.MD            # Este arquivo
	CONTRIBUTING.md      # Guia de contribuição
	Server/              # Aplicação web (Vite + React + TS)
```

Pasta `Server/` (principal):

```text
Server/
	src/
		App.tsx               # Providers, roteamento e toasters
		main.tsx              # Bootstrap React
		pages/
			Index.tsx           # Página principal (seletor + simulador)
			about_us.tsx        # Página "Sobre nós"
			NotFound.tsx        # 404
		components/
			Header.tsx          # Cabeçalho e navegação
			...                 # Componentes, inclusive shadcn/ui em components/ui
		lib/
			averageCalculator.ts# Cálculos de médias/pesos
			gradeConfig.ts      # Regras/configurações de notas
			Disciplinas.ts      # Dados de cursos/semestres/disciplinas
			utils.ts            # Funções utilitárias
		hooks/                # Hooks compartilhados
	vite.config.ts          # Porta 8080 e alias @ -> src
	tailwind.config.ts      # Tailwind + animações
	package.json            # Scripts e dependências
```

Rotas (em `src/App.tsx`):

- `/` → `pages/Index.tsx`
- `/about_us` → `pages/about_us.tsx`
- `*` → `pages/NotFound.tsx`

## Convenções e padrões

- Idioma do código e textos: pt‑BR
- Alias de import: use `@/` para arquivos dentro de `Server/src`
- UI: preferir componentes de `components/ui` (shadcn/ui) e utilitários Tailwind
- Estilo: seguir regras do ESLint; rode `npm run lint` antes de abrir PR
- Commits: sugerimos Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)

## Como contribuir

1) Abra uma issue caso queira discutir antes de implementar.

2) Fork o repositório, crie uma branch a partir de `main` e faça sua mudança de forma pequena e focada.

3) Garanta que o projeto roda localmente e o lint passa.

4) Abra um Pull Request descrevendo:

- O problema/melhoria
- A solução proposta
- Como testar (inclua prints/gifs se for UI)

Mais detalhes em `CONTRIBUTING.md`.

## Deploy

O projeto gera um site estático com `npm run build` (saída em `Server/dist`). Você pode publicar em Vercel, Netlify, GitHub Pages ou outra plataforma de sua preferência.

Dicas:

- Se publicar em subpath, ajuste a opção `base` no `vite.config.ts`.
- Use `npm run preview` para validar localmente o build.

## Roadmap (ideias)

- Histórico de simulações e comparativos
- Exportação/compartilhamento de resultados
- Internacionalização (i18n)
- Testes automatizados e verificação de regras de cálculo

Sugira novas ideias em Issues!

## Licença

Definiremos a licença do projeto com a comunidade. Sugestão inicial: MIT. Enquanto isso, contribuições são bem‑vindas via PR com concordância explícita dos autores.

—

Links úteis:

- Repositório: https://github.com/Simula-Medias/Simula_Medias
- Issues: https://github.com/Simula-Medias/Simula_Medias/issues
- Pull Requests: https://github.com/Simula-Medias/Simula_Medias/pulls
