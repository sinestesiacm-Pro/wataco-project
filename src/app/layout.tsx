import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Be On Trip',
  description: 'Your ultimate travel planning companion',
};

// SVG Icon as string for Data URI
const faviconSvg = `
<svg width="104" height="44" viewBox="0 0 104 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="paint0_linear_102_2_icon" x1="47.25" y1="1.25" x2="15.25" y2="29.25" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFC83A"/>
      <stop offset="1" stop-color="#FF6A00"/>
    </linearGradient>
    <linearGradient id="paint1_linear_102_2_icon" x1="47.25" y1="1.25" x2="85.25" y2="29.25" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3DB4F2"/>
      <stop offset="1" stop-color="#1E5DFF"/>
    </linearGradient>
  </defs>
  <path d="M47.25 1.25L0.75 22.25L47.25 29.25L62.75 1.25H47.25Z" fill="url(#paint0_linear_102_2_icon)"/>
  <path d="M47.25 29.25L0.75 22.25L47.25 43.25V29.25Z" fill="#1F2C4B"/>
  <path d="M47.25 1.25L103.5 22.25L47.25 29.25V1.25Z" fill="url(#paint1_linear_102_2_icon)"/>
  <path d="M47.25 29.25L103.5 22.25L69.75 42.5L47.25 43.25V29.25Z" fill="#3DBB6F"/>
</svg>
`;

// Encode SVG for Data URI
const faviconDataUri = `data:image/svg+xml;base64,${btoa(faviconSvg)}`;


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
        <link rel="icon" href={faviconDataUri} />
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
