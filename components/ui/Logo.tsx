import Link from "next/link";
import { cn } from "@/lib/utils";

/** Marca do Food Guard: escudo (navy) + check e espiga de trigo (verde). */
export function LogoMark({
  className,
  shieldClassName = "text-navy-800",
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
      {/* Escudo */}
      <path
        d="M32 5 L55 13 V31 C55 45.5 45 54 32 59.5 C19 54 9 45.5 9 31 V13 Z"
        className={shieldClassName}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Check + haste da espiga (verde) */}
      <path
        d="M18 33 L27 42 L47 16"
        className="text-brand-500"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Grãos da espiga (dos dois lados da haste) */}
      <g className="text-brand-500" fill="currentColor">
        <path d="M40 28 q6 -2 8 -7 q-6 1 -8 7 z" />
        <path d="M43 24 q6 -2 8 -7 q-6 1 -8 7 z" />
        <path d="M46 20 q6 -2 8 -7 q-6 1 -8 7 z" />
        <path d="M40 28 q-6 -2 -8 -7 q6 1 8 7 z" />
        <path d="M43 24 q-6 -2 -8 -7 q6 1 8 7 z" />
        <path d="M47 14 q2 -5 0 -10 q-2 5 0 10 z" />
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
        className="h-9 w-9 shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            inverted ? "text-white" : "text-navy-800",
          )}
        >
          Food Guard
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.28em]",
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
