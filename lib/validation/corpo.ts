import { NextResponse } from "next/server";

/** 16 KB cobre com folga qualquer formulário do site. */
const LIMITE_PADRAO = 16_384;

type Leitura = { ok: true; body: unknown } | { ok: false; response: NextResponse };

const grandeDemais = (): Leitura => ({
  ok: false,
  response: NextResponse.json({ ok: false, error: "Requisição grande demais" }, { status: 413 }),
});
const invalido = (): Leitura => ({
  ok: false,
  response: NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 }),
});

/**
 * Lê o JSON do corpo com teto de tamanho em bytes. Sem isso, cada rota pública aceita até o
 * limite da plataforma (4,5 MB na Vercel), e esse volume vai para o banco e para a IA.
 * A leitura é feita aos pedaços e para assim que passa do teto: um corpo sem
 * Content-Length (enviado em partes) não chega a ser carregado inteiro na memória.
 */
export async function lerCorpoJson(request: Request, limite = LIMITE_PADRAO): Promise<Leitura> {
  if (Number(request.headers.get("content-length") ?? 0) > limite) return grandeDemais();
  if (!request.body) return invalido();

  const leitor = request.body.getReader();
  const partes: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await leitor.read();
      if (done) break;
      total += value.byteLength;
      if (total > limite) {
        await leitor.cancel().catch(() => {});
        return grandeDemais();
      }
      partes.push(value);
    }
  } catch {
    return invalido();
  }

  const bytes = new Uint8Array(total);
  let pos = 0;
  for (const p of partes) {
    bytes.set(p, pos);
    pos += p.byteLength;
  }
  try {
    return { ok: true, body: JSON.parse(new TextDecoder().decode(bytes)) };
  } catch {
    return invalido();
  }
}
