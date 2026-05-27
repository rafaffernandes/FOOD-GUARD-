"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { GoldButton } from "./Editorial";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/diagnostico", label: "Diagnóstico" },
  { href: "/planos", label: "Planos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e4df] bg-[#FAFAF8]/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium tracking-wide transition-colors",
                pathname === link.href
                  ? "text-brand-700"
                  : "text-navy-900/70 hover:text-navy-900",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <GoldButton href="/diagnostico" className="h-10 px-5 text-[13px]">
            Fazer diagnóstico
          </GoldButton>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-[#e8e4df] bg-[#FAFAF8] md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-navy-900/80 hover:bg-[#f5f3f0]"
              >
                {link.label}
              </Link>
            ))}
            <GoldButton href="/diagnostico" className="mt-3 w-full">
              Fazer diagnóstico
            </GoldButton>
          </Container>
        </div>
      )}
    </header>
  );
}
