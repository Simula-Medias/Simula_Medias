# Guia de Contribuição

Obrigado por querer contribuir com o Simula Médias! Este documento resume como configurar o ambiente, padrões de código e o fluxo de contribuição.

## Como começar

1. Faça um fork do repositório e clone o seu fork.
2. Crie uma branch descritiva a partir de `main`.
3. Instale as dependências e rode o projeto localmente.

## Requisitos

- Node.js 18+ (recomendado LTS)
- npm 9+ (ou pnpm/yarn se preferir)

## Instalação e execução

Na pasta `Server/`:

```sh
npm install
npm run dev
```

O app abrirá por padrão em `http://localhost:8080`.

## Scripts úteis

- `npm run dev` — servidor de desenvolvimento (Vite)
- `npm run build` — build de produção
- `npm run build:dev` — build em modo development
- `npm run preview` — preview do build
- `npm run lint` — lint com ESLint

## Padrões de código

- TypeScript + React (React 18)
- ESLint configurado (ver `Server/eslint.config.js`)
- Tailwind CSS + shadcn/ui para UI
- Import alias `@` aponta para `Server/src`

## Commit messages

Sugerimos o padrão Conventional Commits:

- `feat: descrição`
- `fix: descrição`
- `docs: descrição`
- `chore: descrição`
- `refactor: descrição`

## Fluxo de PR

1. Garanta que o projeto builda e o lint passa.
2. Abra um Pull Request para `main` descrevendo claramente a mudança.
3. Inclua screenshots/gifs quando houver mudanças visuais.
4. Mantenha PRs pequenos e focados.

## Estrutura do projeto (resumo)

```text
Server/
  src/
    pages/           # Páginas (rotas) — react-router-dom
    components/      # Componentes (inclui shadcn/ui)
    lib/             # Utilitários, config de notas e dados
    hooks/           # Hooks compartilhados
  vite.config.ts     # Porta 8080, alias @ -> src
  tailwind.config.ts # Tailwind + tailwindcss-animate
```

## Dúvidas

Abra uma issue com o máximo de detalhes possível. Ficaremos felizes em ajudar!
