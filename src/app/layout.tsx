import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'Be On Trip',
  description: 'Tu compañero de viaje definitivo',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&family=Poppins:wght@400;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.ibb.co/jK8GBnB/Chat-GPT-Image-9-lug-2025-14-16-37-removebg-preview.png" type="image/png" />
      </head>
      <body className="font-body antialiased bg-background">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
