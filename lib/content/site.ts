export const site = {
  name: "Food Guard",
  tagline: "Excelência em segurança alimentar.",
  description:
    "Assessoria de segurança alimentar para food service. Nutricionista responsável com nome e CRN ativo, resposta rápida e um diagnóstico gratuito em 90 segundos.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5511999999999",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@foodguard.com.br",
  city: "São Paulo · Grande SP",
  social: {
    instagram: {
      handle: "@foodguard.assessoria",
      url: "https://instagram.com/foodguard.assessoria",
    },
    linkedin: {
      handle: "Renan Muniz",
      url: "https://www.linkedin.com/in/renan-muniz/",
    },
  },
  founders: [
    {
      name: "Renan Muniz",
      role: "Nutricionista responsável · co-founder",
      credentials:
        "Nutricionista CRN-3 ativo · +10 anos em food service · atende os primeiros clientes pessoalmente.",
      initials: "RM",
    },
    {
      name: "Rafael Fernandes",
      role: "Produto · IA · operação digital · co-founder",
      credentials:
        "Construção da plataforma, automações, aquisição digital e gestão do negócio.",
      initials: "RF",
    },
  ],
  guarantee: "90 dias para estar 100% em conformidade real — se não chegarmos lá, seguimos sem custo extra.",
  regulations: ["RDC 216/2004 (Anvisa)", "Portaria 2.619/2011"],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
