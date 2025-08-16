
'use client';

import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import CruiseSearchPage from '@/components/cruise-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { RecommendedDestinations } from '@/components/recommended-destinations';
import { RecommendedHotels } from '@/components/recommended-hotels';
import { RecommendedPackages } from '@/components/recommended-packages';
import { RecommendedCruises } from '@/components/recommended-cruises';
import { useSearchParams } from 'next/navigation';
import { SocialFeedSection } from './social-feed-section';
import { Footer } from './footer';
import { useTheme } from '@/contexts/theme-context';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatedClouds } from '@/components/animated-clouds';
import { UnderwaterScene } from './underwater-scene';
import { PartnersSection } from './partners-section';


function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const renderSearch = () => {
    switch(activeTab) {
      case 'Flights': return <FlightSearchPage />;
      case 'Hotels': return <HotelSearchPage />;
      case 'Packages': return <PackagesSearchPage />;
      case 'Cruises': return <CruiseSearchPage />;
      default: return null;
    }
  }

  return (
    <>
      {renderSearch()}
    </>
  );
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
    case 'Social':
      return <SocialFeedSection />;
    case 'Activities':
       return <ActivitiesSection />;
    case 'Flights':
    default:
      return <RecommendedDestinations />;
  }
}

const floatingShapes = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  style: {
    width: `${Math.random() * 100 + 50}px`, // 50 a 150px
    height: `${Math.random() * 100 + 50}px`, // 50 a 150px
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    '--float-duration': `${Math.random() * 30 + 30}s`, // 30s a 60s
    '--float-delay': `${Math.random() * -30}s`,
  } as React.CSSProperties,
}));

const AnimatedWindows = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {floatingShapes.map(shape => (
            <div key={shape.id} className="floating-shape" style={shape.style} />
        ))}
    </div>
);

const airlinePartners = [
  { name: 'American Airlines' }, { name: 'Lufthansa' }, { name: 'Emirates' },
  { name: 'Delta' }, { name: 'British Airways' }, { name: 'Air France' },
  { name: 'KLM' }, { name: 'Qatar Airways' }, { name: 'Avianca' },
];

const hotelPartners = [
  { name: 'Marriott' }, { name: 'Hilton' }, { name: 'Hyatt' },
  { name: 'Four Seasons' }, { name: 'InterContinental' }, { name: 'Sheraton' },
  { name: 'Westin' }, { name: 'Ritz-Carlton' }, { name: 'Accor' },
];


export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';
    const { setTabTheme } = useTheme();

    useEffect(() => {
        setTabTheme(tab);
    }, [tab, setTabTheme]);

    return (
        <div className="w-full flex-grow flex flex-col relative">
            <div className="absolute inset-0 z-0">
                {(tab === 'Flights' || tab === 'Social') && <AnimatedClouds />}
                {tab === 'Cruises' && <UnderwaterScene />}
            </div>
            
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="pt-28">
                         {tab !== 'Activities' && tab !== 'Social' && <SearchSection tab={tab} />}
                    </div>
                </div>
          
                <div className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <RecommendedContent tab={tab} />
                    </div>
                </div>

                <div className="mt-auto">
                    <TestimonialsSection />
                    <PartnersSection title="Nuestras Aerolíneas Asociadas" partners={airlinePartners} />
                    <PartnersSection title="Cadenas Hoteleras de Confianza" partners={hotelPartners} />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
