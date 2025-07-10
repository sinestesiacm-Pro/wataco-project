'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Lock } from 'lucide-react';
import Image from 'next/image';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'El apellido es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  confirmEmail: z.string().email(),
  phone: z.string().min(5, 'El número de teléfono es requerido'),
}).refine(data => data.email === data.confirmEmail, {
  message: 'Los correos electrónicos no coinciden',
  path: ['confirmEmail'],
});

const BookingSummary = ({ hotelOffer, selectedRoom }: { hotelOffer: AmadeusHotelOffer, selectedRoom: Room }) => {
    const checkInDate = hotelOffer.offers[0].checkInDate;
    const checkOutDate = hotelOffer.offers[0].checkOutDate;
    const nights = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
    const price = parseFloat(selectedRoom.price.total);
    const taxes = price * 0.19; // Simulate 19% tax
    const total = price + taxes;

    return (
        <Card className="sticky top-28 shadow-lg">
            <CardHeader>
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={hotelOffer.hotel.media?.[0]?.uri || 'https://placehold.co/400x300.png'}
                        alt={hotelOffer.hotel.name || 'Hotel'}
                        fill
                        className="object-cover"
                    />
                </div>
                <CardTitle>{hotelOffer.hotel.name}</CardTitle>
                <CardDescription>{selectedRoom.description.text}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator />
                <div>
                    <p><strong>Check-in:</strong> {format(new Date(checkInDate), 'd MMM, yyyy', { locale: es })}</p>
                    <p><strong>Check-out:</strong> {format(new Date(checkOutDate), 'd MMM, yyyy', { locale: es })}</p>
                    <p><strong>Noches:</strong> {nights}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                     <div className="flex justify-between text-muted-foreground">
                        <span>Alojamiento x {nights} noches</span>
                        <span>${price.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-muted-foreground">
                        <span>Impuestos y tasas</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                     <div className="flex justify-between font-bold text-xl">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

interface CheckoutViewProps {
  hotelOffer: AmadeusHotelOffer;
  selectedRoom: Room;
}

export function CheckoutView({ hotelOffer, selectedRoom }: CheckoutViewProps) {
  const { toast } = useToast();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { firstName: '', lastName: '', email: '', confirmEmail: '', phone: '' },
  });

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    console.log(data);
    toast({
        title: "¡Reserva casi completa!",
        description: "Esta es una demostración. No se ha realizado ningún pago.",
        variant: "success"
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>¿Quién se hospeda?</CardTitle>
                    <CardDescription>Ingresa los datos del huésped principal.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                         <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="firstName">Nombre</Label>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => <Input id="firstName" {...field} />}
                                />
                                {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="lastName">Apellido</Label>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => <Input id="lastName" {...field} />}
                                />
                                {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        
                         <div>
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => <Input id="email" type="email" {...field} />}
                            />
                            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="confirmEmail">Confirmar Correo Electrónico</Label>
                            <Controller
                                name="confirmEmail"
                                control={control}
                                render={({ field }) => <Input id="confirmEmail" type="email" {...field} />}
                            />
                            {errors.confirmEmail && <p className="text-destructive text-sm mt-1">{errors.confirmEmail.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="phone">Teléfono de Contacto</Label>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => <Input id="phone" type="tel" {...field} />}
                            />
                            {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                        </div>
                         <div className="flex items-center justify-between pt-4">
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span>Revisa los detalles antes de confirmar.</span>
                            </div>
                            <Button type="submit" size="lg" className="bg-success hover:bg-success/90">
                                <Lock className="mr-2 h-4 w-4" />
                                Confirmar Reserva
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <BookingSummary hotelOffer={hotelOffer} selectedRoom={selectedRoom} />
        </div>
    </div>
  );
}
