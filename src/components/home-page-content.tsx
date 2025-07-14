
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
import { useSearchParams, useRouter } from 'next/navigation';
import { SocialFeedSection } from './social-feed-section';
import { cn } from '@/lib/utils';
import { Footer } from './footer';


function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl">
      {activeTab === 'Flights' && <FlightSearchPage />}
      {activeTab === 'Hotels' && <HotelSearchPage />}
      {activeTab === 'Packages' && <PackagesSearchPage />}
      {activeTab === 'Cruises' && <CruiseSearchPage />}
    </div>
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

export function HomePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tab = searchParams.get('tab') || 'Flights';
    
    const getBackgroundClass = () => {
        switch(tab) {
            case 'Flights': return 'bg-flights-gradient';
            case 'Hotels': return 'bg-hotels-gradient';
            case 'Packages': return 'bg-packages-gradient';
            case 'Cruises': return 'bg-cruises-gradient';
            case 'Activities': return 'bg-activities-gradient';
            case 'Social': return 'bg-activities-gradient';
            default: return 'bg-flights-gradient';
        }
    }

    return (
        <div className={cn('w-full flex flex-col flex-grow min-h-screen', getBackgroundClass(), 'background-pan-animation')}>
            <div className="pt-20">
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
            <div className="mt-auto">
               <Footer />
            </div>
        </div>
    )
}
