'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { NextTripSection } from '@/components/profile/next-trip-section';
import { BookingsSection } from '@/components/profile/bookings-section';
import { AlbumsSection } from '@/components/profile/albums-section';
import { SocialProfileSection } from '@/components/profile/social-profile-section';
import { SettingsSection } from '@/components/profile/settings-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';

const BonusSection = () => (
    <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
                <Gift className="h-6 w-6" />
                <span>Activar Bono</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-white/80">Ingresa tu código de bono aquí para reclamar tu recompensa.</p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Input placeholder="Tu código de bono" className="bg-black/20 border-white/30 placeholder:text-white/60 flex-grow" />
                <Button className="w-full sm:w-auto font-semibold">Activar</Button>
            </div>
        </CardContent>
    </Card>
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
            return <SocialProfileSection />;
        case 'bonus':
            return <BonusSection />;
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
