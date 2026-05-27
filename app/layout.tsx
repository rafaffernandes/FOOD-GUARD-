import type { Metadata } from "next";
import { Calistoga, Inter, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Footer } from "@/components/ui/Footer";
import { Nav } from "@/components/ui/Nav";
import { site } from "@/lib/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
const calistoga = Calistoga({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-calistoga",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "nutricionista responsável food service",
    "segurança alimentar",
    "RDC 216",
    "Portaria 2619",
    "vigilância sanitária",
    "manual de boas práticas",
    "nutricionista food service São Paulo",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    areaServed: "São Paulo, BR",
    founder: site.founders.map((f) => ({ "@type": "Person", name: f.name })),
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${sora.variable} ${calistoga.variable} ${jetbrains.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
