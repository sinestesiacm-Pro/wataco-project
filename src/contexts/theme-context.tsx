
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

type ColorTheme = 'light' | 'dark';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('light');
  
  const setColorTheme = useCallback((newTheme: ColorTheme) => {
      setColorThemeState(newTheme);
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
      }
  }, []);
  
   useEffect(() => {
    // Set the light theme as default on initial load
    const root = window.document.documentElement;
    root.classList.add('light');
  }, []);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
