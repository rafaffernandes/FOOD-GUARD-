# Food Guard

Conformidade sanitária e nutricional **como software**. Site/produto único em
Next.js onde todo o tráfego cai no **diagnóstico regulatório** — 5 perguntas,
score 0–100, revelação parcial, captura de lead (gating) e dashboard de
resultado com duplo CTA (agendar com o RT ou assinar um plano).

> Assessoria de conformidade para food service. RT nutricionista com nome e CRN
> ativo, previsibilidade contratual e tecnologia de bastidor.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** (design tokens da marca: verde saúde + tech)
- **react-hook-form** + **zod** (formulário e validação do gating)
- **Supabase** (captura de lead) · **Resend** + **pdf-lib** (e-mail + PDF do
  relatório) · **Calendly** (agendamento) · **Asaas** (checkout)
- Blog em **MDX** local

## Começando

```bash
npm install
cp .env.example .env.local   # preencha as chaves (opcional p/ dev)
npm run dev                  # http://localhost:3000
```

Sem chaves, o app roda em **modo dev** com degradação graciosa: leads são
logados no console, o e-mail/PDF é pulado e o checkout usa um link de exemplo.

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint`.

## Estrutura

```
app/                 rotas (home, diagnostico, planos, sobre, blog, contato, api)
components/
  diagnostic/        fluxo do diagnóstico (quiz, gauge, gating, dashboard)
  ui/                design system (Button, Card, Nav, Footer, PlanCard…)
lib/
  diagnostic/        questions.ts (perguntas/pesos) + engine.ts (motor de regras)
  content/           plans.ts, site.ts
  integrations/      supabase, resend, asaas, pdf, report (todos com fallback dev)
content/blog/        artigos .mdx
supabase/schema.sql  tabelas leads + consent_log (RLS, consent imutável)
```

## O diagnóstico

O motor (`lib/diagnostic/engine.ts`) é uma função pura: cada uma das 5 perguntas
vale 0–20 pontos (mais pontos = mais conformidade = menor risco).

| Score  | Risco    | Plano recomendado        |
| ------ | -------- | ------------------------ |
| 0–44   | Alto     | Premium (R$ 3.200/mês)   |
| 45–69  | Médio    | Essencial (R$ 2.200/mês) |
| 70–100 | Baixo    | Básico (R$ 1.200/mês)    |

O score é **recalculado no servidor** (`app/api/leads`) — o cliente não é fonte
de verdade.

## Integrações (variáveis de ambiente)

Todas opcionais em dev. Veja `.env.example` para a lista completa.

- **Supabase** — rode `supabase/schema.sql` no SQL Editor. Use a Service Role
  key apenas no servidor.
- **Resend** — envia o relatório (HTML + PDF anexo). Configure um domínio
  verificado em `RESEND_FROM`.
- **Calendly** — `NEXT_PUBLIC_CALENDLY_URL` com o link do evento (embed inline).
- **Asaas** — `ASAAS_API_KEY` (API) ou `ASAAS_PAYMENT_LINK_*` (links estáticos).
  Webhook em `app/api/webhooks/asaas` validado por `ASAAS_WEBHOOK_TOKEN`.
- **Analytics** — `NEXT_PUBLIC_GA_ID` e `NEXT_PUBLIC_META_PIXEL_ID` (opcionais).

## Deploy

Recomendado **Vercel**: importe o repositório, configure as variáveis de
ambiente do `.env.example` e faça o deploy. `npm run build` deve passar limpo.
