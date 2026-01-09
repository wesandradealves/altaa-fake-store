# Teste - Fake Store (Next.js)

Aplicacao front-end em React + Next.js consumindo a Fake Store API. O projeto segue a arquitetura do boilerplate (registry, services, hooks, context, templates) com atomic design, styled-components e Tailwind.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **TypeScript:** 5.x
- **Estilos:** Styled Components + Tailwind CSS
- **UI:** Material UI (Selects)
- **Animacoes:** motion/react
- **HTTP Client:** Axios

## Funcionalidades

- Listagem de produtos com filtros por categoria e ordenacao (preco/nome)
- Detalhe do produto com rating e superzoom de imagem
- Produtos relacionados na mesma categoria com paginacao (4 por pagina)
- Paginacao na listagem (8 por pagina)
- Estados de loading, erro e vazio
- SEO basico via hook de metadata
- Menu de categorias dinamico (rota `/categoria/[...slug]`)

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
- `motion/react` para transicoes leves e declarativas.
- `useMetadata` para controlar titulo, description e OG sem duplicar metadata no layout.
- `memo`, `useCallback` e `useMemo` aplicados para evitar renders desnecessarios.

## Trade-offs

- Sem cache persistente (apenas estado em memoria).
- Paginacao client-side pode carregar mais dados do que o necessario.
- Sem testes automatizados neste momento.

## Melhorias futuras

- Testes unitarios para hooks e componentes criticos.
- Cache ou SWR/React Query para dados remotos.
- Skeletons e transicoes mais refinadas no detalhe.
- Acessibilidade extra (focus trap no menu, atalhos de teclado).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
