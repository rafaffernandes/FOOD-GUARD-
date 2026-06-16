import { NextResponse } from "next/server";

/**
 * TEMPORÁRIO — diagnóstico das variáveis do painel admin, rodando no mesmo
 * runtime (edge) do middleware que protege /admin. Não expõe os valores,
 * apenas se existem e o tamanho. Remover após validar o /admin.
 */
export const runtime = "edge";
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    runtime: "edge",
    adminUserSet: Boolean(process.env.ADMIN_USER),
    adminUserLen: (process.env.ADMIN_USER ?? "").length,
    adminPasswordSet: Boolean(process.env.ADMIN_PASSWORD),
    adminPasswordLen: (process.env.ADMIN_PASSWORD ?? "").length,
    cronSecretSet: Boolean(process.env.CRON_SECRET),
  });
}
