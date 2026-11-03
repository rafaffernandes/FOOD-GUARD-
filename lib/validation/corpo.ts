import { NextResponse } from "next/server";

/** 16 KB cobre com folga qualquer formulário do site. */
const LIMITE_PADRAO = 16_384;

type Leitura = { ok: true; body: unknown } | { ok: false; response: NextResponse };

/**
 * Lê o JSON do corpo com teto de tamanho. Sem isso, cada rota pública aceita até o
 * limite da plataforma (4,5 MB na Vercel), e esse volume vai para o banco e para a IA.
 */
export async function lerCorpoJson(request: Request, limite = LIMITE_PADRAO): Promise<Leitura> {
  const grandeDemais = () => ({
    ok: false as const,
    response: NextResponse.json({ ok: false, error: "Requisição grande demais" }, { status: 413 }),
  });
  if (Number(request.headers.get("content-length") ?? 0) > limite) return grandeDemais();
  let texto: string;
  try {
    texto = await request.text();
  } catch {
    return { ok: false, response: NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 }) };
  }
  if (texto.length > limite) return grandeDemais();
  try {
    return { ok: true, body: JSON.parse(texto) };
  } catch {
    return { ok: false, response: NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 }) };
  }
}
