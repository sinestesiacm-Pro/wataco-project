'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { AmadeusHotelOffer } from '@/lib/types';
import { BedDouble, CheckCircle, Star, MapPin } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { HotelMapDialog } from './hotel-map-dialog';


interface HotelDetailsDialogProps {
  offer: AmadeusHotelOffer;
}

export function HotelDetailsDialog({ offer }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const details = offer;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col bg-background/60 backdrop-blur-2xl p-0 border-0 shadow-2xl rounded-3xl overflow-hidden">
        {details ? (
          <>
            <div className="p-6 pb-4">
              <h2 className="font-headline text-2xl">{details.hotel.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                  {details.hotel.rating && (
                    <div className="flex items-center">
                        {[...Array(parseInt(details.hotel.rating))].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{details.hotel.address.cityName}, {details.hotel.address.countryCode}</span>
                  </div>
                   <HotelMapDialog hotelName={details.hotel.name || 'Ubicación'} />
              </div>
            </div>
            
            <ScrollArea className="overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 pt-0">
                  <div className="md:col-span-7 space-y-4">
                    <Carousel className="w-full rounded-2xl overflow-hidden shadow-lg">
                      <CarouselContent>
                        {details.hotel.media && details.hotel.media.length > 0 ? (
                          details.hotel.media.map((photo, index) => (
                              <CarouselItem key={index}>
                              <Image
                                  src={photo.uri}
                                  alt={`${details.hotel.name} photo ${index + 1}`}
                                  width={800}
                                  height={600}
                                  className="w-full h-auto aspect-[4/3] object-cover"
                                  data-ai-hint="hotel interior"
                              />
                              </CarouselItem>
                          ))
                        ) : (
                          <CarouselItem>
                              <Image
                                  src="https://placehold.co/800x600.png"
                                  alt="Placeholder hotel image"
                                  width={800}
                                  height={600}
                                  className="w-full h-auto object-cover rounded-lg"
                                  data-ai-hint="hotel interior"
                              />
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </div>
                  <div className="md:col-span-5 space-y-6">
                    <Card className="bg-card p-6 rounded-2xl shadow-sm flex flex-col">
                      <h3 className="text-lg font-semibold font-headline mb-2">Sobre este hotel</h3>
                      {details.hotel.description?.text && (
                        <ScrollArea className="h-20 mb-4">
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap font-body">
                            {details.hotel.description.text}
                          </p>
                        </ScrollArea>
                      )}

                      {details.hotel.amenities && details.hotel.amenities.length > 0 && (
                        <div className="mt-auto">
                          <h3 className="text-lg font-semibold font-headline mb-2">Servicios</h3>
                          <div className="flex flex-wrap gap-2">
                            {details.hotel.amenities.slice(0, 15).map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1.5">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {amenity.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>

                     <Card className="bg-card p-6 rounded-2xl shadow-sm">
                        {details.offers?.[0]?.price?.total && (
                          <div className="mb-4">
                              <p className="text-xs text-muted-foreground font-body">Precio por noche</p>
                              <p className="font-bold text-3xl text-foreground">
                                ${details.offers[0].price.total}
                              </p>
                          </div>
                        )}
                        <Button size="lg" className="w-full bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground" onClick={() => alert('La funcionalidad de reserva no está implementada en esta demostración.')}>
                          Reservar Ahora
                        </Button>
                     </Card>
                  </div>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p>No se pudieron cargar los detalles del hotel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
