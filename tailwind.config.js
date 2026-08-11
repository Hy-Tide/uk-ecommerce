/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1480px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#124827', // Dark Forest Green from Logo
          light: '#1c6b3b',   // Mid Green from Logo
          dark: '#0a2e18',    // Deep Forest Green
          100: '#e8f5ed',     // Light Green Tint
          50: '#f2f9f5',
        },
        secondary: {
          DEFAULT: '#eb5b27', // Brand Orange from Logo 'B'
          light: '#f37b4f',   // Warm Light Orange
          dark: '#ca4313',    // Deep Coral Orange
          100: '#feeee8',     // Light Orange Tint
        },
        brandGreen: '#124827',
        brandGreenMid: '#1c6b3b',
        brandOrange: '#eb5b27',
        dark: '#1e293b',
        light: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
