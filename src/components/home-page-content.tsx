
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
    <div className="absolute top-0 left-0 w-full h-full overflow-x-hidden pointer-events-none z-0">
        {/* Nube 1 - Grande y extendida */}
        <div className="cloud-container cloud-animation" style={{ top: '20%', animationDuration: '80s', animationDelay: '-10s' }}>
            <div className="cloud-part" style={{ width: '250px', height: '80px', top: '10px', left: '0px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '60px', top: '0px', left: '80px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '70px', top: '30px', left: '120px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '40px', top: '20px', left: '250px' }}></div>
        </div>
        {/* Nube 2 - Pequeña y compacta */}
        <div className="cloud-container cloud-animation" style={{ top: '10%', animationDuration: '100s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '90px', height: '90px', top: '0', left: '20px' }}></div>
            <div className="cloud-part" style={{ width: '120px', height: '120px', top: '10px', left: '0px' }}></div>
        </div>
        {/* Nube 3 - Mediana */}
        <div className="cloud-container cloud-animation" style={{ top: '50%', animationDuration: '65s', animationDelay: '-5s' }}>
             <div className="cloud-part" style={{ width: '100px', height: '100px', top: '0', left: '30px' }}></div>
             <div className="cloud-part" style={{ width: '130px', height: '130px', top: '15px', left: '0px' }}></div>
             <div className="cloud-part" style={{ width: '80px', height: '80px', top: '-10px', left: '90px' }}></div>
        </div>
        {/* Nube 4 - Grande y compleja */}
        <div className="cloud-container cloud-animation" style={{ top: '70%', animationDuration: '70s', animationDelay: '-20s' }}>
            <div className="cloud-part" style={{ width: '160px', height: '160px', top: '0', left: '60px' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '200px', top: '25px', left: '0px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '130px', top: '45px', left: '150px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '100px', top: '10px', left: '200px' }}></div>
        </div>
        {/* Nube 5 - Pequeña y alargada */}
         <div className="cloud-container cloud-animation" style={{ top: '85%', animationDuration: '95s', animationDelay: '-40s' }}>
             <div className="cloud-part" style={{ width: '150px', height: '50px', top: '0', left: '40px' }}></div>
             <div className="cloud-part" style={{ width: '110px', height: '40px', top: '10px', left: '0px' }}></div>
        </div>
        {/* Nube 6 - Mediana y densa */}
         <div className="cloud-container cloud-animation" style={{ top: '35%', animationDuration: '110s', animationDelay: '-55s' }}>
            <div className="cloud-part" style={{ width: '140px', height: '140px', top: '0', left: '70px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '180px', top: '20px', left: '0px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '100px', top: '30px', left: '160px' }}></div>
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
