import { NextResponse } from "next/server";
import { draftProspectOutreach } from "@/lib/agent/prospeccao";
import { fetchNewProspects, saveOutreachDraft } from "@/lib/agent/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Cron do Agente de Prospecção (agendado em vercel.json).
 * Lê empresas recém-abertas (status 'novo'), rascunha a 1ª abordagem na voz da
 * marca e grava em outreach_drafts para APROVAÇÃO HUMANA — não envia nada.
 * Protegido por CRON_SECRET (a Vercel manda `Authorization: Bearer <secret>`).
 */
export async function GET(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const prospects = await fetchNewProspects(20);
  let drafted = 0;
  for (const p of prospects) {
    const draft = await draftProspectOutreach(p);
    if (await saveOutreachDraft(p.id, draft)) drafted++;
  }

  return NextResponse.json({ ok: true, found: prospects.length, drafted });
}
