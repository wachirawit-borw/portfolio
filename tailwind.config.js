/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ใช้ CSS Variables จาก globals.css
      colors: {
        'foreground': 'var(--foreground)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'muted-foreground': 'var(--muted-foreground)',
        'card-border': 'var(--card-border)',
        'card-background': 'var(--card-background)',
        'gradient-start': 'var(--gradient-start)',
        'gradient-end': 'var(--gradient-end)',
      },
    },
  },
  plugins: [],
}