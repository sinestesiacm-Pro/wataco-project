
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { AmadeusHotelOffer } from '@/lib/types';
import { BedDouble, Star, MapPin, CheckCircle2, QrCode, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { HotelMapDialog } from './hotel-map-dialog';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { amenityIcons } from '@/lib/amenity-icons';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';

const formatAmenity = (amenity: string) => {
  return amenity.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

interface HotelDetailsDialogProps {
  offer: AmadeusHotelOffer;
  children: React.ReactNode;
  searchParams: URLSearchParams;
}

export function HotelDetailsDialog({ offer, children, searchParams }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const bookingLinkParams = new URLSearchParams(searchParams.toString());
  bookingLinkParams.set('step', 'rooms');
  const bookingLink = `/hotels/${offer.id}?${bookingLinkParams.toString()}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] flex flex-col bg-card/80 backdrop-blur-2xl p-0 border-0 shadow-2xl rounded-3xl">
        {offer ? (
          <>
            <DialogHeader className="p-4 md:p-6 pb-2 text-left flex-shrink-0">
                <DialogTitle className="font-headline text-2xl sm:text-3xl font-semibold text-primary">{offer.hotel.name}</DialogTitle>
                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    {offer.hotel.rating && (
                        <div className="flex items-center">
                            {[...Array(parseInt(offer.hotel.rating))].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                            ))}
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{offer.hotel.address.cityName}, {offer.hotel.address.countryCode}</span>
                    </div>
                    <HotelMapDialog hotelName={offer.hotel.name || 'Ubicación'} />
                </div>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto">
                <ScrollArea className="h-full">
                    <div className="p-4 md:p-6 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Main Content Area */}
                          <div className="md:col-span-7 space-y-6">
                              <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-lg">
                                  <Image
                                      src={offer.hotel.media?.[0]?.uri || 'https://placehold.co/800x600.png'}
                                      alt={`${offer.hotel.name} photo`}
                                      fill
                                      className="object-cover"
                                      data-ai-hint="hotel exterior"
                                  />
                              </div>
                              <Card className="bg-transparent border-0 shadow-none">
                                  <CardContent className="p-0 space-y-4">
                                      <div>
                                          <h3 className="font-semibold font-headline mb-2">Sobre este hotel</h3>
                                          <p className="text-sm text-muted-foreground font-body">
                                              {offer.hotel.description?.text}
                                          </p>
                                      </div>
                                      {offer.hotel.amenities && offer.hotel.amenities.length > 0 && (
                                          <div>
                                              <h3 className="font-semibold font-headline mb-2">Servicios principales</h3>
                                              <TooltipProvider>
                                                  <div className="flex flex-wrap gap-2">
                                                  {offer.hotel.amenities.slice(0, 8).map((amenity, index) => {
                                                      const Icon = amenityIcons[amenity] || CheckCircle2;
                                                      return (
                                                      <Tooltip key={index}>
                                                          <TooltipTrigger asChild>
                                                              <Badge variant="secondary" className="p-2">
                                                                  <Icon className="h-5 w-5" />
                                                              </Badge>
                                                          </TooltipTrigger>
                                                          <TooltipContent>
                                                              <p>{formatAmenity(amenity)}</p>
                                                          </TooltipContent>
                                                      </Tooltip>
                                                      )
                                                  })}
                                                  </div>
                                              </TooltipProvider>
                                          </div>
                                      )}
                                  </CardContent>
                              </Card>
                          </div>

                          {/* Tear-off Stub Area */}
                          <div className="md:col-span-5 flex flex-col">
                              <div className="bg-muted/40 ticket-tear flex flex-col items-center justify-between p-6 rounded-lg flex-grow">
                                <div className="text-center w-full">
                                    <h3 className="font-headline font-semibold text-lg">Tu Reserva</h3>
                                    <div className="bg-card p-2 rounded-lg mt-2 shadow-inner inline-block">
                                        <QrCode className="w-20 h-20 text-foreground" />
                                    </div>
                                </div>
                                
                                <div className="text-center w-full mt-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-body">Precio por noche desde</p>
                                        <p className="font-bold text-4xl text-tertiary">
                                        ${offer.offers?.[0]?.price?.total}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-primary animate-pulse-text my-3">¡Ya casi está listo!</p>
                                    <Button asChild size="lg" className="w-full mt-2 bg-success hover:bg-success/90 text-success-foreground font-semibold">
                                        <Link href={bookingLink}>
                                            Ver Habitaciones <ArrowRight className="ml-2 h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                              </div>
                          </div>
                      </div>
                    </div>
                </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>No se pudieron cargar los detalles del hotel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
