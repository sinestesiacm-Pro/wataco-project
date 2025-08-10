'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, CreditCard, User, Mail, ArrowLeft, Landmark, Car, ShieldCheck, Camera, Hotel, Plane } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { recommendedPackages } from '@/lib/mock-packages';
import type { PackageOffer } from '@/lib/types';
import { cn } from '@/lib/utils';

const countryCodes = [
    { code: 'co', name: 'Colombia', dial: '+57' },
    { code: 'ar', name: 'Argentina', dial: '+54' },
    { code: 'cl', name: 'Chile', dial: '+56' },
    { code: 'mx', name: 'Mexico', dial: '+52' },
    { code: 'es', name: 'España', dial: '+34' },
    { code: 'us', name: 'United States', dial: '+1' },
];

const PassengerForm = ({ isPackageBooking }: { isPackageBooking: boolean }) => {
    return (
        <Card className="bg-white text-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User /> ¿Quién viaja?</CardTitle>
                <CardDescription>Ingresa los datos del pasajero principal. Deben coincidir con su documento de identidad.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">Nombre(s)</Label>
                        <Input id="firstName" placeholder="John" className="bg-white border-gray-300" />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Apellido(s)</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-white border-gray-300" />
                    </div>
                </div>
                 <div>
                    <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                    <Input id="birthDate" type="date" placeholder="DD/MM/AAAA" className="bg-white border-gray-300" />
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
                        <SelectTrigger id="residence-country" className="bg-white border-gray-300">
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
                            <SelectTrigger id="document-type" className="bg-white border-gray-300">
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
                        <Input id="document-number" placeholder="AB1234567" className="bg-white border-gray-300" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const ContactInfoForm = ({ isPackageBooking }: { isPackageBooking: boolean }) => {
    const [selectedCountryCode, setSelectedCountryCode] = useState('us');

    const SelectedCountryDisplay = ({ code }: { code: string }) => {
        const country = countryCodes.find(c => c.code === code);
        if (!country) return null;
        return (
            <div className="flex items-center gap-2">
                <Image 
                    src={`https://flagcdn.com/w20/${country.code}.png`}
                    alt={`${country.name} flag`}
                    width={20}
                    height={15}
                />
                <span>{country.dial}</span>
            </div>
        )
    }

    return (
        <Card className="bg-white text-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail /> Información de Contacto</CardTitle>
                <CardDescription>Te enviaremos la confirmación de tu reserva a este correo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="bg-white border-gray-300" />
                </div>
                <div>
                    <Label htmlFor="phone">Número de Teléfono</Label>
                    <div className="flex gap-2 mt-1">
                        <Select value={selectedCountryCode} onValueChange={setSelectedCountryCode}>
                            <SelectTrigger className="w-[120px] bg-white border-gray-300">
                                <SelectValue asChild>
                                    <SelectedCountryDisplay code={selectedCountryCode} />
                                </SelectValue>
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
                        <Input id="phone" type="tel" placeholder="234 567 890" className="flex-grow bg-white border-gray-300" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const additionalServices = [
    { id: 'transfer', name: 'Traslado Aeropuerto-Hotel', description: 'Traslado privado y cómodo para 2 personas.', price: 80.00, icon: Car },
    { id: 'insurance', name: 'Seguro de Viaje Completo', description: 'Cobertura médica, de equipaje y cancelación.', price: 45.50, icon: ShieldCheck },
    { id: 'city-tour', name: 'Tour por la Ciudad', description: 'Descubre los secretos de tu destino con un guía local.', price: 55.00, icon: Camera },
];

const AdditionalServicesForm = ({ onPriceChange, isPackageBooking }: { onPriceChange: (price: number) => void, isPackageBooking: boolean }) => {
    const { toast } = useToast();

    const handleServiceToggle = (checked: boolean, price: number) => {
        onPriceChange(checked ? price : -price);
        if (checked) {
            toast({
                title: "Servicio añadido",
                description: `El servicio ha sido añadido a tu reserva.`,
                variant: 'success'
            })
        }
    }
    
    return (
        <Card className="bg-white text-gray-800">
            <CardHeader>
                <CardTitle>Mejora tu Viaje</CardTitle>
                <CardDescription>Añade servicios adicionales para una experiencia inolvidable.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {additionalServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-3 rounded-lg border bg-gray-100/80">
                        <div className="flex items-center gap-4">
                           <service.icon className="h-8 w-8 text-primary" />
                           <div>
                             <Label htmlFor={service.id} className="font-semibold">{service.name}</Label>
                             <p className="text-xs text-gray-500">{service.description}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-semibold text-lg text-primary">
                                +${service.price.toFixed(2)}
                            </span>
                             <Switch 
                                id={service.id} 
                                onCheckedChange={(checked) => handleServiceToggle(checked, service.price)}
                             />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};


const PaymentForm = ({ isPackageBooking }: { isPackageBooking: boolean }) => {
    return (
        <Card className="bg-white text-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Método de Pago</CardTitle>
                <CardDescription>Todas las transacciones son seguras y encriptadas.</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="credit-card" className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="credit-card" className="flex items-center gap-2 border rounded-md p-3 hover:bg-gray-100 cursor-pointer has-[[data-state=checked]]:bg-blue-50 has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <CreditCard />
                            <span>Tarjeta de crédito</span>
                        </Label>
                        <Label htmlFor="paypal" className="flex items-center gap-2 border rounded-md p-3 hover:bg-gray-100 cursor-pointer has-[[data-state=checked]]:bg-blue-50 has-[[data-state=checked]]:border-primary">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Landmark />
                            <span>PayPal</span>
                        </Label>
                    </div>
                </RadioGroup>
                
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="cardHolder">Nombre en la tarjeta</Label>
                        <Input id="cardHolder" placeholder="John Doe" className="bg-white border-gray-300" />
                    </div>
                    <div>
                        <Label htmlFor="cardNumber">Número de tarjeta</Label>
                        <Input id="cardNumber" placeholder="**** **** **** 1234" className="bg-white border-gray-300" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="cardExpiry">Vencimiento</Label>
                            <Input id="cardExpiry" placeholder="MM/AA" className="bg-white border-gray-300" />
                        </div>
                        <div>
                            <Label htmlFor="cardCvc">CVC</Label>
                            <Input id="cardCvc" placeholder="123" className="bg-white border-gray-300" />
                        </div>
                    </div>
                     <Separator className="my-4"/>
                     <CardTitle className="text-lg">Dirección de Facturación</CardTitle>
                     <div>
                        <Label htmlFor="billing-address">Dirección</Label>
                        <Input id="billing-address" placeholder="123 Main St" className="bg-white border-gray-300" />
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="billing-city">Ciudad</Label>
                            <Input id="billing-city" placeholder="New York" className="bg-white border-gray-300" />
                        </div>
                        <div>
                            <Label htmlFor="billing-zip">Código Postal</Label>
                            <Input id="billing-zip" placeholder="10001" className="bg-white border-gray-300" />
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="billing-country">País</Label>
                        <Select>
                            <SelectTrigger id="billing-country" className="bg-white border-gray-300">
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


const PriceSummary = ({ isPackageBooking, extraServicesPrice, onConfirm }: { isPackageBooking: boolean, extraServicesPrice: number, onConfirm: (e: React.FormEvent) => void }) => {
    const searchParams = useSearchParams();
    const packageId = searchParams.get('packageId');
    const hotelPrice = parseFloat(searchParams.get('hotelPrice') || '0');
    
    const [pkg, setPackage] = useState<PackageOffer | null>(null);

    useEffect(() => {
        if (packageId) {
            const foundPackage = recommendedPackages.find(p => p.id === packageId);
            setPackage(foundPackage || null);
        }
    }, [packageId]);

    const isPkg = !!pkg;
    const addons = parseFloat(searchParams.get('addons') || '0');
    const flightPrice = isPkg ? 0 : 134.00; // Flight price is part of package
    const taxes = isPkg && pkg ? (pkg.price + hotelPrice) * 0.19 : 46.80; // Example tax
    
    const baseTotal = isPkg && pkg ? pkg.price + hotelPrice : flightPrice + taxes;
    const total = baseTotal + addons + extraServicesPrice;
    
    return (
        <Card className="sticky top-28 shadow-lg bg-white text-gray-800">
            <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
                 {pkg && <CardDescription>Paquete: {pkg.title}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
                 {isPackageBooking && pkg ? (
                    <>
                        <div className="flex justify-between font-semibold">
                            <span><Plane className="inline-block mr-2 h-4 w-4"/>Vuelo</span>
                            <span>Incluido</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span><Hotel className="inline-block mr-2 h-4 w-4"/>Hotel</span>
                            <span>+${hotelPrice.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-gray-500">
                            <span>Precio base paquete</span>
                            <span>${pkg.price.toFixed(2)}</span>
                        </div>
                    </>
                 ) : (
                    <div className="flex justify-between text-gray-500">
                        <span>Vuelos</span>
                        <span>${flightPrice.toFixed(2)}</span>
                    </div>
                 )}
                 <div className="flex justify-between text-gray-500">
                    <span>Impuestos y tasas</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                 {addons > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span>Servicios de Tarifa</span>
                        <span>${addons.toFixed(2)}</span>
                    </div>
                 )}
                  {extraServicesPrice > 0 && (
                    <div className="flex justify-between text-primary font-medium">
                        <span>Servicios Adicionales</span>
                        <span>${extraServicesPrice.toFixed(2)}</span>
                    </div>
                 )}
                <Separator />
                 <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                 <p className="text-xs text-gray-500">
                    Al completar esta compra, aceptas nuestros <a href="#" className="underline">Términos de Servicio</a> y <a href="#" className="underline">Política de Privacidad</a>.
                </p>
            </CardContent>
             <CardFooter>
                 <Button size="lg" className="w-full bg-success hover:bg-success/90 text-success-foreground" onClick={onConfirm}>
                    <Lock className="mr-2 h-5 w-5" />
                    Confirmar y Pagar
                </Button>
            </CardFooter>
        </Card>
    );
}

function CheckoutPageContent() {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPackageBooking = !!searchParams.get('packageId');

    const [extraServicesPrice, setExtraServicesPrice] = useState(0);

    const handleConfirmBooking = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "¡Reserva Confirmada!",
            description: "Tu viaje ha sido reservado con éxito. Te hemos enviado un correo con los detalles.",
            variant: "success",
        });
        setTimeout(() => router.push('/'), 2000);
    };

    const backgroundClass = isPackageBooking
      ? 'bg-packages-gradient background-pan-animation'
      : '';

    return (
      <div className={cn("min-h-screen relative pt-24 pb-24", backgroundClass)}>
        <div className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
                <Button asChild variant="outline" className={cn("mr-4", isPackageBooking ? 'bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white' : 'bg-background/80')}>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4"/>
                    </Link>
                </Button>
                <h1 className={cn("text-3xl font-bold font-headline", isPackageBooking ? 'text-white' : 'text-gray-800')}>Finaliza tu Compra</h1>
            </div>
            
            <form onSubmit={handleConfirmBooking}>
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <PassengerForm isPackageBooking={isPackageBooking}/>
                        <ContactInfoForm isPackageBooking={isPackageBooking}/>
                        {isPackageBooking && <AdditionalServicesForm onPriceChange={(price) => setExtraServicesPrice(p => p + price)} isPackageBooking={isPackageBooking}/>}
                        <PaymentForm isPackageBooking={isPackageBooking}/>
                    </div>
                    <div className="lg:col-span-1">
                        <PriceSummary isPackageBooking={isPackageBooking} extraServicesPrice={extraServicesPrice} onConfirm={handleConfirmBooking}/>
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
