-- =====================================================================
-- Food Guard — leads de mais de uma origem
-- Rode no SQL Editor do Supabase. É seguro rodar mais de uma vez.
-- =====================================================================

-- Até agora todo lead vinha do diagnóstico, então score, faixa de risco e
-- plano recomendado eram obrigatórios. Com o checklist capturando lead
-- também, passam a existir leads legítimos sem esses campos.
--
-- Mantemos uma tabela só, com uma coluna de origem, em vez de criar outra:
-- o comercial precisa de UMA lista para trabalhar, não de duas.

alter table public.leads
  add column if not exists source text not null default 'diagnostico';

alter table public.leads alter column score            drop not null;
alter table public.leads alter column risk_band        drop not null;
alter table public.leads alter column recommended_plan drop not null;

-- Os CHECK existentes continuam valendo para quem preenche: em SQL, NULL
-- passa por CHECK sem violar. Então lead de checklist entra com os campos
-- vazios e lead de diagnóstico continua obrigado a valores válidos.

create index if not exists leads_source_idx on public.leads (source);

-- Conferência rápida depois de rodar:
--   select source, count(*) from public.leads group by source;
