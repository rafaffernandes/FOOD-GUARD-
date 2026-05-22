import { Check } from "lucide-react";
import type { Plan } from "@/lib/content/plans";
import { cn, formatBRL } from "@/lib/utils";
import { Badge } from "./Badge";
import { Button } from "./Button";

export function PlanCard({
  plan,
  recommended,
  href = "/diagnostico",
}: {
  plan: Plan;
  recommended?: boolean;
  href?: string;
}) {
  const featured = recommended ?? plan.highlighted;
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl border bg-white p-7 transition-all hover:shadow-lift",
        featured
          ? "border-brand-400 shadow-glow ring-1 ring-brand-300 lg:-translate-y-3"
          : "border-surface-sunken shadow-soft",
      )}
    >
      {featured && (
        <span className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-brand-sheen" />
      )}
      {featured && (
        <div className="absolute -top-3 left-7">
          <Badge tone="brand">{recommended ? "Recomendado p/ você" : "Mais procurado"}</Badge>
        </div>
      )}
      <h3 className="font-display text-xl font-bold text-ink">{plan.name}</h3>
      <p className="mt-1 text-sm text-ink-muted">{plan.positioning}</p>
      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-ink">
          {formatBRL(plan.price)}
        </span>
        <span className="text-sm text-ink-muted">/mês</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
            <span className="text-ink-soft">
              {f.label}: <strong className="text-ink">{f.value}</strong>
            </span>
          </li>
        ))}
      </ul>

      <Button
        href={href}
        variant={featured ? "primary" : "outline"}
        className="mt-7 w-full"
      >
        Começar com {plan.name}
      </Button>
    </div>
  );
}
