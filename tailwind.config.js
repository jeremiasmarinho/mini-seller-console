/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
