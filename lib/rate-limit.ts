interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

/** Teto de chaves guardadas — acima disso, faxina antes de aceitar mais. */
const MAX_KEYS = 10_000;

/** Remove janelas já expiradas: sem isso o Map só cresce, IP após IP. */
function limpaExpirados(now: number): void {
  for (const [k, v] of store) {
    if (v.resetAt <= now) store.delete(k);
  }
}

/**
 * Rate limiter in-memory por chave (IP).
 * Funciona por instância serverless — suficiente contra abuso básico.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  if (store.size >= MAX_KEYS) limpaExpirados(now);
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

/** Extrai o IP real da requisição Next.js (Vercel injeta x-forwarded-for). */
export function getIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}
