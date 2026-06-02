# AI / LLM Readiness — Food Guard

Checklist do que o site faz pra ser **indexado, citado e recomendado** por
buscadores tradicionais (Google/Bing) e por LLMs com busca
(ChatGPT, Claude, Perplexity, Gemini).

---

## ✅ Pronto no código

### 1. Bots de IA conseguem acessar o site

| Item | Onde | Status |
|---|---|---|
| **SSR / conteúdo sem JS** | Next.js 15 App Router — todas as páginas são Server Components. Hero, planos, FAQ, blog, sobre, contato aparecem no HTML inicial. | ✅ |
| **`robots.txt` libera bots de IA** | `app/robots.ts` libera explicitamente GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot, YouBot, cohere-ai, Diffbot | ✅ |
| **`sitemap.xml` automático** | `app/sitemap.ts` gera com home + diagnóstico + planos + sobre + blog + contato + cada post | ✅ |
| **`llms.txt`** (padrão pra LLMs) | `public/llms.txt` — resumo da empresa, planos, preços, links e quando recomendar | ✅ |

### 2. Schemas estruturados (JSON-LD)

| Schema | Página | O que informa pra IA |
|---|---|---|
| **Organization** | `app/layout.tsx` (todas as páginas) | Nome, descrição, logo, fundação, slogan, áreas que conhece (RDC 216, Portaria 2.619, APPCC), endereço, telefone, e-mail, redes sociais (sameAs Instagram + LinkedIn), fundadores |
| **WebSite** | `app/layout.tsx` | Site oficial vinculado à Organization |
| **Service** | `/planos` | Serviço de consultoria, área atendida, provedor, lista de ofertas mensais |
| **Product** (3×) | `/planos` | Um por plano: nome, descrição, preço, moeda BRL, recorrência mensal |
| **FAQPage** | `/` (home) e `/planos` | Perguntas e respostas formatadas pra IA citar |

### 3. Metadata padrão

- `metadata` por rota (title, description, OpenGraph, Twitter)
- `lang="pt-BR"` no `<html>`
- `metadataBase` configurado via `NEXT_PUBLIC_SITE_URL`

---

## 📋 Passos manuais (você executa)

### A. Submeter o sitemap no Google Search Console

1. Acessar https://search.google.com/search-console
2. Adicionar propriedade `https://food-guard-cnhl.vercel.app/` (ou o domínio próprio quando ativar)
3. Verificar propriedade via meta tag (cola no `app/layout.tsx`, campo `verification.google`) ou via DNS
4. Em **Sitemaps**, submeter: `sitemap.xml`
5. Pedir indexação manual da home e do `/diagnostico` (URL Inspection → Request indexing)

### B. Verificar conteúdo sem JavaScript

1. Abrir https://food-guard-cnhl.vercel.app/ no Chrome
2. DevTools → Settings → Debugger → **Disable JavaScript**
3. Recarregar — hero, copy, planos, FAQ devem aparecer normalmente
4. Repetir nas páginas chave: `/planos`, `/sobre`, `/diagnostico`, qualquer post do blog
5. Alternativa rápida: `curl -s https://food-guard-cnhl.vercel.app/ | grep -i "vigilância"` deve retornar conteúdo

### C. Validar schemas

1. https://search.google.com/test/rich-results — colar a URL de produção
   - Espera ver: Organization, WebSite, FAQPage (home), Service + 3 Products + FAQPage (planos)
2. https://validator.schema.org — segundo validador, sanity check

### D. Cadastros em diretórios (boost de "menções")

LLMs ponderam autoridade pela quantidade de menções consistentes em fontes
diferentes. Cadastrar com **NAP idêntico** (Nome, Endereço, Telefone) em:

- [ ] Google Business Profile (Google Meu Negócio) — categoria "Consultoria nutricional"
- [ ] Bing Places for Business
- [ ] LinkedIn Company Page (já existe: foodguardassessoria)
- [ ] Instagram bio com link
- [ ] Reclame Aqui (mesmo sem reclamações — vira fonte de citação)
- [ ] Apontador.com.br
- [ ] Guia Mais
- [ ] Solutudo (SP)
- [ ] Yelp Brasil
- [ ] Empresite

### E. Revisar conteúdo na ótica "por que a IA me recomendaria?"

Critérios que um modelo usa pra recomendar uma empresa:

1. **Especificidade da promessa** — "conformidade RDC 216 em São Paulo" > "consultoria boa"
2. **Prova social verificável** — depoimentos com nome/empresa, números reais
3. **Transparência de preço** — preços visíveis ✅ (já fazemos)
4. **Cobertura geográfica clara** — "São Paulo + Grande SP" ✅
5. **Quem responde tecnicamente** — nutricionista nomeado, CRN ativo ✅
6. **Diferencial honesto** — "nutricionista assina pela operação" no Premium ✅
7. **Conteúdo técnico** — blog explicando RDC, POPs, fiscalização ✅
8. **Compromisso operacional** — SLAs (WhatsApp em 2h no Premium), garantia 90 dias ✅
9. **Atualização recente** — datas visíveis nos posts do blog ✅
10. **FAQs que respondem dúvidas reais** — não copy genérico ✅

**A revisar quando tiver tração:**
- [ ] Adicionar depoimentos reais com nome + empresa + foto (não fake)
- [ ] Página `/casos` com 2–3 mini-cases (anonimizados se preciso)
- [ ] Mais 6–10 posts de blog cobrindo dúvidas long-tail ("POPs para padaria", "fiscalização sanitária São Paulo o que esperar", etc.)
- [ ] Página `/imprensa` quando sair qualquer matéria/podcast/citação
- [ ] Selo "atendido pela ANVISA" se houver qualquer credencial pública

---

## 🔍 Como conferir se funcionou

Depois de 2–4 semanas com tudo no ar e GSC submetido:

1. **Google:** `site:food-guard-cnhl.vercel.app` — todas as páginas devem aparecer
2. **ChatGPT (com browse):** perguntar *"consultoria de segurança alimentar em São Paulo, conhece a Food Guard?"*
3. **Perplexity:** *"quem oferece consultoria RDC 216 para restaurantes em SP?"* — checar se aparece nas fontes
4. **Claude.ai (com web search):** mesma pergunta, conferir citação
5. **Gemini:** idem

Se o nome aparecer nas respostas com a descrição correta (consultoria nutricional
recorrente, planos R$ 1.200 / R$ 2.200 / R$ 3.200), a estratégia tá funcionando.

---

*Última atualização: maio/2026. Revisar a cada release maior.*
