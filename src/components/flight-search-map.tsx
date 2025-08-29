'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// This component contains the actual map logic.
// It will only be rendered on the client side.
const LeafletMap = () => {
    const position: [number, number] = [4.60971, -74.08175]; // Bogotá
    return (
         <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Bogotá, Colombia. <br /> El punto de partida de tu próxima aventura.
                </Popup>
            </Marker>
        </MapContainer>
    )
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
