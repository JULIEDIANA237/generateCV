/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'orange-lg': '0 10px 15px -3px rgba(251, 146, 60, 0.5), 0 4px 6px -2px rgba(251, 146, 60, 0.3)',
      },
    },
  },
  plugins: [],
}