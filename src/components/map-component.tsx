
'use client';
import React, { useEffect, useRef, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.markercluster';
import { useTheme } from '@/contexts/theme-context';
import type { Airport } from '@/lib/types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';


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

const airplaneIcon = new L.DivIcon({
    html: `<div class="p-1 bg-gray-800/60 rounded-full shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg></div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
});


interface MapComponentProps {
    center: [number, number];
    zoom: number;
    origin: {lat: number, lng: number, name: string} | null;
    destination: {lat: number, lng: number, name: string} | null;
    airports: Airport[];
    onMapAction: (data: { latlng: L.LatLng, name?: string }) => void;
    onViewChanged: (center: [number, number], zoom: number, bounds: L.LatLngBounds) => void;
    children?: React.ReactNode;
}

const RecenterAutomatically = ({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) => {
    const map = useMapEvents({
        moveend: () => {
            // This could be used to update parent state on map move
        },
    });
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom, map]);
    return null;
};

const MapEvents = ({ onClick, onViewChanged }: { onClick: (e: L.LeafletMouseEvent) => void, onViewChanged: (map: L.Map) => void }) => {
    const map = useMapEvents({
        click(e) {
            onClick(e);
        },
        moveend() {
            onViewChanged(map);
        },
        zoomend() {
            onViewChanged(map);
        }
    });
    return null;
}


const MapComponent = ({ center, zoom, onMapAction, onViewChanged, origin, destination, airports, children }: MapComponentProps) => {
    const { colorTheme } = useTheme();

    const tileLayerUrl = colorTheme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
            <RecenterAutomatically lat={center[0]} lng={center[1]} zoom={zoom} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={tileLayerUrl}
            />
            <MapEvents 
                onClick={(e) => onMapAction({ latlng: e.latlng })}
                onViewChanged={(map) => onViewChanged([map.getCenter().lat, map.getCenter().lng], map.getZoom(), map.getBounds())}
            />

            {origin && <Marker position={[origin.lat, origin.lng]} icon={originIcon} />}
            {destination && <Marker position={[destination.lat, destination.lng]} icon={destinationIcon} />}

            <MarkerClusterGroup>
                {airports.map(airport => (
                    airport.geoCode && (
                        <Marker 
                            key={airport.iataCode} 
                            position={[airport.geoCode.latitude, airport.geoCode.longitude]}
                            icon={airplaneIcon}
                            eventHandlers={{
                                click: () => {
                                    onMapAction({ latlng: L.latLng(airport.geoCode!.latitude, airport.geoCode!.longitude), name: airport.name });
                                }
                            }}
                        />
                    )
                ))}
            </MarkerClusterGroup>

            {children}
        </MapContainer>
    );
};

export default memo(MapComponent);
