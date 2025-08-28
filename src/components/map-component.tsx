'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { MapPopupForm } from './map-popup-form';
import { LocateFixed } from 'lucide-react';

// Fix for default icon path issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


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
    origin: {lat: number, lng: number, name: string} | null;
    destination: {lat: number, lng: number, name: string} | null;
    onMapAction: (data: { latlng: L.LatLng, name?: string }) => void;
    setMapCenter: (center: [number, number]) => void;
    setZoom: (zoom: number) => void;
    setOrigin: (origin: {lat: number, lng: number, name: string} | null) => void;
}

// Component to handle map events like clicks
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

// Component to recenter the map view
const RecenterAutomatically = ({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom, map]);
    return null;
};

const MapComponent = ({ center, zoom, onMapAction, origin, destination, setMapCenter, setZoom, setOrigin }: MapComponentProps) => {
    const { colorTheme } = useTheme();

    const tileLayerUrl = colorTheme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const handleGeolocate = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMapCenter([latitude, longitude]);
                setZoom(13);
                setOrigin({ lat: latitude, lng: longitude, name: 'Mi Ubicación Actual'});
            },
            (error) => {
                console.error("Error getting user's location:", error);
                // Fallback to a default location if permission is denied
                setMapCenter([40.7128, -74.0060]);
                setZoom(5);
            }
        );
    };

    return (
        <div className="relative w-full h-full">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
                <RecenterAutomatically lat={center[0]} lng={center[1]} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={tileLayerUrl}
                />
                <MapEvents onMapAction={onMapAction} />

                {origin && (
                    <Marker position={[origin.lat, origin.lng]} icon={originIcon}>
                        <Popup><b>Punto de Origen</b><br/>{origin.name}</Popup>
                    </Marker>
                )}
                {destination && (
                    <Marker position={[destination.lat, destination.lng]} icon={destinationIcon}>
                        <Popup><b>Punto de Destino</b><br/>{destination.name}</Popup>
                    </Marker>
                )}
                {origin && destination && (
                     L.polyline.antPath([[origin.lat, origin.lng], [destination.lat, destination.lng]], {
                        "delay": 400,
                        "dashArray": [
                           10,
                           20
                        ],
                        "weight": 5,
                        "color": "#1C88FF",
                        "pulseColor": "#FFFFFF",
                        "paused": false,
                        "reverse": false,
                        "hardwareAccelerated": true
                     })
                )}
            </MapContainer>
            <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-4 z-[1000] shadow-lg rounded-full h-12 w-12"
                onClick={handleGeolocate}
            >
                <LocateFixed className="h-6 w-6" />
            </Button>
        </div>
    );
};

export default MapComponent;