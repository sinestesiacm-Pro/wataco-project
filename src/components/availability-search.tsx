'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Users, Minus, Plus, BedDouble, Baby } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';

interface AvailabilitySearchProps {
    onSearch: (data: { checkInDate: Date, checkOutDate: Date, adults: number, children: number }) => void;
    initialData: {
        checkInDate: Date;
        checkOutDate: Date;
        adults: number;
        children: number;
    }
}

export function AvailabilitySearch({ onSearch, initialData }: AvailabilitySearchProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: initialData.checkInDate,
        to: initialData.checkOutDate,
    });
    const [adults, setAdults] = useState(initialData.adults);
    const [children, setChildren] = useState(initialData.children);

    const handleSearchClick = () => {
        if (date?.from && date?.to) {
            onSearch({
                checkInDate: date.from,
                checkOutDate: date.to,
                adults,
                children,
            });
        }
    };
    
    const totalGuests = adults + children;
    const travelerText = `${totalGuests} huésped${totalGuests > 1 ? 'es' : ''}`;

    return (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader>
                <CardTitle className="text-white font-headline text-2xl">Consultar Disponibilidad y Precios</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    {/* Date Picker */}
                    <div className="md:col-span-1">
                        <label className="text-white/80 text-sm font-semibold mb-2 block">Fechas</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal bg-black/20 text-white border-white/30 hover:bg-black/30 hover:text-white">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date?.from ? (
                                        date.to ? (
                                            <>
                                                {format(date.from, "d LLL, yy", {locale: es})} - {format(date.to, "d LLL, yy", {locale: es})}
                                            </>
                                        ) : (
                                            format(date.from, "d LLL, yy", {locale: es})
                                        )
                                    ) : (
                                        <span>Elige tus fechas</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                                    locale={es}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Guest Picker */}
                    <div className="md:col-span-1">
                         <label className="text-white/80 text-sm font-semibold mb-2 block">Huéspedes</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal bg-black/20 text-white border-white/30 hover:bg-black/30 hover:text-white">
                                    <Users className="mr-2 h-4 w-4" />
                                    {travelerText}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Huéspedes</h4>
                                        <p className="text-sm text-muted-foreground">Selecciona el número de huéspedes.</p>
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium">Adultos</p>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => Math.max(1, v - 1))} disabled={adults <= 1}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-lg w-4 text-center">{adults}</span>
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setAdults(v => v + 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2"><Baby className="h-5 w-5" /><p className="font-medium">Niños</p></div>
                                            <div className="flex items-center gap-2">
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => Math.max(0, v - 1))} disabled={children <= 0}><Minus className="h-4 w-4" /></Button>
                                                <span className="font-bold text-lg w-4 text-center">{children}</span>
                                                <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => setChildren(v => v + 1)}><Plus className="h-4 w-4" /></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search Button */}
                    <div className="md:col-span-1">
                        <Button size="lg" className="w-full bg-success hover:bg-success/90" onClick={handleSearchClick}>
                            <BedDouble className="mr-2 h-5 w-5" />
                            Buscar
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
