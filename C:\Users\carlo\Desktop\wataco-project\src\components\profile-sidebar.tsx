'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Book, Plane, Images, Users, Gift, Globe, CircleDollarSign, Camera, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

const navItems = [
  { name: 'Próximo Viaje', href: 'next-trip', icon: Plane },
  { name: 'Reservas', href: 'bookings', icon: Book },
  { name: 'Álbumes', href: 'albums', icon: Images },
  { name: 'Social', href: 'social', icon: Users },
  { name: 'Membresía VIP', href: 'bonus', icon: Gift },
];

const bottomNavItems = [
    { name: 'Configuración', href: 'settings', icon: Settings },
];

export default function ProfileSidebar() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get('section') || 'next-trip';
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [language, setLanguage] = useState('es');
  const [currency, setCurrency] = useState('usd');

  const userInitial = user?.displayName ? user.displayName[0].toUpperCase() : <Users className="h-5 w-5" />;

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
    toast({
        title: 'Idioma Actualizado',
        description: `La selección de idioma es una demostración. La aplicación permanecerá en español.`,
    });
  }, [toast]);

  const handleCurrencyChange = useCallback((value: string) => {
    setCurrency(value);
     toast({
        title: 'Moneda Actualizada',
        description: `La selección de moneda es una demostración. Los precios seguirán mostrándose en USD.`,
    });
  }, [toast]);

  const handleAvatarClick = useCallback(() => {
      fileInputRef.current?.click();
  }, []);
  
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          console.log("Selected file:", file.name);
          toast({
              title: "Foto de Perfil Actualizada",
              description: "Tu nueva foto de perfil se ha guardado (simulación).",
              variant: "success",
          })
      }
  }, [toast]);

  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow space-y-6">
            {user && (
                <Card className="bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                    <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center">
                    <div className="relative group">
                        <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                            <AvatarFallback className="text-4xl">{userInitial}</AvatarFallback>
                        </Avatar>
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 border-white/30 group-hover:opacity-100 md:opacity-0 transition-opacity"
                            onClick={handleAvatarClick}
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold font-headline">{user.displayName}</h2>
                        <p className="text-sm text-white/80">{user.email}</p>
                    </div>
                    </div>
                    </CardContent>
                </Card>
            )}
            <Card className="p-2 bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={`/profile?section=${item.href}`}
                        className={cn(
                        'group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200',
                        item.href === activeSection
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-white/90 hover:bg-white/10'
                        )}
                    >
                        <item.icon
                        className={cn(
                            'mr-3 h-5 w-5 flex-shrink-0',
                            item.href === activeSection
                            ? 'text-primary-foreground'
                            : 'text-white/70 group-hover:text-white'
                        )}
                        />
                        {item.name}
                    </Link>
                    ))}
                </nav>
            </Card>
        </div>
        
        <div className="mt-6 space-y-6">
            <Card className="p-2 bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <nav className="space-y-1">
                    {bottomNavItems.map((item) => (
                    <Link
                        key={item.name}
                        href={`/profile?section=${item.href}`}
                        className={cn(
                        'group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200',
                        item.href === activeSection
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-white/90 hover:bg-white/10'
                        )}
                    >
                        <item.icon
                        className={cn(
                            'mr-3 h-5 w-5 flex-shrink-0',
                            item.href === activeSection
                            ? 'text-primary-foreground'
                            : 'text-white/70 group-hover:text-white'
                        )}
                        />
                        {item.name}
                    </Link>
                    ))}
                </nav>
            </Card>

            <Card className="p-4 bg-black/20 backdrop-blur-xl border-none text-white shadow-lg">
                <CardContent className="p-0">
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="language-select" className="flex items-center gap-2 mb-2 text-sm font-medium text-white/80">
                            <Globe className="h-4 w-4" /> Idioma
                        </Label>
                        <Select value={language} onValueChange={handleLanguageChange}>
                            <SelectTrigger id="language-select" className="bg-black/20 border-white/30 text-white">
                                <SelectValue placeholder="Seleccionar idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="it">Italiano</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="currency-select" className="flex items-center gap-2 mb-2 text-sm font-medium text-white/80">
                            <CircleDollarSign className="h-4 w-4" /> Moneda
                        </Label>
                        <Select value={currency} onValueChange={handleCurrencyChange}>
                            <SelectTrigger id="currency-select" className="bg-black/20 border-white/30 text-white">
                                <SelectValue placeholder="Seleccionar moneda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="usd">USD - Dólar estadounidense</SelectItem>
                                <SelectItem value="eur">EUR - Euro</SelectItem>
                                <SelectItem value="cop">COP - Peso colombiano</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
