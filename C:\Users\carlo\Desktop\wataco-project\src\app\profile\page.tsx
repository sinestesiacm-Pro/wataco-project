'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Gift, CheckCircle, Award, Star } from 'lucide-react';
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
import { cn } from '@/lib/utils';


const benefits = {
    gold: ["Acceso a ofertas exclusivas", "Soporte prioritario", "5% de descuento en hoteles"],
    platinum: ["Todos los beneficios de Gold", "Upgrades de habitación de cortesía (sujeto a disponibilidad)", "Acceso a salas VIP en aeropuertos seleccionados"],
    black: ["Todos los beneficios de Platinum", "Servicio de conserje 24/7", "Invitaciones a eventos exclusivos", "Experiencias personalizadas"],
};

const tierStyles = {
    gold: "bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-600 border-amber-500 text-black",
    platinum: "bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500 border-slate-400 text-black",
    black: "bg-gradient-to-br from-gray-800 via-black to-gray-900 border-gray-600 text-white",
};

const VipMembershipSection = () => {
    const { user, vipTier, loading: authLoading, refreshAuthStatus } = useAuth();
    const { toast } = useToast();
    const [membershipCode, setMembershipCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleActivation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !membershipCode) return;
        
        setLoading(true);
        const result = await activateVipMembership({ userId: user.uid, membershipCode });
        setLoading(false);

        if (result.success && result.tier) {
            toast({
                title: "¡Éxito!",
                description: result.message,
                variant: "success",
            });
            await refreshAuthStatus(); // Refresh user status to get the new tier
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
                        <Award className="h-6 w-6" />
                        <span>Membresía VIP</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-40">
                   <Loader2 className="h-8 w-8 animate-spin" />
                </CardContent>
            </Card>
        );
    }
    
    if (vipTier) {
        const tierName = vipTier.charAt(0).toUpperCase() + vipTier.slice(1);
        const style = tierStyles[vipTier as keyof typeof tierStyles];
        const tierBenefits = benefits[vipTier as keyof typeof benefits];

        return (
             <Card className={cn("shadow-2xl border-2 transition-all duration-500", style)}>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between text-2xl font-headline drop-shadow-lg">
                        <span>{tierName} Member</span>
                        <Star className="h-8 w-8 fill-current opacity-80" />
                    </CardTitle>
                     <CardDescription className={cn(vipTier === 'black' ? 'text-white/70' : 'text-black/70')}>Estos son tus beneficios exclusivos.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {tierBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 opacity-90"/>
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
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
