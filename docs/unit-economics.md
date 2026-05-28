# Food Guard — Unit Economics

Modelo de referência pra decidir **quanto gastar em ads** mantendo margem
saudável. Todos os valores em BRL/mês, salvo indicação.

> **Como usar:** ajuste os campos em **Premissas**. Os blocos abaixo
> recalculam mentalmente — quando virar planilha, cada linha é uma fórmula.

---

## 1. Premissas (edite aqui)

| Variável | Valor base | Observação |
|---|---|---|
| Mix de planos (Básico/Essencial/Premium) | 20% / 55% / 25% | hipótese — ajustar após 10 vendas |
| Preço Básico | R$ 700 | recorrente |
| Preço Essencial | R$ 1.200 | recorrente |
| Preço Premium | R$ 1.999 | recorrente |
| **Ticket médio ponderado (ARPU)** | **R$ 1.240** | 0,2·700 + 0,55·1.200 + 0,25·1.999 |
| Custo variável por cliente (nutricionista PJ + Asaas + tooling) | R$ 380 | ~30% do ARPU |
| **Margem bruta por cliente** | **R$ 860** | 70% |
| Churn mensal | 4% | meta — consultoria recorrente bem entregue |
| **Lifetime (1/churn)** | **25 meses** | |
| **LTV (margem × lifetime)** | **R$ 21.500** | |

---

## 2. Funil de aquisição

| Etapa | Taxa | De 1.000 visitantes |
|---|---|---|
| Visitante → começa diagnóstico | 25% | 250 |
| Começa → completa 5 perguntas | 70% | 175 |
| Completa → preenche gating (lead qualificado) | 55% | 96 |
| Lead → call agendada (Calendly) | 30% | 29 |
| Call → cliente assinado | 25% | **7** |

**Conversão visitante → cliente: ~0,7%**
**Conversão lead → cliente: ~7%**

---

## 3. CPL e CAC por canal

CPL = custo por lead qualificado (preencheu gating).
CAC = custo por cliente fechado = CPL ÷ taxa lead→cliente.

| Canal | CPL realista (SP, food service) | CAC com 7% conv. | CAC com 5% conv. |
|---|---|---|---|
| **Google Ads — search intencional** ("nutricionista food service", "RDC 216 consultoria") | R$ 40–70 | R$ 570–1.000 | R$ 800–1.400 |
| **Meta Ads — interesse + lookalike donos de restaurante** | R$ 25–55 | R$ 360–790 | R$ 500–1.100 |
| **LinkedIn (orgânico do fundador)** | ~R$ 0 (tempo) | tempo × volume | — |
| **Indicação cliente atual** | R$ 0 | R$ 0 | — |
| **SEO blog (long tail RDC/POPs)** | quase 0 após 4–6 meses | baixíssimo | — |

**CAC-alvo:** ≤ **R$ 1.000** (payback < 1,5 mês). Acima de R$ 1.500 = revisar criativo/oferta antes de aumentar budget.

---

## 4. Payback e LTV/CAC

| Métrica | Cálculo | Resultado | Saúde |
|---|---|---|---|
| Payback (meses pra recuperar CAC) | CAC ÷ margem bruta = 1.000 ÷ 860 | **1,2 mês** | ✅ excelente |
| LTV / CAC | 21.500 ÷ 1.000 | **21,5x** | ✅ acima de 3x já é bom |
| % do 1º mês pra cobrir CAC | 1.000 ÷ 1.240 | **81%** | ✅ não queima caixa |

> Mesmo se CAC dobrar pra R$ 2.000, LTV/CAC = 10,7x — ainda saudável. O modelo
> aguenta erro de mira em ads.

---

## 5. Cenários de budget

| Cenário | Ads/mês | Leads (CPL R$ 50) | Clientes novos (7% conv) | MRR adicionado | Margem nova/mês |
|---|---|---|---|---|---|
| Validação | R$ 1.500 | 30 | 2 | R$ 2.480 | R$ 1.720 |
| Tração | R$ 3.000 | 60 | 4 | R$ 4.960 | R$ 3.440 |
| Escala | R$ 6.000 | 120 | 8 | R$ 9.920 | R$ 6.880 |
| Agressivo | R$ 12.000 | 240 | 16 | R$ 19.840 | R$ 13.760 |

**Leitura:** cada R$ 1.500 em ads, em regime saudável, traz ~R$ 2.500 de MRR
novo. Como é recorrente, o ROI explode no mês 2 em diante.

---

## 6. Custo total da operação por fase

| Linha | Validação | Tração | Escala |
|---|---|---|---|
| Infra (Vercel/Supabase/Resend/domínio) | R$ 4 | R$ 250 | R$ 360 |
| Ads | R$ 1.500 | R$ 3.000 | R$ 6.000 |
| Gestor de tráfego | — | R$ 1.800 | R$ 2.500 |
| Claude Code (dev contínuo) | R$ 550 | R$ 800 | R$ 1.100 |
| IA operacional (qualificação WhatsApp) | — | R$ 100 | R$ 300 |
| **Total custo fixo + ads** | **R$ 2.054** | **R$ 5.950** | **R$ 10.260** |
| Clientes ativos pra empatar (÷ R$ 860 margem) | 3 | 7 | 12 |
| **MRR de breakeven** | R$ 3.720 | R$ 8.680 | R$ 14.880 |

---

## 7. Trilha sugerida (12 meses)

| Mês | Foco | Budget ads | Clientes ativos esperados | MRR |
|---|---|---|---|---|
| 1–2 | Validar copy/CPL com R$ 1.500. SEO blog começa | R$ 1.500 | 2–3 | R$ 3.000 |
| 3–4 | Subir pra R$ 3k com criativo vencedor | R$ 3.000 | 6–8 | R$ 9.000 |
| 5–6 | Contratar gestor. Escalar pra R$ 6k | R$ 6.000 | 12–15 | R$ 17.000 |
| 7–9 | Indicação + SEO já trazem 30% dos leads. Ads = R$ 6k mantido | R$ 6.000 | 20–25 | R$ 28.000 |
| 10–12 | Considerar R$ 10–12k se LTV/CAC ainda > 8x | R$ 10.000 | 30–40 | R$ 45.000 |

---

## 8. Gatilhos de alerta

- **CPL > R$ 100 por 2 semanas:** pausar canal, refazer criativo/oferta.
- **Conv lead→cliente < 4%:** problema na call/proposta, não em ads.
- **Churn > 6%/mês:** entrega tá falhando — para de captar, conserta operação.
- **Payback > 3 meses:** revisar ticket/oferta antes de escalar budget.

---

*Última atualização: maio/2026. Revisar a cada 30 vendas reais.*
