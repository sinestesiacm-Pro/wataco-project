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
      // A placeholder as FlightSearchPage handles its own recommendations
      // We pass a dummy setDestination to avoid prop errors.
      return <RecommendedDestinations setDestination={() => {}} />;
  }
}


export default function Home({ searchParams }: { searchParams?: { tab?: string } }) {
  const isFlightSearch = !searchParams?.tab || searchParams.tab === 'Flights';

  return (
    <>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
        <PageContent tab={searchParams?.tab} />
      </Suspense>

      {/* Render recommendations outside of the main search page if not on Flights tab */}
      {!isFlightSearch && (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <RecommendedContent tab={searchParams?.tab} />
        </div>
      )}
      
      <div className="fuselage-background">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
          <TestimonialsSection />
        </div>
      </div>
    </>
  );
}
