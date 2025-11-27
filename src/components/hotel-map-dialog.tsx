
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

interface HotelMapDialogProps {
  hotelName: string;
}

// Mock geocoding - in a real app, this would use the Google Geocoding API
// or you would get lat/lng from your hotel data source.
const getCoordinates = (hotelName: string) => {
    // This is a simple hash to generate deterministic "random" coordinates for demonstration.
    let hash = 0;
    for (let i = 0; i < hotelName.length; i++) {
        const char = hotelName.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    const lat = 40.7128 + (hash % 1000) / 10000; // Base: NYC
    const lng = -74.0060 + (hash % 2000) / 10000; // Base: NYC
    return { lat, lng };
}


export function HotelMapDialog({ hotelName }: HotelMapDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const position = getCoordinates(hotelName);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
      return (
          <Button variant="outline" size="sm" disabled>
             <MapPin className="mr-2 h-4 w-4" />
             API Key de Mapa no configurada
          </Button>
      )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-background/20 text-foreground border-border hover:bg-background/30 hover:text-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          Ver en Mapa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] h-[80vh] flex flex-col p-0 rounded-3xl">
        <DialogHeader className="p-4 border-b flex-shrink-0">
          <DialogTitle>Ubicación de {hotelName}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow rounded-b-2xl overflow-hidden">
          <APIProvider apiKey={apiKey}>
              <Map
                  defaultCenter={position}
                  defaultZoom={15}
                  mapId="tripify-map"
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
              >
                  <AdvancedMarker position={position} title={hotelName} />
              </Map>
          </APIProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
