'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Plane, Images, Users, Settings, Loader2 } from 'lucide-react';

const SectionPlaceholder = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                <Icon className="h-6 w-6 text-primary" />
                <span>{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

const NextTripSection = () => (
    <SectionPlaceholder title="Próximo Viaje" icon={Plane}>
        <p className="text-muted-foreground">Aquí verás los detalles de tu próximo viaje. ¡Aún no has planeado nada!</p>
    </SectionPlaceholder>
);

const BookingsSection = () => (
    <SectionPlaceholder title="Mis Reservas" icon={Book}>
        <p className="text-muted-foreground">Aquí aparecerán todas tus reservas de vuelos, hoteles y actividades.</p>
    </SectionPlaceholder>
);

const AlbumsSection = () => (
    <SectionPlaceholder title="Mis Álbumes" icon={Images}>
        <p className="text-muted-foreground">Crea y comparte álbumes de fotos de tus aventuras.</p>
    </SectionPlaceholder>
);

const SocialSection = () => (
    <SectionPlaceholder title="Social" icon={Users}>
        <p className="text-muted-foreground">Conecta con otros viajeros y comparte tus experiencias.</p>
    </SectionPlaceholder>
);

const SettingsSection = () => (
    <SectionPlaceholder title="Configuración" icon={Settings}>
        <p className="text-muted-foreground">Gestiona tu cuenta, notificaciones y preferencias.</p>
    </SectionPlaceholder>
);


function ProfileContent() {
    const searchParams = useSearchParams();
    const section = searchParams.get('section') || 'next-trip';

    switch (section) {
        case 'bookings':
            return <BookingsSection />;
        case 'albums':
            return <AlbumsSection />;
        case 'social':
            return <SocialSection />;
        case 'settings':
            return <SettingsSection />;
        case 'next-trip':
        default:
            return <NextTripSection />;
    }
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
            <ProfileContent />
        </Suspense>
    );
}
