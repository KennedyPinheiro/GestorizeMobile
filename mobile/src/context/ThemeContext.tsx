import React, { createContext, useContext, useMemo, useState } from "react";

export type AppTheme = {
  colors: {
    primary: string;
    background: string;
    surface: string;
    border: string;
    text: string;
    muted: string;
    success: string;
    error: string;
  };
};

const defaultTheme: AppTheme = {
  colors: {
    primary: "#0ea5e9",
    background: "#ffffff",
    surface: "#f8fafc",
    border: "#e5e7eb",
    text: "#0f172a",
    muted: "#475569",
    success: "#16a34a",
    error: "#ef4444",
  },
};

const ThemeContext = createContext<AppTheme>(defaultTheme);
const ThemeToggleContext = createContext<{ toggle: () => void; mode: "light" | "dark" }>({
  toggle: () => {},
  mode: "light",
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const value = useMemo(() => {
    const light = defaultTheme;
    const dark: AppTheme = {
      colors: {
        // Inversão simples: branco -> azul header, azul -> branco
        primary: "#ffffff",
        background: "#062046", // azul do header
        surface: "#0b274f",
        border: "#0e3266",
        text: "#ffffff",
        muted: "#cdd9f1",
        success: "#22c55e",
        error: "#f87171",
      },
    };
    return mode === "light" ? light : dark;
  }, [mode]);

  const toggle = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeToggleContext.Provider value={{ toggle, mode }}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </ThemeToggleContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useThemeToggle = () => useContext(ThemeToggleContext);
