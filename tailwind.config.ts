import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        navy: {
          50: "#eef3f9",
          100: "#d9e4f1",
          200: "#b4c8e0",
          300: "#85a3c9",
          400: "#5179ab",
          500: "#2f5a8f",
          600: "#1d4373",
          700: "#16335c",
          800: "#102544",
          900: "#0b1c34",
          950: "#071124",
        },
        ink: {
          DEFAULT: "#0e1f33",
          soft: "#3a4b60",
          muted: "#6b7a8c",
        },
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f4f8fc",
          sunken: "#e9eff5",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        warn: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(6, 78, 59, 0.04), 0 8px 24px rgba(6, 78, 59, 0.06)",
        lift: "0 12px 40px rgba(6, 78, 59, 0.12)",
        glow: "0 0 0 1px rgba(5,150,105,0.12), 0 20px 60px -20px rgba(5,150,105,0.45)",
      },
      backgroundImage: {
        "grid-faint":
          "radial-gradient(circle at 1px 1px, rgba(6,95,70,0.08) 1px, transparent 0)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)",
        "brand-sheen":
          "linear-gradient(135deg, #047857 0%, #059669 45%, #10b981 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
