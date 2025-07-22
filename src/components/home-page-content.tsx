
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
            <div className="cloud-part" style={{ width: '400px', height: '120px', top: '10%', left: '5%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '100px', top: '15%', left: '0%' }}></div>
            <div className="cloud-part" style={{ width: '320px', height: '110px', top: '5%', left: '10%' }}></div>
        </div>

        {/* Nube 2: Inferior Derecha (Muy Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '150s', animationDelay: '-85s' }}>
            <div className="cloud-part" style={{ width: '500px', height: '150px', top: '80%', left: '60%' }}></div>
            <div className="cloud-part" style={{ width: '350px', height: '120px', top: '75%', left: '65%' }}></div>
        </div>
        
        {/* Nube 3: Central (Velocidad Media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '100s', animationDelay: '-20s' }}>
            <div className="cloud-part" style={{ width: '350px', height: '110px', top: '45%', left: '40%' }}></div>
            <div className="cloud-part" style={{ width: '250px', height: '90px', top: '48%', left: '43%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '100px', top: '42%', left: '38%' }}></div>
        </div>
        
        {/* Nube 4: Superior Derecha (Rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '75s', animationDelay: '0s' }}>
            <div className="cloud-part" style={{ width: '320px', height: '110px', top: '15%', left: '70%' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '90px', top: '18%', left: '68%' }}></div>
            <div className="cloud-part" style={{ width: '250px', height: '100px', top: '12%', left: '72%' }}></div>
        </div>

        {/* Nube 5: Central Izquierda, baja */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '110s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '450px', height: '140px', top: '65%', left: '15%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '110px', top: '60%', left: '20%' }}></div>
        </div>

        {/* Nube 6: Rápida, empieza fuera de pantalla */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '60s' }}>
            <div className="cloud-part" style={{ width: '400px', height: '160px', top: '5%', left: '80%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '120px', top: '8%', left: '85%' }}></div>
        </div>
        
        {/* Nube 7: Pequeña y Baja (Velocidad muy rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '65s', animationDelay: '-15s' }}>
            <div className="cloud-part" style={{ width: '300px', height: '90px', top: '90%', left: '30%' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '70px', top: '92%', left: '33%' }}></div>
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

    
