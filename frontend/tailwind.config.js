/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#519872',
        secondary:'#875219'
      },
      fontFamily: {
        'protest': ['"Protest Strike"', 'sans-serif']
      }
    },

  },
  plugins: [],
}
