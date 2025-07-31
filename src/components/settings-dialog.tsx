'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Bell, Palette, Shield, Save } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SectionCard = ({ title, description, icon: Icon, children, footer }: { title: string, description: string, icon: React.ElementType, children: React.ReactNode, footer?: React.ReactNode }) => (
    <Card className="bg-background/80 flex flex-col border-none shadow-none">
        <CardHeader>
            <div className="flex items-start gap-4">
                <Icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                    <CardTitle className="text-lg">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="flex-grow">
            {children}
        </CardContent>
        {footer && <div className="p-6 pt-0 mt-4">{footer}</div>}
    </Card>
)

export function SettingsDialog({ children }: { children: React.ReactNode }) {
  const { colorTheme, setColorTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSaveChanges = () => {
    console.log("Saving changes:", { displayName, email });
    toast({
        title: "Cambios Guardados",
        description: "Tu información de perfil ha sido actualizada.",
        variant: "success",
    });
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-[95%] bg-card/80 backdrop-blur-xl border-white/20 shadow-2xl rounded-3xl text-card-foreground">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl font-headline">
                    <Settings className="h-6 w-6"/>
                    Configuración General
                </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-4 max-h-[70vh] overflow-y-auto px-1">
                <SectionCard
                    title="Información de la Cuenta"
                    description="Actualiza tus datos personales y gestiona tu cuenta."
                    icon={User}
                >
                   <div className="space-y-4">
                        <div>
                            <Label htmlFor="displayName">Nombre</Label>
                            <Input 
                                id="displayName" 
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button variant="outline">Cambiar Contraseña</Button>
                   </div>
                   <Separator className="my-6" />
                   <div className="space-y-2">
                     <Button variant="link" className="p-0 h-auto">Gestionar Dispositivos Conectados</Button>
                     <br />
                     <Button variant="link" className="p-0 h-auto text-destructive/80 hover:text-destructive">Eliminar Cuenta</Button>
                   </div>
                </SectionCard>

                <div className="space-y-8">
                     <SectionCard
                        title="Preferencias"
                        description="Personaliza la apariencia y el comportamiento de la aplicación."
                        icon={Palette}
                    >
                       <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="dark-mode">Modo Oscuro</Label>
                                <Switch 
                                    id="dark-mode" 
                                    checked={colorTheme === 'dark'}
                                    onCheckedChange={(checked) => setColorTheme(checked ? 'dark' : 'light')}
                                />
                            </div>
                       </div>
                    </SectionCard>
                    
                     <SectionCard
                        title="Notificaciones"
                        description="Elige cómo quieres que te contactemos."
                        icon={Bell}
                    >
                       <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="push-notifications">Notificaciones Push</Label>
                                <Switch id="push-notifications" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-offers">Ofertas por correo</Label>
                                <Switch id="email-offers" defaultChecked />
                            </div>
                       </div>
                    </SectionCard>
                    
                    <SectionCard
                        title="Privacidad y Soporte"
                        description="Consulta nuestras políticas y obtén ayuda."
                        icon={Shield}
                    >
                       <div className="space-y-2 flex flex-col items-start">
                            <Button variant="link" className="p-0 h-auto">Política de Privacidad</Button>
                            <Button variant="link" className="p-0 h-auto">Términos de Servicio</Button>
                            <Button variant="link" className="p-0 h-auto">Preguntas Frecuentes (FAQ)</Button>
                            <Button variant="link" className="p-0 h-auto">Contactar Soporte</Button>
                       </div>
                    </SectionCard>
                </div>
            </div>

            <DialogFooter>
                 <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
}
