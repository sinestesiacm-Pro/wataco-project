'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { LogIn, User as UserIcon, Settings, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { UserNav } from './user-nav';

export function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user } = useAuth();
  
  const activeTab = searchParams.get('tab') || 'Flights';

  const tabLabels: { [key: string]: string } = {
    'Flights': 'Vuelos',
    'Hotels': 'Hoteles',
    'Packages': 'Paquetes',
    'Cruises': 'Cruceros',
    'Activities': 'Actividades',
    'Social': 'Comunidad',
  }

  const currentTitle = tabLabels[activeTab] || 'Be On Trip';

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-transparent shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-1 flex justify-start">
             <Button variant="ghost" size="icon" className="rounded-full bg-secondary">
                <Settings className="h-5 w-5" />
             </Button>
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold font-headline tracking-wider">{currentTitle}</h1>
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
