import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/content/site";

/** Botão flutuante de WhatsApp, fixo no canto inferior direito. */
export function FloatingWhatsApp({
  message = "Olá! Vim pelo site da Food Guard e quero tirar uma dúvida.",
}: {
  message?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Resposta rápida · horário comercial"
      className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-lift transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
      <span className="hidden text-sm sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
