# Food Guard — Guia de Setup de Produção

Passo a passo pra **você** criar e configurar cada conta externa. Cada bloco
termina com as variáveis pra colar em **Vercel → Project → Settings →
Environment Variables** (e no `.env.local` pra testar localmente).

> O código já está pronto e com **degradação graciosa**: sem chave, cada
> integração roda em "modo dev" (loga no console em vez de quebrar). Você só
> preenche as chaves quando a conta estiver pronta. Lista completa em
> [`.env.example`](../.env.example).

**Ordem recomendada:** Domínio → Supabase → Resend → Asaas → Analytics →
WhatsApp. O domínio vem primeiro porque e-mail e SEO dependem dele.

---

## 0. Checklist rápido

- [ ] Domínio registrado (`foodguard.com.br`)
- [ ] E-mail profissional funcionando (`contato@`, `diagnostico@`)
- [ ] Supabase: projeto criado + `schema.sql` rodado
- [ ] Resend: domínio verificado (SPF/DKIM)
- [ ] Asaas: conta + 3 links de pagamento OU API key + webhook
- [ ] GA4 + Meta Pixel com IDs reais
- [ ] WhatsApp oficial confirmado
- [ ] Env vars coladas na Vercel (Production)
- [ ] LGPD: Política de Privacidade + Termos publicados *(ver "Próximos passos")*

---

## 1. Domínio + e-mail profissional

**Onde:** [registro.br](https://registro.br) (`.com.br`, ~R$ 40/ano).

1. Registre `foodguard.com.br` (confira disponibilidade antes).
2. Aponte o domínio pra Vercel: em **Vercel → Project → Settings → Domains**,
   adicione `foodguard.com.br` e `www`. A Vercel mostra os registros DNS (A /
   CNAME) — cole no painel do registro.br.
3. **E-mail profissional:** contrate **Google Workspace** (~R$ 30/usuário/mês)
   ou **Zoho Mail** (plano grátis pra 1 domínio). Crie:
   - `contato@foodguard.com.br` (atendimento)
   - `diagnostico@foodguard.com.br` (remetente do relatório)
4. Configure os registros **MX** do provedor de e-mail no DNS do registro.br.

```bash
NEXT_PUBLIC_SITE_URL=https://foodguard.com.br
NEXT_PUBLIC_CONTACT_EMAIL=contato@foodguard.com.br
```

---

## 2. Supabase (banco de leads)

**Onde:** [app.supabase.com](https://app.supabase.com). Plano grátis aguenta o
começo tranquilo.

1. **New project** → escolha região **South America (São Paulo)** → defina a
   senha do banco.
2. Vá em **SQL Editor** → cole o conteúdo de
   [`supabase/schema.sql`](../supabase/schema.sql) → **Run**. Isso cria as
   tabelas `leads` e `consent_log` (com RLS e consent imutável).
3. Em **Project Settings → API**, copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`
     ⚠️ **Nunca** exponha a service_role no client. O código só usa ela em
     API routes (server) — ver [`lib/integrations/supabase.ts`](../lib/integrations/supabase.ts).

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

**Teste:** faça um diagnóstico em produção e confira a linha em
**Table Editor → leads**.

---

## 3. Resend (e-mail do relatório)

**Onde:** [resend.com](https://resend.com). Grátis até 3.000 e-mails/mês.

1. **API Keys** → **Create** → copie a chave (`re_...`).
2. **Domains** → **Add Domain** → `foodguard.com.br`. O Resend mostra registros
   **SPF, DKIM e DMARC** → cole no DNS do registro.br → aguarde "Verified".
   **Sem isso o e-mail cai em spam.**
3. Use um remetente do domínio verificado em `RESEND_FROM`.

```bash
RESEND_API_KEY=re_xxxxxxxx
RESEND_FROM="Food Guard <diagnostico@foodguard.com.br>"
```

Lógica em [`lib/integrations/resend.ts`](../lib/integrations/resend.ts) — envia
HTML + PDF anexo do diagnóstico.

---

## 4. Asaas (pagamento dos planos)

**Onde:** [asaas.com](https://www.asaas.com). Conta PJ (precisa do CNPJ).

Há **dois modos** — o código tenta link estático primeiro, depois a API
(ver [`lib/integrations/asaas.ts`](../lib/integrations/asaas.ts)):

### Modo A — Links de pagamento estáticos (mais simples)
1. No Asaas: **Cobranças → Link de pagamento** → crie 3 links recorrentes:
   - **Básico R$ 1.200/mês** · **Essencial R$ 2.200/mês** · **Premium R$ 3.200/mês**
   - ⚠️ Use **exatamente** os preços de `lib/content/plans.ts`.
2. Cole as URLs:

```bash
ASAAS_PAYMENT_LINK_BASICO=https://www.asaas.com/c/xxxx
ASAAS_PAYMENT_LINK_ESSENCIAL=https://www.asaas.com/c/yyyy
ASAAS_PAYMENT_LINK_PREMIUM=https://www.asaas.com/c/zzzz
```

### Modo B — API dinâmica
1. **Integrações → API Key** → copie a chave.

```bash
ASAAS_API_KEY=$aact_xxxx
ASAAS_ENV=production   # use "sandbox" pra testar antes
```

### Webhook (confirmação de pagamento)
1. **Integrações → Webhooks** → URL: `https://foodguard.com.br/api/webhooks/asaas`
2. Defina um token e cole nos dois lados:

```bash
ASAAS_WEBHOOK_TOKEN=um-token-secreto-forte
```

> ⚠️ **Pendência de código:** hoje o webhook
> ([`app/api/webhooks/asaas/route.ts:24`](../app/api/webhooks/asaas/route.ts))
> só registra o evento no log — **não** ativa assinatura nem avisa vocês.
> Antes de cobrar de verdade, peça pra eu completar essa persistência.

---

## 5. Analytics (GA4 + Meta Pixel)

Pré-requisito pra rodar ads com otimização de conversão. Ver
[`lib/analytics.ts`](../lib/analytics.ts) — eventos já instrumentados:
`diagnostic_started`, `diagnostic_completed`, `lead_captured`,
`schedule_clicked`, `checkout_clicked`.

1. **GA4:** [analytics.google.com](https://analytics.google.com) → criar
   propriedade → copiar **Measurement ID** (`G-XXXX`).
2. **Meta Pixel:** [business.facebook.com](https://business.facebook.com) →
   Gerenciador de Eventos → criar pixel → copiar o ID.

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=000000000000000
```

---

## 6. WhatsApp

O botão já funciona via `wa.me` (ver [`lib/content/site.ts`](../lib/content/site.ts)).
Default atual: `5511976466553`. Confirme se é o número **oficial** da empresa e,
se for outro, defina:

```bash
NEXT_PUBLIC_WHATSAPP=55DDNNNNNNNNN   # só dígitos, com 55 + DDD
```

> Pra **atendimento automatizado** (o agente de qualificação), o `wa.me` não
> basta — é preciso a **WhatsApp Cloud API** da Meta. Ver
> [`docs/agente/ARQUITETURA.md`](./agente/ARQUITETURA.md).

---

## 7. Aplicar na Vercel

1. **Settings → Environment Variables** → adicione cada par acima no ambiente
   **Production** (e Preview, se quiser testar em branches).
2. **Redeploy** (Deployments → ⋯ → Redeploy) pra carregar as variáveis.
3. Variáveis `NEXT_PUBLIC_*` vão pro client (visíveis no navegador) — nunca
   coloque segredo nelas. As demais (service_role, API keys, webhook token)
   ficam só no server.

---

## Próximos passos que ainda dependem de código (peça quando quiser)

- Completar o **webhook Asaas** (ativar assinatura + avisar a equipe).
- **LGPD:** Política de Privacidade, Termos de Uso e aviso de cookies.
- Página de **pós-pagamento / onboarding**.
- **og.png** (imagem de compartilhamento) + **Sentry** (monitorar erros).

---

*Dúvida em qualquer passo: me chama que eu detalho ou já deixo o código pronto.*
