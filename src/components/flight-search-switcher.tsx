
'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { List, Map } from 'lucide-react';
import { Icons } from './icons';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AnimatePresence, motion } from 'framer-motion';
import { FlightSearchClassic } from './flight-search-classic';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

type SearchMode = 'list' | 'map';

const DynamicFlightSearchMap = dynamic(
    () => import('./flight-search-map').then(mod => mod.FlightSearchMap),
    { 
        ssr: false,
        loading: () => <div className="h-[60vh] md:h-[70vh] w-full rounded-2xl bg-muted/20 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>
    }
);


export function FlightSearchSwitcher() {
  const [mode, setMode] = useLocalStorage<SearchMode>('flight-search-mode', 'list');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
        </div>
        <div className="flex items-center gap-2 rounded-full p-1 bg-black/20 backdrop-blur-sm">
          <Button
            size="sm"
            variant={mode === 'list' ? 'secondary' : 'ghost'}
            onClick={() => setMode('list')}
            className="rounded-full"
          >
            <List className="h-4 w-4 mr-2" />
            Clásico
          </Button>
          <Button
            size="sm"
            variant={mode === 'map' ? 'secondary' : 'ghost'}
            onClick={() => setMode('map')}
            className="rounded-full"
          >
            <Map className="h-4 w-4 mr-2" />
            Mapa
          </Button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {mode === 'list' ? <FlightSearchClassic /> : <DynamicFlightSearchMap />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
