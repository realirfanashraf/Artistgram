import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6A8C48',
        secondary: '#4E6E3B',
        thirdShade: '#f5f5f5'
      },
      fontFamily: {
        'protest': ['"Protest Strike"', 'sans-serif']
      }
    },
  },
  plugins: [],
});

export default tailwindConfig;
