'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type TabTheme = 'Flights' | 'Hotels' | 'Packages' | 'Cruises' | 'Activities' | 'Social' | 'Default';
type ColorTheme = 'light' | 'dark';

interface ThemeContextType {
  tabTheme: TabTheme;
  setTabTheme: (theme: TabTheme | string) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [tabTheme, setTabThemeState] = useState<TabTheme>('Default');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('light');

  const setTabTheme = (newTheme: TabTheme | string) => {
    setTabThemeState(newTheme as TabTheme);
  };
  
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
    <ThemeContext.Provider value={{ tabTheme, setTabTheme, colorTheme, setColorTheme }}>
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
    const { tabTheme } = useTheme();
    const pathname = usePathname();

    const getBackgroundClass = () => {
        
        if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
            return "color-change-animation";
        }
        if (pathname.startsWith('/profile')) {
            return "color-change-animation";
        }

        const baseAnimationClass = 'background-pan-animation';

        if (pathname.startsWith('/hotels')) return 'bg-hotels-background';
        if (pathname.startsWith('/packages')) return cn('bg-packages-gradient', baseAnimationClass);
        if (pathname.startsWith('/cruises')) return cn('bg-cruises-gradient', baseAnimationClass);
        if (pathname.startsWith('/activities')) return cn('bg-activities-gradient', baseAnimationClass);
        if (pathname.startsWith('/flights')) return 'bg-flights-gradient';
        
        if (pathname === '/') {
            switch(tabTheme) {
                case 'Flights': return 'bg-flights-gradient'; 
                case 'Hotels': return 'bg-hotels-background';
                case 'Packages': return cn('bg-packages-gradient', baseAnimationClass);
                case 'Cruises': return cn('bg-cruises-gradient', baseAnimationClass);
                case 'Activities': return cn('bg-activities-gradient', baseAnimationClass);
                case 'Social': return 'bg-flights-gradient';
                default: return 'bg-flights-gradient';
            }
        }
        
        return 'bg-flights-gradient';
    }

    return (
        <div className={cn('flex flex-col min-h-dvh', getBackgroundClass())}>
            {children}
        </div>
    )
}
