'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { searchAirports } from '@/app/actions';
import type { Airport } from '@/lib/types';

// Fix for default icon path issue with Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


const airportIcon = new L.DivIcon({
    html: `<div class="relative flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full border-2 border-primary"><div class="w-2 h-2 bg-primary rounded-full"></div></div>`,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});


const RecenterAutomatically = ({lat, lng, zoom}: {lat: number, lng: number, zoom: number}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng], zoom);
     }, [lat, lng, zoom, map]);
     return null;
}

export function FlightSearchMap() {
    const { colorTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('New York');
    const [airports, setAirports] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]);
    const [zoom, setZoom] = useState(5);
    
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleSearch = useCallback(async (query: string) => {
        if (query.length < 3) {
            setAirports([]);
            return;
        };
        setLoading(true);
        const result = await searchAirports(query);
        if (result.success && result.data) {
            setAirports(result.data);
            if(result.data.length > 0) {
                // This is a mock lat/lng, in a real app you'd get this from the API
                 setMapCenter([40.7128, -74.0060]); 
                 setZoom(7);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        handleSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, handleSearch])
    
    // In a real app, geocoded coordinates would come from the API. We'll simulate it.
    const airportCoordinates: { [key: string]: [number, number] } = useMemo(() => ({
        'JFK': [40.6413, -73.7781],
        'LGA': [40.7769, -73.8740],
        'EWR': [40.6925, -74.1687],
        'CDG': [49.0097, 2.5479],
        'ORY': [48.7233, 2.3794],
        'NRT': [35.7647, 140.3864],
        'HND': [35.5494, 139.7798],
    }), []);

  return (
    <div className="relative h-[50vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
        <div className="absolute top-4 left-4 z-[1000] w-full max-w-xs">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Busca una ciudad o aeropuerto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 shadow-lg h-12 text-lg"
                />
                 <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {loading ? <Loader2 className="animate-spin text-muted-foreground" /> : <Search className="text-muted-foreground" />}
                </div>
            </div>
        </div>

      <MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
          <RecenterAutomatically lat={mapCenter[0]} lng={mapCenter[1]} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={colorTheme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />
        {airports.map(airport => {
            const pos = airportCoordinates[airport.iataCode];
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
    </div>
  );
}
