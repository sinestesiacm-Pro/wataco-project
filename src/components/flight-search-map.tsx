'use client';
import React, { useState, useCallback, useMemo } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { mapStyles } from '@/lib/map-styles';
import { useTheme } from '@/contexts/theme-context';
import { Icons } from './icons';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { AlertCircle, CalendarIcon, LocateFixed, Users, X } from 'lucide-react';
import { Separator } from './ui/separator';

const ErrorDisplay = ({ title, message, details }: { title: string, message: string, details?: string }) => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 p-4">
        <Card className="bg-destructive/90 text-destructive-foreground border-white/20 max-w-sm text-center">
            <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2 text-xl">
                    <AlertCircle className="h-8 w-8" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{message}</p>
                {details && <p className="text-xs mt-2 opacity-80">{details}</p>}
                <Button variant="outline" className="mt-4 bg-transparent hover:bg-white/10" onClick={() => window.location.reload()}>
                    Recargar Página
                </Button>
            </CardContent>
        </Card>
    </div>
);


export const FlightSearchMap = ({ apiKey }: { apiKey?: string }) => {
    const { colorTheme } = useTheme();
    const [loadingError, setLoadingError] = useState<Error | null>(null);
    const center = useMemo(() => ({ lat: 40.7128, lng: -74.0060 }), []); // Default center (NYC)
    
    const handleLoadingFailure = useCallback((error: Error) => {
        console.error("Google Maps loading failed:", error);
        setLoadingError(error);
    }, []);

    if (!apiKey) {
        return (
             <ErrorDisplay
                title="Error de Configuración del Mapa"
                message="La clave de API de Google Maps no está configurada."
                details="Por favor, añade NEXT_PUBLIC_GOOGLE_MAPS_API_KEY a tu archivo .env.local para mostrar el mapa."
            />
        )
    }
    
    if (loadingError) {
         return (
             <ErrorDisplay
                title="Error al Cargar el Mapa"
                message="No se pudo cargar el mapa. Esto puede deberse a que la facturación no está habilitada para tu proyecto de Google Cloud."
                details={`Error: ${loadingError.message}. Asegúrate de que la API de Maps JavaScript esté habilitada y la facturación configurada.`}
            />
        )
    }

    return (
        <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/20">
            <APIProvider apiKey={apiKey} onLoadingFailure={handleLoadingFailure}>
                <Map
                    defaultCenter={center}
                    defaultZoom={4}
                    mapId="orvian-flight-map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    styles={colorTheme === 'dark' ? mapStyles : undefined}
                >
                    {/* Markers will go here */}
                </Map>
                <div className="absolute top-4 right-4">
                    <Button variant="outline" size="icon" className="bg-white/30 backdrop-blur-md border-white/20 text-white hover:bg-white/50">
                        <LocateFixed className="h-5 w-5" />
                    </Button>
                </div>
            </APIProvider>
        </div>
    )
}
