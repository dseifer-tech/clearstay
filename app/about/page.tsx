import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About InnstaStay - Commission-Free Hotel Booking Platform | Toronto Hotels',
  description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto. No commissions, no markups, just the hotel\'s actual price.',
  alternates: {
    canonical: 'https://www.innstastay.com/about',
  },
  openGraph: {
    title: 'About InnstaStay - Commission-Free Hotel Booking',
    description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto.',
    url: 'https://www.innstastay.com/about',
    siteName: 'InnstaStay',
    images: [
      {
        url: '/og/about-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'About InnstaStay - Commission-Free Hotel Booking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@innstastay',
    title: 'About InnstaStay - Commission-Free Hotel Booking',
    description: 'Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto.',
    images: ['/og/about-1200x630.jpg'],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
