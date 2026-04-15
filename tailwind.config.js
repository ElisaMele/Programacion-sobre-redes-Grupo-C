import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
        card: "hsl(var(--card))",
        terminal: "hsl(var(--terminal))",
        danger: "hsl(var(--danger))",
      },
    },
  },
  plugins: [],
} satisfies Config;