# Food Guard — Plano de Conteúdo Social + Google Ads (Fase 3)

LinkedIn + Instagram **levando ao site** (diagnóstico), mais **Google Ads** como
motor pago. Complementa o blog/SEO de
[../marketing/plano-marketing.md](../marketing/plano-marketing.md) e o
[../marketing/calendario-editorial.md](../marketing/calendario-editorial.md). O
Agente de Conteúdo ([agente-conteudo.md](./agente-conteudo.md)) rascunha tudo
isto na voz da marca.

> **Funil único:** todo post/anúncio tem **1 CTA → diagnóstico gratuito (2 min)**.
> Topo (alcance) → diagnóstico (lead com score) → Qualificação → cliente.

---

## 1. LinkedIn (B2B — autoridade do nutricionista)

**Para quem:** donos/gestores de food service, refeição coletiva, corporativo,
compras (editais que exigem conformidade). Voz: Renan, nutricionista responsável.

**Cadência:** 3 posts/semana.

| Pilar | Formato | Exemplo |
|---|---|---|
| Autoridade técnica | texto + carrossel | "O que a vigilância cobra primeiro numa fiscalização" |
| Bastidor/caso | texto curto | "Atendi uma cozinha autuada esta semana. O erro nº 1 era…" |
| Educação normativa | carrossel | "RDC 216 e Portaria 2.619 em 5 cards" |
| Prova/resultado | texto | antes/depois de uma operação que ficou em conformidade |

CTA padrão: *"Quer saber o risco da sua operação? Diagnóstico gratuito em 2 min:
[link]"*.

---

## 2. Instagram (alcance local + prova visual)

**Para quem:** donos de restaurante/bar/padaria/dark kitchen na Grande SP (Zona
Leste no 1º momento — usar geolocalização e linguagem local).

**Cadência:** 4–5 posts/semana (mix Reels + carrossel + stories).

| Formato | Uso |
|---|---|
| **Reels** (alto alcance) | dica rápida do nutricionista; "3 erros que dão multa"; bastidor de cozinha |
| **Carrossel** | checklist visual; "antes/depois"; mitos da vigilância |
| **Stories** | enquete ("sua cozinha passaria?"), link pro diagnóstico, prova social |

Ideias visuais vêm no campo `imageIdea` do rascunho do agente. CTA: link na bio +
sticker de link → diagnóstico.

---

## 3. Reaproveitamento (1 → muitos)

Cada **artigo do blog** vira: 1 carrossel LinkedIn + 1 Reel + 1 carrossel
Instagram + 2 stories. O Agente de Conteúdo gera as variações a partir da mesma
pauta — escala sem retrabalho.

---

## 4. Google Ads (motor pago)

Estrutura, palavras-chave, copy e orçamento detalhados em
[../marketing/plano-marketing.md §5.1](../marketing/plano-marketing.md) e budget
em [../marketing/unit-economics.md](../marketing/unit-economics.md). Resumo:

- **Search intencional** (prioridade): grupos "vigilância/autuação",
  "responsável técnico", "RDC 216/POPs", "alvará/dark kitchen". Lance por
  conversão `lead_captured`. Geo: Grande SP. Início R$ 1.500/mês, CPL-alvo < R$ 70.
- **Negativas:** curso, concurso, vaga, emprego, faculdade, CLT.
- **Pré-requisito:** GA4 + Meta Pixel com conversões marcadas
  ([../setup-producao.md §5](../setup-producao.md)).

---

## 5. UTMs (fechar o ciclo)

Todo link (orgânico e pago) com UTM padronizada — o lead já grava UTM no Supabase:

```
?utm_source=instagram&utm_medium=organic&utm_campaign=reels_vigilancia
?utm_source=google&utm_medium=cpc&utm_campaign=autuacao
?utm_source=linkedin&utm_medium=organic&utm_campaign=autoridade
```

Assim dá para ver **qual canal traz lead que vira cliente** (não só clique).

---

## 6. Calendário de lançamento (até 01/07)

| Semana | Social | Ads |
|---|---|---|
| **09–15/06** | montar perfis/bio com link pro diagnóstico; 1ª leva de 6 posts aprovados (agente) | criar contas GA4 + Pixel; marcar conversões |
| **16–22/06** | 3 LinkedIn + 4 Instagram; testar 3 ganchos de Reel | subir 1 campanha Search (R$ 1.000/mês) |
| **23–29/06** | dobrar no formato que mais clicou; iniciar reaproveitamento blog→social | + retargeting (visitou, não fez diagnóstico) |
| **30/06–01/07** | rotina semanal no ar (3 LinkedIn + 4–5 IG) | escalar o que tiver CPL < R$ 70 |

---

## 7. Métricas

| Canal | Métrica | Meta inicial |
|---|---|---|
| LinkedIn/Instagram | clique no link → site | acompanhar e dobrar no que converte |
| Social | post → diagnóstico iniciado | > 3% dos cliques |
| Google Ads | CPL (lead qualificado) | < R$ 70 |
| Geral | lead → cliente | > 7% |

Revisão semanal de criativos/CPL; mensal de CAC/LTV (ver unit-economics).
