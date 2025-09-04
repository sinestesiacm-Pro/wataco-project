
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type TabTheme = 'Flights' | 'Hotels' | 'Packages' | 'Cruises' | 'Activities' | 'Social' | 'Default';
type ColorTheme = 'light' | 'dark';

interface ThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('light');
  
  const setColorTheme = (newTheme: ColorTheme) => {
      setColorThemeState(newTheme);
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
      }
  };
  
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


export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    
    const isSpecialPage = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/profile');

    return (
        <div className={cn('flex flex-col min-h-dvh', isSpecialPage && 'color-change-animation')}>
            {children}
        </div>
    )
}
