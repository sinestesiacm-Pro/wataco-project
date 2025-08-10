import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context';
import { ChatWidget } from '@/components/chat-widget';
import { BottomNavbar } from '@/components/bottom-navbar';
import { ThemeProvider, ThemeWrapper } from '@/contexts/theme-context';

export const metadata: Metadata = {
  title: 'BE ON TRIP',
  description: 'Your global travel platform to discover the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="https://i.ibb.co/HS47tyK/Logo-moderno-ORVIAN-su-fondo-blu.png" type="image/png" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AuthProvider>
            <ThemeWrapper>
                <Header />
                <main className="flex-grow flex flex-col">
                    {children}
                </main>
                <Toaster />
                <ChatWidget />
                <BottomNavbar />
            </ThemeWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    