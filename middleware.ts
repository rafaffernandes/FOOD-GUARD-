import { type NextRequest, NextResponse } from "next/server";

/**
 * Protege o painel interno (/admin/*) com Basic Auth.
 * Configure ADMIN_USER e ADMIN_PASSWORD na Vercel. Sem essas variáveis, o painel
 * fica indisponível (503) — fail-safe para nunca expor a fila sem autenticação.
 *
 * Segurança: a comparação usuário/senha é de TEMPO CONSTANTE (via hash SHA-256),
 * para não vazar informação por análise de tempo (timing attack). Respostas do
 * /admin nunca são cacheadas.
 */
export const config = { matcher: ["/admin/:path*"] };

/** Compara dois textos em tempo constante (não vaza tamanho nem conteúdo). */
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

function unauthorized(): NextResponse {
  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Food Guard Admin"',
      "Cache-Control": "no-store",
    },
  });
}

export async function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Painel admin não configurado.", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(":");
  if (idx === -1) return unauthorized();
  const u = decoded.slice(0, idx);
  const p = decoded.slice(idx + 1);

  const [okUser, okPass] = await Promise.all([
    timingSafeEqual(u, user),
    timingSafeEqual(p, pass),
  ]);
  if (okUser && okPass) {
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return unauthorized();
}
