
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


function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const renderSearch = () => {
    switch(activeTab) {
      case 'Flights': return (
        <div className="bg-white/40 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/20 shadow-card-3d">
          <FlightSearchClassic />
        </div>
      );
      case 'Hotels': return <HotelSearchPage />;
      case 'Packages': return <PackagesSearchPage />;
      case 'Cruises': return <CruiseSearchPage />;
      case 'Activities': return <ActivitySearchPage />;
      default: return null;
    }
  }

  return (
    <>
      {renderSearch()}
    </>
  );
}

const airlinePartners = [
  { name: 'American Airlines', code: 'AA' },
  { name: 'Lufthansa', code: 'LH' },
  { name: 'Emirates', code: 'EK' },
  { name: 'Delta', code: 'DL' },
  { name: 'British Airways', code: 'BA' },
  { name: 'Air France', code: 'AF' },
];

const hotelPartners = [
    { name: 'Marriott', domain: 'marriott.com' },
    { name: 'Hilton', domain: 'hilton.com' },
    { name: 'Hyatt', domain: 'hyatt.com' },
    { name: 'Accor', domain: 'accor.com' },
    { name: 'Choice Hotels', domain: 'choicehotels.com' },
    { name: 'Sheraton', domain: 'sheraton.com' }, // Part of Marriott, good logo
];

const PartnersGrid = ({ title, subtitle, partners, partnerType }: { title: string, subtitle: string, partners: {name: string, domain?: string, code?: string}[], partnerType: 'airline' | 'hotel' }) => (
    <div className="py-16 text-center">
        <h2 className="text-3xl font-headline font-bold text-foreground drop-shadow-lg">{title}</h2>
        <p className="text-lg text-muted-foreground mt-2 drop-shadow-lg">{subtitle}</p>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {partners.map(partner => (
                <div key={partner.name} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center aspect-square transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                    <Image
                        src={partnerType === 'airline' ? `https://images.kiwi.com/airlines/64/${partner.code}.png` : `https://logo.clearbit.com/${partner.domain}`}
                        alt={partner.name}
                        width={64}
                        height={64}
                        className="object-contain w-auto h-auto max-w-full max-h-full"
                        unoptimized={partnerType === 'airline'}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                </div>
            ))}
        </div>
    </div>
);


function RecommendedContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return (
          <>
            <RecommendedHotels />
            <PartnersGrid title="Nuestros Hoteles de Confianza" subtitle="Red mundial de confianza" partners={hotelPartners} partnerType="hotel" />
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
            <PartnersGrid title="Nuestras Aerolíneas Asociadas" subtitle="Red mundial de confianza" partners={airlinePartners} partnerType="airline" />
          </>
      )
  }
}

export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';

    return (
        <div className={cn("w-full flex-grow flex flex-col relative")}>
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="pt-24">
                         {tab !== 'Social' && <SearchSection tab={tab} />}
                    </div>
                </div>
          
                <div className="py-8">
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
