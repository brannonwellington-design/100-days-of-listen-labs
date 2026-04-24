export type ThemeKey = "light" | "blue-text" | "dark" | "brand-blue";

export type Theme = {
  key: ThemeKey;
  label: string;
  bg: string;
  textPrimary: string;
  textSecondary: string;
  markColor: string; // color of the corner Listen Labs mark
};

export const THEMES: Record<ThemeKey, Theme> = {
  light: {
    key: "light",
    label: "Light",
    bg: "#F9F4EB",
    textPrimary: "#120F08",
    textSecondary: "rgba(18, 15, 8, 0.6)",
    markColor: "#120F08",
  },
  "blue-text": {
    key: "blue-text",
    label: "Blue text",
    bg: "#F9F4EB",
    textPrimary: "#0021CC",
    textSecondary: "rgba(0, 33, 204, 0.6)",
    markColor: "#0021CC",
  },
  dark: {
    key: "dark",
    label: "Dark",
    bg: "#120F08",
    textPrimary: "#F9F4EB",
    textSecondary: "rgba(249, 244, 235, 0.6)",
    markColor: "#F9F4EB",
  },
  "brand-blue": {
    key: "brand-blue",
    label: "Brand blue",
    bg: "#0021CC",
    textPrimary: "#F9F4EB",
    textSecondary: "rgba(249, 244, 235, 0.6)",
    markColor: "#F9F4EB",
  },
};

export const THEME_ORDER: ThemeKey[] = ["light", "blue-text", "dark", "brand-blue"];
