
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from './ui/button';
import { LocateFixed } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Popup } from 'react-leaflet';
import { MapPopupForm } from './map-popup-form';

// Dynamically import MapComponent to ensure it's client-side only
const DynamicMap = dynamic(
    () => import('./map-component').then(mod => mod.default),
    { 
        ssr: false,
        loading: () => <div className="h-[60vh] md:h-[70vh] w-full rounded-2xl bg-muted flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    }
);

// This is the main component that will be dynamically imported
export function FlightSearchMap() {
    const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
    const [zoom, setZoom] = useState(5);
    const [origin, setOrigin] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [destination, setDestination] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [airports, setAirports] = useState<Airport[]>([]);
    const [popupData, setPopupData] = useState<{latlng: L.LatLng, name?: string} | null>(null);
    
    // Set initial map center to NYC on component mount
    useEffect(() => {
        setMapCenter([40.7128, -74.0060]); 
    }, []);

    const handleMapAction = useCallback((data: { latlng: L.LatLng, name?: string }) => {
        setPopupData(data);
    }, []);
    
     const handleGeolocate = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapCenter([latitude, longitude]);
                    setZoom(13);
                    setOrigin({ lat: latitude, lng: longitude, name: 'Mi Ubicación Actual'});
                },
                (error) => {
                    console.warn(`Geolocation error: ${error.message}`);
                    // Fallback to NYC if permission is denied or fails
                    setMapCenter([40.7128, -74.0060]);
                    setZoom(5);
                }
            );
        } else {
             console.warn("Geolocation is not supported by this browser.");
             setMapCenter([40.7128, -74.0060]);
             setZoom(5);
        }
    }, []);

    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
            <div className="absolute top-4 right-4 z-[1000]">
                 <Button
                    size="icon"
                    variant="secondary"
                    className="shadow-lg rounded-full h-12 w-12"
                    onClick={handleGeolocate}
                >
                    <LocateFixed className="h-6 w-6" />
                </Button>
            </div>
            {mapCenter && (
                <DynamicMap
                    center={mapCenter}
                    zoom={zoom}
                    onMapAction={handleMapAction}
                    origin={origin}
                    destination={destination}
                    airports={airports}
                >
                    {popupData && (
                        <Popup position={popupData.latlng} minWidth={320}>
                             <MapPopupForm 
                                latlng={popupData.latlng} 
                                onSearch={(originName, destName) => {
                                    const { lat, lng } = popupData.latlng;
                                    if (!origin) {
                                        setOrigin({ lat, lng, name: originName });
                                    } else {
                                        setDestination({ lat, lng, name: destName });
                                    }
                                    setPopupData(null); // Close popup on search
                                }} 
                                originName={origin?.name} 
                            />
                        </Popup>
                    )}
                </DynamicMap>
            )}
        </div>
    );
}

export default FlightSearchMap;
