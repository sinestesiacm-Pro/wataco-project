
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
import { HotelDetailsView } from './hotel-details-view';

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
  const bookingLink = `/hotels/${offer.id}?${bookingLinkParams.toString()}`;

  const handleSeeRooms = () => {
    window.location.href = bookingLink;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] flex flex-col bg-card/80 backdrop-blur-2xl p-6 border-0 shadow-2xl rounded-3xl">
        {offer ? (
          <ScrollArea className="h-full pr-4 -mr-4">
              <HotelDetailsView hotelOffer={offer} onSeeRooms={handleSeeRooms} />
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            <p>No se pudieron cargar los detalles del hotel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
