import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("mini-seller-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    // Default to light mode
    return "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("mini-seller-theme", theme);

    // Apply to document - try both body and documentElement
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
