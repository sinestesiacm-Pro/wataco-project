'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import FlightSearchPage from './flight-search-page';
import { Navigation, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const popularDestinations = [
  { id: 'paris', name: 'Paris', position: { lat: 48.8566, lng: 2.3522 }, iata: 'CDG' },
  { id: 'nyc', name: 'New York', position: { lat: 40.7128, lng: -74.0060 }, iata: 'JFK' },
  { id: 'tokyo', name: 'Tokyo', position: { lat: 35.6895, lng: 139.6917 }, iata: 'NRT' },
  { id: 'london', name: 'London', position: { lat: 51.5074, lng: -0.1278 }, iata: 'LHR' },
  { id: 'rome', name: 'Rome', position: { lat: 41.9028, lng: 12.4964 }, iata: 'FCO' },
  { id: 'bogota', name: 'Bogotá', position: { lat: 4.7110, lng: -74.0721 }, iata: 'BOG' },
  { id: 'sydney', name: 'Sydney', position: { lat: -33.8688, lng: 151.2093 }, iata: 'SYD' },
  { id: 'dubai', name: 'Dubai', position: { lat: 25.276987, lng: 55.296249 }, iata: 'DXB' },
  { id: 'istanbul', name: 'Istanbul', position: { lat: 41.0082, lng: 28.9784 }, iata: 'IST' },
  { id: 'cancun', name: 'Cancun', position: { lat: 21.1619, lng: -86.8515 }, iata: 'CUN' },
  { id: 'bkk', name: 'Bangkok', position: { lat: 13.7563, lng: 100.5018 }, iata: 'BKK' },
  { id: 'singapore', name: 'Singapore', position: { lat: 1.3521, lng: 103.8198 }, iata: 'SIN' },
];

const nearbyAirports = [
    { id: 'nearby-jfk', name: 'John F. Kennedy Intl.', position: { lat: 40.6413, lng: -73.7781 }, iata: 'JFK' },
    { id: 'nearby-lga', name: 'LaGuardia Airport', position: { lat: 40.7769, lng: -73.8740 }, iata: 'LGA' },
    { id: 'nearby-ewr', name: 'Newark Liberty Intl.', position: { lat: 40.6925, lng: -74.1687 }, iata: 'EWR' },
]

export function DestinationsMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const { colorTheme } = useTheme();
    const isMobile = useIsMobile();
    
    const [selectedDestination, setSelectedDestination] = useState<typeof popularDestinations[0] | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 25, lng: 10 });
    const [mapZoom, setMapZoom] = useState(isMobile ? 1 : 2);
    const [showNearby, setShowNearby] = useState(false);

    useEffect(() => {
        if (selectedDestination) {
            setIsSheetOpen(true);
        }
    }, [selectedDestination]);

    useEffect(() => {
        if (!isSheetOpen) {
            setSelectedDestination(null);
        }
    }, [isSheetOpen]);
    
    const handleGeolocate = useCallback(() => {
        // In a real app, you'd use navigator.geolocation
        // For this demo, we'll just center on a fixed point (e.g., New York)
        setMapCenter({ lat: 40.7128, lng: -74.0060 });
        setMapZoom(9);
        setShowNearby(true);
    }, []);
    
    const handlePinClick = useCallback((dest: typeof popularDestinations[0]) => {
      setSelectedDestination(dest);
      setMapCenter(dest.position);
      setMapZoom(6);
    }, []);

    if (!apiKey) {
      return (
        <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
          <p className="text-muted-foreground">La clave de API de Google Maps no está configurada.</p>
        </div>
      );
    }
  
    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <div className="py-16 text-center">
                <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">Explora Nuestros Destinos Más Populares</h2>
                <p className="text-lg text-white/80 mt-2 drop-shadow-lg">Descubre a dónde viajan nuestros exploradores.</p>
                <div className="mt-8 h-[60vh] max-h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-xl relative">
                    <APIProvider apiKey={apiKey}>
                        <Map
                        center={mapCenter}
                        zoom={mapZoom}
                        mapId="orvian-main-map"
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        className="transition-all duration-1000"
                        >
                        {popularDestinations.map((dest) => (
                            <AdvancedMarker
                                key={dest.id}
                                position={dest.position}
                                onClick={() => handlePinClick(dest)}
                            >
                                <Pin 
                                    background={selectedDestination?.id === dest.id ? '#FF9800' : '#1C88FF'}
                                    borderColor={'#ffffff'} 
                                    glyphColor={'#ffffff'}
                                />
                            </AdvancedMarker>
                        ))}
                        {showNearby && nearbyAirports.map(airport => (
                             <AdvancedMarker
                                key={airport.id}
                                position={airport.position}
                                title={airport.name}
                            >
                               <div className="p-1.5 bg-green-500 rounded-full border-2 border-white shadow-lg">
                                 <Icons.logo width={16} height={16} className="invert brightness-0" />
                               </div>
                            </AdvancedMarker>
                        ))}
                        </Map>
                    </APIProvider>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={handleGeolocate}
                        className="absolute bottom-4 left-4 rounded-full shadow-lg h-12 w-12"
                        aria-label="Find nearby airports"
                    >
                        <Navigation className="h-6 w-6"/>
                    </Button>
                </div>
            </div>
            
            <SheetContent side="bottom" className={cn(
                "h-[90vh] bg-background/50 backdrop-blur-2xl border-t border-white/20 flex flex-col rounded-t-3xl p-0",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
            )}>
                 <SheetHeader className="p-4 flex-row items-center justify-between border-b border-white/20">
                    <SheetTitle className="text-white font-headline text-2xl">Vuela a {selectedDestination?.name}</SheetTitle>
                     <button onClick={() => setIsSheetOpen(false)} className="text-white/70 hover:text-white">
                        <X className="h-6 w-6"/>
                     </button>
                </SheetHeader>
                <div className="p-6 overflow-y-auto">
                    <FlightSearchPage />
                </div>
            </SheetContent>
        </Sheet>
    );
}
