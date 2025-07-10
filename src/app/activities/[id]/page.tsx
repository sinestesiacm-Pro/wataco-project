'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ActivityDetailPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
       <Button asChild variant="outline" className="mb-4">
         <Link href="/?tab=Activities">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Actividades
         </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Detalle de la Actividad</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Mostrando detalles para la actividad con ID: {id}</p>
          <p className="mt-4">Aquí se mostrará una descripción completa de la actividad, incluyendo detalles, itinerario, precios y opciones de reserva.</p>
        </CardContent>
      </Card>
    </div>
  );
}
