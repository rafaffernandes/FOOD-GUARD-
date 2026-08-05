import { NextResponse } from "next/server";
import { requireCronSecret } from "@/lib/api-auth";
import { draftProspectOutreach } from "@/lib/agent/prospeccao";
import { fetchNewProspects, saveOutreachDraft } from "@/lib/agent/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cron do Agente de Prospecção (agendado em vercel.json).
 * Lê empresas recém-abertas (status 'novo'), rascunha a 1ª abordagem na voz da
 * marca e grava em outreach_drafts para APROVAÇÃO HUMANA — não envia nada.
 * Exige CRON_SECRET (a Vercel manda `Authorization: Bearer <secret>`).
 */
export async function GET(request: Request) {
  const bloqueio = requireCronSecret(request);
  if (bloqueio) return bloqueio;

  const prospects = await fetchNewProspects(20);
  let drafted = 0;
  for (const p of prospects) {
    const draft = await draftProspectOutreach(p);
    if (await saveOutreachDraft(p.id, draft)) drafted++;
  }

  return NextResponse.json({ ok: true, found: prospects.length, drafted });
}
