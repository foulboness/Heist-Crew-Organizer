import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0D13",
          900: "#0E121A",
          800: "#141924",
          700: "#1B2230",
          600: "#252E40",
          500: "#33405899",
        },
        blue: {
          print: "#3FA0E8",
          soft: "#7EC3F5",
          dim: "#1E3A52",
        },
        gold: {
          DEFAULT: "#D4A72C",
          bright: "#F0C550",
          dim: "#4A3D18",
        },
        redact: {
          DEFAULT: "#C1443A",
          dim: "#4A2320",
        },
        paper: {
          DEFAULT: "#E9E4D8",
          dim: "#B9B3A2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        stamp: ["var(--font-stamp)"],
      },
      backgroundImage: {
        blueprint:
          "linear-gradient(rgba(63,160,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(63,160,232,0.06) 1px, transparent 1px)",
        "blueprint-major":
          "linear-gradient(rgba(63,160,232,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(63,160,232,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
        "grid-major": "120px 120px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 20px -8px rgba(0,0,0,0.6)",
        "card-hover": "0 1px 0 rgba(255,255,255,0.05) inset, 0 14px 30px -10px rgba(0,0,0,0.75)",
        stamp: "0 0 0 1px rgba(212,167,44,0.35)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scan: "scan 3s linear infinite",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        riseIn: "riseIn 0.28s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
