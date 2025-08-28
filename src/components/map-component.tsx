'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Airport } from '@/lib/types';
import React, { useEffect } from 'react';

// This component is dynamically imported and will only run on the client.

const RecenterAutomatically = ({lat, lng, zoom}: {lat: number, lng: number, zoom: number}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng], zoom);
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

    // Mock coordinates for demo purposes
    const getAirportCoordinates = (iata: string): [number, number] | null => {
        // This is a mock function. In a real app, lat/lng would come from the API.
        const coords: { [key: string]: [number, number] } = {
            'JFK': [40.6413, -73.7781], 'LGA': [40.7769, -73.8740], 'EWR': [40.6925, -74.1687],
            'CDG': [49.0097, 2.5479], 'ORY': [48.7233, 2.3794],
            'NRT': [35.7647, 140.3864], 'HND': [35.5494, 139.7798],
            // Add more mock coordinates as needed
        };
        return coords[iata] || null;
    }

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
            <RecenterAutomatically lat={center[0]} lng={center[1]} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={colorTheme === 'dark' 
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            />
            {airports.map(airport => {
                const pos = getAirportCoordinates(airport.iataCode);
                if (!pos) return null;
                return (
                    <Marker key={airport.iataCode} position={pos} icon={airportIcon}>
                        <Popup>
                            <div className="font-sans">
                                <p className="font-bold">{airport.name} ({airport.iataCode})</p>
                                <p className="text-sm">{airport.address?.cityName}</p>
                                <Button size="sm" className="mt-2 w-full">Vuelos desde aquí</Button>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MapComponent;
