'use client';

import React, { useState, useCallback, useEffect } from 'react';
import L from 'leaflet';
import { Button } from './ui/button';
import { Loader2, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import type { Airport } from '@/lib/types';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { Card } from './ui/card';
import MapComponent from './map-component';

// Fix for default icon path issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Use dynamic import for the map component to ensure it's client-side only
const DynamicMap = dynamic(() => import('./map-component'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
});


export function FlightSearchMap() {
    const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
    const [zoom, setZoom] = useState(5);
    const [origin, setOrigin] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [destination, setDestination] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [selectionMode, setSelectionMode] = useState<'origin' | 'destination'>('origin');

    useEffect(() => {
        // Set initial map center to NYC
        setMapCenter([40.7128, -74.0060]);
    }, []);

    const handleMapAction = (data: { latlng: L.LatLng, name?: string }) => {
        const { lat, lng } = data.latlng;
        const name = data.name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        
        if (selectionMode === 'origin') {
            setOrigin({ lat, lng, name });
            setSelectionMode('destination'); // Switch to destination selection
        } else {
            setDestination({ lat, lng, name });
        }
    };
    
  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
        <div className="absolute top-4 left-4 z-[1000] w-full max-w-sm space-y-2">
           <Card className="p-3 bg-card/80 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => setSelectionMode('origin')} 
                        className={`flex-1 p-2 rounded-md transition-colors text-left ${selectionMode === 'origin' ? 'bg-primary text-primary-foreground' : 'bg-transparent hover:bg-muted'}`}
                    >
                         <div className="flex items-center gap-2">
                            <PlaneTakeoff className="h-5 w-5" />
                            <div>
                                <p className="text-xs font-bold">Origen</p>
                                <p className="text-sm truncate">{origin?.name || "Selecciona en el mapa"}</p>
                            </div>
                        </div>
                    </button>
                     <button 
                        onClick={() => setSelectionMode('destination')}
                        className={`flex-1 p-2 rounded-md transition-colors text-left ${selectionMode === 'destination' ? 'bg-primary text-primary-foreground' : 'bg-transparent hover:bg-muted'}`}
                    >
                        <div className="flex items-center gap-2">
                            <PlaneLanding className="h-5 w-5" />
                             <div>
                                <p className="text-xs font-bold">Destino</p>
                                <p className="text-sm truncate">{destination?.name || "Selecciona en el mapa"}</p>
                            </div>
                        </div>
                    </button>
                </div>
           </Card>
        </div>
        {mapCenter && (
            <DynamicMap
                center={mapCenter}
                zoom={zoom}
                onMapAction={handleMapAction}
                origin={origin}
                destination={destination}
                setMapCenter={setMapCenter}
                setZoom={setZoom}
                setOrigin={setOrigin}
            />
        )}
    </div>
  );
}
