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
          50: "#f3faea",
          100: "#e4f4ca",
          200: "#cbe99c",
          300: "#aedb66",
          400: "#92cb40",
          500: "#74b43c",
          600: "#588f2c",
          700: "#446e22",
          800: "#37571d",
          900: "#2f4a1c",
          950: "#16280a",
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
        glow: "0 0 0 1px rgba(88,143,44,0.14), 0 20px 60px -20px rgba(88,143,44,0.45)",
      },
      backgroundImage: {
        "grid-faint":
          "radial-gradient(circle at 1px 1px, rgba(22,51,92,0.07) 1px, transparent 0)",
        "hero-glow":
          "radial-gradient(60% 50% at 50% 0%, rgba(116,180,60,0.20) 0%, rgba(116,180,60,0) 70%)",
        "brand-sheen":
          "linear-gradient(135deg, #446e22 0%, #588f2c 45%, #74b43c 100%)",
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
