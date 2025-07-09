'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getHotelDetails } from '@/app/actions';
import type { HotelDetails } from '@/lib/types';
import { Loader2, BedDouble, CheckCircle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';

interface HotelDetailsDialogProps {
  hotelId: string;
  hotelName: string;
  bookingUrl: string;
}

export function HotelDetailsDialog({ hotelId, hotelName, bookingUrl }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleOpen = async () => {
    if (details) return;

    setLoading(true);
    const result = await getHotelDetails({ hotel_id: hotelId });
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
              <DialogTitle className="font-headline text-2xl">{details.hotel_name_trans}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2">
                <div className="space-y-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {details.photos.slice(0, 10).map((photo, index) => (
                        <CarouselItem key={index}>
                          <Image
                            src={photo.url_original}
                            alt={`${details.hotel_name_trans} photo ${index + 1}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover rounded-lg"
                            data-ai-hint="hotel interior"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
                <div className="space-y-4">
                  {details.description?.description && (
                    <>
                      <h3 className="text-lg font-semibold font-headline">About this hotel</h3>
                      <ScrollArea className="h-48">
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap font-body">
                          {details.description.description}
                        </p>
                      </ScrollArea>
                    </>
                  )}

                  {details.block && details.block.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold font-headline mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {details.block.flatMap(b => b.facilities).slice(0, 15).map(facility => (
                          <Badge key={facility.facility_id} variant="secondary" className="flex items-center gap-1.5">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {facility.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            </div>
            <DialogFooter className="mt-auto pt-4 border-t flex justify-between items-center w-full">
              {details.composite_price_breakdown?.gross_price && (
                 <div>
                    <p className="text-xs text-muted-foreground font-body">From</p>
                    <p className="font-bold text-2xl text-accent">{details.composite_price_breakdown.gross_price}</p>
                 </div>
              )}
              <Button asChild size="lg">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book on Booking.com
                </a>
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
