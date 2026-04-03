import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        beginner: {
          light: "#dcfce7",
          DEFAULT: "#16a34a",
          dark: "#14532d",
        },
        intermediate: {
          light: "#dbeafe",
          DEFAULT: "#2563eb",
          dark: "#1e3a8a",
        },
        advanced: {
          light: "#ede9fe",
          DEFAULT: "#7c3aed",
          dark: "#4c1d95",
        },
        surface: {
          0: "#ffffff",
          1: "#f8fafc",
          2: "#f1f5f9",
          3: "#e2e8f0",
        },
        ink: {
          DEFAULT: "#0f172a",
          muted: "#475569",
          subtle: "#94a3b8",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(0 0 0 / 0.06)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 12px 32px -4px rgb(0 0 0 / 0.1)",
        "glow-green": "0 0 32px -4px rgb(34 197 94 / 0.35)",
        "glow-blue": "0 0 32px -4px rgb(37 99 235 / 0.35)",
        "glow-purple": "0 0 32px -4px rgb(124 58 237 / 0.35)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "mesh-green": "radial-gradient(at 40% 20%, #bbf7d0 0px, transparent 50%), radial-gradient(at 80% 0%, #dcfce7 0px, transparent 50%), radial-gradient(at 0% 50%, #f0fdf4 0px, transparent 50%)",
        "mesh-blue": "radial-gradient(at 40% 20%, #bfdbfe 0px, transparent 50%), radial-gradient(at 80% 0%, #dbeafe 0px, transparent 50%)",
        "mesh-purple": "radial-gradient(at 40% 20%, #ddd6fe 0px, transparent 50%), radial-gradient(at 80% 0%, #ede9fe 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};
export default config;
