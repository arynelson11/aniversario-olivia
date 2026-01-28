/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700', // Sunny Yellow
        secondary: '#FFFFFF', // Pure White
        background: '#FEFCF0', // Cream
        text: '#5D4037', // Mocha/Earth
        accent: '#88B04B', // Stem Green
      },
      fontFamily: {
        heading: ['DynaPuff', 'cursive'],
        body: ['Balsamiq Sans', 'cursive'],
      },
    },
  },
  plugins: [],
}
