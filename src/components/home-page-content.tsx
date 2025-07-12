
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Plane, BedDouble, Luggage, Ship, Zap, Users } from 'lucide-react';

const TABS = [
  { id: 'Flights', label: 'Vuelos', icon: Plane },
  { id: 'Hotels', label: 'Hoteles', icon: BedDouble },
  { id: 'Packages', label: 'Paquetes', icon: Luggage },
  { id: 'Cruises', label: 'Cruceros', icon: Ship },
  { id: 'Activities', label: 'Actividades', icon: Zap },
  { id: 'Social', label: 'Social', icon: Users },
];

function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const getBackgroundColor = () => {
    switch(activeTab) {
      case 'Flights':
      case 'Cruises':
        return 'bg-primary/10';
      case 'Hotels':
        return 'bg-success/10';
      case 'Packages':
        return 'bg-tertiary/10';
      default:
        return 'bg-black/10';
    }
  }

  return (
    <div className={cn("backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl", getBackgroundColor())}>
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

    const handleTabChange = (newTab: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', newTab);
      router.push(`/?${params.toString()}`);
    };
    
    const getBackgroundClass = () => {
        switch(tab) {
            case 'Flights': return 'bg-flights-gradient';
            case 'Cruises': return 'bg-flights-gradient';
            case 'Hotels': return 'bg-hotels-gradient';
            case 'Packages': return 'bg-packages-gradient';
            case 'Activities': return 'bg-multicolor-gradient';
            case 'Social': return 'bg-multicolor-gradient';
            default: return 'bg-flights-gradient';
        }
    }

    return (
        <div className={cn('w-full flex flex-col min-h-full transition-all duration-500 background-pan-animation', getBackgroundClass())}>
            <div className="pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                  <div className="hidden md:flex justify-center mb-8">
                    <Tabs value={tab} onValueChange={handleTabChange} className="w-auto">
                      <TabsList className="bg-card/30 backdrop-blur-lg border border-white/10">
                        {TABS.map((item) => (
                          <TabsTrigger key={item.id} value={item.id} className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  {tab !== 'Activities' && tab !== 'Social' && <SearchSection tab={tab} />}
                </div>
          
                <div className="pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <RecommendedContent tab={tab} />
                    </div>
                </div>

                <TestimonialsSection />
            </div>
        </div>
    )
}
