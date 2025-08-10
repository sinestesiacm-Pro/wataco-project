'use client';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileSidebar from '@/components/profile-sidebar';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen w-full pt-24 pb-8", "color-change-animation")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 xl:w-1/3 lg:sticky lg:top-24 self-start">
            <ProfileSidebar />
        </aside>
        <main className="lg:w-3/4 xl:w-2/3">
            {children}
        </main>
      </div>
    </div>
  );
}
