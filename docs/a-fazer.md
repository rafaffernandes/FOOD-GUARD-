# A fazer (pedidos do Rafael para depois)

Registrado em 15/10/2026. Lembrete agendado para segunda, 19/10, às 9h.

## 1. Newsletter

Pensar e estruturar uma newsletter que gere comunidade e leitores engajados na
base da Food Guard.

- Assinatura por e-mail, conteúdo recebido por e-mail.
- Objetivo: um lugar de comunidade, com pessoas engajadas na base.
- Ligar com o blog e o Instagram (mesmos temas, outra profundidade).
- Atenção: envio não pode sair pelo Resend do diagnóstico sem cuidar da
  reputação do domínio (ver docs/marketing/sdr, seção de e-mail).

## 2. Apresentação da visita (computador e tablet)

Melhorar a apresentação usada pelo nutricionista na hora da visita, no layout
padrão da Food Guard, para abrir no computador e no tablet.

Ordem pedida:

1. Começar falando de vigilância, multas e legislação.
2. O que é a Food Guard e o que ela faz.
3. As ferramentas (incluindo as de diagnóstico) e a estrutura.
4. O que oferecemos.
5. A diferença entre os planos.

Pendência relacionada: o Rafael tem um material atual que precisa melhorar.
Pedir o arquivo antes de começar.

## 3. Pendências de segurança

Check de 03/11: nota 55 → 85, publicado na main em 03/11 (commit 10f0c77). Relatório em
`check-report/RELATORIO.md` (fora do Git). Lembrete agendado para segunda, 09/11, às 9h03.

Feito: Next 15.5.28 e zod 4 (npm audit só com 4 alertas baixos), e-mail do diagnóstico sem HTML
injetado, validação e limite de tamanho nas rotas públicas, primeira camada contra robôs (campo
isca e 1,5 s), ação do painel conferindo a senha e só com as 3 tabelas da fila, botão de pânico
dos agentes valendo, segredos comparados em tempo constante, logs sem dado de lead, cabeçalhos e
CSP num bloco só (com GA4), revisão adversarial com todos os achados corrigidos.

Falta (decisão ou painel do Rafael):
- Rodar `supabase/hardening-rls.sql` no SQL Editor de produção e conferir com as consultas do fim.
- Na Vercel: conferir que a senha do admin, o CRON_SECRET e o token do Asaas não são os valores
  de exemplo do guia; apagar os deployments anteriores a 05/08/2026 e os ~7 projetos extras.
- Decidir: limite de envios compartilhado (Upstash ou Firewall da Vercel); Turnstile como segunda
  camada; tirar do ar as rotas de teste dos agentes; proteger de verdade o PDF do checklist;
  citar o provedor de IA na política de privacidade; ligar o Dependabot.
- Conferir no ar (precisa de foodguardassessoria.com.br liberado na rede do ambiente): cabeçalhos,
  redirect para HTTPS, /.env e /.git.
