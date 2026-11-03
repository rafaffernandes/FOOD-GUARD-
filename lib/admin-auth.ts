import { headers } from "next/headers";
import { checkBasicAuth } from "@/lib/basic-auth";

/**
 * Confere o Basic Auth do admin dentro da Server Action. Server Actions são endpoints
 * próprios: a checagem do middleware sozinha é uma barreira única, numa camada que já
 * teve falha de bypass no Next.
 */
export async function requireAdmin(): Promise<void> {
  const h = await headers();
  if ((await checkBasicAuth(h.get("authorization"))) !== "ok") {
    throw new Error("Não autorizado.");
  }
}
