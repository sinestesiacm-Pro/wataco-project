
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, CreditCard, User, Mail, ArrowLeft, Landmark } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const countryCodes = [
    { code: 'co', name: 'Colombia', dial: '+57' },
    { code: 'ar', name: 'Argentina', dial: '+54' },
    { code: 'cl', name: 'Chile', dial: '+56' },
    { code: 'mx', name: 'Mexico', dial: '+52' },
    { code: 'es', name: 'Spain', dial: '+34' },
    { code: 'us', name: 'United States', dial: '+1' },
];

const PassengerForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User /> ¿Quién viaja?</CardTitle>
                <CardDescription>Ingresa los datos del pasajero principal. Deben coincidir con su documento de identidad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">Nombre(s)</Label>
                        <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Apellido(s)</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                </div>
                 <div>
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Input id="birthDate" type="date" placeholder="DD/MM/AAAA" />
                </div>
                <div>
                    <Label>Género</Label>
                     <RadioGroup defaultValue="female" className="flex items-center gap-4 pt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Femenino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Masculino</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="residence-country">País de Residencia</Label>
                   <Select>
                        <SelectTrigger id="residence-country">
                            <SelectValue placeholder="Selecciona un país" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="co">Colombia</SelectItem>
                            <SelectItem value="ar">Argentina</SelectItem>
                            <SelectItem value="cl">Chile</SelectItem>
                            <SelectItem value="mx">México</SelectItem>
                            <SelectItem value="es">España</SelectItem>
                             <SelectItem value="us">Estados Unidos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="document-type">Tipo de Documento</Label>
                        <Select>
                            <SelectTrigger id="document-type">
                                <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="passport">Pasaporte</SelectItem>
                                <SelectItem value="id">Cédula de Identidad</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="document-number">Número de Documento</Label>
                        <Input id="document-number" placeholder="AB1234567" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const ContactInfoForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail /> Información de Contacto</CardTitle>
                <CardDescription>Te enviaremos la confirmación de tu reserva a este correo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div>
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <div className="flex gap-2 mt-1">
                        <Select defaultValue="us">
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Código" />
                            </SelectTrigger>
                            <SelectContent className="min-w-[250px]">
                                {countryCodes.map(country => (
                                     <SelectItem key={country.code} value={country.code}>
                                        <div className="flex items-center gap-2">
                                            <Image 
                                                src={`https://flagcdn.com/w20/${country.code}.png`}
                                                alt={`${country.name} flag`}
                                                width={20}
                                                height={15}
                                            />
                                            <span>{country.name} ({country.dial})</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input id="phone" type="tel" placeholder="234 567 890" className="flex-grow" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const PaymentForm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Método de Pago</CardTitle>
                <CardDescription>Todas las transacciones son seguras y encriptadas.</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="credit-card" className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="credit-card" className="flex items-center gap-2 border rounded-md p-3 hover:bg-accent cursor-pointer has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <CreditCard />
                            <span>Tarjeta de crédito</span>
                        </Label>
                        <Label htmlFor="paypal" className="flex items-center gap-2 border rounded-md p-3 hover:bg-accent cursor-pointer has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Landmark />
                            <span>PayPal</span>
                        </Label>
                    </div>
                </RadioGroup>
                
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="cardHolder">Nombre en la tarjeta</Label>
                        <Input id="cardHolder" placeholder="John Doe" />
                    </div>
                    <div>
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input id="cardNumber" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="cardExpiry">Vencimiento</Label>
                            <Input id="cardExpiry" placeholder="MM/AA" />
                        </div>
                        <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input id="cardCvc" placeholder="123" />
                        </div>
                    </div>
                     <Separator className="my-4"/>
                     <CardTitle className="text-lg">Dirección de Facturación</CardTitle>
                     <div>
                        <Label htmlFor="billing-address">Dirección</Label>
                        <Input id="billing-address" placeholder="123 Main St" />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="billing-city">Ciudad</Label>
                            <Input id="billing-city" placeholder="New York" />
                        </div>
                        <div>
                            <Label htmlFor="billing-zip">Código Postal</Label>
                            <Input id="billing-zip" placeholder="10001" />
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="billing-country">País</Label>
                        <Select>
                            <SelectTrigger id="billing-country">
                                <SelectValue placeholder="Selecciona un país" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="co">Colombia</SelectItem>
                                <SelectItem value="ar">Argentina</SelectItem>
                                <SelectItem value="cl">Chile</SelectItem>
                                <SelectItem value="mx">México</SelectItem>
                                <SelectItem value="es">España</SelectItem>
                                <SelectItem value="us">Estados Unidos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


const PriceSummary = () => {
    // In a real app, you would fetch flight details based on IDs from searchParams
    const searchParams = useSearchParams();
    const addons = parseFloat(searchParams.get('addons') || '0');
    // Mock prices for demo
    const flightPrice = 134.00;
    const taxes = 46.80;
    const total = flightPrice + taxes + addons;
    
    return (
        <Card className="sticky top-28 shadow-lg">
            <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex justify-between text-muted-foreground">
                    <span>Vuelos</span>
                    <span>${flightPrice.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                    <span>Impuestos y tasas</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                 {addons > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span>Servicios Adicionales</span>
                        <span>${addons.toFixed(2)}</span>
                    </div>
                 )}
                <Separator />
                 <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                 <p className="text-xs text-muted-foreground">
                    Al completar esta compra, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a> y <a href="#" className="underline">Política de Privacidad</a>.
                </p>
            </CardContent>
        </Card>
    );
}

function CheckoutPageContent() {
    const { toast } = useToast();
    const router = useRouter();

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "¡Reserva Confirmada!",
            description: "Tu viaje ha sido reservado con éxito. Te hemos enviado un correo con los detalles.",
            variant: "success",
        });
        setTimeout(() => router.push('/'), 2000);
    };

    return (
      <div className="bg-muted/30 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
                <Button asChild variant="outline" className="mr-4">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4"/>
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold font-headline">Finaliza tu Compra</h1>
            </div>
            
            <form onSubmit={handleConfirmBooking}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <PassengerForm />
                        <ContactInfoForm />
                        <PaymentForm />
                        <div className="flex justify-end pt-4">
                            <Button type="submit" size="lg" className="bg-success hover:bg-success/90 w-full sm:w-auto">
                                <Lock className="mr-2 h-4 w-4" />
                                Confirmar y Pagar
                            </Button>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <PriceSummary />
                    </div>
                </div>
            </form>
        </div>
      </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        }>
            <CheckoutPageContent />
        </Suspense>
    )
}
