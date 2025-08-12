'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plane, BedDouble, Zap, Luggage, Ship, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const isOnHomePage = pathname === '/';
  const activeTab = searchParams.get('tab') || 'Flights';

  const isLight = pathname.startsWith('/flights/checkout') || pathname.startsWith('/flights/select');

  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    router.push(`/?${params.toString()}`);
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
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.5)] md:hidden",
        isLight ? "bg-white/80 backdrop-blur-xl" : "bg-white/40 backdrop-blur-xl"
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center h-16">
        {tabsConfig.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground transition-colors",
              isOnHomePage && activeTab === id 
                ? "text-primary scale-110" 
                : isLight ? "text-muted-foreground" : "text-white/80"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
