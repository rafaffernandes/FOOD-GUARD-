import Link from "next/link";
import { site } from "@/lib/content/site";
import { plans } from "@/lib/content/plans";
import { formatBRL } from "@/lib/utils";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {site.tagline} Assessoria de conformidade sanitária e nutricional
              para food service.
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
                <Link href="/planos" className="hover:text-brand-300">
                  Planos e preços
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Planos</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              {plans.map((p) => (
                <li key={p.id}>
                  <Link href="/planos" className="hover:text-brand-300">
                    {p.name} · {formatBRL(p.price)}/mês
                  </Link>
                </li>
              ))}
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
              <li>
                <Link href="/contato" className="hover:text-brand-300">
                  Fale com o RT
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Food Guard. RT: Renan Muniz · CRN-3
            ativo · DPO designado.
          </p>
          <p>Conformidade com a RDC 216/2004 (Anvisa) e a CFN nº 600/2018 · LGPD.</p>
        </div>
      </Container>
    </footer>
  );
}
