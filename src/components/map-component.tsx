'use client';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Airport } from '@/lib/types';
import React, { useEffect, useRef } from 'react';

// This component is dynamically imported and will only run on the client.

const RecenterAutomatically = ({map, lat, lng, zoom}: {map: L.Map | null, lat: number, lng: number, zoom: number}) => {
     useEffect(() => {
       if (map) {
         map.setView([lat, lng], zoom);
       }
     }, [lat, lng, zoom, map]);
     return null;
}

interface MapComponentProps {
    center: [number, number];
    zoom: number;
    airports: Airport[];
    airportIcon: L.DivIcon;
}

const MapComponent = ({ center, zoom, airports, airportIcon }: MapComponentProps) => {
    const { colorTheme } = useTheme();
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    // This effect handles the creation and cleanup of the map instance
    useEffect(() => {
        // Only initialize the map if the ref is available and no map instance exists
        if (mapRef.current && !mapInstanceRef.current) {
            const map = L.map(mapRef.current).setView(center, zoom);
            mapInstanceRef.current = map;

            const tileLayerUrl = colorTheme === 'dark' 
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            
            L.tileLayer(tileLayerUrl, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        // Cleanup function: remove the map instance when the component unmounts
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount and cleanup on unmount

    // This effect handles updates to the map's view (center, zoom)
    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView(center, zoom);
        }
    }, [center, zoom]);
    
    // This effect handles adding/updating markers
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Clear existing markers to prevent duplicates
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add new markers
        airports.forEach(airport => {
            const pos = getAirportCoordinates(airport.iataCode, center);
            if (!pos) return;

            const popupContent = `
                <div class="font-sans p-1">
                    <p class="font-bold text-base">${airport.name} (${airport.iataCode})</p>
                    <p class="text-sm text-gray-600">${airport.address?.cityName || ''}</p>
                    <button class="mt-2 w-full bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold hover:bg-primary/90">Vuelos desde aquí</button>
                </div>
            `;
            
            L.marker(pos, { icon: airportIcon })
              .addTo(map)
              .bindPopup(popupContent);
        });

    }, [airports, airportIcon, center]);

    // Mock coordinates for demo purposes
    const getAirportCoordinates = (iata: string, baseCoords: [number, number]): [number, number] | null => {
        let hash = 0;
        for (let i = 0; i < iata.length; i++) {
            hash = iata.charCodeAt(i) + ((hash << 5) - hash);
        }
        const latJitter = (hash & 0x0000FFFF) / 0xFFFF * 0.5 - 0.25;
        const lonJitter = ((hash & 0xFFFF0000) >> 16) / 0xFFFF * 0.5 - 0.25;
        
        return [baseCoords[0] + latJitter, baseCoords[1] + lonJitter];
    }

    return (
        <div ref={mapRef} className="w-full h-full" />
    );
};

export default MapComponent;
