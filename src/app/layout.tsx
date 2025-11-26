
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/header';
import { AuthProvider } from '@/contexts/auth-context';
import { ChatWidget } from '@/components/chat-widget';
import { BottomNavbar } from '@/components/bottom-navbar';
import { ThemeProvider } from '@/contexts/theme-context';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Uataco',
  description: 'Uataco - Your global travel platform to discover the world.',
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
        <link rel="icon" href="https://i.ibb.co/L60z0hY/wataco-logo-favicon.png" type="image/png" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <AuthProvider>
            <div className={cn('flex flex-col min-h-dvh')}>
                <Header />
                <main className="flex-grow flex flex-col">
                    {children}
                </main>
                <Toaster />
                <ChatWidget />
                <BottomNavbar />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
