
'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, Settings, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { UserNav } from './user-nav';

export function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const getTitleFromPath = (path: string): string => {
    if (path.startsWith('/hotels')) return 'Hoteles';
    if (path.startsWith('/flights')) return 'Vuelos';
    if (path.startsWith('/packages')) return 'Paquetes';
    if (path.startsWith('/cruises')) return 'Cruceros';
    if (path.startsWith('/activities')) return 'Actividades';
    if (path.startsWith('/social')) return 'Comunidad';
    if (path.startsWith('/profile')) return 'Mi Perfil';

    // Fallback for home page based on tab
    if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const tab = searchParams.get('tab');
        if (tab === 'Hotels') return 'Hoteles';
        if (tab === 'Packages') return 'Paquetes';
        if (tab === 'Cruises') return 'Cruceros';
        if (tab === 'Activities') return 'Actividades';
        if (tab === 'Social') return 'Comunidad';
    }
    
    return 'Vuelos';
  }

  const currentTitle = getTitleFromPath(pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-sm shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-1 flex justify-start">
             <Button variant="ghost" size="icon" className="rounded-full bg-secondary">
                <Settings className="h-5 w-5" />
             </Button>
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold font-headline tracking-wider text-white">{currentTitle}</h1>
          </div>
          
          <div className="flex-1 flex items-center justify-end gap-2">
            {user ? (
              <UserNav />
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-0 sm:mr-2 h-4 w-4"/>
                  <span className="hidden sm:inline">Iniciar Sesión</span>
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full bg-secondary hidden sm:inline-flex">
                <MapPin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
