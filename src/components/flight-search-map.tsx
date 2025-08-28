'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { mapStyles } from '@/lib/map-styles';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';
import { addDays, format } from 'date-fns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from './ui/sheet';
import { CalendarIcon, Users, Minus, Plus, Plane, Navigation, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

const popularDestinations = [
  { name: 'París', iata: 'CDG', position: { lat: 48.8566, lng: 2.3522 } },
  { name: 'Tokio', iata: 'HND', position: { lat: 35.6895, lng: 139.6917 } },
  { name: 'Roma', iata: 'FCO', position: { lat: 41.9028, lng: 12.4964 } },
  { name: 'Nueva York', iata: 'JFK', position: { lat: 40.7128, lng: -74.0060 } },
  { name: 'Londres', iata: 'LHR', position: { lat: 51.5074, lng: -0.1278 } },
  { name: 'Bangkok', iata: 'BKK', position: { lat: 13.7563, lng: 100.5018 } },
  { name: 'Cancún', iata: 'CUN', position: { lat: 21.1619, lng: -86.8515 } },
  { name: 'Sídney', iata: 'SYD', position: { lat: -33.8688, lng: 151.2093 } },
  { name: 'Estambul', iata: 'IST', position: { lat: 41.0082, lng: 28.9784 } },
  { name: 'Dubái', iata: 'DXB', position: { lat: 25.2048, lng: 55.2708 } },
  { name: 'Singapur', iata: 'SIN', position: { lat: 1.3521, lng: 103.8198 } },
  { name: 'Río de Janeiro', iata: 'GIG', position: { lat: -22.9068, lng: -43.1729 } },
];

const nearbyAirports = [
    { name: 'John F. Kennedy Intl', iata: 'JFK', position: { lat: 40.6413, lng: -73.7781 } },
    { name: 'LaGuardia Airport', iata: 'LGA', position: { lat: 40.7769, lng: -73.8740 } },
    { name: 'Newark Liberty Intl', iata: 'EWR', position: { lat: 40.6925, lng: -74.1687 } },
]

type Destination = typeof popularDestinations[0];

export function FlightSearchMap({ apiKey }: { apiKey?: string }) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { colorTheme } = useTheme();

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 25, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2.5);

  const [showNearbyAirports, setShowNearbyAirports] = useState(false);
  const [origin, setOrigin] = useState<Destination | null>(null);

  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 7),
    to: addDays(new Date(), 14),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const handleMarkerClick = useCallback((destination: Destination) => {
    setSelectedDestination(destination);
  }, []);

  const handleGeolocate = useCallback(() => {
    setMapCenter({ lat: 40.7128, lng: -74.0060 }); // Simulate geolocating to NYC
    setMapZoom(9);
    setShowNearbyAirports(true);
    setOrigin({name: 'Nueva York', iata: 'NYC', position: { lat: 40.7128, lng: -74.0060 }});
  }, []);

  const handleSearch = () => {
    if (!origin || !selectedDestination || !date?.from) return;
    const query = new URLSearchParams({
        origin: origin.iata,
        destination: selectedDestination.iata,
        departureDate: format(date.from, 'yyyy-MM-dd'),
        adults: (adults + children).toString(),
        originQuery: origin.name,
        destinationQuery: selectedDestination.name,
        ...(date.to && { returnDate: format(date.to, 'yyyy-MM-dd') }),
    });
    router.push(`/flights/select?${query.toString()}`);
  }

  const totalTravelers = useMemo(() => adults + children, [adults, children]);
  const travelerText = useMemo(() => `${totalTravelers} pasajero${totalTravelers > 1 ? 's' : ''}`, [totalTravelers]);

  if (!apiKey) {
    return (
        <div className="relative h-[60vh] max-h-[500px] w-full rounded-2xl border border-destructive/50 bg-destructive/10 flex flex-col items-center justify-center text-center p-4">
            <h3 className="font-bold text-destructive-foreground">Error de Configuración del Mapa</h3>
            <p className="text-sm text-destructive-foreground/80 mt-2">
                La clave API de Google Maps no se ha proporcionado. Por favor, añade <code className="bg-destructive/20 p-1 rounded-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> a tu archivo .env.
            </p>
        </div>
    )
  }

  return (
    <div className="relative">
      <div className="relative h-[60vh] max-h-[500px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-inner">
        <APIProvider 
            apiKey={apiKey} 
            onLoadingFailure={(error) => (
             <div className="absolute inset-0 bg-destructive/10 flex flex-col items-center justify-center text-center p-4">
                <h3 className="font-bold text-destructive-foreground">Error al Cargar el Mapa</h3>
                <p className="text-sm text-destructive-foreground/80 mt-2 max-w-md">
                   { (error as any).message.includes('BillingNotEnabledMapError')
                   ? 'La facturación no está habilitada para tu proyecto de Google Cloud. Por favor, actívala en la consola para usar el mapa.'
                   : 'No se pudo cargar Google Maps. Por favor, verifica tu clave de API y la configuración de tu proyecto.'
                   }
                </p>
             </div>
        )}>
            <Map
                center={mapCenter}
                zoom={mapZoom}
                mapId="orvian_map"
                styles={mapStyles}
                disableDefaultUI={true}
                gestureHandling={'greedy'}
            >
                {popularDestinations.map((dest) => (
                    <AdvancedMarker key={dest.iata} position={dest.position} onClick={() => handleMarkerClick(dest)}>
                       <Pin 
                            background={selectedDestination?.iata === dest.iata ? '#FF9800' : '#1C88FF'}
                            glyphColor="#fff"
                            borderColor={selectedDestination?.iata === dest.iata ? '#fff' : '#1C88FF'}
                       />
                    </AdvancedMarker>
                ))}
                 {showNearbyAirports && nearbyAirports.map(airport => (
                    <AdvancedMarker key={airport.iata} position={airport.position} onClick={() => setOrigin(airport)}>
                        <Pin background={'#4CAF50'} glyph={<Plane className="text-white"/>} borderColor={'#fff'} />
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
      </div>

       <Button onClick={handleGeolocate} variant="secondary" className="absolute top-3 left-3 z-10 shadow-lg">
            <Navigation className="mr-2 h-4 w-4" /> Usar mi ubicación
        </Button>

      <Sheet open={!!selectedDestination} onOpenChange={(isOpen) => !isOpen && setSelectedDestination(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl bg-white/20 backdrop-blur-xl border-t-white/30 text-white">
          <SheetHeader>
            <SheetTitle className="font-headline text-2xl text-white">Vuelo a {selectedDestination?.name}</SheetTitle>
            <SheetDescription className="text-white/80">
              Selecciona las fechas y pasajeros para tu viaje.
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={() => setSelectedDestination(null)}><X className="h-5 w-5"/></Button>
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-black/20 hover:bg-black/30 rounded-2xl">
                        <div className="flex items-center w-full">
                            <CalendarIcon className="h-6 w-6 mr-4" />
                            <div className="truncate">
                                <p className="text-xs text-white/70">Fechas</p>
                                <p className="text-base md:text-lg font-semibold truncate">
                                    {date?.from && date.to ? `${format(date.from, "dd LLL")} - ${format(date.to, "dd LLL")}` : "Elige tus fechas"}
                                </p>
                            </div>
                        </div>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 max-h-[80vh] overflow-y-auto" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={isMobile ? 1 : 2}
                            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                        <div className="p-2 border-t md:hidden">
                            <Button className="w-full" onClick={() => setIsCalendarOpen(false)}>Listo</Button>
                        </div>
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" className="w-full h-auto p-4 justify-start text-left bg-black/20 hover:bg-black/30 rounded-2xl">
                        <div className="flex items-center w-full">
                            <Users className="h-6 w-6 mr-4" />
                            <div>
                                <p className="text-xs text-white/70">Pasajeros</p>
                                <p className="text-base md:text-lg font-semibold">{travelerText}</p>
                            </div>
                        </div>
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)]" align="start">
                        <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Pasajeros</h4>
                        </div>
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <p className="font-medium">Adultos</p>
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}><Minus className="h-4 w-4" /></Button>
                                    <span className="font-bold text-lg w-4 text-center">{adults}</span>
                                    <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)} disabled={totalTravelers >= 8}><Plus className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="font-medium">Niños</p>
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}><Minus className="h-4 w-4" /></Button>
                                    <span className="font-bold text-lg w-4 text-center">{children}</span>
                                    <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => v + 1)} disabled={totalTravelers >= 8}><Plus className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </PopoverContent>
                </Popover>
             </div>
          </div>
          <SheetFooter>
            <Button size="lg" className="w-full font-bold" onClick={handleSearch}>
                <Plane className="mr-2 h-5 w-5" />
                Buscar Vuelos
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
