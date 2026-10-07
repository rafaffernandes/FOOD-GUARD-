import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ContactPayload, LeadPayload } from "./types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseConfigured = Boolean(url && serviceKey);

/** Cliente server-side com service role. Só use em API routes. */
function getAdminClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return createClient(url as string, serviceKey as string, {
    auth: { persistSession: false },
  });
}

export interface SaveLeadResult {
  ok: boolean;
  id?: string;
  devMode?: boolean;
  error?: string;
}

export async function saveLead(lead: LeadPayload): Promise<SaveLeadResult> {
  const client = getAdminClient();

  // Degradação graciosa: sem credenciais, loga e segue (modo dev).
  if (!client) {
    console.info("[dev] Supabase não configurado — lead capturado localmente (score:", lead.score, "| plano:", lead.recommendedPlan, ")");
    return { ok: true, devMode: true };
  }

  const { data, error } = await client
    .from("leads")
    .insert({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      role: lead.role,
      company: lead.company,
      score: lead.score,
      risk_band: lead.band,
      recommended_plan: lead.recommendedPlan,
      answers: lead.answers,
      consent: lead.consent,
      whatsapp_optin: lead.whatsappOptin,
      utm_source: lead.utm?.utm_source ?? null,
      utm_medium: lead.utm?.utm_medium ?? null,
      utm_campaign: lead.utm?.utm_campaign ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[supabase] erro ao salvar lead:", error.message);
    return { ok: false, error: error.message };
  }

  // Consent log imutável (append-only).
  if (lead.consent) {
    await client.from("consent_log").insert({
      lead_id: data.id,
      email: lead.email,
      consent_type: "lgpd_diagnostico",
      whatsapp_optin: lead.whatsappOptin,
    });
  }

  return { ok: true, id: data.id };
}

/**
 * Lead que veio do checklist, não do diagnóstico.
 *
 * Grava na MESMA tabela, com `source` marcando a origem e os campos do
 * diagnóstico vazios — o comercial precisa de uma lista só para trabalhar.
 * Depende da migração `supabase/leads-origem.sql`.
 */
export async function saveChecklistLead(
  contato: ContactPayload,
): Promise<SaveLeadResult> {
  const client = getAdminClient();

  if (!client) {
    console.info(
      `[dev] Supabase não configurado — lead do checklist capturado localmente (${contato.email})`,
    );
    return { ok: true, devMode: true };
  }

  const { data, error } = await client
    .from("leads")
    .insert({
      name: contato.name,
      email: contato.email,
      phone: contato.phone,
      role: contato.role,
      company: contato.company,
      consent: contato.consent,
      whatsapp_optin: contato.whatsappOptin,
      source: "checklist",
      utm_source: contato.utm?.utm_source ?? null,
      utm_medium: contato.utm?.utm_medium ?? null,
      utm_campaign: contato.utm?.utm_campaign ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[supabase] erro ao salvar lead do checklist:", error.message);
    return { ok: false, error: error.message };
  }

  if (contato.consent) {
    await client.from("consent_log").insert({
      lead_id: data.id,
      email: contato.email,
      consent_type: "lgpd_checklist",
      whatsapp_optin: contato.whatsappOptin,
    });
  }

  return { ok: true, id: data.id };
}
