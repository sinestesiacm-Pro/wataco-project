
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';
import MapComponent from './map-component';
import { Button } from './ui/button';
import { LocateFixed } from 'lucide-react';
import MarkerClusterGroup from 'react-leaflet-cluster';

// This is the main component that will be dynamically imported
export function FlightSearchMap() {
    const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
    const [zoom, setZoom] = useState(5);
    const [origin, setOrigin] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [destination, setDestination] = useState<{lat: number, lng: number, name: string} | null>(null);
    const [airports, setAirports] = useState<Airport[]>([]);
    
    // Set initial map center to NYC on component mount
    useEffect(() => {
        setMapCenter([40.7128, -74.0060]); 
    }, []);

    const handleMapAction = useCallback((data: { latlng: L.LatLng, name?: string }) => {
        const { lat, lng } = data.latlng;
        const name = data.name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
        
        // Simple logic to alternate between setting origin and destination
        if (!origin || (origin && destination)) {
            setOrigin({ lat, lng, name });
            setDestination(null);
        } else {
            setDestination({ lat, lng, name });
        }
    }, [origin, destination]);
    
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
            {mapCenter ? (
                <MapComponent
                    center={mapCenter}
                    zoom={zoom}
                    onMapAction={handleMapAction}
                    origin={origin}
                    destination={destination}
                    airports={airports}
                />
            ) : <p>Loading map...</p>}
        </div>
    );
}

export default FlightSearchMap;

