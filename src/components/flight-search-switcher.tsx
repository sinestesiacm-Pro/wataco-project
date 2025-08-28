'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Map, List } from 'lucide-react';
import { Icons } from './icons';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { AnimatePresence, motion } from 'framer-motion';
import { FlightSearchClassic } from './flight-search-classic';
import { FlightSearchMap } from './flight-search-map';

type SearchMode = 'classic' | 'map';

export default function FlightSearchSwitcher() {
    const [mode, setMode] = useLocalStorage<SearchMode>('flight-search-mode', 'classic');
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const renderContent = () => {
        if (mode === 'classic') {
            return (
                <motion.div
                    key="classic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <FlightSearchClassic />
                </motion.div>
            )
        } else {
            return (
                 <motion.div
                    key="map"
                    className="h-[500px]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <FlightSearchMap apiKey={apiKey} />
                </motion.div>
            )
        }
    }

    return (
        <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20">
            <div className="flex justify-end items-center mb-4">
                <div className="bg-black/20 p-1 rounded-full flex items-center">
                    <Button 
                        size="sm" 
                        onClick={() => setMode('classic')}
                        className={cn(
                            "rounded-full transition-colors",
                            mode === 'classic' 
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-transparent text-white hover:bg-white/10'
                        )}
                    >
                        <List className="h-4 w-4 mr-2"/>
                        Clásico
                    </Button>
                     <Button 
                        size="sm" 
                        onClick={() => setMode('map')}
                        className={cn(
                            "rounded-full transition-colors",
                            mode === 'map' 
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-transparent text-white hover:bg-white/10'
                        )}
                    >
                        <Map className="h-4 w-4 mr-2"/>
                        Interactivo
                    </Button>
                </div>
            </div>
             <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </div>
    )
}
