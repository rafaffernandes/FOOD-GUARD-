import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckout } from "@/lib/integrations/asaas";

const schema = z.object({
  planId: z.enum(["basico", "essencial", "premium"]),
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
      { ok: false, error: "Plano inválido" },
      { status: 422 },
    );
  }

  const result = await createCheckout(parsed.data.planId);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Falha no checkout" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, url: result.url, devMode: result.devMode });
}
