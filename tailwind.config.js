/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['system-ui', '-apple-system', 'sans-serif'],
        'primary': ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}