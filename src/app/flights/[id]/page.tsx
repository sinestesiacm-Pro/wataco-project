'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FlightDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       <Button asChild variant="outline" className="mb-4">
         <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la Búsqueda
         </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Detalle del Vuelo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Mostrando detalles para el vuelo con ID: {params.id}</p>
          <p className="mt-4">Aquí se mostrará una vista detallada del itinerario del vuelo, información de equipaje, políticas de la aerolínea y el desglose de precios final antes de proceder al pago.</p>
        </CardContent>
      </Card>
    </div>
  );
}
