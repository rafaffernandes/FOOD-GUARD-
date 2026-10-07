import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/content/site";
import { getIp, rateLimit } from "@/lib/rate-limit";

/**
 * Avisa os buscadores que aceitam IndexNow (Bing, Yandex, Seznam, Naver) de
 * que as páginas mudaram, em vez de esperar o robô passar sozinho.
 *
 * Por que a Bing importa aqui: o ChatGPT Search e o Copilot respondem usando o
 * índice da Bing. Entrar nele é o caminho mais curto para um assistente de IA
 * conseguir citar a Food Guard — e independe de ranquear no Google.
 *
 * Sem variável de ambiente, de propósito. A chave do IndexNow É pública por
 * desenho: o protocolo exige que ela fique legível em /<chave>.txt, e é essa
 * leitura que prova a posse do domínio. Tratar como segredo seria encenação, e
 * custaria uma configuração a mais para ligar.
 *
 * A proteção que o caso realmente pede é contra disparo repetido, que poderia
 * fazer a Bing limitar a chave. Daí o teto de 4 chamadas por hora por IP.
 */

const KEY = "d424538854bef8da0a2deae3985a6d6c";

export async function GET(request: Request) {
  const { allowed } = rateLimit(`indexnow:${getIp(request)}`, 4, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas chamadas. Tente de novo daqui a pouco." },
      { status: 429 },
    );
  }

  const paginas = [
    "",
    "/diagnostico",
    "/planos",
    "/sobre",
    "/blog",
    "/contato",
    "/checklist-vigilancia",
  ];
  const urlList = [
    ...paginas.map((p) => `${site.url}${p}`),
    ...getAllPosts().map((p) => `${site.url}/blog/${p.slug}`),
  ];

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(site.url).host,
        key: KEY,
        keyLocation: `${site.url}/${KEY}.txt`,
        urlList,
      }),
    });

    // 200 e 202 são aceitos. 422 costuma ser chave que não confere com o host.
    const ok = res.status === 200 || res.status === 202;
    if (!ok) console.error(`[indexnow] recusado (HTTP ${res.status})`);

    return NextResponse.json(
      { ok, status: res.status, enviadas: urlList.length, urlList },
      { status: ok ? 200 : 502 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[indexnow] falhou:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
