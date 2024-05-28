const { light } = require('@mui/material/styles/createPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens:{
      lg: {"max":"1999.99px"},
      md: {"max":"991.99px"},
      sm: {"max":"767.99px"},
      xs: {"max":"469.99px"},
    },
    extend: {
      backgroundImage:{
        bg: "linear-gradient(94deg, #2E7D32 0%, #689F38 30%, #689F38 60%, #2E7D32 100%)",
      },
      colors:{
        green : "#008000",
        lightGrey: "666768",
      }
    },
  },
  plugins: [],
}
