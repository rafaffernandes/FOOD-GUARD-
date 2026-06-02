# Food Guard — Design System & Codebase Rules

> **Idioma:** sempre responda em **português do Brasil**, independente do idioma
> da pergunta. Commits, PRs, comentários de código e comunicação no chat — tudo
> em pt-BR.

Guia de referência para implementar designs (inclusive vindos do **Figma via MCP**)
de forma consistente com a base de código existente. Leia antes de criar telas,
componentes ou tokens.

> **Stack em uma linha:** Next.js 15 (App Router) · React 19 · TypeScript ·
> Tailwind CSS · lucide-react · pt-BR.

---

## Project Context: Food Guard

- **Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS.
- **Produto-núcleo:** diagnóstico de conformidade sanitária (5 perguntas, motor
  de pontos de risco, score 100 − soma, bandas 70/45) culminando no
  `ResultReport`.
- **Planos:** **Básico R$1.200 · Essencial R$2.200 · Premium R$3.200** (o
  nutricionista responsável é exclusivo do Premium). IDs em `lib/content/plans.ts`.
- **Voz da marca:** "nutricionista responsável" (nunca "RT"); legislação
  **RDC 216/2004 + Portaria 2.619/2011** (nunca "CFN 600"); sem "carência",
  sem "dinheiro de volta". Mais detalhes em `lib/content/site.ts`.
- **Sources of truth:** `lib/content/site.ts`, `lib/content/plans.ts`,
  `lib/diagnostic/questions.ts`, `lib/diagnostic/engine.ts`.
- **Antes de declarar pronto:** `npm run build` ✓, `npm run lint` ✓, e — se
  mexeu no fluxo de diagnóstico — rode o E2E (3 cenários).

---

## Deployment Workflow

Este projeto vive em `rafaffernandes/FOOD-GUARD-`. A `main` é a branch de
produção e a Vercel publica automaticamente em
**https://food-guard-cnhl.vercel.app/**.

1. **Trabalhe em uma branch de feature** — nunca empurre direto pra `main` sem
   ter sido pedido. Branch ativa atual: `claude/company-website-design-CwX8o`.
2. **Após cada bloco de mudança:** `npm run build` + `npm run lint`.
3. **Para publicar:** commit na branch de feature e dê push duplo — primeiro na
   feature, depois na `main` (`git push origin claude/...:main`). A Vercel
   detecta o commit em `main` e publica em 1–2 min.
4. **NÃO** tente abrir túneis públicos (ngrok, localtunnel) — o sandbox tem
   allowlist de rede e bloqueia. O link de teste é sempre o domínio da Vercel
   acima.
5. **Quando o usuário pedir "manda o link":** entregue
   `https://food-guard-cnhl.vercel.app/` e instrua hard refresh
   (`Ctrl+Shift+R`) ou aba anônima. Não tente expor `localhost`.

---

## Output Limits

- Mantenha respostas geralmente abaixo de **500 tokens de saída**. Para gerar
  arquivos longos, escreva um por vez com `Write` (não enfie o conteúdo na
  resposta de texto).
- Em scaffolding multi-arquivo, prefira vários `Write`/`Edit` consecutivos a
  um único bloco de texto enorme — evita estouro de tokens.

---

## 1. Token Definitions

**Fonte única da verdade:** [`tailwind.config.ts`](./tailwind.config.ts) (`theme.extend`).
Não há JSON de tokens nem pipeline de transformação (Style Dictionary etc.) —
os tokens são consumidos diretamente como classes utilitárias do Tailwind.

### Cores (use sempre o token, nunca hex solto)

| Token | Uso | Exemplo |
|---|---|---|
| `brand.50…950` | Cor primária (verde saúde/tech). `brand-600` = ação principal | `bg-brand-600`, `text-brand-700` |
| `ink` / `ink.soft` / `ink.muted` | Texto (forte / secundário / terciário) | `text-ink`, `text-ink-soft` |
| `surface` / `surface.soft` / `surface.sunken` | Fundos (branco / seção / borda) | `bg-surface-soft` |
| `danger.50…700` | Risco / erro / "dinheiro em risco" | `text-danger-600` |
| `warn.50…600` | Alerta / risco médio | `text-warn-500` |

```ts
// tailwind.config.ts — trecho
colors: {
  brand: { 50:"#ecfdf5", 500:"#10b981", 600:"#059669", 700:"#047857", 950:"#022c22" /* … */ },
  ink:   { DEFAULT:"#0b1f1a", soft:"#33433e", muted:"#6b7a75" },
  surface:{ DEFAULT:"#ffffff", soft:"#f6faf8", sunken:"#eef4f1" },
}
```

### Tipografia
- `font-sans` → Inter (corpo). `font-display` → Sora (títulos).
- Carregadas via `next/font/google` em [`app/layout.tsx`](./app/layout.tsx) e
  expostas como CSS vars `--font-inter` / `--font-display`.
- Padrão de título: `font-display font-bold tracking-tight`.

### Outros tokens
- **Raios:** `rounded-xl|2xl|3xl` (1 / 1.25 / 1.75rem). Botões usam `rounded-full`.
- **Sombras:** `shadow-soft` (cards) e `shadow-lift` (hover/destaque).
- **Animações:** `animate-fade-up`, `animate-scale-in` (keyframes no config).
- **Decoração:** `bg-grid-faint` (textura de fundo do hero).

**Regra:** ao trazer um valor do Figma, mapeie para o token mais próximo. Só
adicione um novo token em `tailwind.config.ts` se nenhum existente servir.

---

## 2. Component Library

**Local:** [`components/`](./components/), divididos por domínio:
- `components/ui/` — primitivos reutilizáveis do design system.
- `components/diagnostic/` — componentes do fluxo do diagnóstico (produto-núcleo).
- `components/analytics/` — scripts de tracking.

**Arquitetura:** componentes funcionais React, um por arquivo, **PascalCase**.
Server Components por padrão; só leva `"use client"` quando há estado/efeito/
interação (ex.: `Nav`, `FAQ`, todos em `components/diagnostic/`).

Não há Storybook. Os "exemplos vivos" são as próprias páginas em `app/`.

### Primitivos disponíveis (reutilize antes de criar)
`Button`, `Card`, `Badge`, `Container`, `Section` + `SectionHeading`, `Nav`,
`Footer`, `Logo`, `PlanCard`, `FAQ`.

### Padrão de variantes (exemplo `Button`)
Variantes/tamanhos via mapas de classes + helper `cn()`. Polimórfico: vira
`<Link>` se receber `href`, senão `<button>`.

```tsx
// components/ui/Button.tsx — padrão a seguir em novos componentes
const variants = { primary:"bg-brand-600 text-white …", outline:"…", ghost:"…" };
const sizes = { sm:"…", md:"…", lg:"…" };
<Button variant="primary" size="lg" href="/diagnostico">Fazer diagnóstico</Button>
```

---

## 3. Frameworks & Libraries

- **UI:** React 19 + **Next.js 15 (App Router)** — ver `app/`.
- **Linguagem:** TypeScript estrito (`tsconfig.json`, `strict: true`).
  Alias de import: `@/*` → raiz do projeto.
- **Estilo:** Tailwind CSS 3 (utility-first). PostCSS + autoprefixer.
- **Forms:** `react-hook-form` + `zod` (`@hookform/resolvers`).
- **Build/bundler:** toolchain padrão do Next.js. `npm run dev|build|start|lint`.
- **Conteúdo:** blog em MDX via `next-mdx-remote` + `gray-matter`.
- **Back/integrações:** `@supabase/supabase-js`, `resend`, `pdf-lib`, Asaas (fetch).

---

## 4. Asset Management

- **Imagens estáticas:** ainda não há; quando precisar, coloque em `public/` e
  use **`next/image`** (otimização automática). Não use `<img>` cru.
- O visual atual é construído com **CSS + SVG (ícones)**, sem bitmaps — mantenha
  assim quando possível (performance/LCP).
- **Fontes:** auto-hospedadas e otimizadas pelo `next/font` (sem FOUT, sem CDN
  externo). Não importe fontes via `<link>`.
- Sem CDN de terceiros configurado. Scripts externos (Calendly, GA, Pixel) entram
  via `next/script` com `strategy` apropriada.

---

## 5. Icon System

- **Biblioteca:** [`lucide-react`](https://lucide.dev) — única fonte de ícones.
- **Uso:** import nomeado + classes de tamanho/cor Tailwind.

```tsx
import { ShieldCheck } from "lucide-react";
<ShieldCheck className="h-5 w-5 text-brand-600" strokeWidth={2.2} />
```

- **Convenção:** nomes PascalCase do próprio lucide; tamanho via `h-/w-` (4/5/6),
  cor via `text-*`. Evite SVGs avulsos — se um ícone não existir no lucide, crie
  um componente em `components/ui/` seguindo o mesmo padrão de `Logo.tsx`.

---

## 6. Styling Approach

- **Metodologia:** Tailwind utility-first direto no JSX. **Sem CSS Modules,
  sem styled-components.** Composição condicional via `cn()`
  ([`lib/utils.ts`](./lib/utils.ts), `clsx` + `tailwind-merge`).

```tsx
import { cn } from "@/lib/utils";
className={cn("rounded-2xl border p-6", featured ? "ring-2 ring-brand-200" : "border-surface-sunken")}
```

- **Estilos globais:** apenas em [`app/globals.css`](./app/globals.css)
  (`@layer base` para reset/body, `@layer components` para `.prose-fg` do blog).
  Não adicione CSS global novo sem necessidade real.
- **Responsividade:** mobile-first com breakpoints do Tailwind (`sm:`, `md:`,
  `lg:`). Padrão de seção: `py-16 sm:py-24`; grids `grid gap-6 md:grid-cols-3`.
- **Layout:** envolva conteúdo em `<Container>` (largura máx. + padding) e use
  `<Section>`/`<SectionHeading>` para ritmo vertical consistente.
- **Moeda:** sempre `formatBRL()` de `lib/utils.ts` (nunca formate R$ na mão).

---

## 7. Project Structure

```
app/                      # rotas (App Router) + API
  layout.tsx              # fontes, metadata/SEO, Nav, Footer, Analytics, JSON-LD
  page.tsx                # home
  diagnostico/ planos/ sobre/ contato/ blog/   # páginas
  api/{leads,checkout,webhooks/asaas}/route.ts  # endpoints
  sitemap.ts robots.ts globals.css
components/
  ui/                     # design system (Button, Card, Nav, Footer, …)
  diagnostic/             # fluxo do diagnóstico (DiagnosticFlow orquestra)
  analytics/
lib/
  content/                # plans.ts, site.ts (conteúdo/constantes da marca)
  diagnostic/             # questions.ts (perguntas/pesos) + engine.ts (regras)
  integrations/           # supabase, resend, asaas, pdf, report (todos c/ fallback dev)
  utils.ts analytics.ts blog.ts
content/blog/*.mdx        # artigos
supabase/schema.sql       # tabelas leads + consent_log
```

### Convenções de feature
- **Conteúdo/dados** (textos, planos, perguntas) vivem em `lib/content/` e
  `lib/diagnostic/` — **separe dados de apresentação**. Para mudar copy/preço,
  edite o `lib/`, não o componente.
- **Integrações externas** ficam em `lib/integrations/`, cada uma com
  **degradação graciosa** (funciona sem env var, logando em modo dev). Mantenha
  esse contrato ao adicionar serviços.
- **Lógica de negócio** (ex.: scoring) é função pura testável em `lib/`, isolada
  da UI. O score é **recalculado no servidor** (`app/api/leads`).

---

## Regras de ouro ao implementar designs do Figma

1. **Reutilize** os primitivos de `components/ui/` antes de criar algo novo.
2. **Mapeie cores/espaços para os tokens** do `tailwind.config.ts`; só estenda o
   config se faltar token.
3. **Tipografia:** `font-display` em títulos, `font-sans` no corpo.
4. **Ícones:** lucide-react. **Moeda:** `formatBRL`. **Classes condicionais:** `cn`.
5. **Server Component por padrão**; `"use client"` só com interatividade.
6. Conteúdo textual em pt-BR e, quando estrutural, em `lib/content/`.
7. Rode `npm run build` e `npm run lint` antes de concluir — devem passar limpos.
