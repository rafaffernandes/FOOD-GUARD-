-- =============================================================================
-- Food Guard — endurecimento do RLS (check de segurança C04, 03/11/2026)
-- =============================================================================
-- Rode no SQL Editor do Supabase do projeto de PRODUÇÃO, DEPOIS dos outros
-- arquivos (schema.sql, payments.sql, fase-3-agents.sql, leads-origem.sql).
-- É seguro rodar mais de uma vez.
--
-- O que faz:
--   1. Garante o RLS ligado nas 7 tabelas que o app usa.
--   2. Tira os acessos padrão de anon e authenticated nessas tabelas. O app só fala
--      com o banco pelo servidor, com a chave de serviço (que ignora o RLS e tem
--      acessos próprios), então nada do app muda. É uma segunda barreira: se alguém
--      desligar o RLS pelo painel, a tabela continua fechada para a chave pública.
--   3. Fixa o search_path da função de trigger do consent_log (aviso 0011 do
--      Security Advisor do Supabase).
-- Não cria nenhuma policy: sem policy, ninguém acessa pela chave pública.
-- =============================================================================

do $$
declare
  t text;
begin
  foreach t in array array[
    'leads', 'consent_log', 'payments',
    'prospects', 'outreach_drafts', 'content_drafts', 'lead_activity'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('revoke all on table public.%I from anon, authenticated', t);
    end if;
  end loop;

  if to_regprocedure('public.prevent_consent_mutation()') is not null then
    alter function public.prevent_consent_mutation() set search_path = '';
  end if;
end $$;

-- =============================================================================
-- Conferência (rode depois e guarde o resultado)
-- =============================================================================
-- 1. RLS ligado nas 7 tabelas (esperado: rls_ligado = true em todas):
--    select c.relname as tabela, c.relrowsecurity as rls_ligado
--    from pg_class c join pg_namespace n on n.oid = c.relnamespace
--    where n.nspname = 'public' and c.relkind in ('r', 'p') order by 1;
--
-- 2. Nenhuma policy no schema public (esperado: 0 linhas):
--    select tablename, policyname, roles, cmd from pg_policies where schemaname = 'public';
--
-- 3. Nenhum acesso de anon/authenticated nas tabelas (esperado: 0 linhas):
--    select table_name, grantee, string_agg(privilege_type, ', ') as privilegios
--    from information_schema.role_table_grants
--    where table_schema = 'public' and grantee in ('anon', 'authenticated')
--    group by 1, 2 order by 1, 2;
--
-- 4. Nenhuma view no schema public (view ignora RLS se não tiver security_invoker;
--    esperado: 0 linhas):
--    select table_name from information_schema.views where table_schema = 'public';
--
-- 5. Painel do Supabase → Advisors → Security Advisor: sem "RLS disabled in public".
