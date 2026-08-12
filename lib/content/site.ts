export const site = {
  name: "Food Guard",
  tagline: "Consultoria nutricional para food service.",
  description:
    "Consultoria nutricional para food service. Nutricionista responsável, documentação em dia e equipe orientada — sua operação pronta pra qualquer fiscalização.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5511976466553",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@foodguardassessoria.com.br",
  city: "São Paulo · Grande SP",
  /** Nome público (fantasia) exibido no site. A razão social (= nome da pessoa,
   * por ser empresário individual) NUNCA aparece no front. O CNPJ é exibido
   * apenas na Política de Privacidade e nos Termos, como controlador LGPD. */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Food Guard",
  cnpj: "60.833.961/0001-73",
  social: {
    instagram: {
      handle: "@foodguardassessoria",
      url: "https://www.instagram.com/foodguardassessoria/",
    },
    linkedin: {
      handle: "foodguardassessoria",
      url: "https://www.linkedin.com/company/foodguardassessoria/",
    },
  },
  guarantee: "90 dias para estar 100% em conformidade real — se não chegarmos lá, seguimos sem custo extra.",
  regulations: ["RDC 216/2004 (Anvisa)", "Portaria 2.619/2011"],
} as const;

export const docusignUrl =
  process.env.NEXT_PUBLIC_DOCUSIGN_URL || "";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
