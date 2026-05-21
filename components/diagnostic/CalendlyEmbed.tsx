"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/content/site";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL;

export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!CALENDLY_URL) return;
    const id = "calendly-widget-script";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-8 text-center">
        <p className="text-ink-soft">
          A agenda de avaliação será exibida aqui assim que o Calendly for
          conectado.
        </p>
        <Button
          href={whatsappLink("Olá! Quero agendar minha avaliação com o RT.")}
          external
          variant="secondary"
          className="mt-4"
        >
          Agendar pelo WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="calendly-inline-widget overflow-hidden rounded-2xl border border-surface-sunken"
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: "640px" }}
    />
  );
}
