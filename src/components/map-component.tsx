'use client';
import React, { useEffect, useRef, memo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-ant-path';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
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

const MapComponent = ({ center, zoom, onMapAction, onViewChanged, origin, destination, airports, children }: MapComponentProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const antPathRef = useRef<L.Polyline.AntPath | null>(null);
    const originMarkerRef = useRef<L.Marker | null>(null);
    const destinationMarkerRef = useRef<L.Marker | null>(null);
    const airportMarkersRef = useRef<L.LayerGroup | null>(null);
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

            mapRef.current.on('moveend', () => {
                if (mapRef.current) {
                    const newCenter = mapRef.current.getCenter();
                    const newZoom = mapRef.current.getZoom();
                    const newBounds = mapRef.current.getBounds();
                    onViewChanged([newCenter.lat, newCenter.lng], newZoom, newBounds);
                }
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

    // Update view
    useEffect(() => {
        if (mapRef.current && (mapRef.current.getCenter().lat !== center[0] || mapRef.current.getCenter().lng !== center[1] || mapRef.current.getZoom() !== zoom)) {
            mapRef.current.setView(center, zoom);
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


    // Update origin/destination markers
     useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        if (origin) {
            if (!originMarkerRef.current) {
                originMarkerRef.current = L.marker(origin, { icon: originIcon }).addTo(map);
            } else {
                originMarkerRef.current.setLatLng(origin);
            }
        } else if (originMarkerRef.current) {
            map.removeLayer(originMarkerRef.current);
            originMarkerRef.current = null;
        }

        if (destination) {
            if (!destinationMarkerRef.current) {
                destinationMarkerRef.current = L.marker(destination, { icon: destinationIcon }).addTo(map);
            } else {
                destinationMarkerRef.current.setLatLng(destination);
            }
        } else if (destinationMarkerRef.current) {
            map.removeLayer(destinationMarkerRef.current);
            destinationMarkerRef.current = null;
        }
    }, [origin, destination]);
    
     // Update airport markers
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;
    
        if (airportMarkersRef.current) {
            map.removeLayer(airportMarkersRef.current);
        }
        
        const clusterGroup = L.markerClusterGroup();
        
        airports.forEach(airport => {
            // Airport locations are not available in the provided data.
            // We'll skip adding them to the map for now.
        });
        
        airportMarkersRef.current = clusterGroup;
        map.addLayer(airportMarkersRef.current);

    }, [airports]);


    return (
        <div ref={mapContainerRef} className="w-full h-full" />
    );
};

export default memo(MapComponent);
