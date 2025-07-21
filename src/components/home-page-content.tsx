
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
        {/* Nube 1: Superior Izquierda (lenta) */}
        <div className="cloud-container cloud-animation" style={{ top: '10%', left: '0%', animationDuration: '120s', animationDelay: '-25s' }}>
            <div className="cloud-part" style={{ width: '220px', height: '80px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '60px', top: '20px', left: '-30px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '70px', top: '-15px', left: '40px' }}></div>
        </div>

        {/* Nube 2: Inferior Derecha (muy lenta, grande) */}
        <div className="cloud-container cloud-animation" style={{ top: '75%', left: '70%', animationDuration: '150s', animationDelay: '-80s' }}>
            <div className="cloud-part" style={{ width: '300px', height: '90px' }}></div>
            <div className="cloud-part" style={{ width: '200px', height: '70px', top: '-25px', left: '50px' }}></div>
        </div>
        
        {/* Nube 3: Central, velocidad media */}
        <div className="cloud-container cloud-animation" style={{ top: '45%', left: '40%', animationDuration: '100s', animationDelay: '-70s' }}>
            <div className="cloud-part" style={{ width: '280px', height: '80px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '60px', top: '15px', left: '50px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '50px', top: '-15px', left: '70px' }}></div>
        </div>
        
        {/* Nube 4: Superior Derecha (rápida) */}
        <div className="cloud-container cloud-animation" style={{ top: '5%', left: '80%', animationDuration: '75s', animationDelay: '-10s' }}>
            <div className="cloud-part" style={{ width: '180px', height: '70px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '50px', top: '10px', left: '30px' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '60px', top: '-20px', left: '-10px' }}></div>
        </div>

        {/* Nube 5: Central Izquierda, baja */}
        <div className="cloud-container cloud-animation" style={{ top: '65%', left: '5%', animationDuration: '110s', animationDelay: '-90s' }}>
            <div className="cloud-part" style={{ width: '250px', height: '80px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '60px', top: '-20px', left: '50px' }}></div>
        </div>

        {/* Nube 6: Grande y Muy Rápida, empieza fuera de pantalla a la derecha */}
        <div className="cloud-container cloud-animation" style={{ top: '5%', animationDuration: '60s', animationDelay: '0s' }}>
            <div className="cloud-part" style={{ width: '350px', height: '100px' }}></div>
            <div className="cloud-part" style={{ width: '250px', height: '80px', top: '10px', left: '50px' }}></div>
            <div className="cloud-part" style={{ width: '180px', height: '70px', top: '-15px', left: '80px' }}></div>
        </div>

        {/* Nube 7: Pequeña y Baja, empieza visible a la izquierda (muy rápida) */}
        <div className="cloud-container cloud-animation" style={{ top: '80%', left: '20%', animationDuration: '65s', animationDelay: '-15s' }}>
            <div className="cloud-part" style={{ width: '180px', height: '50px' }}></div>
            <div className="cloud-part" style={{ width: '120px', height: '40px', top: '5px', left: '30px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '30px', top: '-10px', left: '10px' }}></div>
        </div>

        {/* -- NUBES ADICIONALES PARA DENSIDAD Y VELOCIDAD -- */}
        
        {/* Nube 8: Central superior, velocidad media-rápida */}
        <div className="cloud-container cloud-animation" style={{ top: '20%', left: '30%', animationDuration: '85s', animationDelay: '-50s' }}>
            <div className="cloud-part" style={{ width: '260px', height: '75px' }}></div>
            <div className="cloud-part" style={{ width: '170px', height: '55px', top: '10px', left: '40px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '45px', top: '-10px', left: '60px' }}></div>
        </div>

        {/* Nube 9: Inferior izquierda, muy lenta */}
        <div className="cloud-container cloud-animation" style={{ top: '85%', left: '10%', animationDuration: '140s', animationDelay: '-100s' }}>
            <div className="cloud-part" style={{ width: '230px', height: '70px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '50px', top: '-15px', left: '40px' }}></div>
        </div>

        {/* Nube 10: Central, empieza fuera de pantalla (velocidad media) */}
        <div className="cloud-container cloud-animation" style={{ top: '50%', animationDuration: '90s', animationDelay: '-5s' }}>
            <div className="cloud-part" style={{ width: '200px', height: '70px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '50px', top: '15px', left: '-20px' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '60px', top: '-10px', left: '30px' }}></div>
        </div>
        
        {/* Nube 11: Superior, muy a la izquierda, visible al cargar (lenta) */}
        <div className="cloud-container cloud-animation" style={{ top: '15%', left: '10%', animationDuration: '130s', animationDelay: '-80s' }}>
            <div className="cloud-part" style={{ width: '190px', height: '75px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '55px', top: '15px', left: '25px' }}></div>
            <div className="cloud-part" style={{ width: '170px', height: '65px', top: '-15px', left: '-5px' }}></div>
        </div>

        {/* Nube 12: Central, muy lenta */}
        <div className="cloud-container cloud-animation" style={{ top: '60%', left: '50%', animationDuration: '125s', animationDelay: '-110s' }}>
            <div className="cloud-part" style={{ width: '280px', height: '85px' }}></div>
            <div className="cloud-part" style={{ width: '190px', height: '65px', top: '-20px', left: '40px' }}></div>
        </div>
         {/* Nube 13: Media-alta, empieza a la izquierda */}
        <div className="cloud-container cloud-animation" style={{ top: '30%', left: '15%', animationDuration: '95s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '240px', height: '70px' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '50px', top: '10px', left: '40px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '40px', top: '-20px', left: '20px' }}></div>
        </div>

        {/* Nube 14: Inferior, empieza en el centro */}
        <div className="cloud-container cloud-animation" style={{ top: '90%', left: '50%', animationDuration: '80s', animationDelay: '-60s' }}>
            <div className="cloud-part" style={{ width: '320px', height: '80px' }}></div>
            <div className="cloud-part" style={{ width: '220px', height: '60px', top: '-10px', left: '50px' }}></div>
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
