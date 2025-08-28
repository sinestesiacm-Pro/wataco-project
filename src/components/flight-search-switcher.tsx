'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AnimatePresence, motion } from 'framer-motion';
import { FlightSearchClassic } from './flight-search-classic';
import { FlightSearchMap } from './flight-search-map';

type SearchMode = 'classic' | 'interactive';

export function FlightSearchSwitcher() {
  const [mode, setMode] = useLocalStorage<SearchMode>('flight-search-mode', 'classic');
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="relative bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <Icons.logo width={100} height={40} className="invert-[60%]" />
        
        <div className="flex items-center bg-black/20 p-1 rounded-full">
          <button
            onClick={() => setMode('classic')}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors",
              mode === 'classic' ? 'bg-primary text-primary-foreground' : 'text-white/70 hover:text-white'
            )}
          >
            Clásico
          </button>
          <button
            onClick={() => setMode('interactive')}
            className={cn(
              "px-4 py-1.5 text-sm font-semibold rounded-full transition-colors",
              mode === 'interactive' ? 'bg-primary text-primary-foreground' : 'text-white/70 hover:text-white'
            )}
          >
            Interactivo
          </button>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {mode === 'classic' ? <FlightSearchClassic /> : <FlightSearchMap apiKey={apiKey} />}
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
