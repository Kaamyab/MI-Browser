/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        TheDark: {
          950: "#090a0d",
          900: "#0b0c10",
          800: "#0d0e12",
          700: "#0f1015",
          600: "#101116",
          500: "#111218",
          default: "#13151b",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    plugin(function ({ addVariant }) {
      addVariant("children", "&>*");
      addVariant("div", "&>div");
      addVariant("svg", "&>svg");
      addVariant("path", "&>svg>path");
      addVariant("gpath", "&>svg>g>path");
      addVariant("tr", "&>tr");
    }),
  ],
};
