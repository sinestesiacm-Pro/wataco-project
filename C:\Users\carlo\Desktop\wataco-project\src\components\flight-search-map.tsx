'use client';

import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { LocateFixed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// This component now renders the map itself
const LeafletMap = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        // Initialize map only if the container is available and the map is not already initialized
        if (mapContainerRef.current && !mapRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [20, 0], // Start with a global view
                zoom: 2,
                scrollWheelZoom: true,
            });
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        // Cleanup function to remove the map instance when the component is unmounted
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const handleLocateUser = () => {
        if (navigator.geolocation && mapRef.current) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userPosition: [number, number] = [latitude, longitude];
                    mapRef.current?.flyTo(userPosition, 13); // Zoom in on user
                    L.marker(userPosition).addTo(mapRef.current!)
                        .bindPopup('Tu ubicación actual.')
                        .openPopup();
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    toast({
                        title: "Error de Ubicación",
                        description: "No se pudo obtener tu ubicación. Por favor, asegúrate de haber concedido los permisos.",
                        variant: "destructive",
                    });
                }
            );
        } else {
            toast({
                title: "Geolocalización no soportada",
                description: "Tu navegador no soporta la geolocalización.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="relative h-full w-full">
            <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
             <Button 
                onClick={handleLocateUser}
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 z-[1000] h-12 w-12 rounded-full bg-white/30 backdrop-blur-md border-white/40 text-white hover:bg-white/50 hover:text-white shadow-lg"
            >
                <LocateFixed className="h-6 w-6" />
            </Button>
        </div>
    );
}

// This is the main exported component. It ensures that the LeafletMap
// component is only rendered on the client, preventing initialization errors.
export function FlightSearchMap() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This effect runs only once on the client, after the component mounts.
        setIsClient(true);
    }, []);

    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
            {isClient ? <LeafletMap /> : <div className="h-full w-full bg-muted/20 animate-pulse" />}
        </div>
    );
}
