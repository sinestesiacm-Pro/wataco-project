import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context';
import { ChatWidget } from '@/components/chat-widget';
import { BottomNavbar } from '@/components/bottom-navbar';

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.ibb.co/jK8GBnB/Chat-GPT-Image-9-lug-2025-14-16-37-removebg-preview.png" type="image/png" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-dvh">
        <AuthProvider>
            <Header />
            <main className="flex-grow flex flex-col">
                {children}
            </main>
            <Toaster />
            <ChatWidget />
            <BottomNavbar />
        </AuthProvider>
      </body>
    </html>
  );
}
