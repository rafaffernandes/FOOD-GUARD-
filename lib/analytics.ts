type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Dispara um evento do funil para GA4 e Meta Pixel, se configurados. */
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) window.gtag("event", event, params);
  if (window.fbq) window.fbq("trackCustom", event, params);
  if (!GA_ID && !META_PIXEL_ID) {
    console.debug("[analytics:dev]", event, params);
  }
}

export const funnelEvents = {
  diagnosticStarted: "diagnostic_started",
  diagnosticCompleted: "diagnostic_completed",
  leadCaptured: "lead_captured",
  scheduleClicked: "schedule_clicked",
  checkoutClicked: "checkout_clicked",
} as const;
