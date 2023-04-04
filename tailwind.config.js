/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5F5F5',
        'secondary': '#C0B283',
        'tertiary': '#A7AAAE',

      },
    },
  },
  plugins: [],
}