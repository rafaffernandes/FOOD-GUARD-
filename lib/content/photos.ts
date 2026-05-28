/* URLs do Unsplash curadas — todas royalty-free (Unsplash License).
 * Pra trocar uma foto: substitua a URL aqui e o resto do site atualiza.
 * Quando tiver foto própria, salve em public/ e ajuste o src.
 */

const u = (id: string, w = 1600, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}${
    h ? `&h=${h}` : ""
  }`;

export const photos = {
  hero: {
    src: u("photo-1556909114-f6e7ad7d3136", 2000, 1200),
    alt: "Cozinha profissional limpa e organizada",
    credit: "Unsplash · Edward Howell",
  },
  about: {
    src: u("photo-1581349437898-cebbe9831942", 1600, 900),
    alt: "Profissional de cozinha conferindo o preparo",
    credit: "Unsplash",
  },
  segments: [
    {
      title: "Restaurantes e bares",
      src: u("photo-1517248135467-4c7edcad34c4", 800, 600),
      alt: "Interior de um restaurante moderno",
    },
    {
      title: "Padarias e confeitarias",
      src: u("photo-1509440159596-0249088772ff", 800, 600),
      alt: "Padaria com pães frescos",
    },
    {
      title: "Buffets e eventos",
      src: u("photo-1555244162-803834f70033", 800, 600),
      alt: "Mesa de buffet preparada",
    },
    {
      title: "Dark kitchens",
      src: u("photo-1565299624946-b28f40a0ae38", 800, 600),
      alt: "Preparo de comida para delivery",
    },
  ],
  problems: [
    u("photo-1556909114-f6e7ad7d3136", 600, 400),
    u("photo-1521656693074-0ef32e80a5d5", 600, 400),
    u("photo-1556909212-d5b604d0c90d", 600, 400),
  ],
  solutions: [
    u("photo-1581349437898-cebbe9831942", 600, 400),
    u("photo-1559339352-11d035aa65de", 600, 400),
    u("photo-1556910103-1c02745aae4d", 600, 400),
    u("photo-1521017432531-fbd92d768814", 600, 400),
  ],
  blog: {
    "rdc-216-o-que-todo-food-service-precisa-saber": u(
      "photo-1556909114-f6e7ad7d3136",
      1200,
      630,
    ),
    "preciso-de-responsavel-tecnico-nutricionista": u(
      "photo-1581349437898-cebbe9831942",
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
  } as Record<string, string>,
};
