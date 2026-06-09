# Food Guard — Fase 3: Estratégia e Organização dos Agentes

Três agentes de IA, em modo **human-in-the-loop** (o agente **rascunha**, um
humano **aprova**, só então **envia/publica**), construídos com o **Claude Agent
SDK / Claude API** em TypeScript, rodando no próprio Next/Vercel. Meta: **tudo no
ar até 01/07**.

---

## 1. Decisão de arquitetura

**Claude API + tool use no Next/Vercel** (não Managed Agents). Motivos:

- Encaixa na stack atual (Next 15 + TypeScript + Vercel + Supabase + Resend).
- O fluxo é *draft → fila → aprovação → envio* — um workflow com saída
  estruturada, não um agente autônomo de container. Não precisamos da Anthropic
  rodar o loop nem hospedar sandbox.
- Estado e fila de aprovação vivem no **Supabase** (que já temos).
- Saída estruturada (Zod + `zodOutputFormat`) garante rascunhos válidos e
  gravar­áveis. Voz da marca vai num bloco de system **cacheado** (prompt caching).

Código: [`lib/agent/`](../../lib/agent/) · `client.ts` (cliente + voz da marca +
`draftStructured`), `schemas.ts` (Zod), `prospeccao.ts`, `followup.ts`,
`conteudo.ts`, `store.ts` (Supabase).

---

## 2. Os três agentes

| Agente | Papel | Modelo | Gatilho | Saída |
|---|---|---|---|---|
| **Prospecção** | Acha food service **recém-aberto** (Grande SP, **Zona Leste 1º**) e rascunha a 1ª abordagem → diagnóstico | Opus 4.8 | Cron semanal | `outreach_drafts` (pendente) |
| **Qualificação** | Pega o lead do diagnóstico, classifica (tier A/B/C) e rascunha follow-up | Opus 4.8 | Evento: novo lead | `lead_activity` (pendente) |
| **Conteúdo** | Rascunha posts (LinkedIn/Instagram) e artigos (blog) → site | Opus 4.8 | Cron + sob demanda | `content_drafts` (pendente) |

> **Modelo:** default Opus 4.8. Para alto volume/custo, troque o *drafting* por
> Sonnet 4.6 (constante `MODELS` em `client.ts`) — decisão de custo do negócio.
> Cada agente usa `thinking: adaptive` e `effort` calibrado (prospecção/conteúdo
> `medium`, follow-up `low`).

Detalhe de cada um: [agente-prospeccao.md](./agente-prospeccao.md) ·
[agente-qualificacao.md](./agente-qualificacao.md) ·
[agente-conteudo.md](./agente-conteudo.md). Canais sociais + ads:
[plano-conteudo-social.md](./plano-conteudo-social.md).

---

## 3. Organização (como os agentes se conectam)

O **Supabase é o estado compartilhado**. Nenhum agente envia nada sozinho — tudo
passa por uma fila de aprovação humana.

```
PROSPECÇÃO                 QUALIFICAÇÃO                CONTEÚDO
empresas novas (SP/ZL)     lead fez diagnóstico        pauta do calendário
   │ rascunha                 │ qualifica + rascunha       │ rascunha
   ▼                          ▼                            ▼
outreach_drafts           lead_activity               content_drafts
   └──────────────┬───────────────┬─────────────────────┘
                  ▼  FILA DE APROVAÇÃO (humano revisa)
        aprovar → enviar/publicar        rejeitar → descarta
                  │
                  ▼ todos os CTAs levam ao →  DIAGNÓSTICO (lead magnet)
                                               └→ vira lead → Qualificação
```

O diagnóstico é o ponto de convergência: prospecção, conteúdo e ads **alimentam o
diagnóstico**; o diagnóstico gera lead; a qualificação trata o lead. O ciclo
fecha.

---

## 4. Modelo de dados

Tabelas em [`supabase/fase-3-agents.sql`](../../supabase/fase-3-agents.sql)
(rodar após `schema.sql`): `prospects`, `outreach_drafts`, `content_drafts`,
`lead_activity`. Todas com RLS e status de workflow
(`novo → rascunhado → aprovado → enviado/publicado`).

---

## 5. Execução (cron/serverless)

[`vercel.json`](../../vercel.json) agenda os crons; cada um é uma rota protegida
por `CRON_SECRET`:

| Cron | Rota | Agenda | Faz |
|---|---|---|---|
| Prospecção | `/api/agents/prospeccao` | seg 09h (BRT) | rascunha outbound dos prospects novos |
| Conteúdo* | `/api/agents/conteudo` | seg/qui | rascunha posts da semana |

\* a rota de conteúdo segue o mesmo molde da de prospecção (a implementar). A
qualificação roda no evento de novo lead (chamar `draftLeadFollowUp` em
`app/api/leads`), não em cron.

---

## 6. Guardrails (obrigatórios)

- **Human-in-the-loop:** nada sai sem aprovação. Os agentes só gravam rascunhos.
- **LGPD/anti-spam (outbound):** dados de CNPJ são públicos, mas todo contato a
  frio leva **opt-out** ("responda SAIR") e respeita `prospects.optout`. Sem
  disparo em massa por WhatsApp pessoal — usar **WhatsApp Cloud API** com
  templates aprovados. Registrar origem/consentimento.
- **Voz da marca** travada no system prompt (`BRAND_VOICE`): "nutricionista
  responsável" (nunca "RT"); RDC 216/2004 + Portaria 2.619/2011; sem
  "carência"/"dinheiro de volta".
- **Regra de negócio fora da IA:** o tier/SLA do lead é a função pura `qualify()`,
  auditável. A IA só redige.

---

## 7. Variáveis de ambiente

```bash
ANTHROPIC_API_KEY=        # sem ela, os agentes caem em rascunho determinístico
CRON_SECRET=              # protege as rotas de cron
WHATSAPP_CLOUD_TOKEN=     # envio do outbound aprovado (Cloud API da Meta)
WHATSAPP_PHONE_NUMBER_ID=
# + as da Fase 2: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_*
```

---

## 8. KPIs

| Agente | Métrica-chave | Meta inicial |
|---|---|---|
| Prospecção | taxa de resposta do outbound | > 8% |
| Prospecção | prospect → diagnóstico | > 15% |
| Qualificação | tempo até 1º contato (tier A) | < 15 min |
| Qualificação | lead → cliente | > 7% |
| Conteúdo | post → clique no site | acompanhar/escalar o que converte |

---

## 9. Cronograma até 01/07 (hoje: 09/06)

| Semana | Entrega | Quem |
|---|---|---|
| **09–15/06** | Scaffold (este PR) ✓ · criar tabelas no Supabase · setar `ANTHROPIC_API_KEY` + `CRON_SECRET` | Você (chaves) + eu (código) |
| **16–22/06** | Pipeline de dados de empresas novas (Receita/CNPJ → tabela `prospects`, filtro Zona Leste) · WhatsApp Cloud API | Eu + você (conta Meta) |
| **16–22/06** | Tela simples de aprovação de rascunhos (fila) | Eu |
| **23–29/06** | Agente de conteúdo no ar + 1ª leva de posts aprovados · campanhas Google Ads no ar | Eu + você (ads) |
| **30/06–01/07** | Qualificação ligada ao `/api/leads` · go-live dos 3 agentes | Eu |

---

## 10. Como testar agora

Sem `ANTHROPIC_API_KEY`/Supabase, tudo roda em modo dev (rascunho determinístico,
nada persistido). Com as chaves: criar linhas em `prospects` (status `novo`) e
chamar a rota de cron com o header `Authorization: Bearer $CRON_SECRET` →
rascunhos aparecem em `outreach_drafts` para aprovação.
