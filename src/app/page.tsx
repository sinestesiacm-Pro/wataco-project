import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { Suspense } from 'react';

export default function Home({ searchParams }: { searchParams?: { tab?: string } }) {
  const activeTab = searchParams?.tab || 'Flights';

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Hotels':
        return <HotelSearchPage />;
      case 'Packages':
        return <PackagesSearchPage />;
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
  };

  return (
    <Suspense>
      {renderActiveTab()}
    </Suspense>
  );
}
