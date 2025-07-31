'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Gift, CheckCircle, Award } from 'lucide-react';
import { NextTripSection } from '@/components/profile/next-trip-section';
import { BookingsSection } from '@/components/profile/bookings-section';
import { AlbumsSection } from '@/components/profile/albums-section';
import { SocialProfileSection } from '@/components/profile/social-profile-section';
import { SettingsSection } from '@/components/profile/settings-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { activateVipMembership } from '@/app/actions';


const VipMembershipSection = () => {
    const { user, isVIP, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const [isVipActivated, setIsVipActivated] = useState(isVIP);
    const [membershipCode, setMembershipCode] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVipActivated(isVIP);
    }, [isVIP]);

    const handleActivation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !membershipCode) return;
        
        setLoading(true);
        const result = await activateVipMembership({ userId: user.uid, membershipCode });
        setLoading(false);

        if (result.success) {
            toast({
                title: "¡Éxito!",
                description: result.message,
                variant: "success",
            });
            setIsVipActivated(true);
        } else {
            toast({
                title: "Error de Activación",
                description: result.error,
                variant: "destructive",
            });
        }
    }

    if (authLoading) {
        return (
            <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
                        <Gift className="h-6 w-6" />
                        <span>Membresía VIP</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-24">
                   <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }
    
    if (isVipActivated) {
        return (
             <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
                        <Award className="h-6 w-6 text-amber-400" />
                        <span>Membresía VIP</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-green-500/20 rounded-lg">
                        <CheckCircle className="h-12 w-12 text-green-400 mb-2"/>
                        <p className="font-semibold text-lg">Tu membresía VIP está activa.</p>
                        <p className="text-sm text-white/80">Disfruta de beneficios y ofertas exclusivas.</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl font-headline text-white">
                    <Gift className="h-6 w-6" />
                    <span>Validar mi Membresía VIP</span>
                </CardTitle>
                <CardDescription className="text-white/70">Introduce tu código de membresía para desbloquear beneficios exclusivos.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleActivation} className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Input 
                        placeholder="Tu código de membresía" 
                        className="bg-black/20 border-white/30 placeholder:text-white/60 flex-grow"
                        value={membershipCode}
                        onChange={(e) => setMembershipCode(e.target.value)}
                        disabled={loading}
                    />
                    <Button type="submit" className="w-full sm:w-auto font-semibold" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Activar'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

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
            return <VipMembershipSection />;
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
