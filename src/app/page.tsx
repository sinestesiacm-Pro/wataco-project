
'use client';

import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import CruiseSearchPage from '@/components/cruise-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { RecommendedDestinations } from '@/components/recommended-destinations';
import { RecommendedHotels } from '@/components/recommended-hotels';
import { RecommendedPackages } from '@/components/recommended-packages';
import { RecommendedCruises } from '@/components/recommended-cruises';
import { useSearchParams } from 'next/navigation';
import { FuselageSection } from '@/components/fuselage-section';
import {
  Plane,
  BedDouble,
  Luggage,
  Ship,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function PageContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return <HotelSearchPage />;
    case 'Packages':
      return <PackagesSearchPage />;
    case 'Cruises':
      return <CruiseSearchPage />;
    case 'Activities':
      return (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <ActivitiesSection />
          </div>
      )
    case 'Flights':
    default:
      return <FlightSearchPage />;
  }
}

function RecommendedContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return <RecommendedHotels />;
    case 'Packages':
      return <RecommendedPackages />;
    case 'Cruises':
      return <RecommendedCruises />;
    case 'Flights':
    default:
      return <RecommendedDestinations />;
  }
}


function HomePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get('tab') || 'Flights';
    
    const handleTabClick = (tab: string) => {
        router.push(`/?tab=${tab}`);
    };

    const tabsConfig = [
        { id: 'Flights', label: 'Vuelos', icon: Plane },
        { id: 'Hotels', label: 'Hoteles', icon: BedDouble },
        { id: 'Packages', label: 'Paquetes', icon: Luggage },
        { id: 'Cruises', label: 'Cruceros', icon: Ship },
        { id: 'Activities', label: 'Actividades', icon: Zap },
    ];

    const tabSpecifics = {
      Flights: {
        images: [
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1488085061387-422e29b40080?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?fit=crop&w=1920&q=80',
        ],
        title: <>Tu Próxima Aventura<br />te Espera</>,
        subtitle: "Encuentra y reserva sin esfuerzo los mejores vuelos a cualquier parte del mundo.",
      },
      Hotels: {
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=1920&q=80',
        ],
        title: "Encuentra tu Estancia Perfecta",
        subtitle: "Desde hoteles de lujo hasta acogedores apartamentos, tenemos el lugar ideal para ti.",
      },
       Packages: {
        images: [
          'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1530789253388-582c481c54b0?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?fit=crop&w=1920&q=80',
        ],
        title: "Paquetes de Viaje Completos",
        subtitle: "Reserva tu vuelo y hotel juntos para ahorrar tiempo y dinero.",
      },
      Cruises: {
        images: [
          'https://images.unsplash.com/photo-1540340061722-9293d5163008?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1599827551381-e2a4a75a898b?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1621361253013-b5133d2663d2?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1606114933589-a9a7a0a03379?fit=crop&w=1920&q=80',
        ],
        title: "Embárcate en tu Próxima Aventura",
        subtitle: "Descubre y reserva increíbles vacaciones en crucero por todo el mundo.",
      },
      Activities: {
        images: [
          'https://images.unsplash.com/photo-1692205959816-d75d4a7b89d4?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1634151739970-bba3910d0d36?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1524014444623-194fde519952?fit=crop&w=1920&q=80',
        ],
        title: "Vive Experiencias Únicas",
        subtitle: "Reserva tours, atracciones y actividades inolvidables en tu destino.",
      }
    };
    
    const currentTabInfo = tabSpecifics[tab as keyof typeof tabSpecifics] || tabSpecifics.Flights;


    return (
        <div className="w-full">
            <FuselageSection images={currentTabInfo.images} title={currentTabInfo.title} subtitle={currentTabInfo.subtitle}>
                 <div className="bg-card/80 backdrop-blur-xl border p-2 sm:p-4 rounded-3xl shadow-2xl w-full max-w-5xl mx-auto">
                    {/* Tabs for mobile */}
                    <div className="sm:hidden grid grid-cols-5 gap-1 mb-2">
                         {tabsConfig.map(({ id, label, icon: Icon }) => (
                            <Button 
                                key={id} 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleTabClick(id)}
                                className={cn(
                                    "flex-col h-auto p-1 rounded-lg",
                                    tab === id ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                                )}
                            >
                                <Icon className="h-5 w-5 mb-1" />
                                <span className="text-[10px] font-semibold">{label}</span>
                            </Button>
                        ))}
                    </div>
                    
                    <div className="p-2 sm:p-4 rounded-2xl bg-card/60">
                         <PageContent tab={tab} />
                    </div>
                 </div>
            </FuselageSection>
      
            <div className="bg-background pt-8 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RecommendedContent tab={tab} />
                </div>
            </div>

            <TestimonialsSection />
        </div>
    )
}


export default function Home() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
      <HomePageContent />
    </Suspense>
  );
}
