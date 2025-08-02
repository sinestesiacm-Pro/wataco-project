
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn, Settings, MapPin, Plane, BedDouble, Luggage, Ship, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { UserNav } from './user-nav';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { Icons } from './icons';

const TABS = [
  { id: 'Flights', label: 'Vuelos', icon: Plane },
  { id: 'Hotels', label: 'Hoteles', icon: BedDouble },
  { id: 'Packages', label: 'Paquetes', icon: Luggage },
  { id: 'Cruises', label: 'Cruceros', icon: Ship },
  { id: 'Activities', label: 'Actividades', icon: Zap },
  { id: 'Social', label: 'Social', icon: Users },
];

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const getTabFromPath = () => {
    if (pathname.startsWith('/hotels')) return 'Hotels';
    if (pathname.startsWith('/packages')) return 'Packages';
    if (pathname.startsWith('/cruises')) return 'Cruises';
    if (pathname.startsWith('/activities')) return 'Activities';
    if (pathname.startsWith('/social')) return 'Social';
    if (pathname.startsWith('/flights/checkout') && searchParams.has('packageId')) return 'Packages';
    if (pathname.startsWith('/flights')) return 'Flights';
    return searchParams.get('tab') || 'Flights';
  };
  
  const tab = getTabFromPath();

  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', newTab);
    router.push(`/?${params.toString()}`);
  };
  
  const getTitleFromPath = (path: string): string => {
    const currentTab = TABS.find(t => t.id === tab);
    if (currentTab && (pathname === '/' || path.startsWith(`/${currentTab.id.toLowerCase()}`))) {
        return currentTab.label;
    }

    if (path.startsWith('/profile')) return 'Mi Perfil';
    if (path.startsWith('/login') || path.startsWith('/signup')) return 'Acceso';
    if (path.startsWith('/flights/checkout')) return 'Finalizar Compra';
    
    return 'TravelCOP';
  }

  const currentTitle = getTitleFromPath(pathname);
  const isTransparentHeader = pathname === '/';

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isTransparentHeader ? "bg-transparent" : "bg-card/10 backdrop-blur-xl"
      )}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-1 flex justify-start">
             <Link href="/">
                <Icons.logo width={120} height={40} className="text-white" />
             </Link>
          </div>
          
          <div className="flex-1 text-center">
             <div className="hidden md:flex justify-center">
                <Tabs value={tab} onValueChange={handleTabChange} className="w-auto">
                  <TabsList className="bg-white/20 backdrop-blur-lg">
                    {TABS.map((item) => (
                      <TabsTrigger key={item.id} value={item.id} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-white">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <h1 className="text-2xl font-bold font-headline tracking-wider text-white md:hidden">{currentTitle}</h1>
          </div>
          
          <div className="flex-1 flex items-center justify-end gap-2">
            {user ? (
              <UserNav />
            ) : (
              <Button asChild className="text-white bg-white/20 hover:bg-white/30">
                <Link href="/login">
                  <LogIn className="mr-0 sm:mr-2 h-4 w-4"/>
                  <span className="hidden sm:inline">Iniciar Sesión</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
