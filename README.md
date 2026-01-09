# Teste - Fake Store (Next.js)

Aplicacao front-end em React + Next.js consumindo a Fake Store API. O projeto segue a arquitetura do boilerplate (registry, services, hooks, context, templates) com atomic design, styled-components e Tailwind.

## API

- Fake Store API: https://fakestoreapi.com/docs

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **TypeScript:** 5.x
- **Estilos:** Styled Components + Tailwind CSS
- **UI:** Material UI (Selects)
- **Animacoes:** motion/react
- **HTTP Client:** Axios
- **Cache:** React Query + persistencia local (Query Persister)
- **PWA:** Service Worker + Workbox (@ducanh2912/next-pwa)
- **Storybook:** Storybook 8 (documentacao e testes visuais)
- **Testes:** Jest + Testing Library + Playwright
- **Qualidade:** ESLint (Next)

## Funcionalidades

- Listagem com titulo, imagem, preco e categoria (layout responsivo)
- Filtro por categoria e ordenacao (preco asc/desc e nome)
- Paginacao na listagem (8 por pagina)
- Detalhe do produto com titulo, imagem, descricao, preco, categoria e rating
- Produtos relacionados na mesma categoria com paginacao (4 por pagina)
- Menu de categorias dinamico (rota `/categoria/[...slug]`) com foco preso, setas, Esc e atalho Alt+C
- Links de categoria nos cards e no detalhe
- Thumbnails com lazyload
- Controle de acessibilidade (alto contraste e ajuste de fonte)
- Cache client-side persistente com React Query
- PWA com cache offline (app shell, imagens e API via Service Worker)
- Estados de loading, erro e vazio
- SEO basico via hook de metadata
- Storybook para visualizar estados dos componentes com mocks de dados

## Requisitos

- Node.js >= 18
- npm, yarn, pnpm ou bun

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para abrir o Storybook:

```bash
npm run storybook
```

Storybook em `http://localhost:6006`.

## Deploy

- Vercel (link publico): [<adicionar-link>](https://altaa-fake-store.vercel.app/)
- Repositorio deve estar publico para avaliacao.

## Variaveis de ambiente

Crie um `.env` (opcional):

```
NEXT_PUBLIC_FAKE_STORE_API_URL=https://fakestoreapi.com
NEXT_PUBLIC_APP_NAME=Projeto Base
```

## Arquitetura

```
src/
  __tests__/              # Testes unitarios
  app/                     # Rotas App Router (layout, pages, templates)
  components/
    atoms/
    molecules/
    organisms/
    templates/
  context/                 # Context API (app, spinner, accessibility)
  hooks/                   # Hooks customizados (dados e metadata)
  services/                # Axios + servicos Fake Store
  config/                  # Textos (pt-BR)
  assets/                  # SCSS, variaveis e tokens
  stories/                 # Fixtures para Storybook
```

- **Atomic Design:** atoms, molecules, organisms e templates.
- **Registry:** uso do Styled Components registry para evitar flash de estilos no SSR.
- **Services/Hooks:** separacao clara entre UI, logica e integracao API.
- **Texts:** centralizados em `src/config/content.json` (pt-BR).
- **Storybook:** stories para atoms/molecules/organisms/templates e mocks de hooks.

## Escolha do framework

Escolhi **Next.js** para manter a arquitetura do boilerplate (App Router + layout/template), suportar o registry de styled-components e ter rotas dinamicas server/client sem setup adicional. Isso tambem facilita SEO basico e organizacao por templates.

## Decisoes tecnicas

- Paginacao client-side porque a Fake Store API nao oferece paginacao nativa.
- Interceptors do Axios para controle de loading e token.
- React Query com cache persistente local e revalidacao.
- Service Worker com runtime caching para API, assets e imagens (offline).
- `motion/react` para transicoes leves e declarativas.
- `useMetadata` para controlar title, description e OG sem duplicar metadata no layout.
- `memo`, `useCallback` e `useMemo` aplicados para evitar renders desnecessarios.

## Trade-offs

- Filtros e paginacao sao client-side por limitacao da API; mais dados carregados por vez.
- Cache offline exige uma primeira visita online para aquecer o Service Worker.
- Cache persistente e local (cliente), nao compartilhado entre dispositivos.

## Melhorias futuras

- Integrar `test:ci` em pipeline de CI e publicar relatorio do Lighthouse.
- Expandir e2e para cenarios de erro/empty, menu e acessibilidade por teclado.
- Avaliar prefetch e ajustes de cache quando a API suportar paginacao/ordenacao server-side.

## Nota de qualidade e DRY

- Manter **uma unica camada de cache de dados** (React Query + persister). Evitar cache manual em services.
- Evitar duplicar fixtures: usar `src/stories/fixtures` para stories e mocks.
- Preferir helpers reutilizaveis para listas/skeletons e manter logica centralizada.
- Priorizar `useMetadata` para SEO dinamico nas paginas.
- Usar Tailwind para classes de componentes; SCSS fica em tokens e globais.

## Qualidade e automacao

- Testes unitarios com Jest + Testing Library (hooks, services, componentes e templates).
- E2E com Playwright para filtros, ordenacao, paginacao e PWA offline.
- Lighthouse (performance, acessibilidade, boas praticas e SEO) via script dedicado (`test:pwa`).
- Storybook para testes visuais e revisao de estados dos componentes.
- Husky executa `lint` e `test:unit` em pre-commit e pre-push.
- Deploy (`vercel-build`) roda lint + testes antes do build.

Para rodar E2E localmente: `npx playwright install`.
O relatorio do Lighthouse fica em `.lighthouse/lighthouse.html`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run start:prod
npm run lint
npm run lint:watch
npm run test
npm run test:unit
npm run test:e2e
npm run test:e2e:ui
npm run test:pwa
npm run test:ci
npm run vercel-build
npm run storybook
npm run build-storybook
```
