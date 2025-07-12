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

  return (
    <div className="bg-card/30 backdrop-blur-lg p-6 rounded-3xl border border-white/10 shadow-2xl">
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

    return (
        <div className="w-full">
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
              <SearchSection tab={tab} />
            </div>
      
            <div className="pt-16 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <RecommendedContent tab={tab} />
                </div>
            </div>

            <TestimonialsSection />
        </div>
    )
}
