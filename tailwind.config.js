/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: {
        default: "12px",
        md: "32px",
      },
    },
    screens: {
      sm: "640px",
      md: "840px",
      lg: "1024px",
      xl: "1288px",
      "2xl": "1536px",
    },
    fontFamily: {
      inter_Bold: "inter_bold",
      inter_Regular: "inter_regular",
      poppins_Regular: "poppins_regular",
      poppins_Bold: "poppins_bold",
    },
    extend: {},
  },
  plugins: [],
};
