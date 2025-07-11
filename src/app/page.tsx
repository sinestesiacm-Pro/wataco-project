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

    const flightImages = [
        'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1488085061387-422e29b40080?fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?fit=crop&w=1920&q=80',
    ];

    return (
        <>
            <FuselageSection images={flightImages}>
                 <div className="bg-card/80 backdrop-blur-xl border p-2 sm:p-4 rounded-3xl shadow-2xl w-full max-w-2xl mx-auto">
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
      
            <div className="bg-background pt-8 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RecommendedContent tab={tab} />
                </div>
            </div>

            <TestimonialsSection />
        </>
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
