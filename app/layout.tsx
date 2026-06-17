import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { Analytics } from "@/components/analytics/Analytics";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Footer } from "@/components/ui/Footer";
import { Nav } from "@/components/ui/Nav";
import { site } from "@/lib/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display" });

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
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.png`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    foundingDate: "2025",
    slogan: site.tagline,
    knowsAbout: [
      "Segurança alimentar",
      "RDC 216/2004 (Anvisa)",
      "Portaria 2.619/2011",
      "Manual de Boas Práticas",
      "POPs · Procedimentos Operacionais Padronizados",
      "APPCC",
      "Treinamento de manipuladores de alimentos",
      "Consultoria nutricional para food service",
    ],
    areaServed: {
      "@type": "City",
      name: "São Paulo",
      containedInPlace: { "@type": "State", name: "SP" },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${site.whatsapp}`,
        email: site.email,
        availableLanguage: ["Portuguese"],
        areaServed: "BR",
      },
    ],
    sameAs: [site.social.instagram.url, site.social.linkedin.url],
  };

  // LocalBusiness: reforça SEO local e dá às LLMs área servida por bairro.
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    telephone: `+${site.whatsapp}`,
    email: site.email,
    priceRange: "R$1.200 - R$3.200/mês",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "São Paulo" },
      ...[
        "Tatuapé", "Mooca", "Penha", "Itaquera", "Aricanduva",
        "Vila Prudente", "São Miguel Paulista", "Itaim Paulista",
        "Guaianases", "Vila Formosa", "Carrão", "São Mateus",
      ].map((bairro) => ({
        "@type": "Place",
        name: `${bairro}, Zona Leste — São Paulo`,
      })),
    ],
    parentOrganization: { "@id": `${site.url}/#organization` },
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "pt-BR",
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
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
