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
        // For specific detail pages, force a theme regardless of the tab
        if (pathname.startsWith('/hotels')) return 'bg-hotels-gradient';
        if (pathname.startsWith('/packages')) return 'bg-packages-gradient';
        if (pathname.startsWith('/cruises')) return 'bg-cruises-gradient';
        if (pathname.startsWith('/activities')) return 'bg-activities-gradient';
        
        // For the home page, use the theme from the context (set by the tab)
        if (pathname === '/') {
            const baseAnimationClass = 'background-pan-animation';
            switch(theme) {
                case 'Flights': return 'bg-flights-body'; // Use the new solid color class
                case 'Hotels': return cn('bg-hotels-gradient', baseAnimationClass);
                case 'Packages': return cn('bg-packages-gradient', baseAnimationClass);
                case 'Cruises': return cn('bg-cruises-gradient', baseAnimationClass);
                case 'Activities': return cn('bg-activities-gradient', baseAnimationClass);
                case 'Social': return cn('bg-activities-gradient', baseAnimationClass);
                default: return 'bg-flights-body'; // Default to the new solid flights background
            }
        }
        
        // Fallback for other pages like /profile, /login, flights/select, etc.
        // If it is a flights sub-page, use the flights background. Otherwise, a default.
        if (pathname.startsWith('/flights')) return 'bg-flights-body';
        
        return 'bg-flights-body background-pan-animation';
    }

    return (
        <div className={cn('flex flex-col min-h-dvh', getBackgroundClass())}>
            {children}
        </div>
    )
}
