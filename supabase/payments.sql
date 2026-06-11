-- =====================================================================
-- Food Guard — pagamentos (eventos do webhook Asaas)
-- Rode no SQL Editor do Supabase. RLS ligado, sem políticas públicas
-- (acesso só via service_role, no servidor).
-- =====================================================================

create table if not exists public.payments (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  asaas_payment_id  text,
  event             text not null,        -- PAYMENT_CONFIRMED, PAYMENT_RECEIVED...
  status            text,
  value             numeric,
  customer          text,                 -- id do cliente no Asaas
  billing_type      text,                 -- PIX, CREDIT_CARD, BOLETO...
  description       text,
  raw               jsonb                 -- payload completo (auditoria)
);

create index if not exists payments_event_idx on public.payments (event);
create index if not exists payments_payment_idx on public.payments (asaas_payment_id);
create index if not exists payments_created_idx on public.payments (created_at desc);

alter table public.payments enable row level security;
