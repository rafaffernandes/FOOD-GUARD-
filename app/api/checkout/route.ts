import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckout } from "@/lib/integrations/asaas";
import { getIp, rateLimit } from "@/lib/rate-limit";
import { lerCorpoJson } from "@/lib/validation/corpo";

const schema = z.object({
  planId: z.enum(["basico", "essencial", "premium"]),
});

export async function POST(request: Request) {
  const { allowed } = rateLimit(`checkout:${getIp(request)}`, 10, 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 },
    );
  }

  const leitura = await lerCorpoJson(request, 1_024);
  if (!leitura.ok) return leitura.response;

  const parsed = schema.safeParse(leitura.body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Plano inválido" },
      { status: 422 },
    );
  }

  const result = await createCheckout(parsed.data.planId);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Falha no checkout" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, url: result.url, devMode: result.devMode });
}
