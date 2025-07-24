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


function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const renderSearch = () => {
    switch(activeTab) {
      case 'Flights': return <FlightSearchPage />;
      case 'Hotels': return <div className="bg-white/40 backdrop-blur-xl rounded-3xl"><HotelSearchPage /></div>;
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
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 filter blur-[25px]">
        {/* Nube 1: Superior Izquierda (Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '120s', top: '5%', left: '5%' }}>
            <div className="cloud-part" style={{ width: '200px', height: '60px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '50px', top: '15px', left: '-30px' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '55px', top: '-10px', left: '25px' }}></div>
        </div>

        {/* Nube 2: Inferior Derecha (Muy Lenta) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '150s', top: '80%', left: '60%' }}>
            <div className="cloud-part" style={{ width: '250px', height: '75px' }}></div>
            <div className="cloud-part" style={{ width: '175px', height: '60px', top: '-20px', left: '40px' }}></div>
        </div>
        
        {/* Nube 3: Central (Velocidad Media) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '100s', top: '45%', left: '40%' }}>
            <div className="cloud-part" style={{ width: '175px', height: '55px' }}></div>
            <div className="cloud-part" style={{ width: '125px', height: '45px', top: '10px', left: '15px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '50px', top: '-5px', left: '-20px' }}></div>
        </div>
        
        {/* Nube 4: Superior Derecha (Rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '75s', top: '15%', left: '70%' }}>
            <div className="cloud-part" style={{ width: '160px', height: '55px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '45px', top: '10px', left: '-15px' }}></div>
            <div className="cloud-part" style={{ width: '125px', height: '50px', top: '-10px', left: '20px' }}></div>
        </div>
        
        {[...Array(8)].map((_, i) => (
             <div key={i} className="cloud-container cloud-animation" style={{ 
                animationDuration: `${Math.random() * 80 + 70}s`, 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `-${Math.random() * 20}s`
             }}>
                <div className="cloud-part" style={{ width: `${Math.random() * 100 + 150}px`, height: `${Math.random() * 20 + 50}px` }}></div>
                <div className="cloud-part" style={{ width: `${Math.random() * 60 + 80}px`, height: `${Math.random() * 20 + 30}px`, top: `${Math.random() * 20 - 10}px`, left: `${Math.random() * 50 - 25}px` }}></div>
            </div>
        ))}
    </div>
);

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


export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme(tab);
    }, [tab, setTheme]);

    return (
        <div className="w-full flex flex-col flex-grow relative">
            {(tab === 'Flights' || tab === 'Social') && <AnimatedClouds />}
            {tab === 'Hotels' && <AnimatedWindows />}
            
            <div className="relative z-10 flex flex-col min-h-dvh">
                <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    {tab !== 'Activities' && tab !== 'Social' && <div className="pt-8"><SearchSection tab={tab} /></div>}
                </div>
          
                <div className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <RecommendedContent tab={tab} />
                    </div>
                </div>

                <div className="mt-auto pt-16">
                    <TestimonialsSection />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
