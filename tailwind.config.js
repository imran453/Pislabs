/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7f56d9",
          dark: "#5b2bd9",
          light: "#f0ebfd",
        },
        ink: {
          DEFAULT: "#000000",
          muted: "#54585f",
          faint: "#8a8d95",
        },
        line: "#e5e5e8",
        surface: "#f4f4f5",
      },
      fontFamily: {
        display: ["Archivo", "sans-serif"],
        body: ["Instrument Sans", "sans-serif"],
        accent: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
}
