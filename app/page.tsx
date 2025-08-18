import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'InnstaStay - Commission-Free Hotel Booking in Toronto | Book Direct & Save',
  description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save with InnstaStay. Find the best prices on verified hotels.',
  keywords: 'Toronto hotels, direct booking, no commission, downtown Toronto, hotel rates, InnstaStay, book direct',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.innstastay.com/',
  },
  openGraph: {
    title: 'InnstaStay - Commission-Free Hotel Booking in Toronto',
    description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save.',
    url: 'https://www.innstastay.com',
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
    title: 'InnstaStay - Commission-Free Hotel Booking in Toronto',
    description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save.',
    images: ['/innstastay-logo.svg'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
