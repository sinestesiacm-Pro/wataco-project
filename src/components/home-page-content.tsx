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
import { useTheme } from '@/contexts/theme-context';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AnimatedClouds } from '@/components/animated-clouds';
import { UnderwaterScene } from './underwater-scene';
import { RecommendedDestinations } from './recommended-destinations';
import { FlightSearchSwitcher } from './flight-search-switcher';


function SearchSection({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  const renderSearch = () => {
    switch(activeTab) {
      case 'Flights': return (
        <div className="bg-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white/20">
            <FlightSearchSwitcher />
        </div>
      );
      case 'Hotels': return <HotelSearchPage />;
      case 'Packages': return <PackagesSearchPage />;
      case 'Cruises': return <CruiseSearchPage />;
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
  { name: 'American Airlines', domain: 'aa.com' },
  { name: 'Lufthansa', domain: 'lufthansa.com' },
  { name: 'Emirates', domain: 'emirates.com' },
  { name: 'Delta', domain: 'delta.com' },
  { name: 'British Airways', domain: 'ba.com' },
  { name: 'Air France', domain: 'airfrance.com' },
];

const hotelPartners = [
    { name: 'Marriott', domain: 'marriott.com' },
    { name: 'Hilton', domain: 'hilton.com' },
    { name: 'Hyatt', domain: 'hyatt.com' },
    { name: 'Accor', domain: 'accor.com' },
    { name: 'Choice Hotels', domain: 'choicehotels.com' },
    { name: 'Sheraton', domain: 'sheraton.com' }, // Part of Marriott, good logo
];

const PartnersGrid = ({ title, subtitle, partners }: { title: string, subtitle: string, partners: typeof airlinePartners }) => (
    <div className="py-16 text-center">
        <h2 className="text-3xl font-headline font-bold text-white drop-shadow-lg">{title}</h2>
        <p className="text-lg text-white/80 mt-2 drop-shadow-lg">{subtitle}</p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {partners.map(partner => (
                <div key={partner.domain} className="bg-white rounded-xl p-4 flex items-center justify-center aspect-square transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                    <Image
                        src={`https://logo.clearbit.com/${partner.domain}`}
                        alt={partner.name}
                        width={100}
                        height={60}
                        className="object-contain w-auto"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const airlineCode = partner.domain.split('.')[0];
                            target.src = `https://images.kiwi.com/airlines/64/${airlineCode}.png`;
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
            <PartnersGrid title="Nuestros Hoteles de Confianza" subtitle="Red mundial de confianza" partners={hotelPartners} />
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
            <PartnersGrid title="Nuestras Aerolíneas Asociadas" subtitle="Red mundial de confianza" partners={airlinePartners} />
          </>
      )
  }
}

export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';
    const { setTabTheme } = useTheme();

    useEffect(() => {
        setTabTheme(tab);
    }, [tab, setTabTheme]);

    return (
        <div className="w-full flex-grow flex flex-col relative">
            <div className="absolute inset-0 z-0">
                {(tab === 'Flights' || tab === 'Social') && <AnimatedClouds />}
                {tab === 'Cruises' && <UnderwaterScene />}
            </div>
            
            <div className="relative z-10 flex flex-col flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="pt-24">
                         {tab !== 'Activities' && tab !== 'Social' && <SearchSection tab={tab} />}
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
