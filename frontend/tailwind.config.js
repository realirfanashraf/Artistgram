/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A8C48',
        secondary:'#4E6E3B',
        thirdShade:'#f5f5f5'
      },
      fontFamily: {
        'protest': ['"Protest Strike"', 'sans-serif']
      }
    },

  },
  plugins: [],
}
