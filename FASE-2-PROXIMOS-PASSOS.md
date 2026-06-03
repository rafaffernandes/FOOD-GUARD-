# Food Guard — Fase 2: Próximos Passos
> Guia completo para colocar o site no ar, conectar domínio, e-mail, DocuSign e automações.

---

## VISÃO GERAL DA FASE 2

```
DOMÍNIO  →  HOSPEDAGEM (Vercel)  →  E-MAIL PROFISSIONAL
    ↓               ↓                        ↓
 DNS/MX        Deploy + API          Google Workspace
    ↓               ↓                        ↓
               DOCUSIGN               E-MAIL TRANSACIONAL
               (contratos)                (Resend)
                    ↓                        ↓
               WHATSAPP               ANALYTICS (GA4)
                    ↓                        ↓
                  CRM               PAGAMENTO ONLINE
               (RD Station)        (Mercado Pago/Asaas)
```

---

## PASSO 1 — DOMÍNIO

### 1.1 Registrar o domínio

**Onde:** [registro.br](https://registro.br) (único órgão oficial para .com.br no Brasil)

**Domínio sugerido:** `foodguard.com.br`

**Como fazer:**
1. Acesse registro.br → clique em "Registrar domínio"
2. Pesquise `foodguard.com.br` para confirmar disponibilidade
3. Crie uma conta no Registro.br (precisa de CPF ou CNPJ)
4. Conclua o pagamento (~R$ 40/ano)
5. Acesse o painel do domínio — você vai usar isso nas etapas de DNS

**Alternativa:** Se `foodguard.com.br` já estiver tomado, considere:
- `foodguardassessoria.com.br`
- `foodguard.com` (registrar no Namecheap ou GoDaddy)

---

## PASSO 2 — HOSPEDAGEM (VERCEL)

### 2.1 Criar conta no GitHub

O código precisa estar em um repositório Git para o Vercel fazer deploy automático.

1. Acesse [github.com](https://github.com) → crie uma conta se não tiver
2. Crie um novo repositório **privado** chamado `food-guard`
3. Na pasta do projeto (onde está este arquivo), abra o terminal e execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/food-guard.git
git push -u origin master
```

### 2.2 Criar conta e projeto no Vercel

1. Acesse [vercel.com](https://vercel.com) → "Sign up" com sua conta GitHub
2. Clique em "Add New Project"
3. Selecione o repositório `food-guard`
4. Em **Framework Preset**, escolha: `Other`
5. Em **Root Directory**, deixe em branco (`.`)
6. Em **Output Directory**, coloque: `FOOD GUARD/site`
7. Clique em "Deploy"

O primeiro deploy vai funcionar com os arquivos HTML estáticos. A API só vai funcionar depois de configurar as variáveis de ambiente (Passo 4).

### 2.3 Conectar o domínio ao Vercel

1. No painel do Vercel → seu projeto → aba "Settings" → "Domains"
2. Clique em "Add Domain" → digite `foodguard.com.br`
3. O Vercel vai exibir dois registros DNS para configurar:
   - Tipo `A` para `@` apontando para o IP do Vercel
   - Tipo `CNAME` para `www` apontando para `cname.vercel-dns.com`
4. Acesse o Registro.br → painel do domínio → "DNS" → adicione esses dois registros
5. Aguarde até 24h para propagação (normalmente leva menos de 1h)
6. O Vercel emite o certificado SSL automaticamente (HTTPS grátis)

---

## PASSO 3 — E-MAIL PROFISSIONAL

### 3.1 Contratar Google Workspace

**Por quê Google Workspace?** Melhor integração com Gmail, Google Drive, Meet. Suporte em português. ~R$ 37/mês por usuário.

**Site:** [workspace.google.com/intl/pt-BR](https://workspace.google.com/intl/pt-BR)

**Contas de e-mail a criar:**

| E-mail                        | Uso                                      |
|-------------------------------|------------------------------------------|
| `ola@foodguard.com.br`        | Contato geral — aparece no site          |
| `rt@foodguard.com.br`         | Nutricionista RT (uso no contrato)       |
| `contratos@foodguard.com.br`  | Cópia de todos os contratos assinados    |
| `noreply@foodguard.com.br`    | E-mails automáticos do sistema           |

**Como configurar:**
1. Compre o plano no Google Workspace
2. Durante o setup, ele vai pedir para verificar o domínio → adicione um registro `TXT` no Registro.br com o código fornecido
3. Configure os registros MX no Registro.br (Google fornece os valores):

```
Prioridade 1:  ASPMX.L.GOOGLE.COM
Prioridade 5:  ALT1.ASPMX.L.GOOGLE.COM
Prioridade 5:  ALT2.ASPMX.L.GOOGLE.COM
Prioridade 10: ALT3.ASPMX.L.GOOGLE.COM
Prioridade 10: ALT4.ASPMX.L.GOOGLE.COM
```

### 3.2 Configurar SPF, DKIM e DMARC (evita cair no spam)

Adicione estes registros TXT no DNS do Registro.br:

**SPF** (autoriza Google a enviar e-mail pelo seu domínio):
```
Nome: @
Tipo: TXT
Valor: v=spf1 include:_spf.google.com ~all
```

**DKIM** (o Google gera a chave — pegue no painel Google Workspace → Apps → Gmail → Autenticação de e-mail):
```
Nome: google._domainkey
Tipo: TXT
Valor: (copie do painel do Google Workspace)
```

**DMARC** (política anti-spoofing):
```
Nome: _dmarc
Tipo: TXT
Valor: v=DMARC1; p=quarantine; rua=mailto:ola@foodguard.com.br
```

---

## PASSO 4 — DOCUSIGN (CONTRATOS)

### 4.1 Criar conta DocuSign

1. Acesse [docusign.com](https://docusign.com) → "Start Free Trial" (30 dias grátis)
2. Crie a conta com o e-mail `contratos@foodguard.com.br`
3. Após o trial, o plano **Business Pro** (~U$ 45/mês) é o mínimo para templates + API

### 4.2 Criar o App de Integração (credenciais da API)

1. No painel DocuSign → clique no avatar (canto superior direito) → "Apps and Keys"
2. Clique em "Add App and Integration Key"
3. Dê o nome: `Food Guard Site`
4. Em "Authentication", selecione **JWT Grant**
5. Em "Service Integration", clique em "Generate RSA" → **salve o par de chaves** (aparece só uma vez!)
   - Salve o arquivo `.pem` com a chave privada em local seguro
6. Anote:
   - **Integration Key** (= Client ID): `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
   - **User ID**: em Settings > My Profile, copie o "API Username" (é um UUID)
   - **Account ID**: em Settings > Account Profile

### 4.3 Criar os 3 Templates de Contrato

Para cada plano (Essencial, Conformidade, Premium), crie um template:

1. No painel DocuSign → aba "Templates" → "New Template"
2. Faça upload do contrato em PDF (use os arquivos em `FOOD GUARD/Contratos/`)
3. **Nome do template:** `Food Guard - Plano Essencial` (etc.)
4. Em "Recipients", adicione um signatário:
   - **Nome do papel (Role Name):** `Cliente` ← **EXATO, sem maiúscula/minúscula diferente**
   - **Ação:** Needs to Sign
5. Arraste campos sobre o PDF:
   - **Text** no campo do nome → label: `cliente_nome`
   - **Text** no campo da empresa → label: `cliente_empresa`
   - **Text** no campo do plano → label: `plano_nome`
   - **Text** no campo do valor → label: `plano_valor`
   - **Text** no campo da data → label: `data_contrato`
   - **Signature** no campo de assinatura
   - **Date Signed** no campo da data de assinatura
6. Salve e anote o **Template ID** de cada plano (fica na URL: `/templates/xxxxxxxx-xxxx-...`)

### 4.4 Configurar variáveis de ambiente no Vercel

1. No painel Vercel → seu projeto → "Settings" → "Environment Variables"
2. Adicione cada variável abaixo (preencha com os valores reais):

| Variável                              | Valor                                    |
|---------------------------------------|------------------------------------------|
| `DOCUSIGN_ACCOUNT_ID`                 | UUID da sua conta                        |
| `DOCUSIGN_INTEGRATION_KEY`            | UUID do app criado                       |
| `DOCUSIGN_USER_ID`                    | UUID do seu usuário                      |
| `DOCUSIGN_PRIVATE_KEY`                | Conteúdo do .pem (quebras → `\n`)        |
| `DOCUSIGN_TEMPLATE_ID_ESSENCIAL`      | UUID do template Essencial               |
| `DOCUSIGN_TEMPLATE_ID_CONFORMIDADE`   | UUID do template Conformidade            |
| `DOCUSIGN_TEMPLATE_ID_PREMIUM`        | UUID do template Premium                 |
| `SITE_URL`                            | `https://foodguard.com.br`              |

> **Como colocar a chave privada em uma linha:**
> No terminal, execute: `awk 'NF {printf "%s\\n", $0}' chave.pem`
> Cole o resultado na variável `DOCUSIGN_PRIVATE_KEY`.

3. Após salvar as variáveis, faça um **Redeploy** no Vercel para aplicar.

---

## PASSO 5 — E-MAIL TRANSACIONAL (envio automático do diagnóstico)

O diagnóstico precisa chegar por e-mail ao lead. Use o **Resend** — moderno, barato, fácil.

### 5.1 Criar conta no Resend

1. Acesse [resend.com](https://resend.com) → crie conta (plano gratuito: 3.000 e-mails/mês)
2. Em "Domains", adicione `foodguard.com.br`
3. Adicione os registros DNS que ele pede (TXT + CNAME) no Registro.br
4. Gere uma **API Key** → anote

### 5.2 Adicionar variável no Vercel

```
RESEND_API_KEY = re_xxxxxxxxxxxxxx
```

### 5.3 Criar função de envio de diagnóstico

Criar o arquivo `api/send-diagnosis.js` (próxima etapa de desenvolvimento) que:
- Recebe os dados do formulário + score + plano recomendado
- Envia e-mail com o diagnóstico para o lead
- Envia cópia para `ola@foodguard.com.br`

---

## PASSO 6 — WHATSAPP BUSINESS

### 6.1 Configurar WhatsApp Business (básico)

1. Baixe o app **WhatsApp Business** no celular da empresa
2. Configure o número comercial
3. Preencha o perfil: nome, categoria, descrição, e-mail, site
4. Atualize o número em todos os links do site (busque por `5511900000000` e substitua pelo número real)

### 6.2 Integração avançada (opcional — fase 3)

Para automação de mensagens (resposta automática do diagnóstico via WhatsApp), use:
- **360Dialog** (mais barato, ~U$ 9/mês + volume)
- **Twilio** (mais robusto, pay-per-message)

Isso permite enviar o diagnóstico diretamente no WhatsApp do lead além do e-mail.

---

## PASSO 7 — ANALYTICS

### 7.1 Google Analytics 4

1. Acesse [analytics.google.com](https://analytics.google.com)
2. Crie uma propriedade para `foodguard.com.br`
3. Copie o **Measurement ID** (`G-XXXXXXXXXX`)
4. Adicione o snippet antes do `</head>` em todos os HTMLs:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Eventos importantes para rastrear:**
- Início do diagnóstico (clique no botão)
- Conclusão do diagnóstico (formulário enviado)
- Clique em "Contratar"
- Clique em "Assinar contrato"

### 7.2 Google Search Console

1. Acesse [search.google.com/search-console](https://search.google.com/search-console)
2. Adicione a propriedade `foodguard.com.br`
3. Verifique com o registro TXT no DNS
4. Envie o sitemap (criar `sitemap.xml` na raiz do site)

---

## PASSO 8 — PAGAMENTO ONLINE

Para cobrar o plano mensal depois que o contrato for assinado.

### Opção A — Asaas (recomendado para Brasil)

**Por quê Asaas?** Boleto, PIX, cartão, assinatura recorrente, tudo junto, sem burocracia. API simples.

1. Crie conta em [asaas.com](https://asaas.com)
2. Complete a verificação KYC (CNPJ da empresa)
3. Para cada plano, crie um **link de cobrança recorrente**:
   - Essencial: R$ 1.500/mês
   - Conformidade: R$ 2.700/mês
   - Premium: R$ 3.800/mês
4. Integre os links na tela de boas-vindas (próxima etapa de desenvolvimento)

### Opção B — Mercado Pago

Alternativa se já tiver conta no Mercado Pago. Suporta assinaturas recorrentes.

---

## PASSO 9 — CRM (GESTÃO DE LEADS)

### 9.1 RD Station CRM (gratuito até 5 usuários)

1. Crie conta em [rdstation.com/crm](https://www.rdstation.com/crm)
2. Configure um funil com as etapas:
   - `Lead` → Diagnóstico preenchido
   - `Qualificado` → Plano recomendado visualizado
   - `Proposta` → Clicou em "Contratar"
   - `Contrato Enviado` → DocuSign enviado
   - `Cliente` → Contrato assinado
3. Integrar via webhook: quando o diagnóstico é enviado, criar lead automaticamente no CRM

### 9.2 Webhook para o RD Station

Adicionar no `api/send-diagnosis.js` (ou criar `api/crm-lead.js`) uma chamada para o RD Station CRM API sempre que um lead completar o diagnóstico.

---

## PASSO 10 — SEGURANÇA E BOAS PRÁTICAS

### 10.1 Arquivo .gitignore

Crie na raiz do projeto um arquivo `.gitignore` para **nunca** commitar o `.env.local`:

```
.env.local
.env
node_modules/
.DS_Store
```

### 10.2 Headers de segurança no Vercel

Adicione ao `vercel.json` (já criado) os headers de segurança:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### 10.3 Rate limiting na API

A função `api/create-contract.js` precisa de rate limiting para evitar abuso. Implementar na próxima etapa usando o pacote `@upstash/ratelimit` + Redis gratuito no Upstash.

---

## CRONOGRAMA SUGERIDO

| Semana | O que fazer                                           | Dependências          |
|--------|-------------------------------------------------------|-----------------------|
| 1      | Registrar domínio + criar conta Vercel + GitHub       | —                     |
| 1      | Criar conta Google Workspace + configurar e-mails     | Domínio               |
| 1      | Primeiro deploy no Vercel + conectar domínio          | GitHub + Vercel       |
| 2      | Criar conta DocuSign + criar os 3 templates           | —                     |
| 2      | Configurar variáveis no Vercel + testar API DocuSign  | DocuSign + Vercel     |
| 2      | Configurar Resend + testar envio de diagnóstico       | E-mail + Resend       |
| 3      | Configurar WhatsApp Business + atualizar links        | —                     |
| 3      | Instalar Google Analytics 4 + Search Console          | Domínio live          |
| 4      | Criar conta Asaas + links de pagamento por plano      | CNPJ verificado       |
| 4      | Configurar RD Station CRM + webhook de leads          | —                     |
| 5      | Testes completos do fluxo: diagnóstico → contrato     | Todos acima           |
| 5      | Go live — comunicar nos canais                        | Tudo funcionando      |

---

## CUSTOS MENSAIS ESTIMADOS

| Serviço             | Plano sugerido          | Custo/mês (aprox.) |
|---------------------|-------------------------|--------------------|
| Domínio .com.br     | Registro.br             | ~R$ 3,50           |
| Vercel              | Hobby (gratuito)        | R$ 0               |
| Google Workspace    | Business Starter        | ~R$ 37/usuário     |
| DocuSign            | Business Pro            | ~R$ 225            |
| Resend              | Free (3k e-mails)       | R$ 0               |
| Analytics / GSC     | Google (gratuito)       | R$ 0               |
| Asaas               | % sobre transações      | ~1,99% + R$ 0,49   |
| RD Station CRM      | Free (até 5 usuários)   | R$ 0               |
| **Total estimado**  |                         | **~R$ 265/mês**    |

---

## RESUMO — O QUE FAZER AGORA (ordem prioritária)

1. **[ ] Registrar `foodguard.com.br`** no Registro.br
2. **[ ] Criar repositório no GitHub** e fazer o primeiro push
3. **[ ] Criar conta no Vercel** e fazer o primeiro deploy
4. **[ ] Contratar Google Workspace** e criar os e-mails
5. **[ ] Criar conta no DocuSign** e criar os 3 templates de contrato
6. **[ ] Configurar variáveis de ambiente** no Vercel
7. **[ ] Testar o fluxo completo** de diagnóstico → contrato → DocuSign
8. **[ ] Configurar Google Analytics 4**
9. **[ ] Criar conta no Asaas** e configurar cobrança recorrente
10. **[ ] Configurar RD Station CRM**
