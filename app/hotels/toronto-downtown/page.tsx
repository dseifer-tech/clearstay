import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Downtown Toronto Hotels | Book Direct with InnstaStay',
  description: 'Find real-time prices from trusted downtown Toronto hotels. InnstaStay lets you book directly — no commissions, no hidden fees.',
  robots: 'index, follow',
  openGraph: {
    title: 'Downtown Toronto Hotels | InnstaStay',
    description: 'Compare verified hotel rates in downtown Toronto. Book direct and save with InnstaStay.',
    url: 'https://innstastay.com/hotels/toronto-downtown',
    images: ['/innstastay-logo.png'],
  }
};

export default function DowntownTorontoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Downtown Toronto Hotels
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Looking for a hotel in downtown Toronto? InnstaStay lets you compare real-time direct prices from trusted hotels near Yonge Street, Union Station, Eaton Centre, and more — with no markups, no commissions, and no fake discounts.
      </p>
      <p className="text-gray-600 mb-8">
        Whether you're here for business, concerts, or nightlife, we connect you to the best stays in the heart of the city. Book smart. Book direct.
      </p>
      <a
        href="/search?location=toronto&area=downtown"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md inline-block"
      >
        Search Downtown Hotels →
      </a>
    </div>
  );
}
