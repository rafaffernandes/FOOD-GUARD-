import { NextResponse } from "next/server";
import { z } from "zod";
import { computeDiagnostic } from "@/lib/diagnostic/engine";
import { sendDiagnosticEmail } from "@/lib/integrations/resend";
import { saveLead } from "@/lib/integrations/supabase";
import type { LeadPayload } from "@/lib/integrations/types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  role: z.enum(["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"]),
  consent: z.literal(true),
  whatsappOptin: z.boolean().optional(),
  answers: z.record(z.string()),
  utm: z.record(z.string()).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Recalcula o resultado no servidor (não confia no score do cliente).
  const result = computeDiagnostic(parsed.data.answers);

  const lead: LeadPayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    role: parsed.data.role,
    consent: parsed.data.consent,
    whatsappOptin: parsed.data.whatsappOptin ?? false,
    score: result.score,
    band: result.band,
    recommendedPlan: result.recommendedPlan,
    answers: parsed.data.answers,
    utm: parsed.data.utm,
  };

  const saved = await saveLead(lead);
  // E-mail não bloqueia a resposta ao usuário.
  void sendDiagnosticEmail(lead, result);

  return NextResponse.json({
    ok: saved.ok,
    devMode: saved.devMode ?? false,
    score: result.score,
    band: result.band,
    recommendedPlan: result.recommendedPlan,
  });
}
