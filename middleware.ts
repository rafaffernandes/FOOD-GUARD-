import { type NextRequest, NextResponse } from "next/server";

/**
 * Protege o painel interno (/admin/*) com Basic Auth.
 * Configure ADMIN_USER e ADMIN_PASSWORD na Vercel. Sem essas variáveis, o painel
 * fica indisponível (503) — fail-safe para nunca expor a fila sem autenticação.
 */
export const config = { matcher: ["/admin/:path*"] };

export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Painel admin não configurado.", { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = atob(auth.slice(6));
    const idx = decoded.indexOf(":");
    const u = decoded.slice(0, idx);
    const p = decoded.slice(idx + 1);
    if (u === user && p === pass) return NextResponse.next();
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Food Guard Admin"' },
  });
}
