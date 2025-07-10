'use client';

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HotelBookingFlow } from '@/components/hotel-booking-flow';

function HotelDetailPageContent({ id }: { id: string }) {
  return (
    <div className="w-full bg-muted/20 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button asChild variant="outline" className="mb-6 bg-background">
          <Link href="/?tab=Hotels">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la Búsqueda
          </Link>
        </Button>
        <HotelBookingFlow offerId={id} />
      </div>
    </div>
  );
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <HotelDetailPageContent id={params.id} />
    </Suspense>
  );
}
