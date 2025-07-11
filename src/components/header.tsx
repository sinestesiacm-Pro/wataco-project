
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Search, Plane, BedDouble, Zap, Luggage, Ship, LogIn, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { UserNav } from './user-nav';

export function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  
  const isOnHomePage = pathname === '/';
  const activeTab = searchParams.get('tab') || 'Flights';

  const handleTabClick = (tab: string) => {
    router.push(`/?tab=${tab}`);
  };

  const tabsConfig = [
    { id: 'Flights', label: 'Vuelos', icon: Plane },
    { id: 'Hotels', label: 'Hoteles', icon: BedDouble },
    { id: 'Packages', label: 'Paquetes', icon: Luggage },
    { id: 'Cruises', label: 'Cruceros', icon: Ship },
    { id: 'Activities', label: 'Actividades', icon: Zap },
    { id: 'Social', label: 'Social', icon: Users },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <Icons.logo width={100} height={27} />
            </Link>
          </div>
          
          {/* Desktop Tabs */}
          <div className="flex-1 min-w-0 px-2 sm:px-4 hidden md:block">
            <nav className="flex items-center justify-center space-x-1 bg-card/50 p-1 rounded-full border w-max mx-auto">
              {tabsConfig.map(({ id, label, icon: Icon }) => (
                <TabButton
                  key={id}
                  label={label}
                  icon={<Icon className="h-4 w-4" />}
                  isActive={isOnHomePage && activeTab === id}
                  onClick={() => handleTabClick(id)}
                />
              ))}
            </nav>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 group transition-all duration-300 hidden sm:inline-flex"
            >
              <Search className="h-5 w-5 text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-transform" />
              <span className="sr-only">Buscar</span>
            </Button>
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
          </div>
        </div>
      </div>
    </header>
  );
}

const TabButton = ({ label, icon, isActive, onClick }: { label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 sm:px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-300 whitespace-nowrap",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg"
          : "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};
