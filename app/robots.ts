import type { MetadataRoute } from "next";
import { site } from "@/lib/content/site";

// Libera explicitamente bots de busca tradicionais e crawlers de LLMs
// (ChatGPT, Claude, Perplexity, Gemini, You.com, etc.). A página de produto
// precisa aparecer em respostas de IA generativa — não só no Google.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "Diffbot",
  "Amazonbot",
  "YouBot",
  "cohere-ai",
];

// O PDF do checklist fica fora da busca de propósito: ele é a recompensa por
// deixar os dados. Indexado, viraria porta de entrada sem formulário — e
// tráfego que cai direto num PDF não vira lead nem tem para onde clicar.
const BLOQUEADO = ["/api/", "/admin/", "/checklist-vigilancia-food-guard.pdf"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: BLOQUEADO },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow: BLOQUEADO })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
