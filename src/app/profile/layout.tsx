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
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={cn("min-h-screen w-full pt-24 pb-8", "color-change-animation")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3 xl:col-span-3">
            <ProfileSidebar />
          </div>
          <div className="lg:col-span-9 xl:col-span-9 mt-6 lg:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
