# Prompt de Bootstrap — Food Guard

> **Cole este documento inteiro como primeira mensagem** para um Claude (ou outro
> agente de código) que vai construir / continuar o Food Guard do zero. Ele
> consolida visão de produto, stack, design system, motor do diagnóstico,
> conteúdo de marca e regras de implementação — tudo já alinhado ao estado atual
> do repositório `rafaffernandes/FOOD-GUARD-`.
>
> **Regra zero:** responda e escreva **sempre em pt-BR** (chat, commits, PRs,
> comentários de código). Server Components por padrão; `"use client"` só com
> interatividade.

---

## 0. Como usar este prompt

Você vai construir um site institucional + produto-núcleo (um **diagnóstico de
conformidade sanitária**) para o **Food Guard**, uma consultoria nutricional para
food service. Trate este documento como a fonte da verdade do briefing. Antes de
declarar qualquer coisa pronta: `npm run build` ✓ e `npm run lint` ✓.

---

## 1. Missão & visão do produto

**Food Guard = conformidade sanitária e nutricional como software + serviço.**

- **Promessa:** "Consultoria nutricional para food service. Nutricionista
  responsável, documentação em dia e equipe orientada — sua operação pronta pra
  qualquer fiscalização."
- **Público:** donos de restaurantes, dark kitchens, padarias, buffets, escolas,
  refeições coletivas e indústria de alimentos — em São Paulo e Grande SP.
- **Produto-núcleo (o coração do funil):** um **diagnóstico de 5 perguntas** que
  calcula um *score* de conformidade (0–100), estima "dinheiro em risco" (multa +
  custo de adequação tardia + chance de autuação), monta um *checklist* de
  lacunas e recomenda um plano. Termina num `ResultReport` com captura de lead.
- **Modelo de negócio:** 3 planos de assessoria recorrente (ver §7).

---

## 2. Stack técnica (fixa — não troque sem pedir)

- **Next.js 15 (App Router)** + **React 19** + **TypeScript estrito** (`strict: true`).
- **Tailwind CSS 3** utility-first (sem CSS Modules, sem styled-components).
- **lucide-react** = única biblioteca de ícones.
- **Forms:** `react-hook-form` + `zod` (`@hookform/resolvers`).
- **Conteúdo:** blog em **MDX** via `next-mdx-remote` + `gray-matter`.
- **Integrações:** `@supabase/supabase-js`, `resend` (e-mail), `pdf-lib` (relatório
  PDF), **Asaas** (checkout/pagamento, via `fetch`).
- **Utilitários:** `clsx` + `tailwind-merge` (helper `cn()`).
- Alias de import: `@/*` → raiz do projeto.
- Scripts: `npm run dev | build | start | lint`.

---

## 3. Estrutura de pastas (replicar exatamente)

```
app/                                  # rotas (App Router) + API
  layout.tsx                          # fontes, metadata/SEO, Nav, Footer, Analytics, JSON-LD
  page.tsx                            # home
  diagnostico/page.tsx                # fluxo do diagnóstico
  planos/page.tsx  sobre/page.tsx  contato/page.tsx
  blog/page.tsx  blog/[slug]/page.tsx
  api/leads/route.ts                  # recebe diagnóstico, RECALCULA score no servidor, grava lead
  api/checkout/route.ts               # cria cobrança Asaas
  api/webhooks/asaas/route.ts         # confirma pagamento
  sitemap.ts  robots.ts  globals.css
components/
  ui/        # design system: Button, Card, Badge, Container, Section(+SectionHeading),
             # Nav, Footer, Logo, PlanCard, FAQ, FadeInOnScroll, FloatingWhatsApp, PlanCheckoutButton
  diagnostic/  # DiagnosticFlow (orquestra), GatingForm, ResultReport, ScoreGauge
  analytics/   # Analytics.tsx
lib/
  content/   # site.ts, plans.ts, photos.ts  (conteúdo/constantes da marca)
  diagnostic/  # questions.ts (perguntas/pesos), engine.ts (scoring puro), report.ts
  integrations/  # supabase, resend, asaas, pdf, report, types  (todos c/ fallback dev)
  utils.ts  analytics.ts  blog.ts
content/blog/*.mdx                     # artigos
supabase/schema.sql                    # tabelas leads + consent_log
tailwind.config.ts                     # ÚNICA fonte da verdade dos tokens
```

**Princípio:** separe **dados** (textos, planos, perguntas → `lib/content` e
`lib/diagnostic`) de **apresentação** (componentes). Para mudar copy/preço, edite
o `lib/`, nunca o componente.

---

## 4. Design System — tokens REAIS (de `tailwind.config.ts`)

> Use sempre o token; nunca hex solto. Ao trazer valor do Figma, mapeie para o
> token mais próximo; só estenda o config se faltar token.

### Cores

```ts
colors: {
  brand: { // verde saúde/food (lima→oliva). brand-600 = ação principal
    50:"#f3faea",100:"#e4f4ca",200:"#cbe99c",300:"#aedb66",400:"#92cb40",
    500:"#74b43c",600:"#588f2c",700:"#446e22",800:"#37571d",900:"#2f4a1c",950:"#16280a",
  },
  navy: { // contraste/seriedade (textos de marca, seções escuras)
    50:"#eef3f9",100:"#d9e4f1",200:"#b4c8e0",300:"#85a3c9",400:"#5179ab",
    500:"#2f5a8f",600:"#1d4373",700:"#16335c",800:"#102544",900:"#0b1c34",950:"#071124",
  },
  ink:    { DEFAULT:"#0e1f33", soft:"#3a4b60", muted:"#6b7a8c" }, // texto forte/2º/3º
  surface:{ DEFAULT:"#ffffff", soft:"#f4f8fc", sunken:"#e9eff5" }, // fundos / borda
  danger: { 50:"#fef2f2",100:"#fee2e2",500:"#ef4444",600:"#dc2626",700:"#b91c1c" }, // risco/dinheiro em risco
  warn:   { 50:"#fffbeb",100:"#fef3c7",500:"#f59e0b",600:"#d97706" }, // alerta/risco médio
}
```

### Tipografia
- `font-sans` → **Inter** (corpo). `font-display` → **Sora** (títulos).
- Carregadas via `next/font/google` em `app/layout.tsx`, expostas como CSS vars
  `--font-inter` / `--font-display`. Sem `<link>`, sem CDN externo.
- Padrão de título: `font-display font-bold tracking-tight`.

### Outros tokens
- **Raios:** `rounded-xl|2xl|3xl` (1 / 1.25 / 1.75rem). Botões usam `rounded-full`.
- **Sombras:** `shadow-soft` (cards), `shadow-lift` (hover/destaque), `shadow-glow`.
- **Animações:** `animate-fade-up`, `animate-scale-in`, `animate-float`, `animate-marquee`.
- **Backgrounds decorativos:** `bg-grid-faint`, `bg-hero-glow`, `bg-brand-sheen`.

---

## 5. Biblioteca de componentes — reutilize antes de criar

Componentes funcionais, **um por arquivo, PascalCase**, Server Component por
padrão. Variantes via mapas de classe + `cn()`. Componentes polimórficos viram
`<Link>` se receberem `href` (ex.: `Button`).

```tsx
// padrão a seguir (components/ui/Button.tsx)
const variants = { primary:"bg-brand-600 text-white …", outline:"…", ghost:"…" };
const sizes = { sm:"…", md:"…", lg:"…" };
<Button variant="primary" size="lg" href="/diagnostico">Fazer diagnóstico</Button>
```

**Primitivos que devem existir:** `Button`, `Card`, `Badge`, `Container`,
`Section` + `SectionHeading`, `Nav`, `Footer`, `Logo`, `PlanCard`, `FAQ`,
`FadeInOnScroll`, `FloatingWhatsApp`, `PlanCheckoutButton`.
Sem Storybook — os "exemplos vivos" são as páginas em `app/`.

---

## 6. Produto-núcleo: o diagnóstico

### 6.1 As 5 perguntas (`lib/diagnostic/questions.ts`)
Cada opção tem `risk` (pontos de risco; quanto maior, pior). A 1ª pergunta é só
**perfil** (`PROFILE_QUESTIONS = ["tipo"]`) — entra no score mas **não vira item
de checklist**. As outras 4 têm uma frase de `gap` (o que fazer quando risco > 0).

1. **tipo** — "Qual o tipo da sua operação?" (perfil de risco)
   escola/refeição coletiva `20` · restaurante/bar/dark kitchen `15` ·
   padaria/confeitaria `12` · hotel/buffet/eventos `18` · indústria/outro `22`.
2. **nutri** — "Você tem nutricionista responsável no CNPJ hoje?"
   ativo c/ visitas `0` · no papel `10` · não tenho `20` · não sei `15`.
   *gap:* "Designar um nutricionista responsável (CRN ativo)…"
3. **documentacao** — "Manual de Boas Práticas e POPs estão em dia?"
   atualizados ≤12m `0` · desatualizados `8` · parciais `12` · nunca feitos `18`.
4. **fiscalizacao** — "Quando foi a última visita da vigilância?"
   ≤12m sem ressalva `0` · ≤12m c/ auto `15` · >2 anos `6` · nunca `10`.
5. **treinamento** — "Equipe treinada em boas práticas nos últimos 12 meses?"
   toda equipe c/ ata `0` · parcial sem registro `6` · >12m `10` · nunca `15`.

### 6.2 Motor de pontuação (`lib/diagnostic/engine.ts` — função pura testável)
```
riskTotal = soma dos risks das respostas
score     = clamp(100 − riskTotal, piso 15, teto 100)
banda:  score < 45 → "critico" (Alto) ;  < 70 → "medio" ;  senão → "baixo"
```
Cada banda mapeia para **plano recomendado + dinheiro em risco + insight**:

| Banda | Label | Plano | Multa estimada | Adequação tardia | Chance autuação |
|---|---|---|---|---|---|
| critico | Alto | premium | R$ 10–30 mil | R$ 12.000 | até 78% |
| medio | Médio | essencial | R$ 5–15 mil | R$ 7.000 | ~45% |
| baixo | Baixo | basico | R$ 2–8 mil | R$ 3.000 | ~12% |

O `insight` prioriza o gap mais grave nesta ordem: nutricionista → documentação →
fiscalização → treinamento (ex.: *"…Prioridade nº 1: designar um nutricionista…"*).
Saída do motor: `{ score, band, bandLabel, recommendedPlan, insight, moneyAtRisk,
checklist[], gapsCount }`.

### 6.3 Fluxo (`components/diagnostic/`)
`DiagnosticFlow` orquestra: perguntas → revelação parcial (1 insight) →
**`GatingForm`** (captura nome/whatsapp/e-mail com `react-hook-form`+`zod`) →
**`ResultReport`** completo (`ScoreGauge` + checklist + dinheiro em risco + plano
recomendado + CTA). **O score é SEMPRE recalculado no servidor** em
`app/api/leads/route.ts` (nunca confie no número vindo do cliente); o lead é
gravado no Supabase e dispara e-mail (Resend) + PDF (`pdf-lib`).

---

## 7. Conteúdo & marca

### 7.1 Constantes (`lib/content/site.ts`)
- **name:** "Food Guard" · **tagline:** "Consultoria nutricional para food service."
- **whatsapp:** `5511976466553` · **email:** `contato@foodguard.com.br`
- **city:** "São Paulo · Grande SP"
- **social:** Instagram `@foodguard.assessoria` · LinkedIn `foodguardassessoria`
- **founders:** Renan Muniz (nutricionista responsável, CRN ativo, +10 anos em
  food service, co-founder) · Rafael Fernandes (produto/IA/operação digital, co-founder)
- **guarantee:** "90 dias para estar 100% em conformidade real — se não chegarmos
  lá, seguimos sem custo extra."
- **regulations:** `["RDC 216/2004 (Anvisa)", "Portaria 2.619/2011"]`
- Helper `whatsappLink(text?)` monta `https://wa.me/<num>?text=…`.

### 7.2 Planos (`lib/content/plans.ts`) — valores REAIS
> Sempre formate moeda com `formatBRL()` de `lib/utils.ts`.

| Plano | Preço | Posicionamento | Destaque |
|---|---|---|---|
| **Básico** | **R$ 1.200** | "Pra sair do zero e deixar a documentação em dia." | — |
| **Essencial** | **R$ 2.200** | "Pra operar com confiança e passar qualquer fiscalização." | — |
| **Premium** | **R$ 3.200** | "Pra quem quer um nutricionista como sócio da conformidade." | ✅ highlighted |

Eixos de comparação (`comparisonRows`): visitas presenciais · nutricionista RT ·
documentação ANVISA e POPs · Manual de Boas Práticas · WhatsApp · análise de
cardápio · criação de ficha técnica. O **nutricionista Responsável Técnico é
exclusivo do Premium** (visitas 2x/semana, WhatsApp prioritário ≤2h, fichas
incluídas).

### 7.3 Voz da marca (regras canônicas)
- Diga **"nutricionista responsável"**; legislação = **RDC 216/2004 + Portaria
  2.619/2011** (nunca "CFN 600").
- Tom direto, foco em risco financeiro/operacional. pt-BR sempre.

---

## 8. Páginas a construir (App Router)
- **`/` (home):** hero (com `bg-hero-glow`/`bg-grid-faint`), prova de dor
  (fiscalização/multa), CTA para o diagnóstico, planos resumidos, founders, FAQ,
  `FloatingWhatsApp`.
- **`/diagnostico`:** o `DiagnosticFlow` (produto-núcleo).
- **`/planos`:** 3 `PlanCard` + tabela comparativa (`comparisonRows`) + checkout.
- **`/sobre`:** história + founders + credenciais + regs.
- **`/contato`:** formulário (rhf+zod → `api/leads`) + WhatsApp.
- **`/blog` e `/blog/[slug]`:** índice + artigo MDX (`.prose-fg`).

---

## 9. Integrações (`lib/integrations/` — degradação graciosa obrigatória)
Cada integração **funciona sem env var**, logando em modo dev (nunca quebra o
build/runtime local). Mantenha esse contrato ao adicionar serviços.
- **supabase.ts** — grava `leads` + `consent_log` (schema em `supabase/schema.sql`).
- **resend.ts** — e-mail do relatório ao lead.
- **pdf.ts / report.ts** — gera o PDF do diagnóstico.
- **asaas.ts** — cria cobrança (checkout) e processa webhook de confirmação.
- **types.ts** — contratos compartilhados.

Env vars relevantes: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP`,
`NEXT_PUBLIC_CONTACT_EMAIL`, + chaves de Supabase/Resend/Asaas.

---

## 10. SEO, analytics & assets
- `app/layout.tsx`: metadata, Open Graph, **JSON-LD** (Organization/Service),
  fontes via `next/font`, `Nav`, `Footer`, `Analytics`.
- `sitemap.ts` + `robots.ts` automáticos.
- Scripts externos (GA/Pixel/Calendly) só via `next/script` com `strategy`.
- **Imagens:** `public/` + **`next/image`** (nunca `<img>` cru). Visual atual é
  CSS + SVG (lucide), sem bitmaps — mantenha assim p/ LCP quando possível.

---

## 11. Regras de ouro de implementação
1. **Reutilize** primitivos de `components/ui/` antes de criar.
2. **Mapeie cores/espaços para tokens** do `tailwind.config.ts`; só estenda se faltar.
3. Títulos com `font-display`; corpo com `font-sans`.
4. Ícones = lucide-react; moeda = `formatBRL`; classes condicionais = `cn`.
5. Server Component por padrão; `"use client"` só com estado/efeito/interação.
6. Conteúdo textual em pt-BR; dados estruturais em `lib/content` / `lib/diagnostic`.
7. Lógica de negócio = função pura em `lib/`, isolada da UI; score recalculado no servidor.

---

## 12. Workflow & quality gates
- **Branch de feature** sempre (nunca empurre direto na `main` sem pedido).
- Após cada bloco: `npm run build` ✓ + `npm run lint` ✓.
- Se mexeu no fluxo do diagnóstico, rode o **E2E (3 cenários: crítico / médio /
  baixo)**.
- **Deploy (quando pedido):** commit na feature → push duplo (feature, depois
  `git push origin <feature>:main`). A Vercel publica em
  `https://food-guard-cnhl.vercel.app/` em 1–2 min. Não abra túneis (ngrok etc.).
- **Respostas curtas** (< ~500 tokens). Arquivos longos: um `Write` por vez.

---

## 13. Definição de "pronto"
✅ `npm run build` limpo · ✅ `npm run lint` limpo · ✅ E2E do diagnóstico (se
tocado) · ✅ tokens do design system respeitados · ✅ copy em pt-BR e na voz da
marca · ✅ dados em `lib/`, não hard-coded na UI.

---

## ⚠️ Pontos a reconciliar (divergências CLAUDE.md × código atual)
Decida explicitamente antes de seguir — o código atual é a fonte da verdade aqui:
1. **Preços:** o CLAUDE.md cita `700 / 1.200 / 1.999`, mas `plans.ts` usa
   **`1.200 / 2.200 / 3.200`** (valores adotados acima).
2. **Paleta:** o CLAUDE.md descreve verde `#059669`; o real é verde-lima/oliva
   (`brand-600 #588f2c`) **+ paleta `navy`** não documentada no CLAUDE.md.
3. **Sigla "RT":** o CLAUDE.md pede para nunca usar "RT", mas o Premium em
   `plans.ts` usa "Nutricionista Responsável Técnico (RT)". Padronize.
4. **Garantia:** o CLAUDE.md proíbe "dinheiro de volta"/"carência"; a `guarantee`
   atual ("seguimos sem custo extra") respeita isso — mantenha o fraseado.
