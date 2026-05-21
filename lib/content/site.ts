export const site = {
  name: "Food Guard",
  tagline: "Conformidade sanitária e nutricional como software.",
  description:
    "Assessoria de conformidade sanitária e nutricional para food service. Responsável Técnico nutricionista com nome e CRN ativo, previsibilidade contratual e um diagnóstico regulatório gratuito em 90 segundos.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5511999999999",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@foodguard.com.br",
  city: "São Paulo · Grande SP",
  founders: [
    {
      name: "Renan Muniz",
      role: "Responsável Técnico · co-founder · DPO",
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
  guarantee: "Adequação em 90 dias ou devolução.",
  regulations: ["RDC 216/2004 (Anvisa)", "Resolução CFN nº 600/2018"],
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;
