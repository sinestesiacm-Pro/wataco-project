'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor, asegúrate de que tus contraseñas coinciden.",
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      toast({ title: "¡Cuenta creada!", description: "¡Bienvenido! Te has registrado con éxito." });
      router.push('/');
    } catch (error: any) {
      console.error(error);
      let description = "No se pudo crear la cuenta. Por favor, inténtalo de nuevo.";
       if (error.code === 'auth/invalid-api-key') {
        description = "La clave de API de Firebase no es válida. Revisa tu archivo .env y asegúrate de que las variables NEXT_PUBLIC_FIREBASE_* estén configuradas correctamente.";
      }
      toast({
        title: 'Falló el registro',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast({ title: "¡Cuenta creada!", description: "¡Bienvenido!" });
      router.push('/');
    } catch (error: any) {
      console.error(error);
      let description = 'No se pudo registrar con Google. Por favor, inténtalo de nuevo.';
      if (error.code === 'auth/unauthorized-domain') {
          description = "El dominio de esta aplicación no está autorizado. Encuentra el dominio correcto en la barra de URL de la ventana de vista previa y agrégalo a la consola de Firebase en Authentication > Settings > Authorized domains.";
      } else if (error.code === 'auth/invalid-api-key') {
        description = "La clave de API de Firebase no es válida. Revisa tu archivo .env y asegúrate de que las variables NEXT_PUBLIC_FIREBASE_* estén configuradas correctamente.";
      }
      toast({
        title: 'Falló el registro con Google',
        description: description,
        variant: 'destructive',
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Crea una Cuenta</CardTitle>
          <CardDescription>Únete a nosotros y empieza a planificar tu próxima aventura</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full font-bold" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Registrarse
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={googleLoading}>
             {googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icons.logo width={20} height={20} className="mr-2" />}
            Google
          </Button>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="underline text-primary">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
