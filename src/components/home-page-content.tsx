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
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
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

        {/* Nube 5: Central Izquierda, baja */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '110s', top: '65%', left: '15%' }}>
            <div className="cloud-part" style={{ width: '225px', height: '70px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '55px', top: '-25px', left: '30px' }}></div>
        </div>

        {/* Nube 6: Rápida, empieza fuera de pantalla */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '60s', top: '25%', left: '80%' }}>
            <div className="cloud-part" style={{ width: '200px', height: '80px' }}></div>
            <div className="cloud-part" style={{ width: '140px', height: '60px', top: '20px', left: '40px' }}></div>
        </div>
        
        {/* Nube 7: Pequeña y Baja (Velocidad muy rápida) */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '65s', top: '90%', left: '30%' }}>
            <div className="cloud-part" style={{ width: '150px', height: '45px' }}></div>
            <div className="cloud-part" style={{ width: '100px', height: '35px', top: '10px', left: '20px' }}></div>
        </div>

        {/* --- NUBES ADICIONALES PARA COBERTURA TOTAL --- */}

        {/* Nube 8: Central superior */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '95s', top: '20%', left: '25%' }}>
            <div className="cloud-part" style={{ width: '180px', height: '50px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '40px', top: '15px', left: '20px' }}></div>
        </div>

        {/* Nube 9: Inferior izquierda */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '130s', top: '85%', left: '10%' }}>
            <div className="cloud-part" style={{ width: '210px', height: '65px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '50px', top: '-15px', left: '-25px' }}></div>
        </div>

        {/* Nube 10: Central derecha */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '88s', top: '50%', left: '75%' }}>
            <div className="cloud-part" style={{ width: '190px', height: '60px' }}></div>
            <div className="cloud-part" style={{ width: '120px', height: '45px', top: '20px', left: '-10px' }}></div>
        </div>

        {/* Nube 11: Muy alta y centrada */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '140s', top: '2%', left: '50%' }}>
            <div className="cloud-part" style={{ width: '160px', height: '40px' }}></div>
        </div>

        {/* Nube 12: Muy baja y a la derecha */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '70s', top: '92%', left: '80%' }}>
            <div className="cloud-part" style={{ width: '220px', height: '55px' }}></div>
            <div className="cloud-part" style={{ width: '160px', height: '45px', top: '-10px', left: '30px' }}></div>
        </div>

        {/* Nube 13: Izquierda, media altura */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '105s', top: '60%', left: '0%' }}>
            <div className="cloud-part" style={{ width: '170px', height: '50px' }}></div>
            <div className="cloud-part" style={{ width: '130px', height: '40px', top: '10px', left: '25px' }}></div>
        </div>

        {/* Nube 14: Derecha, media-alta */}
        <div className="cloud-container cloud-animation" style={{ animationDuration: '85s', top: '35%', left: '90%' }}>
            <div className="cloud-part" style={{ width: '200px', height: '60px' }}></div>
            <div className="cloud-part" style={{ width: '150px', height: '50px', top: '-15px', left: '-30px' }}></div>
        </div>
    </div>
);

const PalmLeaf = ({ size, style }: { size: number, style: React.CSSProperties }) => (
  <svg
    className="leaf-container"
    style={{ width: size, height: size, ...style }}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 100 C 20 70, 20 30, 50 0 C 80 30, 80 70, 50 100 Z"
      fill="currentColor"
    />
  </svg>
);

const AnimatedPalmLeaves = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 text-white">
        <PalmLeaf size={150} style={{ top: '-5%', left: '85%', transform: 'rotate(120deg)', animationDelay: '-2s', animationDuration: '25s' }} />
        <PalmLeaf size={200} style={{ top: '70%', left: '-5%', transform: 'rotate(-40deg)', animationDelay: '0s', animationDuration: '30s' }} />
        <PalmLeaf size={120} style={{ top: '50%', left: '90%', transform: 'rotate(150deg)', animationDelay: '-5s', animationDuration: '28s' }} />
        <PalmLeaf size={180} style={{ top: '5%', left: '5%', transform: 'rotate(20deg)', animationDelay: '-8s', animationDuration: '35s' }} />
        <PalmLeaf size={100} style={{ top: '80%', left: '60%', transform: 'rotate(210deg)', animationDelay: '-12s', animationDuration: '22s' }} />
        <PalmLeaf size={220} style={{ top: '30%', left: '40%', transform: 'rotate(90deg)', animationDelay: '-15s', animationDuration: '40s', opacity: 0.1 }} />
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
            {tab === 'Hotels' && <AnimatedPalmLeaves />}
            
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
