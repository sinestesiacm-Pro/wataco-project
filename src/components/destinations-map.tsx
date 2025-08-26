'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';

const mapStyles = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
];

const popularDestinations = [
  { id: 'paris', name: 'Paris', position: { lat: 48.8566, lng: 2.3522 } },
  { id: 'nyc', name: 'New York', position: { lat: 40.7128, lng: -74.0060 } },
  { id: 'tokyo', name: 'Tokyo', position: { lat: 35.6895, lng: 139.6917 } },
  { id: 'london', name: 'London', position: { lat: 51.5074, lng: -0.1278 } },
  { id: 'rome', name: 'Rome', position: { lat: 41.9028, lng: 12.4964 } },
  { id: 'bogota', name: 'Bogotá', position: { lat: 4.7110, lng: -74.0721 } },
];


export function DestinationsMap() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const { colorTheme } = useTheme();
    const [selectedDestination, setSelectedDestination] = React.useState<typeof popularDestinations[0] | null>(null);

    if (!apiKey) {
      return (
        <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
          <p className="text-muted-foreground">La clave de API de Google Maps no está configurada.</p>
        </div>
      );
    }
  
    return (
        <div className="py-16 text-center">
            <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">Explora Nuestros Destinos Más Populares</h2>
            <p className="text-lg text-white/80 mt-2 drop-shadow-lg">Descubre a dónde viajan nuestros exploradores.</p>
            <div className="mt-8 h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <APIProvider apiKey={apiKey}>
                    <Map
                    defaultCenter={{ lat: 25, lng: 0 }}
                    defaultZoom={2}
                    mapId="orvian-main-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    styles={colorTheme === 'dark' ? mapStyles : undefined}
                    >
                    {popularDestinations.map((dest) => (
                        <AdvancedMarker
                            key={dest.id}
                            position={dest.position}
                            onClick={() => setSelectedDestination(dest)}
                        >
                            <Pin 
                                background={'#1C88FF'} 
                                borderColor={'#ffffff'} 
                                glyphColor={'#ffffff'}
                            >
                                <Icons.logo width={20} height={20} className="invert brightness-0" />
                            </Pin>
                        </AdvancedMarker>
                    ))}

                    {selectedDestination && (
                        <InfoWindow
                            position={selectedDestination.position}
                            onCloseClick={() => setSelectedDestination(null)}
                            pixelOffset={[0, -40]}
                        >
                            <p className="font-bold text-gray-800">{selectedDestination.name}</p>
                        </InfoWindow>
                    )}
                    </Map>
                </APIProvider>
            </div>
      </div>
    );
}
