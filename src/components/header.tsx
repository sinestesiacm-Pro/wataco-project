'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Search, Plane, BedDouble, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function Header() {
  const [activeTab, setActiveTab] = useState('Flights');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
              <Icons.logo width={100} height={27} />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-1 bg-card/50 p-1 rounded-full border">
            <TabButton
              label="Flights"
              icon={<Plane className="h-4 w-4" />}
              isActive={activeTab === 'Flights'}
              onClick={() => setActiveTab('Flights')}
            />
            <TabButton
              label="Hotels"
              icon={<BedDouble className="h-4 w-4" />}
              isActive={activeTab === 'Hotels'}
              onClick={() => setActiveTab('Hotels')}
            />
            <TabButton
              label="Activities"
              icon={<Zap className="h-4 w-4" />}
              isActive={activeTab === 'Activities'}
              onClick={() => setActiveTab('Activities')}
            />
          </nav>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-primary/10 group transition-all duration-300"
            >
              <Search className="h-5 w-5 text-foreground/70 group-hover:text-primary group-hover:scale-110 transition-transform" />
              <span className="sr-only">Search</span>
            </Button>
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
        "rounded-full px-6 py-2 text-sm font-semibold flex items-center gap-2 transition-all duration-300",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      {icon}
      {label}
    </Button>
  );
};
