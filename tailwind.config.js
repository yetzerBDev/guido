/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        guidoBlue: '#0B5FFF',
        guidoSky: '#EAF1FF',
        guidoInk: '#0F172A',
      },
    },
  },
  plugins: [],
}

