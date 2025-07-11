'use client';

import FlightSearchPage from '@/components/flight-search-page';
import HotelSearchPage from '@/components/hotel-search-page';
import PackagesSearchPage from '@/components/packages-search-page';
import CruiseSearchPage from '@/components/cruise-search-page';
import { ActivitiesSection } from '@/components/activities-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { useMemo } from 'react';
import { RecommendedDestinations } from '@/components/recommended-destinations';
import { RecommendedHotels } from '@/components/recommended-hotels';
import { RecommendedPackages } from '@/components/recommended-packages';
import { RecommendedCruises } from '@/components/recommended-cruises';
import { useSearchParams } from 'next/navigation';
import { FuselageSection } from '@/components/fuselage-section';
import { SocialFeedSection } from './social-feed-section';

function RecommendedContent({ tab }: { tab?: string }) {
  const activeTab = tab || 'Flights';

  switch (activeTab) {
    case 'Hotels':
      return <RecommendedHotels />;
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
      return <RecommendedDestinations />;
  }
}


export function HomePageContent() {
    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || 'Flights';

    const tabSpecifics = {
      Flights: {
        images: [
          'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1488085061387-422e29b40080?fit=crop&w=1920&q=80',
        ],
        title: <>Tu Próxima Aventura<br />te Espera</>,
        subtitle: "Encuentra y reserva sin esfuerzo los mejores vuelos a cualquier parte del mundo.",
      },
      Hotels: {
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?fit=crop&w=1920&q=80',
        ],
        title: "Encuentra tu Estancia Perfecta",
        subtitle: "Desde hoteles de lujo hasta acogedores apartamentos, tenemos el lugar ideal para ti.",
      },
       Packages: {
        images: [
          'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?fit=crop&w=1920&q=80',
        ],
        title: "Paquetes de Viaje Completos",
        subtitle: "Reserva tu vuelo y hotel juntos para ahorrar tiempo y dinero.",
      },
      Cruises: {
        images: [
          'https://images.unsplash.com/photo-1540340061722-9293d5163008?fit=crop&w=1920&q=80',
        ],
        title: "Embárcate en tu Próxima Aventura",
        subtitle: "Descubre y reserva increíbles vacaciones en crucero por todo el mundo.",
      },
      Activities: {
        images: [
          'https://images.unsplash.com/photo-1692205959816-d75d4a7b89d4?fit=crop&w=1920&q=80',
        ],
        title: "Vive Experiencias Únicas",
        subtitle: "Reserva tours, atracciones y actividades inolvidables en tu destino.",
      },
      Social: {
        images: [],
        title: '',
        subtitle: ''
      }
    };
    
    const currentTabInfo = useMemo(() => {
        return tabSpecifics[tab as keyof typeof tabSpecifics] || tabSpecifics.Flights;
    }, [tab]);

    const SearchForm = () => {
        switch (tab) {
            case 'Flights': return <FlightSearchPage />;
            case 'Hotels': return <HotelSearchPage />;
            case 'Packages': return <PackagesSearchPage />;
            case 'Cruises': return <CruiseSearchPage />;
            default: return null;
        }
    };


    return (
        <div className="w-full">
            {tab !== 'Social' && (
              <FuselageSection 
                  images={currentTabInfo.images} 
                  title={currentTabInfo.title} 
                  subtitle={currentTabInfo.subtitle} 
              />
            )}
            
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-100px] relative z-10">
              {tab !== 'Social' && tab !== 'Activities' && (
                <div className="bg-white/20 backdrop-blur-lg border border-white/20 p-2 sm:p-4 rounded-3xl shadow-2xl">
                    <SearchForm />
                </div>
              )}
            </div>
      
            <div className="bg-transparent pt-16 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <RecommendedContent tab={tab} />
                </div>
            </div>

            <TestimonialsSection />
        </div>
    )
}
