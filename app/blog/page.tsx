import { ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo sobre segurança alimentar, RDC 216/2004, Portaria 2.619/2011, nutricionista responsável e boas práticas para food service.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-20">
          <Badge tone="brand">Conteúdo técnico</Badge>
          <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Blog do Food Guard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Conformidade sanitária explicada em linguagem clara, pra você decidir
            com segurança e não com medo.
          </p>
        </Container>
      </section>

      <Section>
        {posts.length === 0 ? (
          <p className="text-ink-muted">Em breve, novos artigos.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft transition-shadow hover:shadow-lift"
              >
                <Badge tone="neutral">{post.tag}</Badge>
                <h2 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-brand-700">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-ink-soft">{post.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" /> {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-brand-700">
                    Ler artigo{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
