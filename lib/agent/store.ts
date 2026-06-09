import { type SupabaseClient, createClient } from "@supabase/supabase-js";
import type { Prospect, ProspectOutreach } from "./prospeccao";

/**
 * Persistência dos agentes (Fase 3). Mesma degradação graciosa do resto do
 * projeto: sem credenciais Supabase, loga em dev e segue. Só para uso no
 * servidor (service role). Tabelas em supabase/fase-3-agents.sql.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function admin(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export interface ProspectRow extends Prospect {
  id: string;
}

/** Prospects recém-captados ainda não abordados (status 'novo', sem opt-out). */
export async function fetchNewProspects(limit = 20): Promise<ProspectRow[]> {
  const client = admin();
  if (!client) {
    console.info("[dev] Supabase não configurado — sem prospects para rascunhar.");
    return [];
  }
  const { data, error } = await client
    .from("prospects")
    .select("id, company_name, cnae, segment, neighborhood, opened_at")
    .eq("status", "novo")
    .eq("optout", false)
    .order("opened_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[prospects] erro ao buscar:", error.message);
    return [];
  }

  return (data ?? []).map((r) => {
    const openedAt: string = r.opened_at ?? "";
    const ageDays = openedAt
      ? Math.floor((Date.now() - new Date(openedAt).getTime()) / 86_400_000)
      : 0;
    return {
      id: r.id,
      companyName: r.company_name,
      cnae: r.cnae ?? "",
      segment: r.segment ?? "",
      neighborhood: r.neighborhood ?? "",
      openedAt,
      ageDays,
    };
  });
}

/** Grava o rascunho de abordagem (pendente de aprovação) e marca o prospect. */
export async function saveOutreachDraft(
  prospectId: string,
  draft: ProspectOutreach,
): Promise<boolean> {
  const client = admin();
  if (!client) {
    console.info("[dev] rascunho de outbound (não persistido):", draft.message);
    return false;
  }
  await client.from("outreach_drafts").insert({
    prospect_id: prospectId,
    channel: draft.channel,
    subject: draft.subject,
    message: draft.message,
    rationale: draft.rationale,
    ai_generated: draft.aiGenerated,
  });
  await client.from("prospects").update({ status: "rascunhado" }).eq("id", prospectId);
  return true;
}
