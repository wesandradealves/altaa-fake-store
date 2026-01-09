# Teste - Fake Store (Next.js)

Aplicacao front-end em React + Next.js consumindo a Fake Store API. O projeto segue a arquitetura do boilerplate (registry, services, hooks, context, templates) com atomic design, styled-components e Tailwind.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **TypeScript:** 5.x
- **Estilos:** Styled Components + Tailwind CSS
- **UI:** Material UI (Selects)
- **Animacoes:** motion/react
- **HTTP Client:** Axios
- **PWA:** Service Worker + Workbox (@ducanh2912/next-pwa)
- **Testes:** Jest + Testing Library + Playwright
- **Qualidade:** ESLint (Next)

## Funcionalidades

- Listagem de produtos com filtros por categoria e ordenacao (preco/nome)
- Paginacao na listagem (8 por pagina)
- Detalhe do produto com rating e superzoom de imagem
- Produtos relacionados na mesma categoria com paginacao (4 por pagina)
- Menu de categorias dinamico (rota `/categoria/[...slug]`) com foco em acessibilidade
- Links de categoria nos cards e no detalhe
- Thumbnails com lazyload
- Cache client-side para dados da API com fallback offline
- PWA com cache offline (app shell, imagens e API)
- Estados de loading, erro e vazio
- SEO basico via hook de metadata

## Requisitos

- Node.js >= 18
- npm, yarn, pnpm ou bun

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

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
  context/                 # Context API (app, spinner)
  hooks/                   # Hooks customizados (dados e metadata)
  services/                # Axios + servicos Fake Store
  config/                  # Textos (pt-BR)
  assets/                  # SCSS, variaveis e tokens
```

- **Atomic Design:** atoms, molecules, organisms e templates.
- **Registry:** uso do Styled Components registry para evitar flash de estilos no SSR.
- **Services/Hooks:** separacao clara entre UI, logica e integracao API.
- **Texts:** centralizados em `src/config/content.json` (pt-BR).

## Escolha do framework

Escolhi **Next.js** para manter a arquitetura do boilerplate (App Router + layout/template), suportar o registry de styled-components e ter rotas dinamicas server/client sem setup adicional. Isso tambem facilita SEO basico e organizacao por templates.

## Decisoes tecnicas

- Paginacao client-side porque a Fake Store API nao oferece paginacao nativa.
- Interceptors do Axios para controle de loading e token.
- Cache local no client com fallback em caso de falha/offline.
- Service Worker com runtime caching para API, assets e imagens.
- `motion/react` para transicoes leves e declarativas.
- `useMetadata` para controlar title, description e OG sem duplicar metadata no layout.
- `memo`, `useCallback` e `useMemo` aplicados para evitar renders desnecessarios.

## Qualidade e automacao

- Testes unitarios com Jest + Testing Library (hooks, services, componentes e templates).
- E2E com Playwright para manifest, offline e cache.
- Lighthouse PWA via script dedicado (gera relatorio).
- Husky executa `lint` e `test:unit` em pre-commit e pre-push.
- Deploy (`vercel-build`) roda lint + testes antes do build.

Para rodar E2E localmente: `npx playwright install`.
O relatorio do Lighthouse fica em `.lighthouse/pwa.html`.

## Trade-offs

- Sem cache persistente compartilhado (apenas no client).
- Paginacao client-side pode carregar mais dados do que o necessario.
- Testes e2e focam em PWA/offline; outros fluxos ainda nao sao cobertos.

## Melhorias futuras

- Cache ou SWR/React Query para dados remotos.
- Acessibilidade extra (focus trap no menu, atalhos de teclado).
- Paginacao server-side caso a API suporte.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:unit
npm run test:e2e
npm run test:pwa
npm run test:ci
npm run vercel-build
npm run storybook
npm run build-storybook
```
