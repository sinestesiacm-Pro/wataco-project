'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BedDouble } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from './ui/card';

const hotelsByCategory = {
  "Hoteles": [
    { name: 'Boutique Hotel en el Centro Histórico', city: 'Cuzco, Perú', price: '120', image: 'https://images.unsplash.com/photo-1687677929096-e55dd0bb17f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxib3V0aXF1ZSUyMGhvdGVsJTIwaGlzdG9yaWNhbHxlbnwwfHx8fDE3NTIwODMwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'boutique hotel historical' },
    { name: 'Hotel de Lujo con Vistas al Mar', city: 'Cancún, México', price: '250', image: 'https://images.unsplash.com/photo-1669123548650-0e0200ef47f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxsdXh1cnklMjBob3RlbCUyMG9jZWFufGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury hotel ocean' },
    { name: 'Hotel Urbano con Estilo', city: 'Bogotá, Colombia', price: '110', image: 'https://images.unsplash.com/photo-1594904578869-c011783103c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwaG90ZWwlMjBsb2JieXxlbnwwfHx8fDE3NTIzOTY4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'stylish hotel lobby' },
    { name: 'Hotel Clásico y Elegante', city: 'Buenos Aires, Argentina', price: '140', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MHx8fHwxNzUyMDI4OTg4fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'luxury hotel room' },
  ],
  "Resorts": [
    { name: 'Resort Todo Incluido Familiar', city: 'Punta Cana, R. Dominicana', price: '300', image: 'https://images.unsplash.com/photo-1623718649591-311775a30c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyZXNvcnQlMjBwb29sfGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'resort pool' },
    { name: 'Eco-Resort en la Selva', city: 'La Fortuna, Costa Rica', price: '220', image: 'https://images.unsplash.com/photo-1576631452296-5a8155960413?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlY28lMjByZXNvcnQlMjBqdW5nbGV8ZW58MHx8fHwxNzUyMzk2ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'eco resort jungle' },
    { name: 'Resort de Playa y Golf', city: 'Los Cabos, México', price: '350', image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGdvbGYlMjByZXNvcnR8ZW58MHx8fHwxNzUyMzk2ODcwfDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'beach golf resort' },
    { name: 'Resort de Montaña y Spa', city: 'Bariloche, Argentina', price: '280', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbb563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNwYSUyMHJlc29ydHxlbnwwfHx8fDE3NTIzOTY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'mountain spa resort' },
  ],
  "Apartamentos": [
    { name: 'Apartamento Moderno con Terraza', city: 'Medellín, Colombia', price: '90', image: 'https://images.unsplash.com/photo-1732998139753-b19877e0c181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjaXR5fGVufDB8fHx8MTc1MjA4MzA2NXww&ixlib=rb-4.1.0&q=80&w=1080', hint: 'modern apartment city' },
    { name: 'Cabaña Rústica en el Bosque', city: 'Bariloche, Argentina', price: '150', image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBjYWJpbnxlbnwwfHx8fDE3NTIxNjkzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'forest cabin' },
    { name: 'Loft en Distrito de Arte', city: 'Miami, USA', price: '180', image: 'https://images.unsplash.com/photo-1573760464283-3ba64302271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcnQlMjBkaXN0cmljdCUyMGxvZnR8ZW58MHx8fHwxNzUyMTY5MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'art district loft' },
    { name: 'Apartamento con Vista a la Ciudad', city: 'Santiago, Chile', price: '100', image: 'https://images.unsplash.com/photo-1511963039483-c8c419fa95db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhcGFydG1lbnQlMjBjaXR5JTIwdmlld3xlbnwwfHx8fDE3NTIxNjkzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080', hint: 'apartment city view' },
  ]
};

const HotelCard = ({ hotel }: { hotel: typeof hotelsByCategory.Hoteles[0] }) => (
    <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white/10 backdrop-blur-md border-0 flex flex-col w-full">
        <div className="overflow-hidden relative h-80 rounded-2xl">
          <Image src={hotel.image} data-ai-hint={hotel.hint} alt={hotel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
           <div className="absolute bottom-4 left-4 right-4">
             <h3 className="text-xl font-bold font-headline text-white">{hotel.name}</h3>
             <p className="text-sm text-white/80">{hotel.city}</p>
             <div className="flex items-center justify-between mt-4">
                 <p className="text-sm text-white/90 font-body">
                    Desde <span className="font-bold text-lg text-tertiary">${hotel.price}</span>/noche
                </p>
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white rounded-full">
                    <BedDouble className="mr-1.5 h-4 w-4" />
                    Ver Hotel
                </Button>
             </div>
          </div>
        </div>
    </Card>
);


export function RecommendedHotels() {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-white">Estancias Populares que te Encantarán</h2>
        <p className="text-white/80 mt-2">Hoteles con excelentes valoraciones para una experiencia única.</p>
      </div>

       <Tabs defaultValue="Hoteles" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto bg-black/20 backdrop-blur-sm border border-white/10">
            {Object.keys(hotelsByCategory).map(category => (
                 <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
        </TabsList>
        
        {Object.entries(hotelsByCategory).map(([category, hotels]) => (
            <TabsContent key={category} value={category} className="data-[state=active]:animate-in data-[state=active]:fade-in-50 duration-500">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                    {hotels.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
