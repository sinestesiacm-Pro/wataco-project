
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getHotelDetails } from '@/app/actions';
import type { AmadeusHotelOffer } from '@/lib/types';
import { Loader2, BedDouble, CheckCircle, Wifi, ParkingCircle, Star } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

interface HotelDetailsDialogProps {
  offerId: string;
  hotelName: string;
}

export function HotelDetailsDialog({ offerId, hotelName }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<AmadeusHotelOffer | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOpen = async () => {
    if (details) return;

    setLoading(true);
    const result = await getHotelDetails({ offerId });
    if (result.success && result.data) {
      setDetails(result.data);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Could not fetch hotel details.',
        variant: 'destructive',
      });
      setIsOpen(false);
    }
    setLoading(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (open) handleOpen();
    }}>
      <DialogTrigger asChild>
        <Button>
          <BedDouble className="mr-2 h-4 w-4" />
          View Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : details ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{details.hotel.name}</DialogTitle>
              {details.hotel.rating && (
                <div className="flex items-center">
                    {[...Array(parseInt(details.hotel.rating))].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                </div>
              )}
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
                <div className="space-y-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {details.hotel.media && details.hotel.media.length > 0 ? (
                        details.hotel.media.map((photo, index) => (
                            <CarouselItem key={index}>
                            <Image
                                src={photo.uri}
                                alt={`${details.hotel.name} photo ${index + 1}`}
                                width={800}
                                height={600}
                                className="w-full h-auto object-cover rounded-lg"
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
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div className="space-y-4">
                  {details.hotel.description?.text && (
                    <>
                      <h3 className="text-lg font-semibold font-headline">About this hotel</h3>
                      <ScrollArea className="h-48">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap font-body">
                          {details.hotel.description.text}
                        </p>
                      </ScrollArea>
                    </>
                  )}

                  {details.hotel.amenities && details.hotel.amenities.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold font-headline mb-2">Amenities</h3>
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

                  {details.offers?.[0]?.room?.description?.text && (
                     <div>
                        <h3 className="text-lg font-semibold font-headline mb-2">Room Details</h3>
                        <p className="text-sm text-muted-foreground font-body">
                          {details.offers[0].room.description.text}
                        </p>
                    </div>
                  )}
                </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t flex justify-between items-center w-full">
              {details.offers?.[0]?.price?.total && (
                 <div>
                    <p className="text-xs text-muted-foreground font-body">Total Price</p>
                    <p className="font-bold text-2xl text-accent">
                      €{details.offers[0].price.total}
                    </p>
                 </div>
              )}
              <Button size="lg" onClick={() => alert('Booking functionality not implemented in this demo.')}>
                Book Now
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex items-center justify-center h-96">
            <p>Could not load hotel details.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
