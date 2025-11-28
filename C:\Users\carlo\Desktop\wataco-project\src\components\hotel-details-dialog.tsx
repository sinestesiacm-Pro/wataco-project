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
import Link from 'next/link';

interface HotelDetailsDialogProps {
  offer: AmadeusHotelOffer;
  children: React.ReactNode;
}

export function HotelDetailsDialog({ offer, children }: HotelDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const detailsLink = `/hotels/${offer.id}`;

  const handleSeeRooms = () => {
    // This function is now a simple navigation
    // The actual availability search happens on the details page
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
              <Link href={detailsLink} legacyBehavior>
                <a onClick={() => setIsOpen(false)}>
                  <HotelDetailsView hotelOffer={offer} />
                </a>
              </Link>
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
