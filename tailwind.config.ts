import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#faf9f7',
          100: '#f5f1ed',
          200: '#ebe3db',
          300: '#e1d5c9',
          400: '#d1bba5',
          500: '#c9a961',
          600: '#b89a56',
          700: '#8d6e36',
          800: '#6b532a',
          900: '#2a2220',
          950: '#1a1a1a',
        },
        'accent': {
          50: '#fffbf0',
          100: '#fef3e2',
          200: '#fde8c9',
          300: '#fcdca5',
          400: '#fac578',
          500: '#f7ad4e',
          600: '#ed9d3b',
          700: '#d4832e',
          800: '#a86a28',
          900: '#805522',
          950: '#4a2f0f',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'bounce': 'bounce 1.4s infinite',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
})
