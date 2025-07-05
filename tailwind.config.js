/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // นำค่าสีทั้งหมดจาก globals.css มาไว้ที่นี่
      colors: {
        'foreground': '#1a202c',
        'accent': '#2b6cb0',
        'accent-hover': '#3182ce',
        'muted-foreground': '#4a5568',
        'card-border': '#cbd5e0',
        'card-background': '#ffffff',
        // สำหรับสีของ Gradient เราก็สามารถกำหนดไว้ที่นี่ได้
        'gradient-start': '#f0cca8',
        'gradient-end': '#ccdef5',
      },
      // คุณยังสามารถกำหนดค่าอื่นๆ เพิ่มเติมได้ เช่น backgroundImage
      backgroundImage: {
        'gradient-body': 'linear-gradient(to right, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}