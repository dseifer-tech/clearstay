import { Metadata } from 'next';
import SearchPageClient from '@/app/search/SearchPageClient';

// Dynamic metadata generation
export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const checkin = searchParams.checkin as string;
  const checkout = searchParams.checkout as string;
  const adults = searchParams.adults as string;
  const children = searchParams.children as string;
  const near = searchParams.near as string;
  const area = searchParams.area as string;
  const type = searchParams.type as string;
  const location = searchParams.location as string;

  // Create dynamic title based on search parameters
  let title = 'Toronto Hotels - Compare Direct Rates | InnstaStay';
  
  if (checkin && checkout) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const nights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let locationText = 'Toronto';
    if (near) {
      locationText = `near ${near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    } else if (area) {
      locationText = `${area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, Toronto`;
    } else if (location) {
      locationText = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    title = `${locationText} Hotels - ${nights} Night Stay | Direct Booking | InnstaStay`;
  } else if (near) {
    const nearText = near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    title = `Hotels near ${nearText}, Toronto | Direct Rates | InnstaStay`;
  } else if (area) {
    const areaText = area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    title = `${areaText} Hotels, Toronto | Direct Booking | InnstaStay`;
  } else if (type) {
    const typeText = type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    title = `${typeText} Hotels in Toronto | Direct Rates | InnstaStay`;
  }

  // Determine if this is a search with parameters (should be noindex) or just the search page
  const hasSearchParams = checkin || checkout || adults || children || near || area || type || location;
  
  return {
    title,
    description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
    robots: hasSearchParams ? 'noindex, follow' : 'index, follow',
    alternates: {
      canonical: hasSearchParams ? 'https://www.innstastay.com/search' : 'https://www.innstastay.com/search',
    },
    openGraph: {
      title,
      description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
      url: hasSearchParams ? 'https://www.innstastay.com/search' : 'https://www.innstastay.com/search',
      siteName: 'InnstaStay',
      images: [
        {
          url: '/og/search-1200x630.jpg',
          width: 1200,
          height: 630,
          alt: 'InnstaStay - Hotel Search',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@innstastay',
      title,
      description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
      images: ['/og/search-1200x630.jpg'],
    },
  };
}

export default function SearchPage() {
  return <SearchPageClient />;
} 