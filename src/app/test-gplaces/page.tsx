
'use client';

import { useState, useEffect } from 'react';
import { getGooglePlacePhotos } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TestGooglePlacesPage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestPhotos() {
      setLoading(true);
      setError(null);
      try {
        const photoUrls = await getGooglePlacePhotos('Torre Eiffel, Paris');
        if (photoUrls.length === 0) {
            setError('No se encontraron fotos para la Torre Eiffel. Verifica la clave de API de Google Places y que la API esté habilitada en tu proyecto de Google Cloud.');
        }
        setPhotos(photoUrls);
      } catch (e: any) {
        setError(e.message || 'Ocurrió un error inesperado.');
      } finally {
        setLoading(false);
      }
    }
    fetchTestPhotos();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Página de Prueba de Google Places API</CardTitle>
          <CardDescription>
            Esta página realiza una llamada a `getGooglePlacePhotos` para "Torre Eiffel, Paris" y muestra los resultados.
          </CardDescription>
          <Button asChild variant="link">
            <Link href="/">Volver al Inicio</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="ml-2">Cargando fotos...</p>
            </div>
          )}
          {error && <p className="text-destructive">Error: {error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((url, index) => (
                <div key={index} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={`Foto de prueba de Google Places ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          )}
           {!loading && photos.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold">URLs de las Imágenes:</h3>
                    <ul className="list-disc list-inside mt-2 text-xs space-y-1">
                        {photos.map((url, index) => (
                            <li key={index} className="break-all">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{`Imagen ${index + 1}`}</a>
                            </li>
                        ))}
                    </ul>
                </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
