'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plane, BedDouble, Zap, Luggage, Ship, Users, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function BottomNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg md:hidden">
      <div className="flex justify-around items-center h-16">
        {tabsConfig.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full text-white/70 transition-colors",
              isOnHomePage && activeTab === id ? "text-white scale-110" : ""
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
