import type { Metadata } from "next";
import { DiagnosticFlow } from "@/components/diagnostic/DiagnosticFlow";

export const metadata: Metadata = {
  title: "Diagnóstico regulatório gratuito",
  description:
    "5 perguntas, 90 segundos. Descubra seu score de conformidade sanitária, o dinheiro em risco e o plano recomendado para a sua operação de food service.",
};

export default function DiagnosticoPage() {
  return (
    <div className="min-h-[70vh] bg-[#FAFAF8]">
      <DiagnosticFlow />
    </div>
  );
}
