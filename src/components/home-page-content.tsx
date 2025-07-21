
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
        <div className="cloud-animation cloud" style={{ width: '250px', height: '80px', top: '15%', animationDuration: '75s', animationDelay: '-15s' }}></div>
        <div className="cloud-animation cloud-2" style={{ width: '350px', height: '100px', top: '25%', animationDuration: '90s', animationDelay: '-5s' }}></div>
        <div className="cloud-animation cloud-3" style={{ width: '200px', height: '60px', top: '50%', animationDuration: '60s', animationDelay: '-20s' }}></div>
        <div className="cloud-animation cloud" style={{ width: '300px', height: '90px', top: '70%', animationDuration: '80s', animationDelay: '-10s' }}></div>
        <div className="cloud-animation cloud-2" style={{ width: '220px', height: '70px', top: '85%', animationDuration: '70s', animationDelay: '-25s' }}></div>
        <div className="cloud-animation cloud-3" style={{ width: '280px', height: '85px', top: '5%', animationDuration: '85s', animationDelay: '-30s' }}></div>
        <div className="cloud-animation cloud" style={{ width: '320px', height: '95px', top: '40%', animationDuration: '95s', animationDelay: '0s' }}></div>
        <div className="cloud-animation cloud-2" style={{ width: '150px', height: '50px', top: '60%', animationDuration: '55s', animationDelay: '-40s' }}></div>
        <div className="cloud-animation cloud-3" style={{ width: '250px', height: '80px', top: '75%', animationDuration: '100s', animationDelay: '-35s' }}></div>
        <div className="cloud-animation cloud" style={{ width: '180px', height: '60px', top: '20%', animationDuration: '65s', animationDelay: '-45s' }}></div>
        <div className="cloud-animation cloud-2" style={{ width: '400px', height: '110px', top: '30%', animationDuration: '120s', animationDelay: '-50s' }}></div>
        <div className="cloud-animation cloud-3" style={{ width: '210px', height: '70px', top: '90%', animationDuration: '78s', animationDelay: '-55s' }}></div>
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
