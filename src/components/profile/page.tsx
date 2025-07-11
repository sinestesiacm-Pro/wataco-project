'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Plane, Images, Users, Settings, Loader2, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SectionPlaceholder = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold font-headline">
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

const BonusSection = () => (
    <SectionPlaceholder title="Activar Bono" icon={Gift}>
        <p className="text-muted-foreground">Ingresa tu código de bono aquí para reclamar tu recompensa.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Input placeholder="Tu código de bono" className="flex-grow" />
            <Button className="w-full sm:w-auto font-semibold">Activar</Button>
        </div>
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
        case 'bonus':
            return <BonusSection />;
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
