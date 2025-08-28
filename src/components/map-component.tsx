'use client';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Airport } from '@/lib/types';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { MapPopupForm } from './map-popup-form';
import { LocateFixed } from 'lucide-react';

const originIcon = new L.DivIcon({
    html: `<div class="relative flex items-center justify-center w-8 h-8 bg-blue-500/30 rounded-full border-2 border-blue-500"><div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const destinationIcon = new L.DivIcon({
    html: `<div class="relative flex items-center justify-center w-8 h-8 bg-green-500/30 rounded-full border-2 border-green-500"><div class="w-3 h-3 bg-green-500 rounded-full"></div></div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});


interface MapComponentProps {
    center: [number, number];
    zoom: number;
    origin: {lat: number, lng: number} | null;
    destination: {lat: number, lng: number} | null;
    onMapAction: (data: { latlng: L.LatLng, name?: string }) => void;
    setMapCenter: (center: [number, number]) => void;
    setZoom: (zoom: number) => void;
    setOrigin: (origin: {lat: number, lng: number, name: string} | null) => void;
}

const MapEvents = ({ onMapAction }: { onMapAction: MapComponentProps['onMapAction']}) => {
    const map = useMapEvents({
        click(e) {
            const container = document.createElement('div');
            const root = ReactDOM.createRoot(container);
            root.render(<MapPopupForm latlng={e.latlng} onSearch={(originName, destName) => {
                onMapAction({ latlng: e.latlng, name: destName });
                map.closePopup();
            }} />);

            L.popup({ minWidth: 320 })
                .setLatLng(e.latlng)
                .setContent(container)
                .openOn(map);
        },
    });
    return null;
}

const MapComponent = ({ center, zoom, onMapAction, origin, destination, setMapCenter, setZoom, setOrigin }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const { colorTheme } = useTheme();

    const handleGeolocate = () => {
        mapRef.current?.locate().on('locationfound', function (e) {
            setMapCenter([e.latlng.lat, e.latlng.lng]);
            setZoom(13);
            setOrigin({ lat: e.latlng.lat, lng: e.latlng.lng, name: 'Mi Ubicación Actual'});
        });
    }

    useEffect(() => {
        const mapElement = document.getElementById('map');
        if (mapElement && !mapRef.current) {
            const map = L.map(mapElement).setView(center, zoom);
            mapRef.current = map;

            const tileLayerUrl = colorTheme === 'dark' 
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            
            L.tileLayer(tileLayerUrl, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(center, zoom);
        }
    }, [center, zoom]);

    // Effect for markers and lines
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Clear existing markers and lines
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });

        if(origin) {
            L.marker([origin.lat, origin.lng], { icon: originIcon }).addTo(map)
                .bindPopup("<b>Punto de Origen</b>").openPopup();
        }
        if(destination) {
            L.marker([destination.lat, destination.lng], { icon: destinationIcon }).addTo(map)
                .bindPopup("<b>Punto de Destino</b>").openPopup();
        }
        if(origin && destination) {
            L.polyline([[origin.lat, origin.lng], [destination.lat, destination.lng]], {color: '#1C88FF', weight: 3, dashArray: '5, 10'}).addTo(map);
        }

    }, [origin, destination]);


    return (
        <div className="relative w-full h-full">
            <div id="map" className="w-full h-full z-0" />
             <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4 z-[1000] shadow-lg rounded-full h-12 w-12"
                onClick={handleGeolocate}
            >
                <LocateFixed className="h-6 w-6" />
            </Button>
            {mapRef.current && <MapEvents onMapAction={onMapAction} />}
        </div>
    );
};

export default MapComponent;
