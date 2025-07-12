
import { HomePageContent } from '@/components/home-page-content';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <HomePageContent />
    </Suspense>
  );
}
