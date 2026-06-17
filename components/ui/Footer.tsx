import { Instagram, Linkedin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/content/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Produto</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <Link href="/diagnostico" className="hover:text-brand-300">
                  Diagnóstico gratuito
                </Link>
              </li>
              <li>
                <Link href="/planos#faq" className="hover:text-brand-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-brand-300">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>{site.city}</li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-brand-300">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 pt-1">
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-brand-300"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={site.social.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-brand-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-white/10 pt-8">
          {[
            "Conforme a LGPD",
            "Seus dados seguros",
            "RDC 216/2004 (Anvisa)",
            "Portaria 2.619/2011",
          ].map((seal) => (
            <span
              key={seal}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 ring-1 ring-inset ring-white/10"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
              {seal}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · Consultoria nutricional
            para food service · São Paulo · Grande SP.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacidade" className="hover:text-brand-300">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="hover:text-brand-300">
              Termos de Uso
            </Link>
            <span>São Paulo · Grande SP</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
