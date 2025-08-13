import { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';

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

  return {
    title,
    description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
    openGraph: {
      title,
      description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
      url: `https://www.innstastay.com/search${searchParams ? '?' + new URLSearchParams(searchParams as Record<string, string>).toString() : ''}`,
      siteName: 'InnstaStay',
      images: [
        {
          url: '/innstastay-logo.svg',
          width: 1200,
          height: 630,
          alt: 'InnstaStay - Commission-Free Hotel Booking',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Find and compare direct hotel rates in ${location || 'Toronto'}. No middlemen, no fees—book direct and save with InnstaStay.`,
      images: ['/innstastay-logo.svg'],
    },
  };
}

export default function SearchPage() {
  return <SearchPageClient />;
} 