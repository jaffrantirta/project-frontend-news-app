/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Fredoka', 'sans-serif'],
        'secondary': ['Zeyada', 'cursive'],
        'third': ['Dancing Script', 'cursive'],
      },
      colors: {
        primary: '#f6b690',
        accentColor: '#fadbc9',
        secondary: '#fdf0da',
        third: '#e9b250'
      }
    },
  },
  plugins: [],
}
