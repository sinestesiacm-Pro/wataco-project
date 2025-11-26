
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plane, BedDouble, Zap, Luggage, Ship, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';

const tabsConfig = [
    { id: 'Flights', label: 'Vuelos', icon: Plane },
    { id: 'Hotels', label: 'Hoteles', icon: BedDouble },
    { id: 'Packages', label: 'Paquetes', icon: Luggage },
    { id: 'Cruises', label: 'Cruceros', icon: Ship },
    { id: 'Activities', label: 'Actividades', icon: Zap },
    { id: 'Social', label: 'Social', icon: Users },
];

const TabButton = React.memo(function TabButton({ id, label, icon: Icon, isActive, isLight, onClick }: {
    id: string;
    label: string;
    icon: React.ElementType;
    isActive: boolean;
    isLight: boolean;
    onClick: (id: string) => void;
}) {
    return (
        <button
            onClick={() => onClick(id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
              isActive 
                ? "text-primary" 
                : isLight ? "text-muted-foreground" : "text-gray-800/70"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{label}</span>
        </button>
    );
});


export function BottomNavbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const activeTab = searchParams.get('tab') || 'Flights';
  const isOnHomePage = pathname === '/';

  const isLight = true;

  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.1)] md:hidden",
        isLight ? "bg-background/80 backdrop-blur-xl border-t" : "bg-black/20 backdrop-blur-xl"
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around items-center h-16">
        {tabsConfig.map(({ id, label, icon: Icon }) => (
          <TabButton
            key={id}
            id={id}
            label={label}
            icon={Icon}
            isActive={isOnHomePage && activeTab === id}
            isLight={isLight}
            onClick={handleTabClick}
          />
        ))}
      </div>
    </div>
  );
}
