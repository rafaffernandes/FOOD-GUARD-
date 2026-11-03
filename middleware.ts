import { type NextRequest, NextResponse } from "next/server";
import { checkBasicAuth } from "@/lib/basic-auth";

/**
 * Protege o painel interno (/admin/*) com Basic Auth.
 * Configure ADMIN_USER e ADMIN_PASSWORD na Vercel. Sem essas variáveis, o painel
 * fica indisponível (503) — fail-safe para nunca expor a fila sem autenticação.
 *
 * Segurança: a comparação usuário/senha é de TEMPO CONSTANTE (lib/basic-auth.ts),
 * para não vazar informação por análise de tempo (timing attack). Respostas do
 * /admin nunca são cacheadas. A Server Action do painel confere de novo
 * (lib/admin-auth.ts): o middleware não é a única barreira.
 */
export const config = { matcher: ["/admin/:path*"] };

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
  const resultado = await checkBasicAuth(req.headers.get("authorization"));

  if (resultado === "nao_configurado") {
    return new NextResponse("Painel admin não configurado.", { status: 503 });
  }
  if (resultado === "invalido") return unauthorized();

  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store");
  return res;
}
