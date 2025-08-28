'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import L from 'leaflet';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { searchAirports } from '@/app/actions';
import type { Airport } from '@/lib/types';
import 'leaflet/dist/leaflet.css';
import MapComponent from './map-component';


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


export function FlightSearchMap() {
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
                 const firstAirport = result.data[0];
                 if (firstAirport?.address?.cityName) {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${firstAirport.address.cityName}&format=json&limit=1`);
                    const geoData = await res.json();
                    if (geoData.length > 0) {
                        setMapCenter([parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)]);
                        setZoom(7);
                    }
                 }
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        handleSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, handleSearch])
    
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
      <MapComponent 
          center={mapCenter} 
          zoom={zoom} 
          airports={airports} 
          airportIcon={airportIcon}
      />
    </div>
  );
}
