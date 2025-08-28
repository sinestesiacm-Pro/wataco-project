'use client';
import React, { useEffect, useRef, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.markercluster';
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

const MapComponent = ({ center, zoom, onMapAction, origin, destination, airports, children }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const antPathRef = useRef<L.Polyline.AntPath | null>(null);
    const { colorTheme } = useTheme();

    const tileLayerUrl = colorTheme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Initialize map
    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: center,
                zoom: zoom,
                scrollWheelZoom: true,
            });

            L.tileLayer(tileLayerUrl, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);
            
            mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
                onMapAction({ latlng: e.latlng });
            });
        }

        // Cleanup function to remove the map instance
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Only run on mount and unmount

    // Update view and tile layer
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(center, zoom);
            // This part is tricky as TileLayer is not easily mutable.
            // For this app, we will assume the theme doesn't change after map init.
            // A more complex solution would involve removing and re-adding the layer.
        }
    }, [center, zoom]);
    
    // Update ant path
     useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (antPathRef.current) {
            map.removeLayer(antPathRef.current);
            antPathRef.current = null;
        }

        if (origin && destination) {
            const latLngs: [number, number][] = [[origin.lat, origin.lng], [destination.lat, destination.lng]];
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
    }, [origin, destination]);


    // Update markers (simple markers for origin/destination)
     useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        // Clear existing markers before adding new ones
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        if (origin) {
            L.marker(origin, { icon: originIcon }).addTo(map);
        }
        if (destination) {
            L.marker(destination, { icon: destinationIcon }).addTo(map);
        }
    }, [origin, destination]);

    return (
        <div ref={mapContainerRef} className="w-full h-full" />
    );
};

export default memo(MapComponent);
