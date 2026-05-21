import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 font-display", className)}
      aria-label="Food Guard — página inicial"
    >
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-xl",
          inverted ? "bg-white/10 text-brand-300" : "bg-brand-600 text-white",
        )}
      >
        <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
      </span>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          inverted ? "text-white" : "text-ink",
        )}
      >
        Food<span className="text-brand-500">Guard</span>
      </span>
    </Link>
  );
}
