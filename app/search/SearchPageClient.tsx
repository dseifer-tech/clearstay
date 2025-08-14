'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, ExternalLink, Eye, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { HOTEL_SLUG_MAP, TORONTO_HOTELS } from '@/lib/hotels';
import { format, addDays } from 'date-fns';
import StickySearchBar from '@/app/components/StickySearchBar';
import MobileMenu from '@/app/components/MobileMenu';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { gtmEvent } from '@/lib/ga4';

interface HotelRoom {
  hotel: string;
  link: string;
  before_taxes: number | null;
  source: string;
  address: string;
  rating: number;
  image: string | null;
  remarks: string | null;
  discount_remarks: string | null;
  description: string;
}

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotels, setHotels] = useState<HotelRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Create a mapping from hotel names to slugs
  const hotelNameToSlug = TORONTO_HOTELS.reduce((acc, hotel) => {
    acc[hotel.name] = HOTEL_SLUG_MAP[hotel.token];
    return acc;
  }, {} as Record<string, string>);

  // Fetch hotels when search parameters are present
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const checkin = searchParams?.get('checkin');
        const checkout = searchParams?.get('checkout');
        const adults = searchParams?.get('adults');
        const children = searchParams?.get('children');

        if (!checkin || !checkout || !adults || !children) {
          // No search parameters - don't fetch
          return;
        }

        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data);
        
        // Track successful hotel search
        gtmEvent('hotel_search', {
          location: 'toronto',
          adults: parseInt(adults),
          children: parseInt(children),
          checkin_date: checkin,
          checkout_date: checkout,
          results_count: data.length
        });
      } catch (err) {
        setError('Failed to load hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleBookDirect = (bookingUrl: string, hotelName: string) => {
    if (bookingUrl) {
      // Track booking click
      gtmEvent('booking_click', {
        hotel_name: hotelName,
        source: 'search_results'
      });
      window.open(bookingUrl, '_blank');
    }
  };

  // Show loading spinner if loading
  if (loading) {
    return <LoadingSpinner message="Searching for hotels..." variant="search" />;
  }

  // Show error if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get current search parameters
  const checkin = searchParams?.get('checkin');
  const checkout = searchParams?.get('checkout');
  const adults = searchParams?.get('adults') || '2';
  const children = searchParams?.get('children') || '0';
  const near = searchParams?.get('near');
  const area = searchParams?.get('area');
  const type = searchParams?.get('type');
  const location = searchParams?.get('location');

  // Calculate nights
  const nights = checkin && checkout ? 
    Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24)) : 
    1;

  // Create dynamic H1 based on search parameters
  let h1Text = 'Toronto Hotels';
  let subtitleText = 'Compare direct rates, book without middlemen';
  
  if (checkin && checkout) {
    let locationText = 'Toronto';
    if (near) {
      locationText = `near ${near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    } else if (area) {
      locationText = `${area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, Toronto`;
    } else if (location) {
      locationText = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    h1Text = `${locationText} Hotels`;
    subtitleText = `${nights} night stay • Direct booking • No fees`;
  } else if (near) {
    const nearText = near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `Hotels near ${nearText}`;
    subtitleText = 'Toronto • Direct rates • No middlemen';
  } else if (area) {
    const areaText = area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `${areaText} Hotels`;
    subtitleText = 'Toronto • Direct booking • No fees';
  } else if (type) {
    const typeText = type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `${typeText} Hotels in Toronto`;
    subtitleText = 'Direct rates • No middlemen • Commission-free';
  }

  return (
    <>
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

                </ul>
              </div>
            </div>
            
            {/* Right Side - Search Icon and CTA Button */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button className="hidden md:block hover:text-blue-600 transition-colors duration-200 p-2">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Search Hotels
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 hover:text-blue-600 transition-colors duration-200"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />

      {/* Sticky Search Bar */}
      <StickySearchBar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 sm:p-8 rounded-b-xl shadow-md">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{h1Text}</h1>
                <p className="text-blue-100">{subtitleText}</p>
              </div>
              <div className="text-sm font-semibold text-left sm:text-right">
                Powered by <span className="text-white">InnstaStay</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Search Results */}
          {hotels.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hotels.length} Hotel{hotels.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-600">
                  {nights} night{nights !== 1 ? 's' : ''} • {adults} adult{parseInt(adults) !== 1 ? 's' : ''}
                  {parseInt(children) > 0 && ` • ${children} child${parseInt(children) !== 1 ? 'ren' : ''}`}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    {/* Hotel Image */}
                    <div className="h-48 w-full relative">
                      {hotel.image ? (
                        <img 
                          src={hotel.image} 
                          alt={hotel.hotel} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image available</span>
                        </div>
                      )}
                      
                      {/* Rating Badge */}
                      {hotel.rating && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                        </div>
                      )}
                    </div>

                    {/* Hotel Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                        {hotel.hotel}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                        {hotel.address}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-3">
                        {hotel.before_taxes ? (
                          <div>
                            <span className="text-2xl font-bold text-green-600">
                              ${hotel.before_taxes} CAD
                            </span>
                            <span className="text-sm text-gray-500 ml-2">per night</span>
                          </div>
                        ) : (
                          <span className="text-lg font-semibold text-gray-600">Price on request</span>
                        )}
                        
                        <div className="text-xs text-gray-500 text-right">
                          <div>Direct booking</div>
                          <div>No fees</div>
                        </div>
                      </div>

                      {/* Remarks */}
                      {hotel.remarks && (
                        <div className="text-xs text-blue-600 mb-3 bg-blue-50 p-2 rounded">
                          {hotel.remarks}
                        </div>
                      )}

                      {/* Discount Remarks */}
                      {hotel.discount_remarks && (
                        <div className="text-xs text-green-600 mb-3 bg-green-50 p-2 rounded">
                          {hotel.discount_remarks}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleBookDirect(hotel.link, hotel.hotel)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Book Direct
                        </button>
                        
                        <Link
                          href={`/hotels/${hotelNameToSlug[hotel.hotel] || hotel.hotel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // No search parameters or no results
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {checkin && checkout ? 'No hotels found' : 'Search for hotels'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {checkin && checkout 
                    ? 'Try adjusting your search criteria or dates.'
                    : 'Enter your travel dates to find available hotels in Toronto.'
                  }
                </p>
                
                {!checkin || !checkout ? (
                  <>
                    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4">Quick Search</h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            const today = new Date();
                            const tomorrow = addDays(today, 1);
                            const nextWeek = addDays(today, 7);
                            const nextWeekPlus1 = addDays(today, 8);
                            
                            router.push(`/search?checkin=${format(tomorrow, 'yyyy-MM-dd')}&checkout=${format(nextWeek, 'yyyy-MM-dd')}&adults=2&children=0`);
                          }}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Next Week (7 nights)
                        </button>
                        
                        <button
                          onClick={() => {
                            const today = new Date();
                            const tomorrow = addDays(today, 1);
                            const dayAfter = addDays(today, 2);
                            
                            router.push(`/search?checkin=${format(tomorrow, 'yyyy-MM-dd')}&checkout=${format(dayAfter, 'yyyy-MM-dd')}&adults=2&children=0`);
                          }}
                          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Tomorrow (1 night)
                        </button>
                      </div>
                    </div>
                    
                    {/* Hotel Directory */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h3 className="font-semibold text-gray-800 mb-4">Featured Hotels in Toronto</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { name: "Pantages Hotel Downtown Toronto", slug: "pantages-hotel-downtown-toronto" },
                          { name: "Town Inn Suites", slug: "town-inn-suites" },
                          { name: "One King West Hotel & Residence", slug: "one-king-west-hotel-residence" },
                          { name: "The Omni King Edward Hotel", slug: "the-omni-king-edward-hotel" },
                          { name: "Chelsea Hotel, Toronto", slug: "chelsea-hotel-toronto" },
                          { name: "The Anndore House - JDV by Hyatt", slug: "the-anndore-house-jdv" },
                          { name: "Sutton Place Hotel Toronto", slug: "sutton-place-hotel-toronto" },
                          { name: "Ace Hotel Toronto", slug: "ace-hotel-toronto" }
                        ].map((hotel) => (
                          <Link
                            key={hotel.slug}
                            href={`/hotels/${hotel.slug}`}
                            className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                          >
                            <div className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                              {hotel.name}
                            </div>
                            <div className="text-sm text-gray-500">Direct Booking</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => router.push('/search')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    New Search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
