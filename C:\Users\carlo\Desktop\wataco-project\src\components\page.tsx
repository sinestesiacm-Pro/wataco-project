import { HomePageContent } from '@/components/home-page-content';
import { Suspense } from 'react';

export default function Home() {
  return (
     <div className="w-full h-full">
      <Suspense>
        <HomePageContent />
      </Suspense>
    </div>
  );
}
