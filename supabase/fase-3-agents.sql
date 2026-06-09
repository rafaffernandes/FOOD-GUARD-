-- =====================================================================
-- Food Guard — Fase 3: tabelas dos agentes (prospecção, qualificação, conteúdo)
-- Rode no SQL Editor do Supabase DEPOIS de supabase/schema.sql.
-- Tudo com RLS ligado e sem políticas públicas: acesso só via service_role
-- (server). Ver docs/fase-3/estrategia-agentes.md.
-- =====================================================================

-- Empresas recém-abertas de food service captadas pela prospecção -----
create table if not exists public.prospects (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  cnpj          text unique,
  company_name  text not null,
  cnae          text,                 -- atividade principal
  segment       text,                 -- restaurante, padaria, dark kitchen...
  neighborhood  text,                 -- bairro (foco: Zona Leste)
  city          text default 'São Paulo',
  opened_at     date,                 -- data de abertura
  phone         text,
  email         text,
  source        text,                 -- receita_cnpj, jucesp, api_x...
  -- novo → rascunhado → aprovado → enviado → respondeu → convertido → descartado | optout
  status        text not null default 'novo',
  optout        boolean not null default false
);
create index if not exists prospects_status_idx on public.prospects (status);
create index if not exists prospects_opened_at_idx on public.prospects (opened_at desc);

-- Rascunhos de abordagem (human-in-the-loop) -------------------------
create table if not exists public.outreach_drafts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  prospect_id  uuid references public.prospects (id) on delete cascade,
  channel      text not null,         -- whatsapp | email
  subject      text,
  message      text not null,
  rationale    text,
  ai_generated boolean not null default false,
  -- pendente → aprovado → enviado | rejeitado
  status       text not null default 'pendente',
  approved_by  text,
  approved_at  timestamptz,
  sent_at      timestamptz
);
create index if not exists outreach_drafts_status_idx on public.outreach_drafts (status);

-- Rascunhos de conteúdo (LinkedIn/Instagram/blog) --------------------
create table if not exists public.content_drafts (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  platform     text not null,         -- linkedin | instagram | blog
  topic        text,
  hook         text,
  body         text not null,
  hashtags     text[] default '{}',
  cta          text,
  image_idea   text,
  ai_generated boolean not null default false,
  status       text not null default 'pendente', -- pendente → aprovado → publicado | rejeitado
  scheduled_for timestamptz,
  published_at timestamptz
);
create index if not exists content_drafts_status_idx on public.content_drafts (status);

-- Linha do tempo de cada lead (qualificação/follow-up) ---------------
create table if not exists public.lead_activity (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  lead_id     uuid references public.leads (id) on delete cascade,
  tier        text,                   -- A | B | C
  channel     text,
  message     text,
  rationale   text,
  ai_generated boolean not null default false,
  status      text not null default 'pendente' -- pendente → aprovado → enviado
);
create index if not exists lead_activity_lead_idx on public.lead_activity (lead_id);

alter table public.prospects       enable row level security;
alter table public.outreach_drafts enable row level security;
alter table public.content_drafts  enable row level security;
alter table public.lead_activity   enable row level security;
