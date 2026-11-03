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

## 3. Pendências de segurança (pedido do Rafael em 03/11: "não me deixa esquecer")

Lembrete agendado para segunda, 09/11, às 9h03. Estado e detalhes em `check-report/RELATORIO.md`
(fora do Git) e nos commits dff68b8 a fe84c19 da branch.

- 9 correções aplicadas na branch, **ainda não publicadas na main**. A revisão adversarial
  terminou em 03/11 (resultado completo em `check-report/revisao-correcoes-2026-11-03.json`, fora
  do Git). Corrigir antes de publicar: (1) tempo mínimo anti-robô de 3 s descarta quem preenche
  rápido com autopreenchimento (baixar para 1,5 s e registrar o fillMs); (2) a CSP corta parte do
  GA4 (Google Signals): liberar os domínios que faltam; (3) menores: telefone acima de 20
  caracteres cortado sem aviso, PDF perdendo apóstrofo e travessão, espaço extra no formulário,
  resposta do robô diferente da real no checklist, limite de corpo contado em caracteres e não
  em bytes, e o package-lock mudou mais pacotes do que o declarado.
- Decisões do Rafael: limite de envios compartilhado (Upstash ou Firewall da Vercel); Turnstile;
  apagar deployments antigos e os projetos Vercel extras; tirar do ar as rotas de teste dos
  agentes; proteger de verdade o PDF do checklist; citar o provedor de IA na política de
  privacidade; migrar para o zod 4.
- Ações manuais: rodar `supabase/hardening-rls.sql` no SQL Editor; conferir na Vercel que a
  senha do admin, o CRON_SECRET e o token do webhook do Asaas não são os valores de exemplo.
