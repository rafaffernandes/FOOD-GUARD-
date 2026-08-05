/** @type {import('next').NextConfig} */

// Content-Security-Policy — controla de onde o navegador pode carregar/enviar
// coisas. Libera só o necessário: GA4, Meta Pixel, Mercado Pago (checkout
// futuro) e o toolbar de preview da Vercel. Bloqueia o resto.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://*.mercadopago.com https://sdk.mercadopago.com https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://connect.facebook.net https://*.facebook.com https://*.mercadopago.com https://vercel.live https://*.pusher.com wss://*.pusher.com",
  "frame-src 'self' https://*.mercadopago.com https://vercel.live",
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
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Next.js precisa de unsafe-inline para scripts JSON-LD e GA embutidos
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.facebook.com",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://www.facebook.com https://api.asaas.com https://api-sandbox.asaas.com",
      "frame-src https://sandbox.asaas.com https://www.asaas.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
