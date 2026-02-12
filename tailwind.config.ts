import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0A",
          900: "#111111",
          800: "#1C1C1C",
          700: "#2A2A2A",
          600: "#3A3A3A"
        },
        mist: {
          50: "#FFFFFF",
          100: "#F7F7F7",
          200: "#F2F2F2",
          300: "#E6E6E6",
          400: "#CFCFCF",
          500: "#A9A9A9"
        }
      },
      fontFamily: {
        display: ["Sora", "ui-sans-serif", "system-ui"],
        body: ["Manrope", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 20px 60px -40px rgba(0,0,0,0.6)",
        edge: "0 0 0 1px rgba(0,0,0,0.1)"
      }
    }
  },
  plugins: []
};

export default config;
