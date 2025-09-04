
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
    const isPackagesPage = (pathname === '/' && tabTheme === 'Packages') || pathname.startsWith('/packages');

    const getBackgroundClass = () => {
        
        if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
            return "color-change-animation";
        }
        if (pathname.startsWith('/profile')) {
            return "color-change-animation";
        }
        if (isPackagesPage) {
            return 'bg-packages-background';
        }

        const baseAnimationClass = 'background-pan-animation';

        if (pathname.startsWith('/hotels')) return 'bg-hotels-background';
        if (pathname.startsWith('/cruises')) return cn('bg-cruises-gradient', baseAnimationClass);
        if (pathname.startsWith('/activities')) return 'bg-activities-background';
        if (pathname.startsWith('/flights')) return 'bg-flights-background';
        
        if (pathname === '/') {
            switch(tabTheme) {
                case 'Flights': return 'bg-flights-background'; 
                case 'Hotels': return 'bg-hotels-background';
                case 'Packages': return 'bg-packages-background';
                case 'Cruises': return cn('bg-cruises-gradient', baseAnimationClass);
                case 'Activities': return 'bg-activities-background';
                case 'Social': return 'bg-flights-background';
                default: return 'bg-flights-background';
            }
        }
        
        return 'bg-background';
    }

    return (
        <div className={cn('flex flex-col min-h-dvh', getBackgroundClass())}>
            {children}
        </div>
    )
}

    

    
