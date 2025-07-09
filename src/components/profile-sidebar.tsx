'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Book, Plane, Images, Users, Settings, Gift, Globe, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

const navItems = [
  { name: 'Próximo Viaje', href: 'next-trip', icon: Plane },
  { name: 'Reservas', href: 'bookings', icon: Book },
  { name: 'Álbumes', href: 'albums', icon: Images },
  { name: 'Social', href: 'social', icon: Users },
  { name: 'Activar Bono', href: 'bonus', icon: Gift },
  { name: 'Configuración', href: 'settings', icon: Settings },
];

export default function ProfileSidebar() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get('section') || 'next-trip';
  const { user } = useAuth();

  const userInitial = user?.displayName ? user.displayName[0].toUpperCase() : <Users className="h-5 w-5" />;

  return (
    <aside className="space-y-6 sticky top-24">
      {user && (
        <Card className="shadow-lg">
            <div className="flex flex-col items-center text-center p-4">
            <Avatar className="h-20 w-20 mb-4 border-2 border-primary">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback className="text-3xl">{userInitial}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-xl font-bold font-headline">{user.displayName}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            </div>
        </Card>
      )}
      <Card className="shadow-lg p-2">
        <nav className="space-y-1">
            {navItems.map((item) => (
            <Link
                key={item.name}
                href={`/profile?section=${item.href}`}
                className={cn(
                'group flex items-center px-3 py-3 text-sm font-semibold rounded-md transition-colors duration-200',
                item.href === activeSection
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground hover:bg-muted'
                )}
            >
                <item.icon
                className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    item.href === activeSection
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground group-hover:text-primary'
                )}
                />
                {item.name}
            </Link>
            ))}
        </nav>
      </Card>
       <Card className="shadow-lg p-4">
        <div className="space-y-4">
            <div>
                <Label htmlFor="language-select" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <Globe className="h-4 w-4 text-muted-foreground" /> Idioma
                </Label>
                <Select defaultValue="es">
                    <SelectTrigger id="language-select">
                        <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="currency-select" className="flex items-center gap-2 mb-2 text-sm font-semibold">
                    <CircleDollarSign className="h-4 w-4 text-muted-foreground" /> Moneda
                </Label>
                <Select defaultValue="usd">
                    <SelectTrigger id="currency-select">
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
      </Card>
    </aside>
  );
}
