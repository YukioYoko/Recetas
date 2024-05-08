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
          'naranja-logo': '#ED9D20',
          'naranja-oscuro': '#C9593C',
          'beige': '#FEFBE7',
          'rojo' : '#ED1B2E',
          'negro' : '#030A13'
        },
      },
      fontFamily: {
        title: ['Righteous'],
        body: ['Josefin Sans']
      }
    },
  },
  plugins: [],
}