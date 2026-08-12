/* URLs do Unsplash curadas — todas Unsplash License (gratuitas, sem atribuição obrigatória).
 * Regras: sem preto e branco · sem fotos escuras · sem contexto asiático.
 * Pra trocar: substitua o ID aqui e o site atualiza.
 */

const u = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=85&w=${w}${
    h ? `&h=${h}` : ""
  }`;

export const photos = {
  // Hero — chef com prancheta em cozinha profissional (Pádua, Itália)
  hero: {
    src: u("photo-1636115130040-adf36e3ed32b", 2000, 1200),
    alt: "Chef conferindo documentação com prancheta em cozinha profissional",
    credit: "Unsplash · Francesco La Corte",
  },
  // Sobre — chef com luvas manipulando ingredientes
  about: {
    src: u("photo-1762980622899-d1dd9cdbc430", 1600, 900),
    alt: "Chef com luvas de EPI trabalhando em cozinha profissional",
    credit: "Unsplash",
  },
  segments: [
    {
      title: "Restaurantes e bares",
      src: u("photo-1779231926942-95810fc8eb33", 800, 600),
      alt: "Interior de restaurante moderno e estiloso",
    },
    {
      title: "Padarias e confeitarias",
      src: u("photo-1732565729552-994c6af761e3", 800, 600),
      alt: "Pães artesanais frescos em rack de padaria profissional",
    },
    {
      title: "Buffets e eventos",
      src: u("photo-1775679784685-1535499768c9", 800, 600),
      alt: "Salão de eventos com buffet decorado com flores e iluminação colorida",
    },
    {
      title: "Dark kitchens",
      src: u("photo-1767562678474-c92cec881bc3", 800, 600),
      alt: "Cozinha de delivery profissional com embalagens de pedidos",
    },
  ],
  problems: [
    // Louis Hansel — cozinha profissional ocidental, bem iluminada
    u("photo-1577219492769-b63a779fac28", 600, 400),
    // Linha de produção de refeições — serviço de entrega alemão (Essen auf Rädern)
    u("photo-1762330018258-2cf9b8f80618", 600, 400),
    // Corte de vegetais frescos em cozinha ao ar livre (Kagawong, Canadá) — muito colorida
    u("photo-1507048331197-7d4ac70811cf", 600, 400),
  ],
  solutions: [
    // Avental vermelho + luva azul — EPI completo em cozinha (Brian J. Tromp, Holanda)
    u("photo-1645932067745-c10b7fa2df6b", 600, 400),
    // Gestão digital: funcionário com POS em cozinha comercial ocidental
    u("photo-1778792447408-b22ad88daa37", 600, 400),
    // Louis Hansel — fatiamento de tomate, cozinha profissional ocidental
    u("photo-1554997433-8e233c02c751", 600, 400),
    // Louis Hansel — finalização de prato com erva, precisão profissional
    u("photo-1564844536308-50b114a1d946", 600, 400),
  ],
  blog: {
    "rdc-216-o-que-todo-food-service-precisa-saber": u(
      "photo-1651525670114-2b8117390b28",
      1200,
      630,
    ),
    "preciso-de-responsavel-tecnico-nutricionista": u(
      "photo-1675270745543-883eae091a5c",
      1200,
      630,
    ),
    "fui-autuado-pela-vigilancia-sanitaria-e-agora": u(
      "photo-1450101499163-c8848c66ca85",
      1200,
      630,
    ),
    "dark-kitchen-como-conseguir-alvara": u(
      "photo-1565299624946-b28f40a0ae38",
      1200,
      630,
    ),
    // Cozinha profissional em operação — abre o artigo sobre custo de multa
    "quanto-custa-multa-vigilancia-sanitaria": u(
      "photo-1581299894007-aaa50297cf16",
      1200,
      630,
    ),
  } as Record<string, string>,
};
