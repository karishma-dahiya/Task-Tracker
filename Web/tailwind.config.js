/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#ecdbfb',
        'secondary':'#25689c'
      }
    },
  },
  plugins: [],
}