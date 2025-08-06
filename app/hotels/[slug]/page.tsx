import type { Metadata } from 'next';
import { SLUG_TO_TOKEN } from '@/lib/hotels';
import { Star, MapPin, Wifi, Coffee, Car, Dumbbell, Users, Building, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const name = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${name} | Book Direct on InnstaStay`,
    description: `Compare real-time direct rates for ${name}. No commissions. Always book direct with InnstaStay.`,
    openGraph: {
      title: `${name} | InnstaStay`,
      description: `Verified hotel. Live pricing from the hotel website.`,
      url: `https://innstastay.com/hotels/${params.slug}`,
      images: ['/innstastay-logo.svg']
    },
    robots: 'index, follow'
  };
}

interface HotelData {
  hotel: string;
  description: string;
  link: string;
  address: string;
  phone: string;
  rating: number;
  hotel_class?: number;
  gps_coordinates?: { latitude: number; longitude: number };
  images: string[];
  nearby_places?: {
    category: string;
    name: string;
    description: string;
  }[];
  official_price: {
    source: string;
    rate_per_night: number;
    total_rate: number;
    link: string;
    free_cancellation?: boolean;
    free_cancellation_until_date?: string;
    remarks?: string[];
    discount_remarks?: string[];
  } | null;
  rooms: {
    name: string;
    rate_per_night?: number;
    total_rate?: number;
    images?: string[];
    link?: string;
    num_guests?: number;
  }[];
}

export default async function HotelSlugPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { checkin?: string; checkout?: string; adults?: string; children?: string };
}) {
  const checkin = searchParams.checkin;
  const checkout = searchParams.checkout;
  const adults = searchParams.adults || "2";
  const children = searchParams.children || "0";

  if (!checkin || !checkout || !params.slug) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Missing required parameters</p>
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  let hotel: HotelData | null = null;
  let error: string | null = null;

  try {
    console.log(`Fetching hotel data for slug: ${params.slug}`);
    
    // Use absolute URL for server-side fetch
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://innstastay.com';
    const apiUrl = `${baseUrl}/api/search?slug=${params.slug}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`;
    
    console.log(`Making API call to: ${apiUrl}`);
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      console.error(`API response not ok: ${res.status} ${res.statusText}`);
      error = `API error: ${res.status} ${res.statusText}`;
    } else {
      const data = await res.json();
      console.log('API response data:', data);
      
      if (data.error) {
        error = data.error;
      } else {
        hotel = data;
      }
    }
  } catch (err) {
    console.error('Fetch error:', err);
    error = "Failed to load hotel data";
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Hotel not found"}</p>
          <Link href="/search" className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "name": hotel.hotel,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": hotel.address,
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA"
            },
            "priceRange": hotel.official_price?.rate_per_night ? `$${hotel.official_price.rate_per_night} CAD` : undefined,
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
      {/* Brand-First Header Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 rounded-b-xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <Link 
                href={`/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`} 
                className="text-blue-100 hover:text-white flex items-center text-sm mb-2"
              >
                ← Back to Search
              </Link>
              <h1 className="text-3xl font-bold">{hotel.hotel}</h1>
              <p className="text-sm text-blue-100">{hotel.address}</p>
            </div>
            <div className="text-sm font-semibold text-right">
              Powered by <span className="text-white">InnstaStay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Card with Clear CTA */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-4 flex gap-6 items-center">
          <div className="w-48 h-36">
            {hotel.images && hotel.images.length > 0 ? (
              <img 
                src={hotel.images[0]} 
                alt={hotel.hotel} 
                className="w-full h-full object-cover rounded-lg border"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg border flex items-center justify-center">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {hotel.official_price && (
                <p className="text-green-600 text-2xl font-bold">
                  ${hotel.official_price.total_rate} CAD
                </p>
              )}
              <span className="text-sm text-gray-500">direct from hotel</span>
            </div>
            
            <div className="flex items-center mb-3">
              <span className="text-gray-600 text-sm">
                {hotel.rating && !isNaN(hotel.rating) ? `${Math.floor(hotel.rating)}-star hotel` : 'Hotel'}
              </span>
            </div>
            
            <div className="mt-3">
              {hotel.official_price?.link && (
                <a 
                  href={hotel.official_price.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow text-sm font-semibold transition-colors"
                >
                  Book Now
                </a>
              )}
            </div>
            
            {/* Value Signals */}
            <div className="text-xs text-gray-400 mt-2">
              ✅ No middlemen · 💵 No extra fees · 🔒 Secure checkout
            </div>
          </div>
        </div>

        {/* Hotel Description Section */}
        {hotel.description && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About This Hotel</h3>
            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {/* Polished Room Grid Layout */}
        {hotel.rooms && hotel.rooms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {hotel.rooms.map((room, i) => (
                <div key={i} className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition-all duration-200">
                  <div className="h-40 w-full mb-3">
                    {room.images && room.images.length > 0 ? (
                      <img 
                        src={room.images[0]} 
                        alt={room.name || `Room ${i + 1}`} 
                        className="rounded-lg h-full w-full object-cover"
                      />
                    ) : (
                      <div className="rounded-lg h-full w-full bg-gray-200 flex items-center justify-center">
                        <Building className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                    {room.name || `Room ${i + 1}`}
                  </h3>
                  
                  <p className="text-green-600 font-bold mb-2">
                    ${room.rate_per_night || room.total_rate || 'N/A'} CAD
                  </p>
                  
                  {room.num_guests && (
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Users className="w-3 h-3 mr-1" />
                      {room.num_guests} guests
                    </div>
                  )}
                  
                  {room.link && (
                    <a
                      href={room.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm underline hover:text-blue-800"
                    >
                      Book Direct
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby Places Section */}
        {hotel.nearby_places && hotel.nearby_places.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Places</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hotel.nearby_places.map((place, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 text-sm mb-1">{place.name}</h4>
                  <p className="text-gray-600 text-xs">{place.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Branding */}
        <div className="mt-12 text-center text-sm text-gray-400">
          Built for travelers who book smart. Powered by <span className="text-blue-600 font-semibold">InnstaStay</span>.
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 w-full bg-white border-t shadow-sm p-4 md:hidden">
        <div className="flex justify-center">
          {hotel.official_price?.link && (
            <a 
              href={hotel.official_price.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-center w-full max-w-sm"
            >
              Book Direct
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  );
} 