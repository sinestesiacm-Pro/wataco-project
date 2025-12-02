'use client';

import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import CruiseSearchPage from '@/components/cruise-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { RecommendedHotels } from '@/components/recommended-hotels';
import { RecommendedPackages } from '@/components/recommended-packages';
import { RecommendedCruises } from '@/components/recommended-cruises';
import { useSearchParams } from 'next/navigation';
import { SocialFeedSection } from './social-feed-section';
import { Footer } from './footer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { RecommendedDestinations } from './recommended-destinations';
import { FlightSearchClassic } from './flight-search-classic';
import ActivitySearchPage from './activity-search-page';
import { useSearch } from '@/contexts/search-context';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';


const SearchSection = React.memo(function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const renderSearch = () => {
    switch(activeTab) {
      case 'Flights': return <FlightSearchClassic />;
      case 'Hotels': return <HotelSearchPage />;
      case 'Packages': return <PackagesSearchPage />;
      case 'Cruises': return <CruiseSearchPage />;
      case 'Activities': return <ActivitySearchPage />;
      default: return null;
    }
  }

  return (
    <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-card-3d">
        {renderSearch()}
    </div>
  );
});

const airlinePartners = [
  { name: 'American Airlines', code: 'AA' },
  { name: 'Lufthansa', code: 'LH' },
  { name: 'Emirates', code: 'EK' },
  { name: 'Delta', code: 'DL' },
  { name: 'British Airways', code: 'BA' },
  { name: 'Air France', code: 'AF' },
];

const hotelPartners = [
    { name: 'Marriott', logoUrl: 'https://i.postimg.cc/k4nJv2wD/marriott.png' },
    { name: 'Hilton', logoUrl: 'https://i.postimg.cc/j2f2fV1D/hilton.png' },
    { name: 'Hyatt', logoUrl: 'https://i.postimg.cc/P5tTS2vV/hyatt.png' },
    { name: 'Accor', logoUrl: 'https://i.postimg.cc/d1GfCgD0/accor.png' },
    { name: 'Four Seasons', logoUrl: 'https://i.postimg.cc/BvYdYVmp/four-seasons.png' },
    { name: 'Sheraton', logoUrl: 'https://i.postimg.cc/d11nSJJJ/sheraton.png' },
    { name: 'Mandarin Oriental', logoUrl: 'https://i.postimg.cc/tJn5Pq5M/mandarin-oriental.png' },
    { name: 'Rosewood', logoUrl: 'https://i.postimg.cc/7PMDbC2H/rosewood.png' },
    { name: 'Belmond', logoUrl: 'https://i.postimg.cc/SNwTzPZQ/belmond.png' },
];

const PartnersMarquee = React.memo(function PartnersMarquee({ title, subtitle, partners, partnerType }: { title: string, subtitle: string, partners: {name: string, logoUrl?: string, code?: string}[], partnerType: 'airline' | 'hotel' }) {
    const extendedPartners = [...partners, ...partners]; // Duplicate for seamless loop

    return (
    <div className="py-16 text-center">
        <h2 className="text-3xl font-headline font-semibold text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground mt-2">{subtitle}</p>
        <div className="marquee mt-8">
            <div className="marquee-content">
                {extendedPartners.map((partner, index) => (
                    <div key={`${partner.name}-${index}`} className="partner-logo">
                        <Image
                            src={partnerType === 'airline' ? `https://images.kiwi.com/airlines/64/${partner.code}.png` : partner.logoUrl!}
                            alt={partner.name}
                            width={120}
                            height={40}
                            className="object-contain w-auto h-auto max-w-full max-h-full"
                            unoptimized
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
)});


const RecommendedContent = React.memo(function RecommendedContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return (
          <>
            <RecommendedHotels />
            <PartnersMarquee title="Nuestros Hoteles de Confianza" subtitle="Red mundial de confianza" partners={hotelPartners} partnerType="hotel" />
          </>
      )
    case 'Packages':
      return <RecommendedPackages />;
    case 'Cruises':
      return <RecommendedCruises />;
    case 'Social':
      return <SocialFeedSection />;
    case 'Activities':
       return <ActivitiesSection />;
    case 'Flights':
    default:
      return (
          <>
            <RecommendedDestinations />
            <PartnersMarquee title="Nuestras Aerolíneas Asociadas" subtitle="Red mundial de confianza" partners={airlinePartners} partnerType="airline" />
          </>
      )
  }
});

export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';
    const { isSearchOpen } = useSearch();

    return (
        <div className={cn("w-full flex-grow flex flex-col relative")}>
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        key="search-panel"
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="sticky top-20 z-30 pt-4" // top-20 to be below the header
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            {tab !== 'Social' && <SearchSection tab={tab} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col flex-grow">
                 <div className="py-8 pt-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <RecommendedContent tab={tab} />
                    </div>
                </div>

                <div className="mt-auto">
                    <TestimonialsSection />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
