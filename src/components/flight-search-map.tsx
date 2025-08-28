'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export function FlightSearchMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [center] = useState({ lat: 4.60971, lng: -74.08175 }); // Bogotá

    if (!apiKey) {
        return (
            <div className="h-[60vh] md:h-[70vh] w-full rounded-2xl bg-muted flex items-center justify-center text-center p-4">
                <p>La clave API de Google Maps no está configurada. Por favor, añade `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` a tu fichero `.env` para habilitar el mapa.</p>
            </div>
        );
    }

    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
            <APIProvider apiKey={apiKey}>
                <Map
                    center={center}
                    zoom={6}
                    mapId="orvian-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                />
            </APIProvider>
        </div>
    );
}

export default FlightSearchMap;
