'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { AmadeusHotelOffer } from '@/lib/types';
import { Separator } from './ui/separator';
import { BedDouble, NotebookPen } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { HotelDetailsDialog } from './hotel-details-dialog';

interface HotelResultPopoverProps {
  offer: AmadeusHotelOffer;
}

const getCoordinates = (hotelName: string | undefined) => {
  if (!hotelName) return { lat: 0, lng: 0 };
  let hash = 0;
  for (let i = 0; i < hotelName.length; i++) {
    const char = hotelName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const lat = 40.7128 + (hash % 1000) / 10000;
  const lng = -74.0060 + (hash % 2000) / 10000;
  return { lat, lng };
};

export function HotelResultPopover({ offer }: HotelResultPopoverProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const position = getCoordinates(offer.hotel.name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <BedDouble className="mr-2 h-4 w-4" />
          Ver Oferta
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="grid gap-4">
          <div className="h-40 w-full rounded-t-md overflow-hidden">
            {apiKey ? (
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={position}
                  defaultZoom={14}
                  mapId="popover-map"
                  gestureHandling={'none'}
                  disableDefaultUI={true}
                >
                  <AdvancedMarker position={position} />
                </Map>
              </APIProvider>
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Mapa no disponible
              </div>
            )}
          </div>
          <div className="p-4 pt-0 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground font-body">Precio por noche</p>
              <p className="font-bold text-3xl text-tertiary">
                ${offer.offers?.[0]?.price?.total}
              </p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-2">
              <HotelDetailsDialog offer={offer}>
                <Button variant="outline">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Ver Detalles
                </Button>
              </HotelDetailsDialog>
              <Button
                className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground"
                onClick={() =>
                  alert(
                    'La funcionalidad de reserva no está implementada en esta demostración.'
                  )
                }
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
