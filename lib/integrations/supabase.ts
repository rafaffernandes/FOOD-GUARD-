import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { LeadPayload } from "./types";

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
    console.info("[dev] Supabase não configurado — lead capturado localmente:", {
      email: lead.email,
      company: lead.company,
      score: lead.score,
      plan: lead.recommendedPlan,
    });
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
