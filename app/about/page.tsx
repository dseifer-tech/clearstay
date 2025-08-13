import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About InnstaStay - Commission-Free Hotel Booking Platform | Toronto Hotels',
  description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto. No commissions, no markups, just the hotel\'s actual price.',
  keywords: 'InnstaStay about, direct hotel booking, no commission, Toronto hotels, hotel booking platform',
  openGraph: {
    title: 'About InnstaStay - Commission-Free Hotel Booking',
    description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto.',
    url: 'https://www.innstastay.com/about',
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
    title: 'About InnstaStay - Commission-Free Hotel Booking',
    description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto.',
    images: ['/innstastay-logo.svg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
