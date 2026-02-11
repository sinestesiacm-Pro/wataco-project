'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, CheckCircle, Clock, XCircle, Plane, BedDouble, Ship, Zap } from "lucide-react";
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mockBookings = {
  upcoming: [
    { id: 'up1', type: 'Vuelo + Hotel', destination: 'París, Francia', date: '24 Sep - 30 Sep', status: 'Confirmado', price: '2500', image: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=500', icon: Plane },
  ],
  past: [
    { id: 'pa1', type: 'Hotel', destination: 'The Grand Resort, Miami', date: '15 Jul - 20 Jul', status: 'Completado', price: '2375', image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500', icon: BedDouble },
    { id: 'pa2', type: 'Crucero', destination: 'Sueño del Caribe', date: '01 Feb - 08 Feb', status: 'Completado', price: '1960', image: 'https://images.unsplash.com/photo-1620789439137-23451b68e0e6?w=500', icon: Ship },
  ],
  cancelled: [
     { id: 'ca1', type: 'Actividad', destination: 'Tour por la Ciudad Histórica', date: '10 May', status: 'Cancelado', price: '50', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500', icon: Zap },
  ],
};

const statusConfig = {
  Confirmado: { icon: CheckCircle, color: 'bg-green-500' },
  Completado: { icon: CheckCircle, color: 'bg-blue-500' },
  Cancelado: { icon: XCircle, color: 'bg-red-500' },
  Pendiente: { icon: Clock, color: 'bg-yellow-500' },
};

const BookingCard = ({ booking }: { booking: typeof mockBookings.upcoming[0] }) => {
  const { icon: StatusIcon, color } = statusConfig[booking.status as keyof typeof statusConfig] || { icon: Clock, color: 'bg-gray-500' };
  
  return (
    <Card className="bg-black/30 border-white/20 text-white overflow-hidden flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-1/4 h-32 sm:h-auto flex-shrink-0">
        <Image src={booking.image} alt={booking.destination} fill className="object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex-grow mb-4 sm:mb-0">
          <Badge variant="secondary" className="mb-2 bg-white/20 border-none gap-2"><booking.icon className="h-3 w-3" /> {booking.type}</Badge>
          <h3 className="font-bold text-lg">{booking.destination}</h3>
          <p className="text-sm text-white/70">{booking.date}</p>
          <div className="flex items-center gap-2 mt-2 text-sm">
            <StatusIcon className={`h-4 w-4 ${color.replace('bg-', 'text-')}`} />
            <span>{booking.status}</span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
            <div>
              <p className="text-xs text-white/70">Total</p>
              <p className="font-bold text-2xl">${booking.price}</p>
            </div>
          <div className="flex gap-2">
            {booking.status !== 'Completado' && booking.status !== 'Cancelado' && <Button variant="outline" size="sm" className="bg-transparent border-white/30 hover:bg-white/10">Cancelar</Button>}
            <Button size="sm">Ver Detalles</Button>
          </div>
        </div>
      </div>
    </Card>
  )
};

export function BookingsSection() {
  return (
    <Card className="bg-black/20 backdrop-blur-xl border-none text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
          <Book className="h-6 w-6" />
          <span>Mis Reservas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 text-white/70">
            <TabsTrigger value="upcoming">Próximas</TabsTrigger>
            <TabsTrigger value="past">Pasadas</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-6 space-y-4">
            {mockBookings.upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
          </TabsContent>
          <TabsContent value="past" className="mt-6 space-y-4">
             {mockBookings.past.map(b => <BookingCard key={b.id} booking={b} />)}
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6 space-y-4">
             {mockBookings.cancelled.map(b => <BookingCard key={b.id} booking={b} />)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
