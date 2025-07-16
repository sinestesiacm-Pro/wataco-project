// src/app/cruises/[id]/page.tsx (Este NO debe tener 'use client')
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { recommendedCruises } from '@/lib/mock-cruises';
import CruiseDetailPageContent from '@/components/cruise-detail-page-content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Componente de Página (Server Component) - Obtiene los datos
export default async function CruiseDetailPage({ params }: { params: { id: string } }) {
  // La forma correcta de obtener el crucero. Next.js resuelve los params automáticamente.
  const cruise = recommendedCruises.find(c => c.id === params.id);
  console.log('--- DEPURACIÓN VIDEO SOURCE (SERVER COMPONENT - CRÍTICO) ---');
  console.log('Componente en ejecución:', 'CruiseDetailPage (Server Component)');
  console.log('Valor de `cruise` en el momento del render:', cruise);
  console.log('Valor de `cruise.videoUrl` en el momento del render:', cruise?.videoUrl);
  console.log('Tipo de `cruise.videoUrl`:', typeof cruise?.videoUrl);
  console.log('--- FIN DEPURACIÓN VIDEO SOURCE (SERVER COMPONENT - CRÍTICO) ---');
  // Este check es crucial y ahora funcionará como se espera.
  // Si no se encuentra el crucero, la página 404 se mostrará y el resto del código no se ejecutará.
  if (!cruise) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-cruises-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    }>
        <div className="w-full min-h-screen pt-24 pb-24 bg-cruises-gradient background-pan-animation">
             <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex justify-between items-center">
                    <Button asChild variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                       <Link href="/?tab=Cruises">
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Volver a Cruceros
                       </Link>
                    </Button>
                </div>
                {/* Pasa el objeto 'cruise' ya resuelto y validado al componente cliente */}
                <CruiseDetailPageContent cruise={cruise} /> 
            </div>
        </div>
    </Suspense>
  );
}
