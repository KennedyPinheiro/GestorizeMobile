import React, { createContext, useContext, useMemo, useState } from 'react';

type ThemeContextType = AppTheme & {
  isDark: boolean;
};

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
    primary: '#005CE4',
    background: '#ffffff',
    surface: '#f8fafc',
    border: '#ffffff',
    text: '#0f172a',
    muted: '#475569',
    success: '#16a34a',
    error: '#ef4444',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  ...defaultTheme,
  isDark: false,
});
const ThemeToggleContext = createContext<{
  toggle: () => void;
  mode: 'light' | 'dark';
}>({
  toggle: () => {},
  mode: 'light',
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const value = useMemo(() => {
    const light = defaultTheme;

    const dark: AppTheme = {
      colors: {
        primary: '#ffffff',
        background: '#062046',
        surface: '#0b274f',
        border: '#0e3266',
        text: '#ffffff',
        muted: '#cdd9f1',
        success: '#22c55e',
        error: '#f87171',
      },
    };

    const isDark = mode === 'dark';

    return {
      ...(isDark ? dark : light),
      isDark,
    };
  }, [mode]);

  const toggle = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeToggleContext.Provider value={{ toggle, mode }}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </ThemeToggleContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useThemeToggle = () => useContext(ThemeToggleContext);
