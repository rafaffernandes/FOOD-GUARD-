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

export type DraftTable = "outreach_drafts" | "content_drafts" | "lead_activity";

/** Item normalizado da fila de aprovação (junta os 3 tipos de rascunho). */
export interface PendingDraft {
  id: string;
  table: DraftTable;
  kind: "Prospecção" | "Conteúdo" | "Qualificação";
  title: string;
  subtitle?: string;
  channel?: string;
  message: string;
  rationale?: string;
  aiGenerated: boolean;
  createdAt: string;
}

/** Todos os rascunhos pendentes de aprovação, dos 3 agentes, mais antigos primeiro. */
export async function fetchPendingDrafts(): Promise<PendingDraft[]> {
  const client = admin();
  if (!client) {
    console.info("[dev] Supabase não configurado — fila de aprovação vazia.");
    return [];
  }

  const out: PendingDraft[] = [];

  const { data: outreach } = await client
    .from("outreach_drafts")
    .select(
      "id, channel, message, rationale, ai_generated, created_at, prospects(company_name, neighborhood)",
    )
    .eq("status", "pendente")
    .order("created_at", { ascending: true });
  for (const r of outreach ?? []) {
    const p = Array.isArray(r.prospects) ? r.prospects[0] : r.prospects;
    out.push({
      id: r.id,
      table: "outreach_drafts",
      kind: "Prospecção",
      title: p?.company_name ?? "Empresa",
      subtitle: p?.neighborhood ?? undefined,
      channel: r.channel,
      message: r.message,
      rationale: r.rationale ?? undefined,
      aiGenerated: r.ai_generated,
      createdAt: r.created_at,
    });
  }

  const { data: content } = await client
    .from("content_drafts")
    .select("id, platform, topic, hook, body, cta, ai_generated, created_at")
    .eq("status", "pendente")
    .order("created_at", { ascending: true });
  for (const r of content ?? []) {
    out.push({
      id: r.id,
      table: "content_drafts",
      kind: "Conteúdo",
      title: `${r.platform}${r.topic ? ` · ${r.topic}` : ""}`,
      subtitle: r.hook ?? undefined,
      message: `${r.body}\n\nCTA: ${r.cta ?? ""}`,
      aiGenerated: r.ai_generated,
      createdAt: r.created_at,
    });
  }

  const { data: activity } = await client
    .from("lead_activity")
    .select(
      "id, tier, channel, message, rationale, ai_generated, created_at, leads(name, company)",
    )
    .eq("status", "pendente")
    .order("created_at", { ascending: true });
  for (const r of activity ?? []) {
    const l = Array.isArray(r.leads) ? r.leads[0] : r.leads;
    out.push({
      id: r.id,
      table: "lead_activity",
      kind: "Qualificação",
      title: l?.company ?? l?.name ?? "Lead",
      subtitle: `tier ${r.tier ?? "?"}${l?.name ? ` · ${l.name}` : ""}`,
      channel: r.channel,
      message: r.message,
      rationale: r.rationale ?? undefined,
      aiGenerated: r.ai_generated,
      createdAt: r.created_at,
    });
  }

  return out;
}

/** Marca um rascunho como aprovado ou rejeitado. */
export async function setDraftStatus(
  table: DraftTable,
  id: string,
  status: "aprovado" | "rejeitado",
): Promise<boolean> {
  const client = admin();
  if (!client) return false;
  const { error } = await client.from(table).update({ status }).eq("id", id);
  if (error) {
    console.error("[approval] erro ao atualizar status:", error.message);
    return false;
  }
  return true;
}

/** Grava um rascunho de conteúdo (LinkedIn/Instagram/blog) na fila (pendente). */
export async function saveContentDraft(
  topic: string,
  draft: {
    platform: string;
    hook: string;
    body: string;
    hashtags: string[];
    cta: string;
    imageIdea: string | null;
    aiGenerated: boolean;
  },
): Promise<boolean> {
  const client = admin();
  if (!client) {
    console.info("[dev] rascunho de conteúdo (não persistido):", topic);
    return false;
  }
  const { error } = await client.from("content_drafts").insert({
    platform: draft.platform,
    topic,
    hook: draft.hook,
    body: draft.body,
    hashtags: draft.hashtags,
    cta: draft.cta,
    image_idea: draft.imageIdea,
    ai_generated: draft.aiGenerated,
  });
  if (error) {
    console.error("[content_drafts] erro ao salvar:", error.message);
    return false;
  }
  return true;
}

/** Grava o rascunho de follow-up de um lead na fila (lead_activity, pendente). */
export async function saveLeadActivity(
  leadId: string | undefined,
  tier: string,
  channel: string,
  message: string,
  rationale: string,
  aiGenerated: boolean,
): Promise<boolean> {
  const client = admin();
  if (!client || !leadId) {
    console.info("[dev] lead_activity não persistido (sem Supabase ou lead id).");
    return false;
  }
  const { error } = await client.from("lead_activity").insert({
    lead_id: leadId,
    tier,
    channel,
    message,
    rationale,
    ai_generated: aiGenerated,
  });
  if (error) {
    console.error("[lead_activity] erro ao salvar:", error.message);
    return false;
  }
  return true;
}
