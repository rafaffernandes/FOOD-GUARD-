"use client";

import { useEffect, useState } from "react";
import type { RiskBand } from "@/lib/diagnostic/engine";

const BAND_COLOR: Record<RiskBand, string> = {
  critico: "#dc2626",
  medio: "#d97706",
  baixo: "#059669",
};

export function ScoreGauge({
  score,
  band,
  size = 200,
  animate = true,
}: {
  score: number;
  band: RiskBand;
  size?: number;
  animate?: boolean;
}) {
  const [display, setDisplay] = useState(animate ? 0 : score);
  const color = BAND_COLOR[band];
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (display / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplay(score);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * score));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score, animate]);

  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eef4f1"
          strokeWidth={14}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: animate ? "stroke-dashoffset 0.1s linear" : "none" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-5xl font-bold leading-none"
          style={{ color }}
        >
          {display}
        </span>
        <span className="mt-1 text-sm text-ink-muted">de 100</span>
      </div>
    </div>
  );
}
