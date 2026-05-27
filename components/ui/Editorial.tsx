import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* Primitivos editoriais (estilo Serif) — usados em todas as páginas.
 * Paleta: ivory #FAFAF8 · navy-900 (texto) · brand-700 (acento editorial).
 */

export function Rule({ className = "" }: { className?: string }) {
  return <span className={cn("h-px flex-1 bg-[#e8e4df]", className)} />;
}

export function SmallCaps({
  children,
  className = "",
  as: As = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  return (
    <As
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <Rule />
      <SmallCaps>{children}</SmallCaps>
      <Rule />
    </div>
  );
}

export function GoldButton({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-7 text-sm font-medium tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

export function OutlineButton({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-navy-900/80 px-7 text-sm font-medium tracking-wide text-navy-900 transition-all duration-200 hover:border-brand-700 hover:bg-[#f5f3f0] hover:text-brand-700",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Hero compacto pra páginas internas (planos, sobre, blog, contato). */
export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-[#e8e4df] py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <SmallCaps>{eyebrow}</SmallCaps>
        <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-5xl lg:text-6xl">
          {title}
          {highlight && (
            <>
              {" "}
              <em className="not-italic text-brand-700">{highlight}</em>
            </>
          )}
        </h1>
        <div className="mx-auto mt-7 flex w-28 items-center justify-center">
          <span className="h-px flex-1 bg-brand-700/40" />
          <span className="mx-3 h-1.5 w-1.5 rounded-full bg-brand-700" />
          <span className="h-px flex-1 bg-brand-700/40" />
        </div>
        {subtitle && (
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.75] text-ink-soft">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
