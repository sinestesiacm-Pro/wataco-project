
'use client';

import React, { Suspense, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Check, X } from "lucide-react";
import Link from "next/link";
import { recommendedPackages } from '@/lib/mock-packages';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageCustomization } from '@/components/package-customization';
import { cn } from '@/lib/utils';

function PackageDetailPageContent({ id }: { id: string }) {
  const pkg = useMemo(() => recommendedPackages.find(p => p.id === id), [id]);

  if (!pkg) {
    notFound();
  }

  return (
    <div className='w-full min-h-screen pt-24 pb-24'>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex justify-between items-center">
            <Button asChild variant="outline">
               <Link href="/?tab=Packages">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a Paquetes
               </Link>
            </Button>
             {pkg.special_offer && <p className="text-2xl font-bold text-accent animate-pulse">{pkg.special_offer}</p>}
        </div>

        <Card className="overflow-hidden bg-card/80 backdrop-blur-xl border rounded-2xl">
          <div className="relative h-64 md:h-80 w-full">
              <Image 
                src={pkg.image} 
                data-ai-hint={pkg.hint} 
                alt={pkg.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl md:text-5xl font-bold font-headline drop-shadow-lg">{pkg.title}</h1>
                <p className="text-xl drop-shadow-md">{pkg.destination}</p>
              </div>
          </div>
          <CardContent className="p-6 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">Detalles del Paquete</h2>
              <p className="text-muted-foreground mb-6">{pkg.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Check className="text-green-500"/>
                    ¿Qué incluye?
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {pkg.includes.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </div>
               <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <X className="text-red-500"/>
                    ¿Qué no incluye?
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {pkg.not_included.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <PackageCustomization pkg={pkg} />

      </div>
    </div>
  );
}

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  
  return (
     <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <PackageDetailPageContent id={id} />
    </Suspense>
  );
}
