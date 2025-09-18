import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-10 w-18 items-center rounded-full transition-all duration-300 
        focus:outline-none focus:ring-4 focus:ring-blue-500/20 
        ${isDark 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30'
        }
        hover:scale-105 active:scale-95 group
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <span
        className={`
          inline-block h-8 w-8 transform rounded-full bg-white shadow-lg
          transition-all duration-300 ease-in-out
          ${isDark ? 'translate-x-9' : 'translate-x-1'}
          flex items-center justify-center
        `}
      >
        {/* Icon Animation Container */}
        <span className="relative overflow-hidden w-5 h-5">
          {/* Sun Icon */}
          <svg
            className={`
              absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300
              ${isDark ? '-translate-y-6 opacity-0 rotate-90' : 'translate-y-0 opacity-100 rotate-0'}
            `}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          
          {/* Moon Icon */}
          <svg
            className={`
              absolute inset-0 w-5 h-5 text-purple-600 transition-all duration-300
              ${isDark ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-6 opacity-0 -rotate-90'}
            `}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        </span>
      </span>

      {/* Background Decorations */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Light mode stars */}
        <div className={`
          absolute transition-all duration-500
          ${isDark ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
        </div>

        {/* Dark mode stars */}
        <div className={`
          absolute transition-all duration-500
          ${isDark ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute top-2 left-3 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-200"></div>
          <div className="absolute top-3 right-2 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}