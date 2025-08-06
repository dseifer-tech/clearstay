'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, MapPin, ExternalLink, Eye } from 'lucide-react';
import Link from 'next/link';
import { HOTEL_SLUG_MAP } from '@/lib/hotels';

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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<HotelRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const checkin = searchParams.get('checkin');
        const checkout = searchParams.get('checkout');
        const adults = searchParams.get('adults');
        const children = searchParams.get('children');

        if (!checkin || !checkout || !adults || !children) {
          setError('Missing search parameters');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        console.log('API Response:', data);
        console.log('First hotel data:', data[0]);
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleBookDirect = (bookingUrl: string) => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">Searching for hotels...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-lg text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a href="/" className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto block"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8 text-md font-medium text-neutral-700">
                <li><a href="/" className="hover:text-blue-600 transition-colors duration-200">Home</a></li>
                <li><a href="/about" className="hover:text-blue-600 transition-colors duration-200">About</a></li>
                <li><a href="/search" className="hover:text-blue-600 transition-colors duration-200">Toronto Hotels</a></li>
              </ul>
              <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Compare Rates
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                Home
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
            <p className="text-gray-600">
              {hotels.length} hotels found for your search
            </p>
          </div>

          {hotels.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No hotels found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-6">
              {hotels.map((hotel, index) => {
                // Find the hotel token to get the slug
                const hotelToken = Object.keys(HOTEL_SLUG_MAP).find(token => 
                  hotel.hotel.toLowerCase().includes(HOTEL_SLUG_MAP[token].replace(/-/g, ' ').toLowerCase())
                );
                const slug = hotelToken ? HOTEL_SLUG_MAP[hotelToken] : null;
                const checkin = searchParams.get('checkin');
                const checkout = searchParams.get('checkout');
                const adults = searchParams.get('adults');
                const children = searchParams.get('children');
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-zinc-100 p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                          {/* Hotel Image Placeholder */}
                          <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold text-sm">Hotel</span>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">{hotel.hotel}</h4>
                            <div className="flex items-center text-sm text-yellow-500 mb-2">
                              <Star className="w-4 h-4 mr-1" />
                              <span className="font-medium">{hotel.rating}</span>
                              <span className="mx-2 text-zinc-400">•</span>
                              <span className="text-zinc-500">Downtown Toronto</span>
                            </div>
                            <p className="text-sm text-neutral-600 mb-3">{hotel.address}</p>
                            
                            {/* Hotel Description */}
                            {hotel.description && (
                              <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                                {hotel.description}
                              </p>
                            )}
                            
                            {hotel.remarks && (
                              <p className="text-sm text-blue-600 mb-2">{hotel.remarks}</p>
                            )}
                            {hotel.discount_remarks && (
                              <p className="text-sm text-green-600 mb-2">{hotel.discount_remarks}</p>
                            )}
                            
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                              <button
                                onClick={() => handleBookDirect(hotel.link)}
                                disabled={!hotel.link}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {hotel.before_taxes ? "Book Direct" : "Check Direct for Best Rate"}
                              </button>
                              
                              {slug && checkin && checkout && (
                                <Link
                                  href={`/hotels/${slug}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-start sm:items-end mt-4 sm:mt-0">
                        {hotel.before_taxes && (
                          <div className="bg-green-100 text-green-800 font-bold px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg">
                            ${hotel.before_taxes} / night
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 