
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

const AnimatedClouds = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Nube 1: Superior Izquierda (Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '120s', animationDelay: '-10s' }}>
            <div className="cloud-part" style={{ width: '200px', height: '60px', top: '10%', left: '5%' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '50px', top: '12%', left: '0%' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '55px', top: '8%', left: '8%' }}></div>
        </div>

        {/* Nube 2: Inferior Derecha (Muy Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '150s', animationDelay: '-85s' }}>
            <div className="cloud-part" style={{ width: '250px', height: '75px', top: '80%', left: '60%' }}></div>
            <div className="cloud-part" style={{ width: '175px', height: '60px', top: '78%', left: '65%' }}></div>
        </div>
        
        {/* Nube 3: Central (Velocidad Media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '100s', animationDelay: '-20s' }}>
            <div className="cloud-part" style={{ width: '175px', height: '55px', top: '45%', left: '40%' }}></div>
            <div className="cloud-part" style={{ width: '125px', height: '45px', top: '46%', left: '43%' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '50px', top: '44%', left: '38%' }}></div>
        </div>
        
        {/* Nube 4: Superior Derecha (Rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '75s', animationDelay: '0s' }}>
            <div className="cloud-part" style={{ width: '160px', height: '55px', top: '15%', left: '70%' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '45px', top: '16%', left: '68%' }}></div>
            <div className="cloud-part" style={{ width: '125px', height: '50px', top: '14%', left: '72%' }}></div>
        </div>

        {/* Nube 5: Central Izquierda, baja */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '110s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '225px', height: '70px', top: '65%', left: '15%' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '55px', top: '62%', left: '20%' }}></div>
        </div>

        {/* Nube 6: Rápida, empieza fuera de pantalla */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '60s' }}>
            <div className="cloud-part" style={{ width: '200px', height: '80px', top: '25%', left: '80%' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '60px', top: '27%', left: '85%' }}></div>
        </div>
        
        {/* Nube 7: Pequeña y Baja (Velocidad muy rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '65s', animationDelay: '-15s' }}>
            <div className="cloud-part" style={{ width: '150px', height: '45px', top: '90%', left: '30%' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '35px', top: '92%', left: '33%' }}></div>
        </div>
    </div>
);


export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(tab);
    }, [tab, setTheme]);

    return (
        <div className="w-full flex flex-col flex-grow relative">
            {tab === 'Flights' && <AnimatedClouds />}
            <div className="pt-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                  {tab !== 'Activities' && tab !== 'Social' && <SearchSection tab={tab} />}
                </div>
          
                <div className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <RecommendedContent tab={tab} />
                    </div>
                </div>

                <TestimonialsSection />
            </div>
            <div className="mt-auto relative z-10">
               <Footer />
            </div>
        </div>
    )
}

    
