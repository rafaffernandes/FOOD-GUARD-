/** @type {import('next').NextConfig} */

// Content-Security-Policy — controla de onde o navegador pode carregar/enviar
// coisas. Libera só o que o site usa: GA4 e Meta Pixel (components/analytics) e as
// fotos do Unsplash e do Pexels. O navegador não fala com Supabase nem com o Asaas:
// isso é só do servidor, então não entra aqui. Bloqueia o resto.
// unsafe-inline em script-src continua necessário para o JSON-LD e o GA embutidos.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  // Destinos do GA4 com Google Signals, pelo guia de CSP do Google (inclui o domínio regional .com.br).
  "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://www.facebook.com https://*.google-analytics.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.com.br",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://analytics.google.com https://*.googletagmanager.com https://*.g.doubleclick.net https://*.google.com https://*.google.com.br https://pagead2.googlesyndication.com https://connect.facebook.net https://www.facebook.com",
  "frame-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Força HTTPS por 2 anos (inclui subdomínios) — impede downgrade para HTTP.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Impede o navegador de "adivinhar" tipos de arquivo (anti-MIME-sniffing).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Impede que o site seja embutido em iframes de terceiros (anti-clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Não vaza a URL completa de referência para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Desliga APIs sensíveis do navegador que o site não usa.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // O sitemap revalida em produção e lê content/blog; o trace automático da função não
  // inclui a pasta, e sem isto o sitemap regerado sairia sem nenhum post.
  outputFileTracingIncludes: {
    "/sitemap.xml": ["./content/blog/**/*.mdx"],
  },
  images: {
    remotePatterns: [
      // Só os caminhos que lib/content/photos.ts usa: o otimizador de imagem não vira proxy
      // aberto para qualquer arquivo desses dois hosts.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/photos/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
