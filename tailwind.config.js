module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background-gradient)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "card-background": "var(--card-background)",
        "muted-foreground": "var(--muted-foreground)",
        "card-border": "var(--card-border)",
      },
    },
  },
  plugins: [],
};