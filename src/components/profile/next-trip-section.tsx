'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Calendar, FileText, Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const mockNextTrip = {
  destination: "París, Francia",
  image: "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1Mzg3MzI5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  startDate: "2024-09-24T00:00:00.000Z",
  endDate: "2024-09-30T00:00:00.000Z",
  type: "Vuelo + Hotel",
  flight: {
    number: "AV123",
    departure: "BOG 08:00",
    arrival: "CDG 22:00",
  },
  hotel: {
    name: "Hotel Rivoli",
    address: "44 Rue de Rivoli, 75004 Paris",
  },
  activities: ["Tour a la Torre Eiffel", "Crucero por el Sena"],
};

export function NextTripSection() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(mockNextTrip.startDate) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 60000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, []);

    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        const month = startDate.toLocaleString('es-ES', { month: 'long' });
        return `${startDay} - ${endDay} ${month}`;
    }

  return (
    <div className="space-y-6">
        {/* Main Card */}
        <Card className="bg-black/20 backdrop-blur-xl border-none text-white relative overflow-hidden shadow-lg h-full flex flex-col">
             <div className="absolute inset-0">
                <Image src={mockNextTrip.image} data-ai-hint="paris eiffel tower" alt={mockNextTrip.destination} fill className="object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative flex flex-col h-full">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-white drop-shadow-lg">{mockNextTrip.destination}</CardTitle>
                    <p className="text-white/80 drop-shadow-md">{formatDateRange(mockNextTrip.startDate, mockNextTrip.endDate)}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                   <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
                     <p className="text-sm text-white/70 mb-2">Información Clave:</p>
                     <div className="space-y-3">
                        <div className="flex items-start gap-3">
                           <Plane className="h-5 w-5 mt-1 text-primary" />
                           <div>
                             <p className="font-semibold">{mockNextTrip.flight.number}</p>
                             <p className="text-xs text-white/70">{mockNextTrip.flight.departure} -> {mockNextTrip.flight.arrival}</p>
                           </div>
                        </div>
                         <div className="flex items-start gap-3">
                           <Hotel className="h-5 w-5 mt-1 text-primary" />
                           <div>
                             <p className="font-semibold">{mockNextTrip.hotel.name}</p>
                             <p className="text-xs text-white/70">{mockNextTrip.hotel.address}</p>
                           </div>
                        </div>
                     </div>
                   </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center mt-auto">
                    <p className="text-sm font-semibold bg-primary/20 text-primary px-3 py-1 rounded-full">{mockNextTrip.type}</p>
                    <Button>Ver Detalles</Button>
                </CardFooter>
            </div>
        </Card>

        {/* Countdown Card */}
        <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-headline">
                    <Calendar className="h-5 w-5 text-primary"/>
                    Cuenta Regresiva
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around items-baseline text-center">
                <div>
                    <p className="text-4xl font-bold">{timeLeft.days}</p>
                    <p className="text-xs text-white/70">días</p>
                </div>
                <div>
                    <p className="text-4xl font-bold">{timeLeft.hours}</p>
                    <p className="text-xs text-white/70">horas</p>
                </div>
                 <div>
                    <p className="text-4xl font-bold">{timeLeft.minutes}</p>
                    <p className="text-xs text-white/70">min</p>
                </div>
            </CardContent>
        </Card>

        {/* Documents Card */}
        <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-headline">
                    <FileText className="h-5 w-5 text-primary"/>
                    Documentos
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <Button variant="outline" className="w-full justify-start bg-transparent border-white/30 hover:bg-white/10 text-white">
                    <Download className="mr-2 h-4 w-4"/> Ver E-tickets
               </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent border-white/30 hover:bg-white/10 text-white">
                    <Download className="mr-2 h-4 w-4"/> Ver Confirmación de Hotel
               </Button>
            </CardContent>
        </Card>
    </div>
  );
}
