/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          'gris': '#F4F4F4',
          'gris-oscuro': "#D9D9D9",
          'naranja-logo': '#FFA32B',
          'azul-cyan': '#25CED1',
        },
      },
    },
  },
  plugins: [],
}