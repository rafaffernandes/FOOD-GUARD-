import { NextResponse } from "next/server";
import { z } from "zod";
import { saveChecklistLead } from "@/lib/integrations/supabase";
import { getIp, rateLimit } from "@/lib/rate-limit";

/**
 * Captura o lead que quer baixar o checklist completo de 80 itens.
 *
 * Rota separada da do diagnóstico de propósito: aquela recalcula o score no
 * servidor e tem validação própria das respostas. Misturar as duas deixaria
 * um fluxo que já funciona mais frágil sem ganho nenhum.
 */

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  role: z.enum(["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"]),
  consent: z.literal(true),
  whatsappOptin: z.boolean().optional(),
  utm: z.record(z.string()).optional(),
});

export async function POST(request: Request) {
  const { allowed } = rateLimit(`checklist:${getIp(request)}`, 5, 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente de novo em instantes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados incompletos" },
      { status: 422 },
    );
  }

  const { whatsappOptin, ...resto } = parsed.data;
  const result = await saveChecklistLead({
    ...resto,
    whatsappOptin: whatsappOptin ?? false,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Não foi possível registrar agora." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, devMode: result.devMode });
}
