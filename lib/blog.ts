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

export function getAllPosts(): PostMeta[] {
  return readSlugs()
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf-8"),
      );
      return { slug, ...(data as Omit<PostMeta, "slug">) };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return { slug, content, ...(data as Omit<PostMeta, "slug">) };
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
