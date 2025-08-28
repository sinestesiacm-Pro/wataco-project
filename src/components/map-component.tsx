
'use client';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';

import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import ReactDOM from 'react-dom/client';
import { MapPopupForm } from './map-popup-form';
import { LocateFixed } from 'lucide-react';
import type { Airport } from '@/lib/types';
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

interface MapComponentProps {
    center: [number, number];
    zoom: number;
    origin: {lat: number, lng: number, name: string} | null;
    destination: {lat: number, lng: number, name: string} | null;
    airports: Airport[];
    onMapAction: (data: { latlng: L.LatLng, name?: string }) => void;
}

const MapComponent = ({ center, zoom, onMapAction, origin, destination, airports }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const originMarkerRef = useRef<L.Marker | null>(null);
    const destinationMarkerRef = useRef<L.Marker | null>(null);
    const antPathRef = useRef<L.Polyline.AntPath | null>(null);
    const { colorTheme } = useTheme();

    const tileLayerUrl = colorTheme === 'dark' 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    // Effect to initialize the map
    useEffect(() => {
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: center,
                zoom: zoom,
                scrollWheelZoom: true,
            });

            L.tileLayer(tileLayerUrl, {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }).addTo(mapRef.current);
            
            // Handle map click events
            mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
                const container = document.createElement('div');
                const root = ReactDOM.createRoot(container);
                root.render(<MapPopupForm latlng={e.latlng} onSearch={(originName, destName) => {
                    onMapAction({ latlng: e.latlng, name: destName });
                    mapRef.current?.closePopup();
                }} originName={origin?.name}/>);

                L.popup({ minWidth: 320 })
                    .setLatLng(e.latlng)
                    .setContent(container)
                    .openOn(mapRef.current!);
            });
        }

        // Cleanup function to remove the map instance
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Only run this effect once on mount

    // Effect to update map view when center or zoom changes
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(center, zoom);
        }
    }, [center, zoom]);
    
    // Effect to update tile layer on theme change
     useEffect(() => {
        if (mapRef.current) {
            mapRef.current.eachLayer((layer) => {
                if (layer instanceof L.TileLayer) {
                    layer.setUrl(tileLayerUrl);
                }
            });
        }
    }, [tileLayerUrl]);

    // Effect to handle markers and route line
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
        
        // Handle Origin Marker
        if (origin) {
            if (!originMarkerRef.current) {
                originMarkerRef.current = L.marker(origin, { icon: originIcon }).addTo(map);
            } else {
                originMarkerRef.current.setLatLng(origin);
            }
            originMarkerRef.current.bindPopup(`<b>Punto de Origen</b><br/>${origin.name}`).openPopup();
        } else if(originMarkerRef.current) {
             map.removeLayer(originMarkerRef.current);
             originMarkerRef.current = null;
        }

        // Handle Destination Marker
        if (destination) {
            if (!destinationMarkerRef.current) {
                destinationMarkerRef.current = L.marker(destination, { icon: destinationIcon }).addTo(map);
            } else {
                destinationMarkerRef.current.setLatLng(destination);
            }
             destinationMarkerRef.current.bindPopup(`<b>Punto de Destino</b><br/>${destination.name}`).openPopup();
        } else if (destinationMarkerRef.current) {
            map.removeLayer(destinationMarkerRef.current);
            destinationMarkerRef.current = null;
        }

        // Handle Route Line
        if (antPathRef.current) {
            map.removeLayer(antPathRef.current);
            antPathRef.current = null;
        }

        if (origin && destination) {
            const latLngs = [[origin.lat, origin.lng], [destination.lat, destination.lng]];
            antPathRef.current = (L as any).polyline.antPath(latLngs, {
                delay: 800,
                dashArray: [10, 20],
                weight: 5,
                color: '#42a5f5',
                pulseColor: '#FFFFFF',
            });
            antPathRef.current.addTo(map);
            map.fitBounds(L.latLngBounds(latLngs), { padding: [50, 50] });
        }
    }, [origin, destination, mapRef.current]);

    return (
        <div ref={mapContainerRef} className="w-full h-full" />
    );
};

export default MapComponent;
