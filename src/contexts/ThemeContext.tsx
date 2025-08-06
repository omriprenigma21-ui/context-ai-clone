"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  actualTheme: "light" | "dark"; // The actual resolved theme (no "system")
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");
  const [isInitialized, setIsInitialized] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };

  // Apply theme to DOM
  const applyThemeToDOM = (themeToApply: "light" | "dark") => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      const body = document.body;

      // Remove existing theme classes
      root.classList.remove("light", "dark");
      body.classList.remove("light", "dark");

      // Add new theme class
      root.classList.add(themeToApply);
      body.classList.add(themeToApply);

      // Set data attribute
      root.setAttribute("data-theme", themeToApply);

      console.log(`🎨 Theme applied: ${themeToApply}`);
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      console.log("📱 Loading saved theme:", savedTheme);

      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setThemeState(savedTheme);
      } else {
        // Default to system theme if no saved preference
        setThemeState("system");
      }
      setIsInitialized(true);
    }
  }, []);

  // Update actual theme and apply to DOM
  useEffect(() => {
    if (!isInitialized) return;

    const resolveTheme = (): "light" | "dark" => {
      if (theme === "system") {
        return getSystemTheme();
      }
      return theme as "light" | "dark";
    };

    const newActualTheme = resolveTheme();
    console.log(`🔄 Theme changing from "${actualTheme}" to "${newActualTheme}" (user selected: "${theme}")`);

    setActualTheme(newActualTheme);
    applyThemeToDOM(newActualTheme);
  }, [theme, isInitialized]);

  // Listen for system theme changes when using system theme
  useEffect(() => {
    if (theme !== "system" || !isInitialized) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      console.log("🖥️ System theme changed to:", newSystemTheme);
      setActualTheme(newSystemTheme);
      applyThemeToDOM(newSystemTheme);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, isInitialized]);

  const setTheme = (newTheme: Theme) => {
    console.log(`🎯 User selected theme: ${newTheme}`);
    setThemeState(newTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      console.log("💾 Theme saved to localStorage:", newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
