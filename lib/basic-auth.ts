/**
 * Basic Auth do painel /admin, usado pelo middleware (Edge) e pela Server Action (Node).
 * Sem imports de Node de propósito: só Web Crypto, atob e TextEncoder, que existem nos
 * dois ambientes.
 */

/** Compara dois textos em tempo constante (não vaza tamanho nem conteúdo). */
export async function timingSafeEqualText(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [ha, hb] = await Promise.all([
    globalThis.crypto.subtle.digest("SHA-256", enc.encode(a)),
    globalThis.crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const va = new Uint8Array(ha);
  const vb = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

/**
 * Confere o cabeçalho Authorization contra ADMIN_USER e ADMIN_PASSWORD. Sem as duas
 * variáveis, devolve "nao_configurado": o painel fica fechado, nunca aberto.
 */
export async function checkBasicAuth(
  header: string | null,
): Promise<"ok" | "invalido" | "nao_configurado"> {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return "nao_configurado";

  if (!header?.startsWith("Basic ")) return "invalido";
  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return "invalido";
  }
  const idx = decoded.indexOf(":");
  if (idx === -1) return "invalido";

  const [okUser, okPass] = await Promise.all([
    timingSafeEqualText(decoded.slice(0, idx), user),
    timingSafeEqualText(decoded.slice(idx + 1), pass),
  ]);
  return okUser && okPass ? "ok" : "invalido";
}
