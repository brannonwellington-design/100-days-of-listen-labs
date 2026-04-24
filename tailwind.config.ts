import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        cream: "#F9F4EB",
        "cream-highlight": "#FCFBF7",
        "cream-secondary": "#EEE8DD",
        "cream-tertiary": "#E2DCCF",
        ink: "#120F08",
        "ink-secondary": "#1F1B14",
        brand: "#0021CC",
      },
    },
  },
  plugins: [],
};

export default config;
