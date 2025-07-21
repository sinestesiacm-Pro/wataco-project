
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
        {/* Nube 1: Larga y simétrica, empieza visible a la izquierda */}
        <div className="cloud-container cloud-animation" style={{ top: '15%', left: '10%', animationDuration: '90s', animationDelay: '-15s' }}>
            <div className="cloud-part" style={{ width: '350px', height: '100px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '80px', top: '-20px', left: '75px' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '80px', top: '20px', left: '75px' }}></div>
        </div>

        {/* Nube 2: Normal, empieza fuera de pantalla a la derecha */}
        <div className="cloud-container cloud-animation" style={{ top: '30%', animationDuration: '75s', animationDelay: '0s' }}>
            <div className="cloud-part" style={{ width: '200px', height: '80px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '60px', top: '-15px', left: '25px' }}></div>
        </div>
        
        {/* Nube 3: Grande y extendida, empieza visible en el centro */}
        <div className="cloud-container cloud-animation" style={{ top: '50%', left: '60%', animationDuration: '120s', animationDelay: '-60s' }}>
            <div className="cloud-part" style={{ width: '450px', height: '120px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '100px', top: '-25px', left: '75px' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '100px', top: '25px', left: '75px' }}></div>
        </div>

        {/* Nube 4: Pequeña y larga, empieza a mitad de ciclo */}
        <div className="cloud-container cloud-animation" style={{ top: '65%', animationDuration: '60s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '250px', height: '60px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '40px', top: '10px', left: '50px' }}></div>
        </div>

        {/* Nube 5: Mediana, empieza visible abajo a la izquierda */}
        <div className="cloud-container cloud-animation" style={{ top: '80%', left: '5%', animationDuration: '100s', animationDelay: '-80s' }}>
            <div className="cloud-part" style={{ width: '280px', height: '90px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '70px', top: '-20px', left: '50px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '70px', top: '20px', left: '50px' }}></div>
        </div>

        {/* Nube 6: Otra grande, empieza a mitad de ciclo */}
        <div className="cloud-container cloud-animation" style={{ top: '5%', animationDuration: '150s', animationDelay: '-80s' }}>
            <div className="cloud-part" style={{ width: '500px', height: '130px', top: '0', left: '0' }}></div>
            <div className="cloud-part" style={{ width: '350px', height: '110px', top: '10px', left: '75px' }}></div>
        </div>

        {/* Nube 7: Rápida y pequeña, empieza visible abajo a la derecha */}
        <div className="cloud-container cloud-animation" style={{ top: '90%', left: '70%', animationDuration: '55s', animationDelay: '-5s' }}>
            <div className="cloud-part" style={{ width: '180px', height: '50px', top: '0', left: '0' }}></div>
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
