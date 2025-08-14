import type { Metadata } from 'next';
import { HOTEL_SLUG_MAP, TORONTO_HOTELS } from '@/lib/hotels';
import { Star, MapPin, Wifi, Coffee, Car, Dumbbell, Users, Building, Shield, CheckCircle, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import NearbyPlacesSection from './NearbyPlacesSection';
import HotelPageTracker from '@/app/components/HotelPageTracker';
import { HOTEL_IMAGES } from '@/lib/hotelData';
import DynamicHotelData from './DynamicHotelData';

// Create a mapping from slug to hotel name for metadata
const SLUG_TO_HOTEL_NAME: Record<string, string> = {
  "pantages-hotel-downtown-toronto": "Pantages Hotel Downtown Toronto",
  "town-inn-suites": "Town Inn Suites",
  "one-king-west-hotel-residence": "One King West Hotel & Residence",
  "the-omni-king-edward-hotel": "The Omni King Edward Hotel",
  "chelsea-hotel-toronto": "Chelsea Hotel, Toronto",
  "the-anndore-house-jdv": "The Anndore House - JDV by Hyatt",
  "sutton-place-hotel-toronto": "Sutton Place Hotel Toronto",
  "ace-hotel-toronto": "Ace Hotel Toronto"
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hotelName = SLUG_TO_HOTEL_NAME[params.slug] || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Create unique, descriptive titles for each hotel
  const title = `${hotelName} - Direct Booking & Rates | InnstaStay`;
  const description = `Book ${hotelName} directly with no commissions. Compare real-time rates, amenities, and get the best price guaranteed.`;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.innstastay.com/hotels/${params.slug}`,
    },
    openGraph: {
      title: `${hotelName} - Direct Booking`,
      description: `Book ${hotelName} directly. No middlemen, no fees.`,
      url: `https://www.innstastay.com/hotels/${params.slug}`,
      siteName: 'InnstaStay',
      images: [
        {
          url: `/og/${params.slug}-1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: `${hotelName} - Direct Booking`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@innstastay',
      title: `${hotelName} - Direct Booking`,
      description: `Book ${hotelName} directly. No middlemen, no fees.`,
      images: [`/og/${params.slug}-1200x630.jpg`],
    },
    robots: 'index, follow'
  };
}

export default async function HotelSlugPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { checkin?: string; checkout?: string; adults?: string; children?: string };
}) {
  // Get hotel name for use in component
  const hotelName = SLUG_TO_HOTEL_NAME[params.slug] || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Find the hotel data from TORONTO_HOTELS array
  const hotel = TORONTO_HOTELS.find(h => {
    const hotelSlug = HOTEL_SLUG_MAP[h.token];
    return hotelSlug === params.slug;
  });

  // Debug: Log what hotel was found
  console.log('🔍 Hotel lookup debug:');
  console.log('🔍 params.slug:', params.slug);
  console.log('🔍 found hotel:', hotel?.name);
  console.log('🔍 hotel token:', hotel?.token);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Hotel not found</p>
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // Get the hotel's main image from HOTEL_IMAGES
  const hotelImage = HOTEL_IMAGES[hotel.name] || hotel.image_url;

  // Check if we have search parameters for dynamic data
  const hasSearchParams = Boolean(searchParams.checkin && searchParams.checkout && searchParams.adults && searchParams.children);

  return (
    <>
      <HotelPageTracker 
        hotelName={hotel.name}
        slug={params.slug}
        checkin={searchParams.checkin || ""}
        checkout={searchParams.checkout || ""}
        adults={parseInt(searchParams.adults || "2")}
        children={parseInt(searchParams.children || "0")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": hotel.name,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": hotel.address,
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "url": `https://innstastay.com/hotels/${params.slug}`,
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotel.rating,
              "bestRating": 5
            },
            "amenityFeature": [
              { "@type": "LocationFeatureSpecification", "name": "Book Direct", "value": true },
              { "@type": "LocationFeatureSpecification", "name": "No Commission", "value": true }
            ]
          })
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation Links */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex flex-col items-center">
                <img
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  width={100}
                  height={80}
                  className="h-12 sm:h-16 md:h-20 w-auto block"
                />
                <span className="text-xs text-blue-600 tracking-wide mt-1">Commission-Free Booking</span>
              </a>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <ul className="flex space-x-8 text-md font-medium text-neutral-700">
                  <li>
                    <a href="/" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/hotels/toronto-downtown" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Downtown Hotels
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Side - CTA Button */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Search Hotels
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Brand-First Header Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 sm:p-6 rounded-b-xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
              <Link 
                href="/search" 
                className="text-blue-100 hover:text-white flex items-center text-sm mb-2"
              >
                ← Back to Search
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold">{hotel.name}</h1>
              <p className="text-sm text-blue-100">{hotel.address}</p>
            </div>
            <div className="text-sm font-semibold text-left sm:text-right">
              Powered by <span className="text-white">InnstaStay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Card with Main Image and Check Direct Rates Button */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <div className="w-full sm:w-48 h-36">
            {hotelImage ? (
              <img 
                src={hotelImage} 
                alt={hotel.name} 
                className="w-full h-full object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg border flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                <span className="text-sm text-gray-500">• {hotel.rating}-star hotel</span>
              </div>
            </div>
            
            <div className="mt-4">
              {/* Debug info */}
              <div className="text-xs text-red-500 mb-2">
                Debug: hasSearchParams = {hasSearchParams ? 'YES' : 'NO'}
                <br />
                Search Params: {JSON.stringify(searchParams)}
                <br />
                Slug: {params.slug}
              </div>
              
              {/* Use client component for dynamic data */}
              <div className="text-xs text-green-500 mb-2">
                About to render DynamicHotelData component...
              </div>
              <DynamicHotelData 
                slug={params.slug}
                searchParams={searchParams}
                hotel={hotel}
                hasSearchParams={hasSearchParams}
              />
            </div>
            
            {/* Value Signals */}
            <div className="text-xs text-gray-400 mt-3 text-center sm:text-left">
              ✅ No middlemen · 💵 No extra fees · 🔒 Secure checkout
            </div>
          </div>
        </div>

        {/* Hotel Description Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About This Hotel</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {hotel.name} is a premium hotel located in the heart of downtown Toronto. 
            Experience exceptional service, modern amenities, and comfortable accommodations 
            in one of Canada's most vibrant cities.
          </p>
          
          {/* Amenities */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Hotel Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hotel.amenities?.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {amenity}
                </div>
              )) || (
                <div className="text-sm text-gray-500">Amenities information not available</div>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-800 font-medium">{hotel.address}</p>
              <p className="text-sm text-gray-600 mt-1">
                Located in downtown Toronto, this hotel offers easy access to major attractions, 
                shopping districts, and business centers.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Ready to Check Rates?
          </h3>
          <p className="text-gray-600 mb-4">
            Check real-time availability and rates directly from the hotel with no commissions or hidden fees.
          </p>
          <a 
            href="/search" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Check Direct Rates
          </a>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-center text-sm text-gray-400">
          Built for travelers who book smart. Powered by <span className="text-blue-600 font-semibold">InnstaStay</span>.
        </div>
        
        {/* Hotel Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              "@id": `https://www.innstastay.com/hotels/${params.slug}#hotel`,
              "name": hotelName,
              "url": `https://www.innstastay.com/hotels/${params.slug}`,
              "image": `https://www.innstastay.com/og/${params.slug}-1200x630.jpg`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Toronto",
                "addressRegion": "ON",
                "addressCountry": "CA"
              },
              "brand": hotelName.split(' ').slice(-2).join(' '), // Extract brand from hotel name
              "amenityFeature": [
                {
                  "@type": "LocationFeatureSpecification",
                  "name": "Free Wi-Fi"
                }
              ]
            })
          }}
        />
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 w-full bg-white border-t shadow-sm p-4 md:hidden">
        <div className="flex justify-center">
          <a 
            href="/search" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-center w-full max-w-sm"
          >
            Check Direct Rates
          </a>
        </div>
      </div>
    </div>
    </>
  );
} 