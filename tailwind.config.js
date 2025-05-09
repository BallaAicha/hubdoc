/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f3',
          100: '#fde6e7',
          200: '#fbd0d5',
          300: '#f7a8b0',
          400: '#f27585',
          500: '#e9041e',
          600: '#d31425',
          700: '#b01022',
          800: '#921123',
          900: '#7a1424',
          950: '#42070f',
        },
        secondary: {
          50: '#eeeeff',
          100: '#e0e1ff',
          200: '#c7c8ff',
          300: '#a5a6ff',
          400: '#8384ff',
          500: '#6366f1',
          600: '#4649e5',
          700: '#3538ca',
          800: '#2c31a4',
          900: '#080941',
          950: '#121238',
        },
      },
    },
  },
  plugins: [],
};
