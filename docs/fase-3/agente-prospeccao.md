# Agente de Prospecção — Food Service Recém-Aberto (Grande SP · Zona Leste)

Detecta empresas de food service **recém-abertas** e rascunha a primeira
abordagem, sempre direcionando ao **diagnóstico gratuito**. Foco inicial: **Zona
Leste de São Paulo**. Código: [`lib/agent/prospeccao.ts`](../../lib/agent/prospeccao.ts)
+ [`lib/agent/store.ts`](../../lib/agent/store.ts) + rota cron
[`app/api/agents/prospeccao/route.ts`](../../app/api/agents/prospeccao/route.ts).

> **Por que "recém-aberto" é ouro:** empresa que acabou de abrir precisa de
> alvará/licença e está exposta à 1ª fiscalização — intenção altíssima. O gancho
> "abriu há X dias, a vigilância costuma passar nos primeiros meses" é honesto e
> oportuno.

---

## 1. Pipeline de dados (empresas novas)

```
Fonte de CNPJs novos → filtro (food service + SP + Zona Leste + abertura recente)
   → enriquecimento (contato) → tabela `prospects` (status 'novo')
   → [Agente] rascunha → `outreach_drafts` → aprovação → envio
```

**Fontes possíveis (escolher 1–2 para começar):**

| Fonte | O que dá | Nota |
|---|---|---|
| **Receita Federal — Dados Abertos CNPJ** | dump de todos os CNPJs: razão social, CNAE, data de abertura, endereço/CEP | gratuito, atualização mensal; é a base mais completa |
| **APIs de CNPJ** (CNPJá, BrasilAPI, Casa dos Dados, Econodata, Speedio) | consulta/enriquecimento por CNPJ, alguns com filtro por abertura/CNAE/região | praticidade; ver limites e LGPD |
| **JUCESP** | registros novos de empresas em SP | oficial do estado |
| **Prefeitura de SP / alvarás** | abertura de estabelecimentos | complementar |

> Recomendo começar pelo **dump da Receita** (filtra tudo localmente, custo zero)
> e usar uma **API de CNPJ** só para enriquecer telefone/e-mail dos selecionados.

---

## 2. Filtro: food service + Zona Leste

**CNAEs de food service (principais):**

| CNAE | Atividade |
|---|---|
| 5611-2/01 | Restaurantes e similares |
| 5611-2/02 | Bares e lanchonetes com serviço |
| 5611-2/03 | Lanchonetes, casas de chá/sucos |
| 5612-1/00 | Serviços ambulantes de alimentação |
| 5620-1/01 | Catering (fornecimento de alimentos) |
| 5620-1/02 | Buffet para eventos |
| 5620-1/04 | Fornecimento de marmitas / refeições |
| 1091-1/02 | Padaria e confeitaria com produção própria |
| 4721-1/02 | Padaria/confeitaria sem produção |

(*dark kitchens* costumam se registrar em 5611 ou 5620.)

**Recorte Zona Leste (1ª fase):** bairros como Tatuapé, Mooca, Penha, Itaquera,
Aricanduva, Vila Prudente, São Miguel Paulista, Itaim Paulista, Guaianases,
Cidade Tiradentes. Em CEP, faixas **03xxx-xxx** e **08xxx-xxx** cobrem boa parte
da ZL — refine por bairro no enriquecimento.

**Recência:** priorizar abertura nos últimos **90 dias** (campo `ageDays` ordena
a fila; quanto menor, mais quente).

---

## 3. Configuração do agente

| Item | Valor |
|---|---|
| Modelo | `claude-opus-4-8` (`MODELS.prospeccao`) — trocável por Sonnet 4.6 em volume |
| Thinking / effort | adaptive / `medium` |
| Saída estruturada | `OutreachDraftSchema` (channel, subject, message, rationale) |
| System (cacheado) | `BRAND_VOICE` |
| Entrada | `Prospect` (companyName, cnae, segment, neighborhood, openedAt, ageDays) |
| Gatilho | cron semanal (`vercel.json`) |

A regra na mensagem (system + task): gancho de recência, personalização por
segmento+bairro, CTA único para o diagnóstico, **opt-out obrigatório**, máx. 4
frases, sem preço, sem prometer nutricionista responsável de graça.

---

## 4. Sequência de abordagem (cadência)

Cada passo é um rascunho aprovado antes de enviar:

1. **Dia 0 — WhatsApp/e-mail:** gancho "recém-aberta + vigilância" → diagnóstico.
2. **Dia 3 — follow-up leve:** "viu o diagnóstico? leva 2 min" (só se não respondeu).
3. **Dia 7 — valor:** envia 1 conteúdo útil (ex.: "5 itens que a vigilância cobra
   primeiro") + convite ao diagnóstico.
4. **Parar** após 3 toques sem resposta (marca `descartado`); respeitar `SAIR`
   (marca `optout`) a qualquer momento.

Quem responde e faz o diagnóstico vira **lead** → entra no Agente de Qualificação.

---

## 5. LGPD / reputação (inegociável)

- CNPJ e dados cadastrais são públicos; ainda assim, todo contato a frio carrega
  **opt-out claro** e respeita `prospects.optout`.
- **Nada de WhatsApp pessoal em massa** (ban + ilegal). Usar **WhatsApp Cloud
  API** com **templates aprovados** pela Meta para a 1ª mensagem.
- Base legal: legítimo interesse B2B + opção de descadastro em toda mensagem.
- Registrar origem do dado (`prospects.source`) e data.

---

## 6. O que falta para operar (após este scaffold)

1. Pipeline que popula `prospects` (dump Receita + filtro ZL + enriquecimento).
2. WhatsApp Cloud API (envio do que for aprovado).
3. Tela de aprovação da fila `outreach_drafts`.

Sem essas peças, a rota cron já roda em modo seguro: sem dados, não faz nada;
com `prospects` populada, rascunha e guarda para aprovação.
