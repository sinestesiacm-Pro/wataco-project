
'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

type ColorTheme = 'light' | 'dark';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  setTabTheme: (tab: string) => void;
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
  
  const setTabTheme = useCallback((tab: string) => {
    // This function can be expanded later if needed, but for now,
    // its logic is handled directly in the HomePageContent component.
  }, []);

   useEffect(() => {
    // Set the light theme as default on initial load
    if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (!root.classList.contains('light') && !root.classList.contains('dark')) {
            root.classList.add('light');
        }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme, setTabTheme }}>
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
