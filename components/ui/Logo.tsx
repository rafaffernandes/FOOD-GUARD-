import Link from "next/link";
import { cn } from "@/lib/utils";

/** Marca do Food Guard: escudo (navy) + check e espiga de trigo (verde). */
export function LogoMark({
  className,
  shieldClassName = "text-navy-700",
}: {
  className?: string;
  shieldClassName?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9", className)}
      role="img"
      aria-label="Food Guard"
      fill="none"
    >
      {/* Anel — metade navy (esquerda) + metade verde (direita) */}
      <path
        d="M32 3 A27 27 0 0 0 32 57"
        className={shieldClassName}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 3 A27 27 0 0 1 32 57"
        className="text-brand-500"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Escudo (navy) */}
      <path
        d="M21 18 L31 15 L32 17 L33 15 L43 18 V30 C43 39 38 44 32 47 C26 44 21 39 21 30 Z"
        className={shieldClassName}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {/* Garfo (navy) */}
      <g
        className={shieldClassName}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M29.5 21 V26" />
        <path d="M32 21 V26" />
        <path d="M34.5 21 V26" />
        <path d="M29.5 26 H34.5" />
        <path d="M32 26 V44" strokeWidth="2.4" />
      </g>
      {/* Folhas (verde) */}
      <g className="text-brand-500" fill="currentColor">
        <path d="M32 40 q-8 0 -11 -6 q7 -1 11 6 z" />
        <path d="M32 40 q8 0 11 -6 q-7 -1 -11 6 z" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  inverted = false,
  showTagline = false,
}: {
  className?: string;
  inverted?: boolean;
  showTagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Food Guard — página inicial"
    >
      <LogoMark
        shieldClassName={inverted ? "text-white" : "text-navy-800"}
        className="h-12 w-12 shrink-0 sm:h-14 sm:w-14"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight sm:text-2xl",
            inverted ? "text-white" : "text-navy-800",
          )}
        >
          Food Guard
        </span>
        <span
          className={cn(
            "mt-0.5 text-[11px] font-semibold uppercase tracking-[0.3em]",
            inverted ? "text-brand-300" : "text-brand-600",
            !showTagline && "hidden sm:block",
          )}
        >
          Assessoria
        </span>
      </span>
    </Link>
  );
}
