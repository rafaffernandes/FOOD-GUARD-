import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Food Guard — Consultoria nutricional para food service. Sua operação pronta para qualquer fiscalização.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** og:image padrão do site (links no WhatsApp/redes ganham preview bonito). */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(150deg, #022c22 0%, #047857 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#10b981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            FG
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
            Food Guard
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 950,
            }}
          >
            Sua operação pronta pra qualquer fiscalização.
          </div>
          <div style={{ fontSize: 30, color: "#a7f3d0", maxWidth: 900 }}>
            Consultoria especializada em food service · nutricionista
            responsável · RDC 216/2004
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#d1fae5",
          }}
        >
          <div>Diagnóstico gratuito em 2 minutos</div>
          <div style={{ fontWeight: 700 }}>foodguard.com.br</div>
        </div>
      </div>
    ),
    size,
  );
}
