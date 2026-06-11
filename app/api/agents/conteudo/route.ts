import { NextResponse } from "next/server";
import { draftContent } from "@/lib/agent/conteudo";
import { saveContentDraft } from "@/lib/agent/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Cron do Agente de Conteúdo (vercel.json: seg e qui).
 * Pega a pauta da semana (lista fixa, derivada do calendário editorial em
 * docs/marketing/calendario-editorial.md), rascunha 1 post de LinkedIn + 1 de
 * Instagram na voz da marca e grava em content_drafts (pendente) — NADA é
 * publicado sem aprovação humana.
 */

const PAUTAS = [
  "Quanto custa uma multa da vigilância sanitária (faixas reais por infração)",
  "O que a vigilância olha primeiro numa fiscalização — passo a passo",
  "Manual de Boas Práticas e POPs: o que são e por que te protegem",
  "Checklist: os itens que a vigilância cobra primeiro",
  '"Nutricionista no papel" não te protege: o risco do responsável fantasma',
  "Como abrir um restaurante em SP em conformidade desde o dia 1",
  "Auto de infração x notificação: a diferença que muda tudo",
  "Controle de temperatura na prática: o erro que mais gera multa",
  "Dark kitchen: como operar 100% regular e entrar nos apps",
  "Treinamento da equipe em boas práticas: o que a lei exige",
  "Licença sanitária: documentos, prazos e armadilhas",
  "Os 3 problemas mais comuns que encontramos em cozinhas novas",
];

/** Semana ISO aproximada (suficiente pra rotacionar pautas de forma estável). */
function pautaDaSemana(): string {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 1);
  const week = Math.floor((now.getTime() - start) / (7 * 86_400_000));
  return PAUTAS[week % PAUTAS.length];
}

export async function GET(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const topic = pautaDaSemana();
  const results: { platform: string; saved: boolean; aiGenerated: boolean }[] = [];

  for (const platform of ["linkedin", "instagram"] as const) {
    const draft = await draftContent({ platform, topic });
    const saved = await saveContentDraft(topic, draft);
    results.push({ platform, saved, aiGenerated: draft.aiGenerated });
  }

  return NextResponse.json({
    ok: true,
    topic,
    results,
    aviso:
      "Rascunhos gravados em content_drafts (pendente). Nada é publicado sem aprovação.",
  });
}
