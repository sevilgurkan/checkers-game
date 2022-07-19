const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        checkers_board: {
          "0%": {
            transform: "rotate(45deg) translateY(350%) translateX(0)",
            opacity: 1,
          },
          "100%": {
            transform: "rotate(45deg) translateY(-800%) translateX(0)",
            opacity: 0,
          },
        },
      },
      animation: {
        "spin-slow": "spin 2500ms linear infinite",
        checkers_board: "checkers_board 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
