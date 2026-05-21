"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface FAQEntry {
  q: string;
  a: string;
}

export function FAQ({ items }: { items: FAQEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-surface-sunken rounded-2xl border border-surface-sunken bg-white">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-semibold text-ink">{item.q}</span>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-brand-600 transition-transform",
                open === i && "rotate-180",
              )}
            />
          </button>
          {open === i && (
            <p className="px-6 pb-5 text-ink-soft leading-relaxed">{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
