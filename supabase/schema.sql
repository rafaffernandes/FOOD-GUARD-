-- =====================================================================
-- Food Guard — schema do Supabase
-- Rode no SQL Editor do seu projeto Supabase.
-- =====================================================================

create extension if not exists "pgcrypto";

-- Leads capturados no gating do diagnóstico ------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  role text not null,
  company text not null,
  score int not null check (score between 0 and 100),
  risk_band text not null check (risk_band in ('critico','medio','baixo')),
  recommended_plan text not null check (recommended_plan in ('basico','essencial','premium')),
  answers jsonb not null default '{}'::jsonb,
  consent boolean not null default false,
  whatsapp_optin boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Log de consentimento (append-only / imutável) -------------------------
create table if not exists public.consent_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid references public.leads (id) on delete set null,
  email text not null,
  consent_type text not null,
  whatsapp_optin boolean not null default false
);

-- Impede update/delete no log de consentimento (imutabilidade).
create or replace function public.prevent_consent_mutation()
returns trigger language plpgsql as $$
begin
  raise exception 'consent_log é imutável';
end;
$$;

drop trigger if exists consent_log_no_update on public.consent_log;
create trigger consent_log_no_update
  before update or delete on public.consent_log
  for each row execute function public.prevent_consent_mutation();

-- Row Level Security -----------------------------------------------------
-- A escrita acontece via service role (API route), que ignora RLS.
-- Mantemos RLS ligado e SEM políticas públicas: nada é legível pelo
-- cliente anônimo. Acesse os dados pelo painel/Service Role.
alter table public.leads enable row level security;
alter table public.consent_log enable row level security;
