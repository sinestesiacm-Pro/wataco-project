'use client';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AmadeusHotelOffer, Room } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Lock, CreditCard, Landmark, CheckCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '@/lib/utils';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'El apellido es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  confirmEmail: z.string().email(),
  phone: z.string().min(5, 'El número de teléfono es requerido'),
  paymentMethod: z.enum(['credit-card', 'paypal']),
  cardNumber: z.string().optional(),
  cardHolder: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).refine(data => data.email === data.confirmEmail, {
  message: 'Los correos electrónicos no coinciden',
  path: ['confirmEmail'],
});

const BookingSummary = ({ hotelOffer, selectedRoom, adults, children, numberOfRooms }: { hotelOffer: AmadeusHotelOffer, selectedRoom: Room, adults: number, children: number, numberOfRooms: number }) => {
    const checkInDate = hotelOffer.offers[0].checkInDate;
    const checkOutDate = hotelOffer.offers[0].checkOutDate;
    const nights = differenceInDays(new Date(checkOutDate), new Date(checkInDate));
    
    const pricePerRoom = parseFloat(selectedRoom.price.total);
    const accommodationPrice = pricePerRoom * numberOfRooms;
    const taxes = accommodationPrice * 0.19; // Simulate 19% tax
    const total = accommodationPrice + taxes;
    
    const guestsText = `${adults} adulto${adults > 1 ? 's' : ''}` + (children > 0 ? `, ${children} niño${children > 1 ? 's' : ''}` : '');

    return (
        <Card className="shadow-lg">
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
                <CardDescription>{selectedRoom.room.description.text}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Separator/>
                <div>
                    <p><strong>Check-in:</strong> {format(new Date(checkInDate), 'd MMM, yyyy', { locale: es })}</p>
                    <p><strong>Check-out:</strong> {format(new Date(checkOutDate), 'd MMM, yyyy', { locale: es })}</p>
                    <p><strong>Huéspedes:</strong> {guestsText}</p>
                    <p><strong>Noches:</strong> {nights}</p>
                    <p><strong>Habitaciones:</strong> {numberOfRooms}</p>
                </div>
                <Separator/>
                <div className="space-y-2">
                     <div className="flex justify-between text-muted-foreground">
                        <span>Alojamiento ({numberOfRooms} hab. x {nights} noches)</span>
                        <span>${accommodationPrice.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-muted-foreground">
                        <span>Impuestos y tasas</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                    <Separator/>
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
  adults: number;
  children: number;
  numberOfRooms: number;
  onBack: () => void;
}

export function CheckoutView({ hotelOffer, selectedRoom, adults, children, numberOfRooms, onBack }: CheckoutViewProps) {
  const { toast } = useToast();
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { 
        firstName: '', 
        lastName: '', 
        email: '', 
        confirmEmail: '', 
        phone: '',
        paymentMethod: 'credit-card' as const,
        cardNumber: '',
        cardHolder: '',
        cardExpiry: '',
        cardCvc: '',
    },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    console.log(data);
    toast({
        title: "¡Reserva casi completa!",
        description: "Esta es una demostración. No se ha realizado ningún pago.",
        variant: "success"
    });
  };

  return (
    <>
        <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a la selección de habitación
            </Button>
            <h2 className="hidden md:block text-2xl font-bold font-headline text-center">Revisa y Paga</h2>
            <div className="w-32"></div>
        </div>

     <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8">
        {/* BookingSummary is now at the top */}
        <BookingSummary hotelOffer={hotelOffer} selectedRoom={selectedRoom} adults={adults} children={children} numberOfRooms={numberOfRooms} />

        {/* Guest Details */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CheckCircle className="text-primary"/> ¿Quién se hospeda?</CardTitle>
                <CardDescription>Ingresa los datos del huésped principal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
        </Card>
        
        {/* Payment Method */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="text-primary"/> Método de Pago</CardTitle>
                <CardDescription>Esta es una demostración. No se procesarán pagos reales.</CardDescription>
            </CardHeader>
            <CardContent>
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value} 
                            className="mb-6 grid grid-cols-2 gap-4"
                        >
                            <Label htmlFor="credit-card" className={cn("flex items-center gap-2 border rounded-md p-3 hover:bg-muted cursor-pointer", paymentMethod === 'credit-card' && 'bg-primary/10 border-primary')}>
                                <RadioGroupItem value="credit-card" id="credit-card"/>
                                <CreditCard />
                                <span>Tarjeta de crédito</span>
                            </Label>
                             <Label htmlFor="paypal" className={cn("flex items-center gap-2 border rounded-md p-3 hover:bg-muted cursor-pointer", paymentMethod === 'paypal' && 'bg-primary/10 border-primary')}>
                                <RadioGroupItem value="paypal" id="paypal"/>
                                <Landmark />
                                <span>PayPal</span>
                             </Label>
                        </RadioGroup>
                    )}
                />
               {paymentMethod === 'credit-card' && (
                <div className="space-y-4">
                     <div>
                        <Label htmlFor="cardHolder">Nombre en la tarjeta</Label>
                        <Controller
                            name="cardHolder"
                            control={control}
                            render={({ field }) => <Input id="cardHolder" {...field} placeholder="J. Doe" />}
                        />
                     </div>
                     <div>
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                         <Controller
                            name="cardNumber"
                            control={control}
                            render={({ field }) => <Input id="cardNumber" {...field} placeholder="**** **** **** 1234" />}
                        />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="cardExpiry">Vencimiento</Label>
                             <Controller
                                name="cardExpiry"
                                control={control}
                                render={({ field }) => <Input id="cardExpiry" {...field} placeholder="MM/AA" />}
                            />
                        </div>
                         <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                             <Controller
                                name="cardCvc"
                                control={control}
                                render={({ field }) => <Input id="cardCvc" {...field} placeholder="123" />}
                            />
                        </div>
                     </div>
                </div>
               )}
               {paymentMethod === 'paypal' && (
                   <div className="text-center p-8 border border-dashed rounded-lg">
                       <p>Serás redirigido a PayPal para completar tu pago de forma segura.</p>
                   </div>
               )}
            </CardContent>
             <CardFooter className="flex-col items-start gap-4">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                   <AlertCircle className="h-4 w-4" />
                   <span>Revisa los detalles antes de confirmar.</span>
               </div>
               <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                   <Lock className="mr-2 h-4 w-4" />
                   Confirmar Reserva
               </Button>
            </CardFooter>
        </Card>
    </form>
    </>
  );
}
