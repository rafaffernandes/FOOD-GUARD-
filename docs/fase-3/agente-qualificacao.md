# Agente de Qualificação — Tratamento do Lead do Diagnóstico

Pega o lead que acabou de fazer o diagnóstico, **classifica** (regra pura) e
**rascunha o follow-up** na voz da marca. Código:
[`lib/agent/qualify.ts`](../../lib/agent/qualify.ts) (regra, Fase 1) +
[`lib/agent/playbook.ts`](../../lib/agent/playbook.ts) (templates) +
[`lib/agent/followup.ts`](../../lib/agent/followup.ts) (camada de IA, Fase 3).

---

## 1. Como funciona

```
lead (do diagnóstico)
   │
   ▼ qualify(lead)            ← função PURA e auditável (não é IA)
   │   tier A/B/C · urgência · SLA · canal · motivos
   ▼ draftLeadFollowUp(lead)  ← IA redige a mensagem (com fallback no playbook)
   │
   ▼ lead_activity (pendente) → aprovação humana → envio (WhatsApp/Resend)
```

A **regra de negócio fica fora da IA**: tier e SLA vêm de `qualify()`, que combina
banda de risco + cargo + gatilhos (autuação recente, sem nutricionista). A IA só
escreve a mensagem — auditável e previsível.

---

## 2. Tiers e SLA

| Tier | Perfil | SLA 1º contato | Canal | Ação |
|---|---|---|---|---|
| **A** | dor aguda + decisor (ex.: autuado, Premium, Diretor) | **15 min** | ligação/WhatsApp | nutricionista contata pessoalmente |
| **B** | dor relevante OU decisor | 2 h | WhatsApp | mensagem + agendar conversa |
| **C** | risco baixo / influenciador | 24 h | e-mail | nutrir com conteúdo |

---

## 3. Configuração

| Item | Valor |
|---|---|
| Modelo | `claude-opus-4-8` (`MODELS.qualificacao`) |
| Thinking / effort | adaptive / `low` (mensagem curta) |
| Saída estruturada | `FollowUpDraftSchema` (channel, message, rationale) |
| Gatilho | evento de novo lead (chamar em `app/api/leads`) |
| Fallback | `playbook.draftFirstMessage` se IA não configurada |

---

## 4. Integração (próximo passo)

Em [`app/api/leads/route.ts`](../../app/api/leads/route.ts), após `saveLead`,
chamar `draftLeadFollowUp(lead)` e gravar em `lead_activity` (pendente). Tier A
dispara **notificação imediata** ao nutricionista (WhatsApp/e-mail interno) para
respeitar o SLA de 15 min. O envio ao lead ocorre após aprovação.

> Já temos `processLead(lead)` (Fase 1) devolvendo qualificação + playbook
> determinístico; `draftLeadFollowUp` é a versão com IA, mantendo o fallback.
