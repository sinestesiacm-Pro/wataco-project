'use client';

import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import CruiseSearchPage from '@/components/cruise-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { RecommendedDestinations } from '@/components/recommended-destinations';
import { RecommendedHotels } from '@/components/recommended-hotels';
import { RecommendedPackages } from '@/components/recommended-packages';
import { RecommendedCruises } from '@/components/recommended-cruises';
import { useSearchParams } from 'next/navigation';

function PageContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return <HotelSearchPage />;
    case 'Packages':
      return <PackagesSearchPage />;
    case 'Cruises':
      return <CruiseSearchPage />;
    case 'Activities':
      return (
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <ActivitiesSection />
          </div>
      )
    case 'Flights':
    default:
      return <FlightSearchPage />;
  }
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
    case 'Flights':
    default:
      return <RecommendedDestinations />;
  }
}

function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab');

    return (
        <>
            <PageContent tab={tab ?? undefined} />
      
            <div className="bg-card pt-0 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fuselage-gradient">
                    <RecommendedContent tab={tab ?? undefined} />
                </div>
            </div>

            <TestimonialsSection />
        </>
    )
}


export default function Home() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
      <HomePageContent />
    </Suspense>
  );
}
