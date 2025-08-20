/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'primary': '#23A6F0',
        'secondary': '#23856D',
        'text-color': '#252B42',
        'second-text-color': '#737373',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}
