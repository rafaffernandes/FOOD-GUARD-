import { NextResponse } from "next/server";
import { anthropicConfigured } from "@/lib/agent/client";
import { draftContent } from "@/lib/agent/conteudo";
import { draftLeadFollowUp } from "@/lib/agent/followup";
import { type Prospect, draftProspectOutreach } from "@/lib/agent/prospeccao";
import type { LeadPayload } from "@/lib/integrations/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CRON_SECRET = process.env.CRON_SECRET;

const isoDaysAgo = (d: number) =>
  new Date(Date.now() - d * 86_400_000).toISOString().slice(0, 10);

// Prospect fictício: restaurante recém-aberto no Tatuapé (Zona Leste).
const PROSPECT_MOCK: Prospect = {
  companyName: "Cantina da Dona Léa",
  cnae: "5611-2/01",
  segment: "restaurante",
  neighborhood: "Tatuapé",
  openedAt: isoDaysAgo(20),
  ageDays: 20,
  phone: "5511999990000",
};

// Lead fictício "quente": autuado, sem nutricionista, sem documentação, decisor.
const LEAD_MOCK: LeadPayload = {
  name: "Carlos Souza",
  email: "carlos@exemplo.com.br",
  phone: "11999990000",
  role: "Gestor",
  company: "Padaria Pão Nosso",
  consent: true,
  whatsappOptin: true,
  score: 30,
  band: "critico",
  recommendedPlan: "premium",
  answers: {
    fiscalizacao: "fisc_auto",
    nutri: "nutri_nenhum",
    documentacao: "doc_nenhum",
  },
};

/**
 * Bateria de teste da IA dos agentes (Fase A). Exercita os 3 agentes com dados
 * fictícios — NÃO toca no banco e NÃO envia nada — pra validar que o Claude
 * gera os rascunhos na voz da marca. Protegida por CRON_SECRET.
 *
 * `iaConfigurada` e o campo `aiGenerated` de cada bloco indicam se a saída veio
 * do Claude (true) ou do fallback determinístico (false).
 */
export async function GET(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  try {
    const [prospeccao, qualificacao, conteudo] = await Promise.all([
      draftProspectOutreach(PROSPECT_MOCK),
      draftLeadFollowUp(LEAD_MOCK),
      draftContent({
        platform: "linkedin",
        topic: "O que a vigilância sanitária olha primeiro numa fiscalização",
      }),
    ]);

    return NextResponse.json({
      ok: true,
      iaConfigurada: anthropicConfigured,
      veredito: anthropicConfigured
        ? "IA LIGADA — confira aiGenerated:true em cada bloco abaixo."
        : "IA NÃO configurada — saída do fallback (aiGenerated:false). Configure ANTHROPIC_API_KEY.",
      prospeccao,
      qualificacao: {
        tier: qualificacao.qualified.tier,
        slaMinutes: qualificacao.qualified.slaMinutes,
        ...qualificacao.draft,
      },
      conteudo,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[teste-ia]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
