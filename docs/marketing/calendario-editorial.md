# Food Guard — Calendário Editorial do Blog

Estratégia de SEO por **clusters** (página-pilar + artigos de apoio que linkam
pra ela). Meta: **2 artigos/semana**, long-tail de baixa concorrência e alta
intenção. Todo artigo termina com **CTA pro diagnóstico gratuito**.

> Conecta com [`plano-marketing.md`](./plano-marketing.md) §5.3. SEO é o canal
> de menor CAC no médio prazo — composto e perene.

---

## Template de artigo (formato real do projeto)

Crie em `content/blog/<slug>.mdx`. Frontmatter exato (lido por `lib/blog.ts`):

```mdx
---
title: "Título com a palavra-chave no início"
description: "Resumo de 140–160 caracteres, sem juridiquês, com o benefício."
date: "2026-06-09"
author: "Renan Muniz · nutricionista responsável"
readingTime: "6 min"
tag: "Regulação"
---

Abertura que nomeia a dor e quem é o público (restaurante, padaria, dark
kitchen, refeição coletiva…).

## Subtítulo com intenção de busca

Conteúdo escaneável: bullets, negrito no que a vigilância cobra, números reais.

## Conclusão + CTA

Fecha apontando pro diagnóstico: "Descubra seu risco sanitário em 2 minutos."
```

**Regras de voz** (ver `CLAUDE.md`): "nutricionista responsável" (nunca "RT");
**RDC 216/2004 + Portaria 2.619/2011**; sem "carência"/"dinheiro de volta".
Tags em uso: `Regulação`, `Emergência`, `Responsabilidade Técnica`, `Abertura`.

---

## Clusters de conteúdo

### Cluster 1 — Conformidade / RDC 216 *(pilar publicado)*
Pilar: **"RDC 216/2004: o que todo food service precisa saber"** ✅
Apoio a escrever:
- O que é a Portaria 2.619/2011 e como complementa a RDC 216 *(kw: portaria 2619 boas práticas)*
- Checklist de boas práticas que a vigilância cobra primeiro *(kw: checklist vigilância sanitária restaurante)*
- Controle de temperatura e cadeia do frio na prática *(kw: controle de temperatura alimentos rdc 216)*
- Higienização e controle de pragas: o que documentar *(kw: pop higienização cozinha)*

### Cluster 2 — Fiscalização e autuação *(pilar publicado)*
Pilar: **"Fui autuado pela vigilância sanitária. E agora?"** ✅
Apoio:
- Quanto custa uma multa da vigilância (faixas por infração) *(kw: valor multa vigilância sanitária)*
- Interdição de estabelecimento: como evitar e como reverter *(kw: interdição vigilância sanitária restaurante)*
- O que a vigilância olha numa fiscalização (passo a passo) *(kw: como é a fiscalização da vigilância sanitária)*
- Auto de infração x notificação: a diferença que muda tudo *(kw: auto de infração vigilância sanitária)*

### Cluster 3 — Nutricionista responsável *(pilar publicado)*
Pilar: **"Preciso mesmo de um Responsável Técnico nutricionista?"** ✅
Apoio:
- "Nutricionista no papel" não te protege: o risco do RT fantasma *(kw: nutricionista responsável técnico fantasma)*
- O que faz um nutricionista responsável no dia a dia de um restaurante *(kw: o que faz nutricionista em restaurante)*
- Quando a lei exige nutricionista responsável no food service *(kw: quando é obrigatório nutricionista restaurante)*

### Cluster 4 — Abertura / alvará / dark kitchen *(pilar publicado)*
Pilar: **"Dark kitchen: como conseguir o alvará e operar em conformidade"** ✅
Apoio:
- Como abrir um restaurante em SP em conformidade (passo a passo) *(kw: como abrir restaurante SP vigilância)*
- Licença sanitária: documentos necessários e prazos *(kw: documentos licença sanitária)*
- Cozinha compartilhada: quem responde pela conformidade *(kw: cozinha compartilhada alvará)*

### Cluster 5 — Documentação e POPs *(novo pilar)*
Pilar a escrever: **"Manual de Boas Práticas e POPs: o guia completo pro seu food service"** *(kw: manual de boas práticas food service)*
Apoio:
- O que é um POP e quais a sua operação precisa ter *(kw: o que é pop alimentos)*
- Fichas técnicas de preparo: por que a vigilância pede *(kw: ficha técnica de preparo)*
- Rotulagem de alimentos: regras que mais geram autuação *(kw: rotulagem alimentos rdc)*

### Cluster 6 — Por segmento *(novo pilar)*
Pilar a escrever: **"Segurança alimentar por tipo de operação: o que muda"** *(kw: segurança alimentar restaurante padaria buffet)*
Apoio (1 por segmento — alto valor de conversão):
- Padaria e confeitaria: conformidade sanitária na prática *(kw: vigilância sanitária padaria)*
- Buffet e eventos: como garantir conformidade em operação móvel *(kw: vigilância sanitária buffet eventos)*
- Refeição coletiva e escolas: o nível mais exigente de conformidade *(kw: segurança alimentar refeição coletiva)*

---

## Calendário (12 semanas — 24 artigos)

| Sem. | Artigo A | Artigo B |
|---|---|---|
| 1 | Quanto custa uma multa da vigilância | O que a vigilância olha numa fiscalização |
| 2 | Manual de Boas Práticas e POPs (pilar) | Checklist que a vigilância cobra primeiro |
| 3 | "Nutricionista no papel" não te protege | O que faz um nutricionista no restaurante |
| 4 | Como abrir restaurante em SP em conformidade | Licença sanitária: documentos e prazos |
| 5 | Auto de infração x notificação | Interdição: como evitar e reverter |
| 6 | O que é um POP e quais você precisa | Fichas técnicas: por que a vigilância pede |
| 7 | Portaria 2.619/2011 explicada | Controle de temperatura na prática |
| 8 | Vigilância sanitária em padaria | Segurança alimentar por segmento (pilar) |
| 9 | Quando a lei exige nutricionista | Cozinha compartilhada: quem responde |
| 10 | Higienização e controle de pragas | Rotulagem que mais gera autuação |
| 11 | Vigilância em buffet e eventos | Refeição coletiva e escolas |
| 12 | (Atualizar pilar RDC 216 com links) | Caso real / antes e depois (autoridade) |

---

## Boas práticas de SEO on-page

- **Title** começa com a palavra-chave; **description** com benefício (140–160 c.).
- **Links internos:** todo artigo de apoio linka pro seu pilar e pro diagnóstico.
- **Slug** curto e com a kw (ex.: `valor-multa-vigilancia-sanitaria`).
- **Atualizar** os 4 pilares a cada trimestre (data nova = sinal de frescor).
- Reaproveitar cada artigo em **3 posts** de LinkedIn/Instagram (ver plano §5.4).

---

## Medição

Acompanhe no GA4 (após setup §5 do guia de produção):
- Sessões orgânicas / artigo · tempo na página
- Conv. **artigo → diagnóstico iniciado** (`diagnostic_started`)
- Posição média no Search Console pras kw-alvo

Meta realista: tráfego orgânico relevante a partir do **mês 4–6** (SEO é
composto). Os artigos de "multa" e "autuação" tendem a converter melhor (dor
aguda).

---

*Revisar a cada 8 artigos publicados. Dobrar no que trouxer lead.*
