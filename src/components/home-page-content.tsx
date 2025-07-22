
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
        {/* Nube 1: Central Lenta */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '120s', animationDelay: '-10s' }}>
            <div className="cloud-part" style={{ width: '500px', height: '160px', top: '50%', left: '10%' }}></div>
            <div className="cloud-part" style={{ width: '320px', height: '120px', top: '55%', left: '5%' }}></div>
            <div className="cloud-part" style={{ width: '360px', height: '140px', top: '45%', left: '15%' }}></div>
        </div>

        {/* Nube 2: Inferior Derecha (Muy Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '150s', animationDelay: '-85s' }}>
            <div className="cloud-part" style={{ width: '600px', height: '180px', top: '75%', left: '60%' }}></div>
            <div className="cloud-part" style={{ width: '400px', height: '140px', top: '70%', left: '65%' }}></div>
        </div>
        
        {/* Nube 3: Central Superior (Velocidad Media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '100s', animationDelay: '-20s' }}>
            <div className="cloud-part" style={{ width: '400px', height: '140px', top: '25%', left: '50%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '100px', top: '28%', left: '53%' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '120px', top: '22%', left: '48%' }}></div>
        </div>
        
        {/* Nube 4: Superior Izquierda (Muy Rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '75s', animationDelay: '0s' }}>
            <div className="cloud-part" style={{ width: '380px', height: '140px', top: '10%', left: '-5%' }}></div>
            <div className="cloud-part" style={{ width: '240px', height: '110px', top: '13%', left: '-8%' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '120px', top: '8%', left: '-2%' }}></div>
        </div>

        {/* Nube 5: Central Izquierda, baja */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '110s', animationDelay: '-30s' }}>
            <div className="cloud-part" style={{ width: '500px', height: '160px', top: '65%', left: '20%' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '120px', top: '60%', left: '25%' }}></div>
        </div>

        {/* Nube 6: Rápida, empieza fuera de pantalla */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '60s' }}>
            <div className="cloud-part" style={{ width: '440px', height: '180px', top: '5%', left: '80%' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '140px', top: '8%', left: '85%' }}></div>
        </div>
        
        {/* Nube 7: Pequeña y Baja (Velocidad muy rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '65s', animationDelay: '-15s' }}>
            <div className="cloud-part" style={{ width: '360px', height: '100px', top: '80%', left: '40%' }}></div>
            <div className="cloud-part" style={{ width: '240px', height: '80px', top: '82%', left: '43%' }}></div>
        </div>

        {/* Nube 8: Central superior */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '85s', animationDelay: '-40s' }}>
            <div className="cloud-part" style={{ width: '480px', height: '160px', top: '35%', left: '30%' }}></div>
            <div className="cloud-part" style={{ width: '340px', height: '120px', top: '32%', left: '35%' }}></div>
        </div>

        {/* Nube 9: Inferior izquierda, muy lenta */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '140s', animationDelay: '-100s' }}>
            <div className="cloud-part" style={{ width: '460px', height: '140px', top: '85%', left: '5%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '100px', top: '82%', left: '8%' }}></div>
        </div>

        {/* Nube 10: Central, empieza fuera de pantalla (velocidad media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '90s', animationDelay: '-50s' }}>
            <div className="cloud-part" style={{ width: '400px', height: '140px', top: '50%', left: '80%' }}></div>
            <div className="cloud-part" style={{ width: '260px', height: '100px', top: '53%', left: '78%' }}></div>
        </div>
        
        {/* Nube 11: Superior, muy a la izquierda */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '130s', animationDelay: '-110s' }}>
            <div className="cloud-part" style={{ width: '380px', height: '150px', top: '15%', left: '25%' }}></div>
            <div className="cloud-part" style={{ width: '280px', height: '110px', top: '18%', left: '28%' }}></div>
        </div>

        {/* Nube 12: Central, muy lenta */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '125s', animationDelay: '-40s' }}>
            <div className="cloud-part" style={{ width: '420px', height: '150px', top: '60%', left: '70%' }}></div>
            <div className="cloud-part" style={{ width: '300px', height: '110px', top: '57%', left: '73%' }}></div>
            <div className="cloud-part" style={{ width: '260px', height: '120px', top: '63%', left: '68%' }}></div>
        </div>
        
        {/* Nube 13: Media-alta (Rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '75s', animationDelay: '-5s' }}>
            <div className="cloud-part" style={{ width: '480px', height: '140px', top: '30%', left: '75%' }}></div>
            <div className="cloud-part" style={{ width: '320px', height: '100px', top: '32%', left: '78%' }}></div>
        </div>

        {/* Nube 14: Inferior (Velocidad media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '80s', animationDelay: '-60s' }}>
            <div className="cloud-part" style={{ width: '640px', height: '160px', top: '90%', left: '15%' }}></div>
            <div className="cloud-part" style={{ width: '440px', height: '120px', top: '88%', left: '20%' }}></div>
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

    