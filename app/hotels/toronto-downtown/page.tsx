import type { Metadata } from 'next';
import DowntownPageClient from './DowntownPageClient';

export const metadata: Metadata = {
  title: 'Downtown Toronto Hotels - Direct Booking & Rates | InnstaStay',
  description:
    'Find and compare direct hotel rates in downtown Toronto. Book with top hotels near CN Tower, Casa Loma, Eaton Centre, Ripley\'s Aquarium, and more. No commissions, no markups.',
  alternates: {
    canonical: 'https://www.innstastay.com/hotels/toronto-downtown',
  },
  openGraph: {
    title: 'Downtown Toronto Hotels - Direct Booking',
    description:
      'Find verified hotel rates near top downtown Toronto attractions like the CN Tower, Royal Ontario Museum, and St. Lawrence Market — all commission-free.',
    url: 'https://www.innstastay.com/hotels/toronto-downtown',
    siteName: 'InnstaStay',
    images: [
      {
        url: '/og/toronto-downtown-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Downtown Toronto Hotels - Direct Booking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@innstastay',
    title: 'Downtown Toronto Hotels - Direct Booking',
    description: 'Find verified hotel rates near top downtown Toronto attractions like the CN Tower, Royal Ontario Museum, and St. Lawrence Market — all commission-free.',
    images: ['/og/toronto-downtown-1200x630.jpg'],
  },
  robots: 'index, follow',
};

export default function DowntownTorontoPage() {
  return <DowntownPageClient />;
}
