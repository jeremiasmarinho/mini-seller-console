/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Custom theme-aware colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-glass': 'var(--bg-glass)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-theme': 'var(--border-color)',
        'shadow-theme': 'var(--shadow-color)',
        'gradient-from': 'var(--gradient-from)',
        'gradient-to': 'var(--gradient-to)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-theme': 'skeletonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'theme': '12px',
      },
      boxShadow: {
        'theme': '0 4px 6px -1px var(--shadow-color), 0 2px 4px -1px var(--shadow-color)',
        'theme-lg': '0 10px 15px -3px var(--shadow-color), 0 4px 6px -2px var(--shadow-color)',
      }
    },
  },
  plugins: [],
};
