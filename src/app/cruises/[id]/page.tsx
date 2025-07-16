
// src/app/cruises/[id]/page.tsx (Este NO debe tener 'use client')
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { recommendedCruises } from '@/lib/mock-cruises';
import CruiseDetailPageContent from '@/components/cruise-detail-page-content'; // Importa el componente cliente

// Componente de Página (Server Component) - Obtiene los datos
export default async function CruiseDetailPage({ params }: { params: { id: string } }) {
  const cruise = recommendedCruises.find(c => c.id === params.id); // Busca el crucero

  // Este check de !cruise es crucial aquí en el Server Component
  if (!cruise) {
    notFound(); // Si no se encuentra, muestra 404
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-cruises-gradient">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    }>
      {/* Pasa el objeto 'cruise' ya resuelto al componente cliente */}
      <CruiseDetailPageContent cruise={cruise} /> 
    </Suspense>
  );
}
