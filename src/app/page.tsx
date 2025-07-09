import FlightSearchPage from '@/components/flight-search-page';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <FlightSearchPage />
    </Suspense>
  );
}
