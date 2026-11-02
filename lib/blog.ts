import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  tag: string;
}

export interface Post extends PostMeta {
  content: string;
}

function readSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Post agendado: entra no repositório antes e só aparece a partir do `date` do
 * frontmatter (ex.: "2026-11-04T18:00:00-03:00"). As páginas do blog revalidam
 * a cada poucos minutos, então o artigo entra no ar sozinho, sem novo deploy.
 */
export function isPublished(date: string, now = new Date()): boolean {
  // Só a data (AAAA-MM-DD) vale a partir da meia-noite de Brasília, não da de Greenwich.
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00-03:00` : date;
  const quando = new Date(iso);
  if (Number.isNaN(quando.getTime())) {
    console.warn(`[blog] date inválido no frontmatter: "${date}" (post escondido)`);
    return false;
  }
  return quando <= now;
}

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8"),
      );
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .filter((post) => isPublished(post.date))
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  const post = { slug, content, ...(data as Omit<PostMeta, "slug">) };
  return isPublished(post.date) ? post : null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Tira a marcação do Markdown — o JSON-LD recebe texto puro. */
function semMarkdown(texto: string): string {
  return texto
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lê a seção "Perguntas frequentes" do corpo do post: cada `###` vira uma
 * pergunta e os parágrafos até o próximo título viram a resposta.
 *
 * Extrair do próprio texto, em vez de repetir no frontmatter, evita que as
 * duas versões se desencontrem depois de uma revisão. Post sem essa seção
 * devolve lista vazia e nenhum FAQPage é publicado.
 */
export function extractFaq(content: string): FaqItem[] {
  const linhas = content.split("\n");
  const inicio = linhas.findIndex((l) =>
    /^##\s+Perguntas frequentes\s*$/i.test(l),
  );
  if (inicio === -1) return [];

  const faq: FaqItem[] = [];
  let pergunta: string | null = null;
  let resposta: string[] = [];

  const fecha = () => {
    if (pergunta && resposta.length > 0) {
      faq.push({
        question: semMarkdown(pergunta),
        answer: semMarkdown(resposta.join(" ")),
      });
    }
    pergunta = null;
    resposta = [];
  };

  for (const linha of linhas.slice(inicio + 1)) {
    if (/^##\s/.test(linha)) break; // começou outra seção
    const titulo = linha.match(/^###\s+(.*)$/);
    if (titulo) {
      fecha();
      pergunta = titulo[1];
      continue;
    }
    if (pergunta && linha.trim()) resposta.push(linha.trim());
  }
  fecha();

  return faq;
}
