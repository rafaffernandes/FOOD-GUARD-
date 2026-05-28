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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
