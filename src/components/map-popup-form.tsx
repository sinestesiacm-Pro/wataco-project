
'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays } from 'date-fns';
import L from 'leaflet';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar as CalendarIcon, Users, Plane, Minus, Plus } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface MapPopupFormProps {
    latlng: L.LatLng;
    onSearch: (originName: string, destName: string) => void;
    originName?: string;
}

export function MapPopupForm({ latlng, onSearch, originName }: MapPopupFormProps) {
    const router = useRouter();
    const isMobile = useIsMobile();
    const { toast } = useToast();
    const [originQuery, setOriginQuery] = useState(originName || '');
    const [destinationQuery, setDestinationQuery] = useState(`Lat: ${latlng.lat.toFixed(4)}, Lng: ${latlng.lng.toFixed(4)}`);
    const [date, setDate] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 7) });
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const totalTravelers = useMemo(() => adults + children, [adults, children]);
    const travelerText = useMemo(() => `${totalTravelers} pasajero${totalTravelers > 1 ? 's' : ''}`, [totalTravelers]);

    const handleSearch = () => {
        if (!originQuery || !destinationQuery || !date?.from || !date.to) {
            toast({
                title: "Información Incompleta",
                description: "Por favor, completa todos los campos para buscar vuelos.",
                variant: "destructive"
            });
            return;
        }

        const params = new URLSearchParams({
            origin: originQuery, // Assuming query is IATA or city name for simplicity
            destination: destinationQuery,
            departureDate: format(date.from, 'yyyy-MM-dd'),
            returnDate: format(date.to, 'yyyy-MM-dd'),
            adults: adults.toString(),
            children: children.toString(),
            originQuery: originQuery,
            destinationQuery: destinationQuery,
        });

        router.push(`/flights/select?${params.toString()}`);
    };

    return (
        <div className="w-full space-y-4 font-body">
            <h3 className="font-headline text-lg font-semibold">Planifica tu Vuelo</h3>
            <div>
                <Label htmlFor="origin-popup">Origen</Label>
                <Input id="origin-popup" placeholder="Ciudad o aeropuerto" value={originQuery} onChange={(e) => setOriginQuery(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="destination-popup">Destino</Label>
                <Input id="destination-popup" value={destinationQuery} readOnly />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? format(date.from, "LLL d") : "Ida"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={isMobile ? 1 : 2}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                 <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.to ? format(date.to, "LLL d") : "Vuelta"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                         <Calendar
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={isMobile ? 1 : 2}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        {travelerText}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Adultos</Label>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => setAdults(p => Math.max(1, p-1))}><Minus className="h-4 w-4"/></Button>
                                <span>{adults}</span>
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => setAdults(p => p+1)}><Plus className="h-4 w-4"/></Button>
                            </div>
                        </div>
                         <div className="flex items-center justify-between">
                            <Label>Niños</Label>
                             <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => setChildren(p => Math.max(0, p-1))}><Minus className="h-4 w-4"/></Button>
                                <span>{children}</span>
                                <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => setChildren(p => p+1)}><Plus className="h-4 w-4"/></Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <Button onClick={handleSearch} className="w-full">
                <Plane className="mr-2 h-4 w-4" />
                Buscar Vuelos
            </Button>
        </div>
    )
}
