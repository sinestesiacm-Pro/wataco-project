'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { NextTripSection } from '@/components/profile/next-trip-section';
import { BookingsSection } from '@/components/profile/bookings-section';
import { AlbumsSection } from '@/components/profile/albums-section';
import { SocialProfileSection } from '@/components/profile/social-profile-section';
import { SettingsSection } from '@/components/profile/settings-section';


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
