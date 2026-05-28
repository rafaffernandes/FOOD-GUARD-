"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Faz o filho aparecer com fade-up quando entra na viewport.
 *  Respeita prefers-reduced-motion: motion fica desligado.
 */
export function FadeInOnScroll({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = As as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
