
import { HomePageContent } from '@/components/home-page-content';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="bg-transparent">
      <Suspense>
        <HomePageContent />
      </Suspense>
    </div>
  );
}
