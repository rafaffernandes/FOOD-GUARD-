import { cn } from "@/lib/utils";

type Tone = "brand" | "neutral" | "danger" | "warn";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-100",
  neutral: "bg-surface-sunken text-ink-soft ring-surface-sunken",
  danger: "bg-danger-50 text-danger-700 ring-danger-100",
  warn: "bg-warn-50 text-warn-600 ring-warn-100",
};

export function Badge({
  tone = "brand",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
