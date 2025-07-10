
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface RecommendedDestinationsProps {
  setDestination: (destination: { iata: string; query: string }) => void;
}

const destinationsByContinent = {
  "Europa": [
    { city: "Roma", country: "Italia", priceFrom: "89", iata: "FCO", hint: "rome colosseum", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2596&auto=format&fit=crop" },
    { city: "Lisboa", country: "Portugal", priceFrom: "75", iata: "LIS", hint: "lisbon tram", image: "https://images.unsplash.com/photo-1586724237569-3a8a71561a33?q=80&w=2535&auto=format&fit=crop" },
    { city: "París", country: "Francia", priceFrom: "99", iata: "CDG", hint: "paris eiffel tower", image: "https://images.unsplash.com/photo-1502602898657-3e91760c0341?q=80&w=2670&auto=format&fit=crop" },
    { city: "Ámsterdam", country: "Países Bajos", priceFrom: "105", iata: "AMS", hint: "amsterdam canals", image: "https://images.unsplash.com/photo-1584214432139-4a2c076a1659?q=80&w=2535&auto=format&fit=crop" },
  ],
  "América del Sur": [
    { city: "Cartagena", country: "Colombia", priceFrom: "210", iata: "CTG", hint: "cartagena colombia", image: "https://images.unsplash.com/photo-1599933318721-a3f12c94314e?q=80&w=2574&auto=format&fit=crop" },
    { city: "Buenos Aires", country: "Argentina", priceFrom: "450", iata: "EZE", hint: "buenos aires obelisco", image: "https://images.unsplash.com/photo-1599557041284-7e2a1581e1ac?q=80&w=2535&auto=format&fit=crop" },
    { city: "Machu Picchu", country: "Perú", priceFrom: "320", iata: "CUZ", hint: "machu picchu", image: "https://images.unsplash.com/photo-1587330929202-05a8b79b5c28?q=80&w=2574&auto=format&fit=crop" },
    { city: "Río de Janeiro", country: "Brasil", priceFrom: "380", iata: "GIG", hint: "rio de janeiro", image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2670&auto=format&fit=crop" },
  ],
  "Asia": [
    { city: "Tokio", country: "Japón", priceFrom: "680", iata: "NRT", hint: "tokyo street", image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2670&auto=format&fit=crop" },
    { city: "Bangkok", country: "Tailandia", priceFrom: "550", iata: "BKK", hint: "bangkok temple", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2670&auto=format&fit=crop" },
    { city: "Seúl", country: "Corea del Sur", priceFrom: "620", iata: "ICN", hint: "seoul palace", image: "https://images.unsplash.com/photo-1542317852-33e5c9497295?q=80&w=2574&auto=format&fit=crop" },
    { city: "Singapur", country: "Singapur", priceFrom: "590", iata: "SIN", hint: "singapore marina bay", image: "https://images.unsplash.com/photo-1525625293386-668f4238d862?q=80&w=2574&auto=format&fit=crop" },
  ],
};

const ContinentDivider = ({ name, image, hint }: { name: string; image: string; hint: string }) => (
    <div className="relative group w-full h-32 my-12 rounded-2xl shadow-lg overflow-hidden">
      <Image
        src={image}
        alt={`Divider for ${name}`}
        data-ai-hint={hint}
        fill
        className="object-cover blur group-hover:blur-none transition-all duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
        <h2 className="text-4xl font-headline font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>{name}</h2>
      </div>
    </div>
  );

export function RecommendedDestinations({ setDestination }: RecommendedDestinationsProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-headline font-bold text-gray-800">Inspira tu Próximo Viaje</h2>
        <p className="text-muted-foreground mt-2">Descubre destinos populares para despertar tus ideas de viaje.</p>
      </div>

      {Object.entries(destinationsByContinent).map(([continent, destinations]) => {
        let dividerImage, dividerHint;
        if (continent === "Europa") {
          dividerImage = "https://images.unsplash.com/photo-1534430480-95b341271b48?q=80&w=2574&auto=format&fit=crop";
          dividerHint = "europe landmarks";
        } else if (continent === "América del Sur") {
          dividerImage = "https://images.unsplash.com/photo-1516026672322-78ab2db9a8e2?q=80&w=2670&auto=format&fit=crop";
          dividerHint = "patagonia landscape";
        } else { // Asia
          dividerImage = "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2692&auto=format&fit=crop";
          dividerHint = "japan temple";
        }
        
        return (
          <div key={continent} className="space-y-8">
            <ContinentDivider name={continent} image={dividerImage} hint={dividerHint} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {destinations.map((dest) => (
                <div
                  key={dest.iata}
                  className="airplane-window"
                  onClick={() => {
                    const query = `${dest.city}, ${dest.country}`;
                    setDestination({ iata: dest.iata, query });
                  }}
                >
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
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}
