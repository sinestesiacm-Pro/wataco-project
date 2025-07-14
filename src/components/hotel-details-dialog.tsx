
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { AmadeusHotelOffer } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import { HotelDetailsView } from './hotel-details-view';

interface HotelDetailsDialogProps {
  offer: AmadeusHotelOffer;
  children: React.ReactNode;
  searchParams: URLSearchParams;
}

export function HotelDetailsDialog({ offer, children, searchParams }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const bookingLinkParams = new URLSearchParams(searchParams.toString());
  const bookingLink = `/hotels/${offer.id}?${bookingLinkParams.toString()}`;

  const handleSeeRooms = () => {
    window.location.href = bookingLink;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] flex flex-col bg-white/10 backdrop-blur-xl p-6 border border-white/20 shadow-2xl rounded-3xl">
        {offer ? (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{offer.hotel.name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full pr-4 -mr-4">
              <HotelDetailsView hotelOffer={offer} onSeeRooms={handleSeeRooms} />
            </ScrollArea>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <p>No se pudieron cargar los detalles del hotel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
