import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import { Suspense } from 'react';

export default function Home({ searchParams }: { searchParams?: { tab?: string } }) {
  const activeTab = searchParams?.tab || 'Flights';

  return (
    <Suspense>
      {activeTab === 'Hotels' ? <HotelSearchPage /> : <FlightSearchPage />}
    </Suspense>
  );
}
