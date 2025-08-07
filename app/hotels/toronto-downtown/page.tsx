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
    <div>
      {/* Hero Section with Background Gradient */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Downtown Toronto Hotels
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Looking for a hotel in downtown Toronto? InnstaStay lets you compare real-time direct prices from trusted hotels near Yonge Street, Union Station, Eaton Centre, and more — with no markups, no commissions, and no fake discounts.
          </p>
          <p className="text-gray-600 mb-8">
            Whether you're here for business, concerts, or nightlife, we connect you to the best stays in the heart of the city. Book smart. Book direct.
          </p>
          <a
            href="/search?location=toronto&area=downtown"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Search Downtown Hotels →
          </a>
        </div>
      </div>

      {/* Why Downtown Toronto Icons Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 21h8m-4-4v4m-8-6V5a2 2 0 012-2h8a2 2 0 012 2v10"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Central & Walkable</h3>
              <p className="text-gray-600 text-sm mt-1">Stay near events, shopping, business hubs, and transit — all within walking distance.</p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c1.657 0 3 1.567 3 3.5S13.657 15 12 15s-3-1.567-3-3.5S10.343 8 12 8z"></path>
                  <path d="M12 3v5m0 10v3m7-10h-4m-6 0H5"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Real-Time Direct Prices</h3>
              <p className="text-gray-600 text-sm mt-1">Compare official rates pulled live from hotel booking engines — no commission, no middlemen.</p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.75 17l.72 2.16a.75.75 0 001.42 0L12.59 17h4.66a.75.75 0 00.54-1.28l-3.87-4.01a.75.75 0 010-1.06l3.87-4.01a.75.75 0 00-.54-1.28h-4.66L11.89 4.84a.75.75 0 00-1.42 0L9.75 7H5.25a.75.75 0 00-.54 1.28l3.87 4.01a.75.75 0 010 1.06L4.71 17a.75.75 0 00.54 1.28h4.5z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">No Booking Fees</h3>
              <p className="text-gray-600 text-sm mt-1">We don't add fees. You book directly with the hotel and pay exactly what they charge.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
