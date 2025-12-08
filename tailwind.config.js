/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'night-blue': '#1A203A',
        'lavender': '#C4B5FD',
        'coral': '#FF7F50',
        'beige': '#F4E9CD',
        'off-white': '#F8F7FF',
        'medium-gray': '#A0AEC0',
        'dark-gray': '#2D3748',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

