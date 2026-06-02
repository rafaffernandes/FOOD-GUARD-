# Food Guard — Agente de Prospecção e Qualificação de Leads

Desenho do agente que **qualifica** os leads que chegam pelo diagnóstico e
**orquestra o follow-up** (prioriza, escolhe canal, redige a primeira mensagem).
Inclui o scaffold inicial em [`lib/agent/`](../../lib/agent/).

> **Princípio:** o diagnóstico já entrega cada lead com **score de risco, banda e
> plano recomendado** (`lib/diagnostic/engine.ts`). O agente usa esse sinal pra
> qualificar de forma barata e determinística — IA entra só pra redigir/conversar,
> nunca pra inventar a regra de negócio.

---

## 1. Dois modos (escopos distintos)

| Modo | O que é | Status | Risco/LGPD |
|---|---|---|---|
| **Qualificação (inbound)** | Pontuar e priorizar leads que **já optaram** pelo diagnóstico, e conduzir o follow-up | ✅ scaffold neste PR | Baixo — há consentimento (`consent_log`) |
| **Prospecção (outbound)** | Encontrar e abordar food services que **não** pediram contato | 📋 só desenho | **Alto** — exige base de opt, evitar spam |

> ⚠️ **Comece pelo inbound.** Outbound a frio por WhatsApp/e-mail tem risco legal
> (LGPD, regras da Meta). Detalhes em §6.

---

## 2. Arquitetura (inbound)

```
Diagnóstico (site)
   │  POST /api/leads  → score recalculado no servidor + saveLead (Supabase)
   ▼
[ AGENTE: lib/agent ]
   1. qualify()      → tier A/B/C, prioridade, urgência, SLA, canal   (determinístico, puro)
   2. playbook()     → sequência de follow-up por tier                (templates pt-BR)
   3. draftMessage() → personaliza a 1ª mensagem                      (IA opcional, c/ fallback)
   ▼
Canais de saída
   • WhatsApp (Cloud API)   → mensagem/atendimento
   • E-mail (Resend)        → nutrição
   • Notificação interna    → avisa o nutricionista dos leads tier A
   ▼
Supabase: status do lead (novo → contatado → call → cliente/perdido)
```

**Por que assim:** a regra de priorização é **pura e testável** (não depende de
IA nem de rede), igual ao motor de diagnóstico. A IA é uma camada opcional com
**degradação graciosa** — sem `ANTHROPIC_API_KEY`, usa os templates do playbook.

---

## 3. Lógica de qualificação

Combina três eixos do `LeadPayload` (já existente):

1. **Urgência regulatória / dor** → vem da `band` e das respostas:
   - `band: critico` = alto risco de autuação = dor aguda = mais propenso a fechar.
   - resposta `fiscalizacao = fisc_auto` (autuado nos últimos 12 meses) = **gatilho quente**.
   - resposta `nutri = nutri_nenhum` (sem nutricionista) = dor central da oferta.
2. **Poder de decisão** → `role`: Diretor/Gestor (decisor) > Gerente/Supervisor.
3. **Valor potencial** → segmento (`answers.tipo`) e `recommendedPlan`
   (premium > essencial > básico) puxam o ticket.

Saída — **tier + plano de ação**:

| Tier | Perfil | SLA 1º contato | Canal | Ação |
|---|---|---|---|---|
| **A** | dor aguda + decisor (ex.: autuado, Premium, Diretor) | **15 min** | ligação/WhatsApp | nutricionista contata pessoalmente |
| **B** | dor relevante OU decisor | 2 h | WhatsApp | mensagem + agendar call |
| **C** | risco baixo / influenciador | 24 h | e-mail | nutrir com conteúdo + diagnóstico |

Implementação: [`lib/agent/qualify.ts`](../../lib/agent/qualify.ts) (função pura).

---

## 4. Follow-up (playbook)

Sequência por tier, com toque humano nos quentes e nutrição nos frios. Templates
em [`lib/agent/playbook.ts`](../../lib/agent/playbook.ts). Respeita a voz da marca
(nunca "RT"; RDC 216 + Portaria 2.619; sem "carência"/"dinheiro de volta").

Exemplo (tier A, WhatsApp):
> "Oi {nome}, aqui é o Renan, nutricionista responsável da Food Guard. Vi que sua
> operação ({empresa}) saiu com **risco {banda}** no diagnóstico — e que houve uma
> autuação recente. Esse é exatamente o tipo de situação que a gente resolve.
> Consegue falar 10 min hoje?"

A IA (opcional) personaliza com base no `insight` e no `topGap` do resultado.

---

## 5. Camada de IA (opcional, com fallback)

`draftMessage()` pode chamar a **Claude API** (`ANTHROPIC_API_KEY`) pra adaptar
tom e contexto. Sem a chave, retorna o template do playbook — **o agente nunca
quebra**. A IA recebe um prompt com: dados do lead, score, banda, gap principal e
a voz da marca; e devolve a mensagem. A regra de tier **nunca** é decidida pela
IA (auditabilidade).

---

## 6. Prospecção outbound (desenho — implementar depois, com cautela)

**Fontes possíveis:** Google Maps/Places (restaurantes por região), bases
públicas, parcerias (contadores, fornecedores), eventos do setor.

**Fluxo proposto:** enriquecer (CNPJ/contato) → segmentar por ICP → abordagem
**warm** (conteúdo, LinkedIn, indicação) antes de qualquer mensagem direta.

**Guardrails LGPD/Meta (obrigatórios):**
- Base **legítima** de contato e opção de descadastro em toda mensagem.
- Nada de disparo em massa por WhatsApp pessoal (ban + ilegal). Use a Cloud API
  com templates aprovados e opt-in.
- Registrar consentimento/origem (como o `consent_log` já faz no inbound).

> Recomendo validar o inbound primeiro; outbound entra quando houver processo e
> base de opt-in.

---

## 7. Integrações necessárias

| Peça | Como | Doc |
|---|---|---|
| Leads + status | Supabase (já existe; adicionar coluna `status`/tabela `lead_activity`) | [setup §2](../setup-producao.md) |
| WhatsApp atendimento | **WhatsApp Cloud API** (Meta) — número, token, templates | a configurar |
| E-mail nutrição | Resend (já existe) | [setup §3](../setup-producao.md) |
| IA (opcional) | `ANTHROPIC_API_KEY` (Claude API) | — |
| Notificação interna | WhatsApp/e-mail pro nutricionista nos tier A | — |

---

## 8. Roadmap de implementação

1. **Fase 1 (este PR):** qualificação pura + playbook (`lib/agent/`). Testável,
   sem dependências novas.
2. **Fase 2:** persistir `status` do lead no Supabase + notificar tier A.
3. **Fase 3:** WhatsApp Cloud API (receber/enviar) + `draftMessage` com Claude.
4. **Fase 4:** painel simples de leads (fila por tier) e métricas de conversão.
5. **Fase 5 (opcional):** prospecção outbound com guardrails de §6.

---

*Scaffold da Fase 1 incluído. Peça a Fase 2 quando o Supabase estiver no ar.*
