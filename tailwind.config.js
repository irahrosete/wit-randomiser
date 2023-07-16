/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dosis': ['Dosis', 'sans-serif']
      },
    },
  },
  plugins: [],
}

