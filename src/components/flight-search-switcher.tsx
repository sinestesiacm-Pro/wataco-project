'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { List, Map } from 'lucide-react';
import { Icons } from './icons';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AnimatePresence, motion } from 'framer-motion';
import { FlightSearchClassic } from './flight-search-classic';
import { FlightSearchMap } from './flight-search-map';

type SearchMode = 'list' | 'map';

export function FlightSearchSwitcher() {
  const [mode, setMode] = useLocalStorage<SearchMode>('flight-search-mode', 'list');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Icons.logo width={100} height={40} className="invert-[60%]" />
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
          {mode === 'list' ? <FlightSearchClassic /> : <FlightSearchMap />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}