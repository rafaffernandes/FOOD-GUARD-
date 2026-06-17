export const site = {
  name: "Food Guard",
  tagline: "Consultoria nutricional para food service.",
  description:
    "Consultoria nutricional para food service. Nutricionista responsável, documentação em dia e equipe orientada — sua operação pronta pra qualquer fiscalização.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5511976466553",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@foodguard.com.br",
  city: "São Paulo · Grande SP",
  /** Nome público (fantasia) exibido no site. A razão social e o CNPJ reais
   * NÃO aparecem no front — ficam só no backend (env server-side) para
   * Asaas/nota fiscal. Empresário individual: razão social = nome da pessoa. */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Food Guard",
  cnpj: "",
  social: {
    instagram: {
      handle: "@foodguard.assessoria",
      url: "https://instagram.com/foodguard.assessoria",
    },
    linkedin: {
      handle: "foodguardassessoria",
      url: "https://www.linkedin.com/company/foodguardassessoria/",
    },
  },
  guarantee: "90 dias para estar 100% em conformidade real — se não chegarmos lá, seguimos sem custo extra.",
  regulations: ["RDC 216/2004 (Anvisa)", "Portaria 2.619/2011"],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
