'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

type Theme = 'Flights' | 'Hotels' | 'Packages' | 'Cruises' | 'Activities' | 'Social' | 'Default';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('Default');

  const setTheme = (newTheme: Theme | string) => {
    setThemeState(newTheme as Theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
    const { theme } = useTheme();
    const pathname = usePathname();

    const getBackgroundClass = () => {
        const baseAnimationClass = 'background-pan-animation';

        // For specific detail pages, force a theme regardless of the tab
        if (pathname.startsWith('/hotels')) return cn('bg-hotels-gradient', baseAnimationClass);
        if (pathname.startsWith('/packages')) return cn('bg-packages-gradient', baseAnimationClass);
        if (pathname.startsWith('/cruises')) return cn('bg-cruises-gradient', baseAnimationClass);
        if (pathname.startsWith('/activities')) return cn('bg-activities-gradient', baseAnimationClass);
        if (pathname.startsWith('/flights')) return ''; // Use default from body
        
        // For the home page, use the theme from the context (set by the tab)
        if (pathname === '/') {
            switch(theme) {
                case 'Flights': return ''; // Use default background from globals.css body
                case 'Hotels': return cn('bg-hotels-gradient', baseAnimationClass);
                case 'Packages': return cn('bg-packages-gradient', baseAnimationClass);
                case 'Cruises': return cn('bg-cruises-gradient', baseAnimationClass);
                case 'Activities': return cn('bg-activities-gradient', baseAnimationClass);
                case 'Social': return cn('bg-activities-gradient', baseAnimationClass);
                default: return ''; // Default to the base body background
            }
        }
        
        // Fallback for other pages like /profile, /login, etc.
        return '';
    }

    return (
        <div className={cn('flex flex-col min-h-dvh', getBackgroundClass())}>
            {children}
        </div>
    )
}
