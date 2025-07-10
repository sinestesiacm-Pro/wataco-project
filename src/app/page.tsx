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
import { FuselageSection } from '@/components/fuselage-section';

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
      // In the new layout, RecommendedDestinations is part of FlightSearchPage
      // This part is inside the fuselage, so we can return other recommendations or nothing
      return null;
  }
}


export default function Home({ searchParams }: { searchParams?: { tab?: string } }) {
  const isFlightSearch = !searchParams?.tab || searchParams.tab === 'Flights';

  const fuselageImages = [
    'https://images.unsplash.com/photo-1528747045269-3906333af562?fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?fit=crop&w=1920&q=80',
  ];

  return (
    <>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-20rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      }>
        <PageContent tab={searchParams?.tab} />
      </Suspense>

      <FuselageSection images={fuselageImages}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative z-10">
          <TestimonialsSection />
          
          {/* Render Flight recommendations inside the fuselage ONLY on the flights tab */}
          {isFlightSearch && <RecommendedDestinations setDestination={() => {}} />}

          {/* Render other recommendations if not on flights tab */}
          {!isFlightSearch && (
              <RecommendedContent tab={searchParams?.tab} />
          )}
        </div>
      </FuselageSection>
    </>
  );
}
