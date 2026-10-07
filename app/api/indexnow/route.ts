import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/content/site";

/**
 * Avisa os buscadores que aceitam IndexNow (Bing, Yandex, Seznam, Naver) de
 * que as páginas mudaram, em vez de esperar o robô passar sozinho.
 *
 * Por que a Bing importa aqui: o ChatGPT Search e o Copilot respondem usando o
 * índice da Bing. Entrar nele é o caminho mais curto para um assistente de IA
 * conseguir citar a Food Guard — e independe de ranquear no Google.
 *
 * Autenticação pela query em vez de cabeçalho, de propósito: o disparo é
 * manual, feito abrindo a URL no navegador depois de publicar, e navegador não
 * manda cabeçalho. Falha FECHANDO: sem INDEXNOW_KEY, responde 503.
 */

const KEY = process.env.INDEXNOW_KEY?.trim();

export async function GET(request: Request) {
  if (!KEY) {
    console.error("[indexnow] INDEXNOW_KEY ausente — rota bloqueada.");
    return NextResponse.json(
      { ok: false, error: "Rota não configurada." },
      { status: 503 },
    );
  }

  if (new URL(request.url).searchParams.get("key") !== KEY) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
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

  const host = new URL(site.url).host;

  try {
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: KEY,
        keyLocation: `${site.url}/${KEY}.txt`,
        urlList,
      }),
    });

    // 200 e 202 são aceitos. 422 costuma ser chave que não confere com o host.
    const ok = res.status === 200 || res.status === 202;
    if (!ok) {
      console.error(`[indexnow] recusado (HTTP ${res.status})`);
    }

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
