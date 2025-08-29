
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const LeafletMap = () => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const position: [number, number] = [4.60971, -74.08175]; // Bogotá

    useEffect(() => {
        // Initialize map only if the container is available and the map is not already initialized
        if (mapContainerRef.current && !mapRef.current) {
            const map = L.map(mapContainerRef.current).setView(position, 6);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker(position).addTo(map)
                .bindPopup('Bogotá, Colombia. <br /> El punto de partida de tu próxima aventura.');
        }

        // Cleanup function to remove the map instance when the component is unmounted
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [position]); // Dependency array ensures this effect runs only when position changes (which it doesn't here)

    return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
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

export default FlightSearchMap;
