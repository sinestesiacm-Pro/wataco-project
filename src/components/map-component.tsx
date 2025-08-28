'use client';
import React, { useEffect, useRef, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useTheme } from '@/contexts/theme-context';
import type { Airport } from '@/lib/types';

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
    airports: Airport[];
    onMapAction: (data: { latlng: L.LatLng, name?: string }) => void;
    children?: React.ReactNode;
}

const RecenterAutomatically = ({ lat, lng, zoom }: { lat: number, lng: number, zoom: number }) => {
    const map = useMapEvents({
        load: () => {
            map.setView([lat, lng], zoom);
        }
    });

    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng, zoom, map]);

    return null;
}

const MapEvents = ({ onMapAction }: { onMapAction: MapComponentProps['onMapAction']}) => {
    useMapEvents({
        click(e) {
            onMapAction({ latlng: e.latlng });
        },
    });
    return null;
}

const AntPath = ({ origin, destination }: { origin: any, destination: any }) => {
    const map = useMapEvents({});
    const antPathRef = useRef<L.Polyline.AntPath | null>(null);

    useEffect(() => {
        if (antPathRef.current) {
            map.removeLayer(antPathRef.current);
            antPathRef.current = null;
        }

        if (origin && destination) {
            const latLngs = [[origin.lat, origin.lng], [destination.lat, destination.lng]];
            antPathRef.current = (L.polyline as any).antPath(latLngs, {
                delay: 800,
                dashArray: [10, 20],
                weight: 5,
                color: '#42a5f5',
                pulseColor: '#FFFFFF',
            });
            antPathRef.current.addTo(map);
            map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
        }
    }, [origin, destination, map]);

    return null;
}

const MapComponent = ({ center, zoom, onMapAction, origin, destination, airports, children }: MapComponentProps) => {
    const { colorTheme } = useTheme();
    
    const tileLayerUrl = colorTheme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    return (
        <div className="relative w-full h-full">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
                <RecenterAutomatically lat={center[0]} lng={center[1]} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={tileLayerUrl}
                />
                <MapEvents onMapAction={onMapAction} />
                
                {origin && <Marker position={origin} icon={originIcon} />}
                {destination && <Marker position={destination} icon={destinationIcon} />}

                <AntPath origin={origin} destination={destination} />

                {children}

                <MarkerClusterGroup>
                   {airports.map(airport => (
                       <Marker key={airport.iataCode} position={[airport.geoCode.latitude, airport.geoCode.longitude]} />
                   ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default memo(MapComponent);