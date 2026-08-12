import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPost } from "@/lib/blog";
import { photos } from "@/lib/content/photos";
import { site } from "@/lib/content/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${site.url}/blog/${slug}`;
  const image = photos.blog[slug];

  return {
    title: post.title,
    description: post.description,
    // Canonical evita que o mesmo artigo apareça duplicado para o Google.
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const cover = photos.blog[slug];
  const url = `${site.url}/blog/${slug}`;

  /* Dados estruturados do artigo. É o que permite ao Google exibir como
   * resultado rico e o que os assistentes de IA leem para saber quem
   * escreveu, quando e sobre o quê — condição para citar a fonte. */
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/opengraph-image` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(cover ? { image: [cover] } : {}),
    articleSection: post.tag,
    about: {
      "@type": "Thing",
      name: "Conformidade sanitária em food service",
    },
    isAccessibleForFree: true,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="py-14 sm:py-20">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático, sem entrada de usuário
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático, sem entrada de usuário
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao blog
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            {post.tag}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-ink-muted">
            <span>{post.author}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {post.readingTime}
            </span>
          </div>
        </div>

        {cover && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-surface-soft">
            <Image
              src={cover}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose-fg mt-10">
          <MDXRemote source={post.content} />
        </div>

        {/* Lead magnet: captura quem ainda não quer o diagnóstico */}
        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-lg font-bold text-ink">
              📋 Checklist gratuito: o que a vigilância cobra primeiro
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Imprima e confira sua cozinha item a item — antes da fiscalização.
            </p>
          </div>
          <Button href="/checklist-vigilancia" variant="outline" size="sm" className="shrink-0">
            Baixar checklist
          </Button>
        </div>

        <div className="mt-14 rounded-3xl bg-brand-600 px-8 py-10 text-center text-white">
          <h2 className="font-display text-2xl font-bold">
            Como está a conformidade da sua operação?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-50">
            Descubra em 90 segundos com o diagnóstico gratuito.
          </p>
          <Button href="/diagnostico" variant="secondary" size="lg" className="mt-6">
            Descobrir meu risco de multa
          </Button>
        </div>
      </Container>

      {/* CTA fixo (sticky no mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-surface-sunken bg-white/95 p-3 shadow-lift backdrop-blur sm:hidden">
        <Button href="/diagnostico" className="w-full" size="md">
          Descobrir meu risco em 90s
        </Button>
      </div>
    </article>
  );
}
