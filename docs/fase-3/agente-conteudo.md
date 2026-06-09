# Agente de Conteúdo — LinkedIn · Instagram · Blog → Site

Rascunha conteúdo na voz da marca, sempre puxando para o **diagnóstico no site**.
Código: [`lib/agent/conteudo.ts`](../../lib/agent/conteudo.ts). Calendário e
formatos: [plano-conteudo-social.md](./plano-conteudo-social.md) e
[../marketing/calendario-editorial.md](../marketing/calendario-editorial.md).

---

## 1. Configuração

| Item | Valor |
|---|---|
| Modelo | `claude-opus-4-8` (`MODELS.conteudo`) |
| Thinking / effort | adaptive / `medium` |
| Saída estruturada | `ContentDraftSchema` (platform, hook, body, hashtags, cta, imageIdea) |
| System (cacheado) | `BRAND_VOICE` |
| Entrada | `ContentBrief` (platform, topic, audience?) |
| Gatilho | cron (seg/qui) + sob demanda |

Por plataforma, o agente recebe um "FORMAT_HINT" (em `conteudo.ts`):

- **LinkedIn (B2B):** autoridade do nutricionista; 120–200 palavras; 3–5 hashtags.
- **Instagram/Reel:** gancho forte na 1ª linha; escaneável; ideia visual concreta; 5–8 hashtags.
- **Blog (SEO):** título com a palavra-chave; abertura que nomeia a dor; markdown.

---

## 2. Fluxo

```
pauta (calendário) → draftContent(brief) → content_drafts (pendente)
   → aprovação humana → publicar (LinkedIn/Instagram) ou virar .mdx no blog
   → CTA leva ao diagnóstico → lead → Qualificação
```

Para o **blog**, o rascunho aprovado vira um arquivo `content/blog/<slug>.mdx`
seguindo o frontmatter do projeto (ver calendário editorial). Para **social**, o
texto aprovado é publicado manualmente (ou via agendador) com a `imageIdea` como
briefing de arte.

---

## 3. Princípios de conteúdo

- Educar e tirar o medo da fiscalização — não venda agressiva.
- 1 CTA por peça, sempre o diagnóstico.
- Reaproveitar: 1 artigo de blog → vários posts de LinkedIn/Instagram.
- Medir clique→site e priorizar o que converte (os temas de "multa" e
  "autuação" tendem a puxar mais).

---

## 4. O que falta para operar

1. Rota cron `/api/agents/conteudo` (mesmo molde da de prospecção) lendo as
   pautas e gravando em `content_drafts`.
2. Tela de aprovação + (opcional) agendador de publicação.
3. Conector para transformar rascunho de blog aprovado em `.mdx` no repo.
