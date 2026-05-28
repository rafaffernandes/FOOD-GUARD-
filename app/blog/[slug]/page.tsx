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
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
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

  return (
    <article className="py-14 sm:py-20">
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
