# Food Guard — Plano de Marketing (aquisição de leads)

Estratégia pra transformar visitantes em **leads qualificados** (diagnóstico
preenchido) e leads em clientes. Foca em dois motores: **conteúdo/SEO** (blog) e
**tráfego pago** (Google + Meta). Números de budget vêm de
[`docs/unit-economics.md`](../unit-economics.md).

> **Voz da marca** (obrigatória — ver `CLAUDE.md`): "nutricionista responsável"
> (nunca "RT"); legislação **RDC 216/2004 + Portaria 2.619/2011**; **sem**
> "carência", **sem** "dinheiro de volta". Tom: especialista que tira o medo da
> fiscalização, direto e sem juridiquês.

---

## 1. Objetivo (12 meses)

| Horizonte | North star | Meta de leads/mês | Clientes ativos |
|---|---|---|---|
| Mês 1–2 (validação) | achar CPL < R$ 70 | 30 | 2–3 |
| Mês 3–6 (tração) | LTV/CAC > 8x estável | 60–120 | 12–15 |
| Mês 7–12 (escala) | MRR R$ 50k+ | 120–240 | 30–40 |

**Lead = preencheu o gating do diagnóstico** (nome, e-mail, telefone, empresa) —
e já chega com **score de risco**, o que torna a qualificação muito mais barata.

---

## 2. ICP (cliente ideal) e segmentos

**Quem:** dono/sócio ou gestor de operação de food service na Grande SP,
faturamento que comporta consultoria recorrente, com **medo concreto de
fiscalização** ou já autuado.

| Segmento | Dor principal | Gatilho de compra |
|---|---|---|
| Dark kitchen / delivery | alvará e operar "invisível" em conformidade | abrir/regularizar pra entrar em apps |
| Restaurante / bar | autuação, interdição, reputação | notificação da vigilância |
| Padaria / confeitaria / produção | manipulação, rotulagem, POPs | crescimento e novos pontos |
| Buffet / eventos / hotel | volume e variabilidade | contrato grande exige conformidade |
| Refeição coletiva / escola / creche | maior risco regulatório (público vulnerável) | exigência de contratante/edital |

**Anti-ICP** (não gastar ads): pessoa física, food truck informal sem CNPJ,
fora de SP (por ora — operação é presencial).

---

## 3. Posicionamento e ângulos de mensagem

**Promessa central:** *"Sua operação pronta pra qualquer fiscalização — com
nutricionista responsável, documentação em dia e equipe orientada."*

Ângulos pra testar (cada um vira anúncio + artigo):

1. **Medo/urgência:** "Multa de vigilância sanitária vai de R$ 2 mil a R$ 30 mil.
   Você passaria numa fiscalização hoje?"
2. **Autoridade/conformidade:** "RDC 216 e Portaria 2.619 explicadas — e como
   ficar 100% em dia."
3. **Dor do RT fantasma:** "Tem nutricionista só no papel? Isso não te protege."
4. **Diagnóstico (lead magnet):** "Descubra seu risco sanitário em 2 minutos —
   grátis."
5. **Ganho/tranquilidade:** "Durma tranquilo: um nutricionista responsável
   cuidando da sua cozinha."

> O **diagnóstico gratuito** é o lead magnet de todos os canais: baixo atrito,
> entrega valor na hora (score + relatório PDF) e qualifica sozinho.

---

## 4. Funil

```
TOPO  (descoberta)        → Blog/SEO, Meta Ads interesse, LinkedIn, Reels
MEIO  (consideração)      → Diagnóstico gratuito  ← LEAD MAGNET central
FUNDO (decisão)           → Relatório + WhatsApp/call → planos
RETER (pós)               → Onboarding, indicação, conteúdo de cliente
```

- **Topo:** atrair com dor/educação. CTA = "Fazer diagnóstico".
- **Meio:** o diagnóstico captura o lead com score. Relatório por e-mail (Resend).
- **Fundo:** WhatsApp do nutricionista + proposta do plano recomendado pelo score.
- **Retargeting:** quem começou e não terminou o diagnóstico, e quem virou lead
  mas não fechou.

---

## 5. Canais

### 5.1 Google Ads — Search (maior intenção, prioridade 1)

Pessoas que **já estão procurando**. Comece aqui.

**Grupos de anúncio + palavras-chave (correspondência de frase/exata):**

| Grupo | Palavras-chave | Intenção |
|---|---|---|
| Responsável técnico | `nutricionista responsável técnico restaurante`, `RT nutricionista food service`, `responsável técnico cozinha industrial` | alta |
| Vigilância/autuação | `fui autuado vigilância sanitária`, `multa vigilância sanitária restaurante`, `como passar na vigilância sanitária` | altíssima |
| Documentação/RDC | `manual de boas práticas RDC 216`, `POP food service`, `consultoria RDC 216` | alta |
| Alvará/abertura | `alvará sanitário dark kitchen`, `como abrir dark kitchen SP`, `licença vigilância sanitária restaurante` | alta |
| Consultoria | `consultoria segurança alimentar SP`, `consultoria nutricional restaurante` | média-alta |

**Negativas:** `curso`, `concurso`, `vaga`, `emprego`, `salário`, `faculdade`,
`CLT`, `grátis download`.

**Copy (exemplos):**
- Título: *"Passe em Qualquer Fiscalização"* · *"Nutricionista Responsável p/ seu Food Service"* · *"Diagnóstico Sanitário Grátis"*
- Descrição: *"Documentação ANVISA, POPs e equipe orientada. Faça o diagnóstico gratuito em 2 min e veja seu risco."*
- Extensões: sitelinks (Planos, Diagnóstico, Blog), chamada (WhatsApp), frase de destaque ("RDC 216 · Portaria 2.619").

**Config:** Lance por **conversão** = `lead_captured`. Geo: Grande SP. Início:
R$ 1.500/mês. CPL-alvo < R$ 70.

### 5.2 Meta Ads (Instagram/Facebook) — interesse + retargeting

Gera demanda (interrompe quem não está buscando) e recupera quem escapou.

**Campanhas:**
1. **Prospecção (interesse):** donos de restaurante, gastronomia, food service,
   delivery; cargos de proprietário/gestor; Grande SP. Objetivo: conversão
   (`lead_captured`) ou tráfego pro diagnóstico.
2. **Lookalike:** 1–3% a partir da lista de leads/clientes (subir via Supabase →
   Meta) — ativar após ~50 leads.
3. **Retargeting:** visitantes do site e quem iniciou mas não terminou o
   diagnóstico (`diagnostic_started` sem `lead_captured`). Criativo: "Faltou
   pouco — termine seu diagnóstico."

**Criativos a testar:** vídeo curto do nutricionista (Renan) explicando 1 erro
comum; carrossel "5 itens que a vigilância cobra primeiro"; depoimento/print de
relatório; before/after de cozinha. Sempre CTA → diagnóstico.

**Config:** comece R$ 30–50/dia. Vença um criativo antes de escalar.

### 5.3 SEO / Blog (orgânico — composto, prioridade de longo prazo)

Já existem 4 artigos. Estratégia de **clusters** e calendário em
[`docs/marketing/calendario-editorial.md`](./calendario-editorial.md). Meta:
2 artigos/semana, mirando long-tail de baixa concorrência (RDC, POPs, alvará,
multas por cidade). Cada artigo termina com CTA pro diagnóstico.

### 5.4 LinkedIn orgânico (fundadores)

Renan posta autoridade técnica (casos, mudanças de norma, bastidores de
fiscalização); Rafael posta a construção do produto. CAC ~zero, ótimo pra B2B e
refeição coletiva/corporativo.

### 5.5 Indicação

Cliente satisfeito é o canal mais barato. Programa simples: 1 mês de desconto
pra quem indica e pro indicado que fechar.

---

## 6. Orçamento e fases

Ver detalhes e premissas em [`docs/unit-economics.md`](../unit-economics.md).

| Fase | Ads/mês | Split sugerido | Leads | Clientes/mês |
|---|---|---|---|---|
| Validação (mês 1–2) | R$ 1.500 | 70% Google / 30% Meta | ~30 | 2 |
| Tração (mês 3–6) | R$ 3.000–6.000 | 55% Google / 35% Meta / 10% retarget | 60–120 | 4–8 |
| Escala (mês 7–12) | R$ 6.000–12.000 | + lookalike e LinkedIn Ads | 120–240 | 8–16 |

**Regra de ouro:** só sobe budget se **LTV/CAC > 8x** e **CPL < R$ 100**. Senão,
mexe no criativo/oferta antes.

---

## 7. Tracking e atribuição (já instrumentado)

O código já dispara eventos (`lib/analytics.ts`) e o lead grava **UTM** no
Supabase (`utm_source/medium/campaign` em `lib/integrations/supabase.ts`). Pra
fechar o ciclo:

1. Configure **GA4 + Meta Pixel** (ver [`docs/setup-producao.md`](../setup-producao.md) §5).
2. Marque `lead_captured` como **conversão** no GA4 e no Meta.
3. Use **UTMs padronizadas** em todo link de ad:
   `?utm_source=google&utm_medium=cpc&utm_campaign=autuacao&utm_content=anuncio_a`.
4. Acompanhe por canal: **CPL, conv. lead→cliente, CAC, LTV/CAC**.

---

## 8. KPIs e cadência

| Métrica | Meta | Onde |
|---|---|---|
| CPL (lead qualificado) | < R$ 70 | GA4 / plataformas |
| Conv. visitante → diagnóstico iniciado | > 25% | GA4 |
| Conv. iniciado → lead | > 55% | GA4 / Supabase |
| Conv. lead → cliente | > 7% | CRM/Supabase |
| CAC | < R$ 1.500 | cálculo |
| LTV/CAC | > 8x | cálculo |

**Cadência:** revisão semanal de CPL/criativos; mensal de CAC/LTV e
realocação de budget; a cada 30 vendas, recalibrar o mix em
`docs/unit-economics.md`.

---

## 9. Primeiros 30 dias (execução)

1. Publicar Política de Privacidade/Termos (pré-requisito legal pra captar lead).
2. Ativar GA4 + Meta Pixel e marcar conversões.
3. Subir 1 campanha Google Search (grupos "Vigilância/autuação" + "Responsável
   técnico") com R$ 1.000/mês.
4. Subir 1 campanha Meta de prospecção (R$ 500/mês) + 1 de retargeting.
5. Publicar 8 artigos do calendário editorial (2/semana).
6. Renan: 3 posts/semana no LinkedIn/Instagram com CTA pro diagnóstico.
7. Revisar CPL no dia 14; cortar o que passar de R$ 100.

---

*Este plano pressupõe o agente de prospecção/qualificação descrito em
[`docs/agente/ARQUITETURA.md`](./agente/ARQUITETURA.md) pra escalar o
atendimento dos leads gerados.*
