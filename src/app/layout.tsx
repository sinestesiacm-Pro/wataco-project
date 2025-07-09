import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Be On Trip',
  description: 'Your ultimate travel planning companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 105'><defs><linearGradient id='o' x1='75' y1='10' x2='20' y2='70' gradientUnits='userSpaceOnUse'><stop stop-color='%23FF9933'/><stop offset='1' stop-color='%23FF6A00'/></linearGradient><linearGradient id='b' x1='75' y1='10' x2='130' y2='70' gradientUnits='userSpaceOnUse'><stop stop-color='%233DB4F2'/><stop offset='1' stop-color='%230099FF'/></linearGradient></defs><g transform='translate(0, -5)'><path d='M75 10 L 40 70 L 15 65 Z' fill='url(%23o)' /><path d='M40 70 L 75 95 L 15 65 Z' fill='%23FF6F61' /><path d='M75 10 L 110 70 L 135 65 Z' fill='url(%23b)' /><path d='M110 70 L 75 95 L 135 65 Z' fill='%233DBB6F' /><path d='M40 70 L 110 70 L 75 95 Z' fill='%231F2C4B' /></g></svg>" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
