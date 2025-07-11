
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { HomePageContent } from '@/components/home-page-content';

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
