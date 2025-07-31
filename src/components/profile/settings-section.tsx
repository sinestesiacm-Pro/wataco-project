'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Bell, Palette, Languages, Lock, Shield, HelpCircle, Info } from "lucide-react";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const SectionCard = ({ title, description, icon: Icon, children }: { title: string, description: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Card className="bg-black/20 backdrop-blur-xl border-none text-white">
        <CardHeader>
            <div className="flex items-start gap-4">
                <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <CardTitle className="text-white text-lg">{title}</CardTitle>
                    <CardDescription className="text-white/70">{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
)

export function SettingsSection() {
  return (
    <div className="space-y-8">
        <div className="flex items-center gap-3">
             <Settings className="h-8 w-8 text-white" />
             <h1 className="text-3xl font-headline text-white">Configuración</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-8">
                <SectionCard
                    title="Información de la Cuenta"
                    description="Actualiza tus datos personales y gestiona tu cuenta."
                    icon={User}
                >
                   <div className="space-y-4">
                        <div>
                            <Label htmlFor="displayName" className="text-white/80">Nombre</Label>
                            <Input id="displayName" defaultValue="Dev User" className="bg-black/20 border-white/30" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-white/80">Correo Electrónico</Label>
                            <Input id="email" type="email" defaultValue="dev@example.com" className="bg-black/20 border-white/30" />
                        </div>
                        <Button variant="outline" className="bg-transparent border-white/30 hover:bg-white/10">Cambiar Contraseña</Button>
                   </div>
                   <Separator className="my-6 bg-white/20" />
                   <div className="space-y-2">
                     <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">Gestionar Dispositivos Conectados</Button>
                     <br />
                     <Button variant="link" className="p-0 h-auto text-destructive/80 hover:text-destructive">Eliminar Cuenta</Button>
                   </div>
                </SectionCard>

                <SectionCard
                    title="Preferencias de la Aplicación"
                    description="Personaliza tu experiencia en la aplicación."
                    icon={Palette}
                >
                   <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode" className="text-white">Modo Oscuro</Label>
                            <Switch id="dark-mode" disabled />
                        </div>
                         <div className="space-y-2">
                           <Label htmlFor="language" className="text-white/80">Idioma</Label>
                             <Select defaultValue="es">
                              <SelectTrigger id="language" className="w-full bg-black/20 border-white/30">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="es">Español</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                   </div>
                </SectionCard>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
                 <SectionCard
                    title="Notificaciones"
                    description="Elige cómo quieres que te contactemos."
                    icon={Bell}
                >
                   <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="push-notifications" className="text-white">Notificaciones Push</Label>
                            <Switch id="push-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="email-offers" className="text-white">Ofertas por correo</Label>
                            <Switch id="email-offers" defaultChecked />
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="email-updates" className="text-white">Actualizaciones de Reserva</Label>
                            <Switch id="email-updates" defaultChecked />
                        </div>
                   </div>
                </SectionCard>
                <SectionCard
                    title="Privacidad y Soporte"
                    description="Consulta nuestras políticas y obtén ayuda."
                    icon={Shield}
                >
                   <div className="space-y-2 flex flex-col items-start">
                        <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">Política de Privacidad</Button>
                        <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">Términos de Servicio</Button>
                        <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">Preguntas Frecuentes (FAQ)</Button>
                        <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">Contactar Soporte</Button>
                   </div>
                </SectionCard>
            </div>
        </div>
    </div>
  );
}
