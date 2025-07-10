
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Globe } from 'lucide-react';

const destinationsByContinent = {
  "Europa": [
    { city: "Roma", country: "Italia", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1663143050642-69240b347b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxyb21lJTIwY29sb3NzZXVtfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Lisboa", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1590941761838-60179f0ed248?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsaXNib24lMjB0cmFtfGVufDB8fHx8MTc1MjE1NDA2OHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "París", country: "Francia", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1730993175478-b634849f6536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDB8fHx8MTc1MjA2MjA4NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Ámsterdam", country: "Países Bajos", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1632463786665-b35954f9cc1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxhbXN0ZXJkYW0lMjBjYW5hbHN8ZW58MHx8fHwxNzUyMDYyMDg0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Norteamérica": [
    { city: "Nueva York", country: "EE.UU.", priceFrom: "350", iata: "JFK", hint: "new york city", image: "https://images.unsplash.com/photo-1546436836-07a91091f160?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxuZXclMjB5b3JrJTIwY2l0eXxlbnwwfHx8fDE3NTI0NjQwODV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Cancún", country: "México", priceFrom: "280", iata: "CUN", hint: "cancun beach", image: "https://images.unsplash.com/photo-1589407682973-83a3111d35a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYW5jdW4lMjBiZWFjaHxlbnwwfHx8fDE3NTI0NjQwODV8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Vancouver", country: "Canadá", priceFrom: "420", iata: "YVR", hint: "vancouver mountains", image: "https://images.unsplash.com/photo-1594830849339-a9a7a0a03379?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBzaGlwfGVufDB8fHx8MTc1MjE1NzI4MHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Los Ángeles", country: "EE.UU.", priceFrom: "380", iata: "LAX", hint: "los angeles", image: "https://images.unsplash.com/photo-1542314831-068cd1dbb563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHNwYSUyMHJlc29ydHxlbnwwfHx8fDE3NTIzOTY4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "América del Sur": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1680579178966-8019436998e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ0YWdlbmElMjBjb2xvbWJpYXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1672588371953-2accc9eb0d01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxidWVub3MlMjBhaXJlcyUyMG9iZWxpc2NvfGVufDB8fHx8MTc1MjA2NzgwMHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Machu Picchu", country: "Perú", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1703568092973-4192b759ed00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYWNodSUyMHBpY2NodXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Río de Janeiro", country: "Brasil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxyaW8lMjBkZSUyMGphbmVpcm98ZW58MHx8fHwxNzUyMDY3ODAwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "Asia": [
    { city: "Tokio", country: "Japón", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1611125162305-ea7550c59dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx0b2t5byUyMHN0cmVldHxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Bangkok", country: "Tailandia", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1691089185062-db320716e48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxiYW5na29rJTIwdGVtcGxlfGVufDB8fHx8MTc1MjA2NzgwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Seúl", country: "Corea del Sur", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1601710124519-705a3571e43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzZW91bCUyMHBhbGFjZXxlbnwwfHx8fDE3NTIwNjc4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Singapur", country: "Singapur", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1686455746257-7f063846e3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzaW5nYXBvcmUlMjBtYXJpbmElMjBiYXl8ZW58MHx8fHwxNzUyMDY3ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  "África": [
    { city: "Marrakech", country: "Marruecos", priceFrom: "180", iata: "RAK", hint: "marrakech market", image: "https://images.unsplash.com/photo-1588675701631-7bc33367b165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYXJyYWtlY2glMjBtYXJrZXR8ZW58MHx8fHwxNzUyNDY0MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "El Cairo", country: "Egipto", priceFrom: "250", iata: "CAI", hint: "cairo pyramids", image: "https://images.unsplash.com/photo-1569033429699-d459a98b488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYWlybyUyMHB5cmFtaWRzfGVufDB8fHx8fDE3NTI0NjQxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Ciudad del Cabo", country: "Sudáfrica", priceFrom: "650", iata: "CPT", hint: "cape town", image: "https://images.unsplash.com/photo-1576483649514-c2153579571f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXBlJTIwdG93bnxlbnwwfHx8fDE3NTI0NjQxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { city: "Zanzíbar", country: "Tanzania", priceFrom: "720", iata: "ZNZ", hint: "zanzibar beach", image: "https://images.unsplash.com/photo-1610212586414-9272667520c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxaYW56aWJhciUyMGJlYWNofGVufDB8fHx8fDE3NTI0NjQxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
};

const DestinationWindow = ({ dest, onClick }: { dest: typeof destinationsByContinent.Europa[0], onClick: () => void }) => (
    <div
        className="flex-shrink-0 w-[280px]"
        onClick={onClick}
    >
        <div className="airplane-window animate-in fade-in slide-in-from-bottom-5 duration-500">
             <div className="airplane-window-inner-bevel">
                <div className="airplane-window-view">
                    <Image
                        src={dest.image}
                        data-ai-hint={dest.hint}
                        alt={dest.city}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="airplane-window-shade" />
                    <div className="airplane-window-content">
                        <div>
                        <h3 className="text-2xl font-bold font-headline text-white">{dest.city}</h3>
                        <p className="text-sm text-white/80 -mt-1">{dest.country}</p>
                        </div>
                        <div className="flex justify-between items-end w-full mt-4">
                            <p className="text-sm text-white/90 font-body">
                                Desde <span className="font-bold text-xl text-tertiary">${dest.priceFrom}</span>
                            </p>
                            <Button 
                                size="sm" 
                                variant="secondary"
                                className="bg-white/20 hover:bg-white/30 text-white rounded-full pointer-events-none text-xs"
                            >
                                Ver Vuelos
                                <ArrowRight className="ml-1.5 h-3 w-3" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export function RecommendedDestinations() {
  const handleDestinationClick = (dest: { iata: string; city: string; country: string }) => {
    // This function can be used for analytics or other client-side logic in the future.
    // For now, it doesn't need to update parent state.
    console.log(`Clicked on ${dest.city}`);
  };

  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-4xl font-headline font-bold text-gray-800">Inspira tu Próximo Viaje</h2>
        <p className="text-lg text-muted-foreground mt-2">Descubre destinos populares para despertar tus ideas de viaje.</p>
      </div>

      <Tabs defaultValue="Europa" className="w-full">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto bg-card/80 backdrop-blur-sm">
            {Object.keys(destinationsByContinent).map(continent => (
                 <TabsTrigger key={continent} value={continent}>{continent}</TabsTrigger>
            ))}
        </TabsList>
        
        {Object.entries(destinationsByContinent).map(([continent, destinations]) => (
            <TabsContent key={continent} value={continent} className="data-[state=active]:animate-in data-[state=active]:fade-in-50 duration-500">
                 <div className="flex space-x-8 pb-12 mt-8 overflow-x-auto scrollbar-hide -mx-4 px-4 mask-fade">
                    {destinations.map((dest) => (
                        <DestinationWindow 
                            key={dest.iata}
                            dest={dest}
                            onClick={() => handleDestinationClick(dest)}
                        />
                    ))}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}



    