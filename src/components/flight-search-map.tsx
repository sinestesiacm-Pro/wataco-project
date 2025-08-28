'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Airport } from '@/lib/types';
import { searchAirports } from '@/app/actions';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from './ui/button';
import { LocateFixed, Plane, Users, Calendar, Minus, Plus } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarComponent } from './ui/calendar';
import { useIsMobile } from '@/hooks/use-mobile';


const AirportMarker = ({ airport, onSelect }: { airport: Airport, onSelect: (airport: Airport) => void }) => {
    if (!airport.geoCode) return null;
    return (
        <AdvancedMarker
            position={{ lat: airport.geoCode.latitude, lng: airport.geoCode.longitude }}
            onClick={() => onSelect(airport)}
            title={airport.name}
        >
            <Pin background={'#007BFF'} glyph={<Plane />} borderColor={'#0056b3'} />
        </AdvancedMarker>
    );
};

const AirportInfoWindow = ({ airport, onClose }: { airport: Airport, onClose: () => void }) => {
    const router = useRouter();
    const isMobile = useIsMobile();
    const [date, setDate] = useState<DateRange | undefined>({ from: addDays(new Date(), 7), to: addDays(new Date(), 14) });
    const [adults, setAdults] = useState(1);
    
    if (!airport.geoCode) return null;

    const handleSearch = () => {
        const params = new URLSearchParams({
            origin: "BOG", // Placeholder origin
            destination: airport.iataCode,
            departureDate: format(date!.from!, 'yyyy-MM-dd'),
            returnDate: format(date!.to!, 'yyyy-MM-dd'),
            adults: adults.toString(),
            originQuery: "Bogotá, Colombia",
            destinationQuery: airport.address?.cityName || airport.name
        });
        router.push(`/flights/select?${params.toString()}`);
    }

    return (
        <InfoWindow
            position={{ lat: airport.geoCode.latitude, lng: airport.geoCode.longitude }}
            onCloseClick={onClose}
        >
            <div className="p-2 space-y-3 font-body w-64 text-gray-800">
                <h3 className="font-bold text-base font-headline">{airport.name} ({airport.iataCode})</h3>
                <p className="text-xs text-gray-600">{airport.address?.cityName}, {airport.address?.countryName}</p>
                
                <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {date?.from && date.to ? `${format(date.from, "dd LLL")} - ${format(date.to, "dd LLL")}` : "Elige tus fechas"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={isMobile ? 1 : 2}
                            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className="w-full justify-start text-left font-normal">
                             <Users className="mr-2 h-4 w-4" />
                             {adults} Adulto{adults > 1 ? 's' : ''}
                        </Button>
                    </PopoverTrigger>
                     <PopoverContent className="w-60">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Adultos</p>
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))}><Minus className="h-4 w-4" /></Button>
                                <span className="font-bold text-lg w-4 text-center">{adults}</span>
                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

                <Button onClick={handleSearch} className="w-full bg-primary hover:bg-primary/90">
                    <Plane className="mr-2 h-4 w-4" />
                    Cotizar Vuelo
                </Button>
            </div>
        </InfoWindow>
    );
};

export function FlightSearchMap() {
    const { toast } = useToast();
    const [mapCenter, setMapCenter] = useState({ lat: 4.60971, lng: -74.08175 }); // Default to Bogotá
    const [zoom, setZoom] = useState(6);
    const [airports, setAirports] = useState<Airport[]>([]);
    const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    
    const debouncedBounds = useDebounce(map?.getBounds(), 800);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (debouncedBounds) {
            searchAirports('airport').then(result => {
                if (result.success && result.data) {
                    const visibleAirports = result.data.filter(a => 
                        a.geoCode && debouncedBounds.contains({lat: a.geoCode.latitude, lng: a.geoCode.longitude})
                    );
                    setAirports(visibleAirports);
                }
            });
        }
    }, [debouncedBounds]);


    const handleGeolocate = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newCenter = { lat: latitude, lng: longitude };
                    setMapCenter(newCenter);
                    if (map) {
                        map.setCenter(newCenter);
                        map.setZoom(12);
                    } else {
                        setZoom(12);
                    }
                    toast({
                        title: "Ubicación Encontrada",
                        description: "Mostrando aeropuertos cercanos a ti.",
                        variant: "success",
                    });
                },
                () => {
                    toast({
                        title: "Error de Geolocalización",
                        description: "No se pudo obtener tu ubicación. Mostrando ubicación predeterminada.",
                        variant: "destructive",
                    });
                }
            );
        } else {
             toast({
                title: "Geolocalización no Soportada",
                description: "Tu navegador no soporta la geolocalización.",
                variant: "destructive",
            });
        }
    }, [toast, map]);

    if (!apiKey) {
        return (
            <div className="h-[60vh] md:h-[70vh] w-full rounded-2xl bg-muted flex items-center justify-center text-center p-4">
                <p>La clave API de Google Maps no está configurada. Por favor, añade `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` a tu fichero `.env` para habilitar el mapa.</p>
            </div>
        );
    }

    return (
        <div className="relative h-[60vh] md:h-[70vh] w-full rounded-2xl overflow-hidden border-2 border-primary/20">
            <APIProvider apiKey={apiKey}>
                <Map
                    ref={setMap}
                    center={mapCenter}
                    zoom={zoom}
                    mapId="orvian-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {airports.map(airport => (
                        <AirportMarker key={airport.iataCode} airport={airport} onSelect={setSelectedAirport} />
                    ))}

                    {selectedAirport && (
                       <AirportInfoWindow airport={selectedAirport} onClose={() => setSelectedAirport(null)} />
                    )}

                </Map>
            </APIProvider>
            <div className="absolute top-4 right-4 z-10">
                 <Button
                    size="lg"
                    className="shadow-lg rounded-full h-12 w-12 p-0 bg-white/30 backdrop-blur-md text-white hover:bg-white/50"
                    onClick={handleGeolocate}
                >
                    <LocateFixed className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}

export default FlightSearchMap;
