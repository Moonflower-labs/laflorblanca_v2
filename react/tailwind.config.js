/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import { dim } from "daisyui/src/theming/themes";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "selector",

  plugins: [daisyui],
  daisyui: {
    themes: [
    
      {
        dim: {
          ...dim,
          secondary: "#c084fc",
          // "base-100": "#f5f5f4",
          "base-200": "#78716c",
          "base-300": "#f5f5f4",
        },
      },

      {
        florBlanca: {
          "primary": "#8b5cf6",
          "primary-content": "#f5f5f4",
          "secondary": "#38bdf8",
          "secondary-content": "#010d15",
          "accent": "#ec4899",
          "accent-content": "#130208",
          "neutral": "#001623",
          "neutral-content": "#a8a29e",
          "base-100": "#f5f5f4",
          "base-200": "#d5d5d4",
          "base-300": "#b6b6b5",
          "base-content": "#151514",
          "info": "#7dd3fc",
          "info-content": "#051016",
          "success": "#b6f400",
          "success-content": "#0c1400",
          "warning": "#facc15",
          "warning-content": "#150f00",
          "error": "#cc2632",
          "error-content": "#fae8ff",
        },
      },
      "dark",
      "cupcake",
      "fantasy",
      "dim",
    ],
  },
};
