# Pendências técnicas — Rafael

Saíram da apresentação de estratégia porque são assunto técnico, não de
negócio. Continuam valendo e continuam sendo tuas. Ordem é de urgência.

---

## 1. O Supabase está cobrando — resolver

**Não é volume de dados.** São 7 tabelas com algumas centenas de linhas,
menos de 1% dos 500 MB do plano gratuito. A conta vem de outro lugar.

**Causas prováveis, nesta ordem:**

1. **Mais de dois projetos ativos na organização.** O plano gratuito permite
   dois. Um terceiro força o upgrade da organização inteira para Pro
   (US$ 25/mês). É a causa mais comum, e é bem possível aqui — sobrou
   projeto de teste da fase de configuração.
2. **Upgrade acionado sem querer** durante a configuração.
3. **Add-on de computação ligado** em algum projeto, cobrado à parte.

**Como resolver — uns 20 minutos:**

1. `Organization` → `Billing` e ler qual linha está sendo cobrada.
2. Pausar ou excluir todo projeto que não seja `jawkmbwmwbtixbsbiplb`
   (o da Food Guard).
3. Voltar a organização para o plano `Free`.
4. **Ligar um acesso automático semanal ao banco.** Esse é o passo que
   ninguém lembra: o plano gratuito pausa o projeto após 7 dias sem uso, e
   o site cai num domingo sem aviso. Uma consulta barata por semana resolve.

**Se não voltar ao gratuito:** Neon e Turso têm plano equivalente e a
migração leva cerca de 3 horas — o código toca o banco em apenas 4 arquivos
(`lib/integrations/supabase.ts`, `lib/agent/store.ts`, `app/api/leads/route.ts`,
`app/api/webhooks/asaas/route.ts`). Mas só vale a pena depois de confirmar
que a conta não some sozinha.

---

## 2. Servidor próprio — decidido: não

Vercel e Supabase já são o servidor, com backup, certificado e escala
automáticos. Um VPS economizaria uns R$ 100 por mês e custaria cerca de
4 horas de manutenção mensais, além de levantar o serviço você mesmo quando
cair num sábado à noite.

**Fica como está.** Registro aqui só para não voltar a ser dúvida.

---

## 3. Vercel Hobby × Pro — decidir quando formalizar

O plano Hobby é para uso não comercial. A Food Guard cobra pelo site, então
tecnicamente pede o plano Pro (US$ 20/mês, cerca de R$ 110).

Não é urgente e não muda nada hoje. Vale resolver quando houver o primeiro
cliente pagante — aí a despesa é trivial perto da receita, e a conta fica em
ordem.

---

## 4. Link de descadastro nos e-mails — não existe ainda

Hoje nenhum e-mail que sai da Food Guard tem link de descadastro. É exigência
da LGPD e é o que mantém a entrega boa: lista sem saída vira lista marcada
como spam.

**Precisa existir antes de qualquer envio em sequência**, automático ou
manual. O que falta:

- Uma coluna de token por lead na tabela `leads`, para o link funcionar sem
  login.
- Uma página `/descadastro` que confirma a saída por POST — nunca por GET,
  senão cliente de e-mail que pré-carrega links descadastra sozinho.
- O rodapé com o link nos modelos de e-mail.

---

## 5. Automação da sequência de e-mail — viável, custo zero

Documentada em `docs/marketing/sequencia-email.html`. Resumo: dá para
automatizar 3 dos 5 e-mails sem usar IA nenhuma, então sem custo. Depende de
duas coisas antes — o layout do e-mail (pendência de negócio, não técnica) e
o item 4 acima.
