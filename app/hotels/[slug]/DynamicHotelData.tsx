'use client';

import { useState, useEffect } from 'react';

interface Hotel {
  name: string;
  booking_url: string;
  // Add other hotel properties as needed
}

interface DynamicHotelDataProps {
  slug: string;
  searchParams: { checkin?: string; checkout?: string; adults?: string; children?: string };
  hotel: Hotel;
  hasSearchParams: boolean;
}

export default function DynamicHotelData({ slug, searchParams, hotel, hasSearchParams }: DynamicHotelDataProps) {
  const [dynamicHotelData, setDynamicHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSearchParams) {
      return;
    }

    const fetchDynamicData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `/api/search?checkin=${searchParams.checkin}&checkout=${searchParams.checkout}&adults=${searchParams.adults}&children=${searchParams.children}&slug=${slug}`;
        
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          setDynamicHotelData(data);
        } else {
          setError(`API Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        setError('Failed to fetch dynamic data');
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicData();
  }, [slug, searchParams, hasSearchParams]);

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="text-center sm:text-left">
          <div className="text-2xl font-bold text-gray-400 animate-pulse">
            Loading...
          </div>
        </div>
        <div className="inline-block bg-gray-400 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 w-full sm:w-auto animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-3">
        <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
          Error: {error}
        </div>
        <a 
          href="/search" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
        >
          Check Direct Rates
        </a>
      </div>
    );
  }

  // Show dynamic data if available
  if (dynamicHotelData) {
    return (
      <div className="space-y-4">
        {/* Dynamic Price Display */}
        {dynamicHotelData.official_price?.rate_per_night ? (
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-green-600">
              ${dynamicHotelData.official_price.rate_per_night} CAD
            </div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        ) : null}
        
        {/* Room Cards */}
        {dynamicHotelData.rooms && dynamicHotelData.rooms.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">Available Rooms</h3>
            <div className="grid grid-cols-1 gap-4">
              {dynamicHotelData.rooms.map((room: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Room Image */}
                    {room.images && room.images.length > 0 && (
                      <div className="w-full sm:w-32 h-24 flex-shrink-0">
                        <img 
                          src={room.images[0]} 
                          alt={room.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    {/* Room Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{room.name}</h4>
                      
                      {/* Room Price */}
                      {room.rate_per_night && (
                        <div className="text-lg font-bold text-green-600 mb-2">
                          ${room.rate_per_night} CAD per night
                        </div>
                      )}
                      
                      {/* Room Total */}
                      {room.total_rate && room.total_rate !== room.rate_per_night && (
                        <div className="text-sm text-gray-600 mb-3">
                          Total: ${room.total_rate} CAD
                        </div>
                      )}
                      
                      {/* Room Guests */}
                      {room.num_guests && (
                        <div className="text-sm text-gray-500 mb-3">
                          Sleeps {room.num_guests} guests
                        </div>
                      )}
                      
                      {/* Book Room Button */}
                      <a 
                        href={room.link || dynamicHotelData.official_price?.link || hotel.booking_url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        Book This Room
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Fallback Booking Button if no rooms */}
        {(!dynamicHotelData.rooms || dynamicHotelData.rooms.length === 0) && (
          <a 
            href={dynamicHotelData.official_price?.link || hotel.booking_url} 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Book Direct Now
          </a>
        )}
        
        {/* Dynamic Remarks */}
        {dynamicHotelData.official_price?.remarks && dynamicHotelData.official_price.remarks.length > 0 && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            {dynamicHotelData.official_price.remarks.join(', ')}
          </div>
        )}
        
        {dynamicHotelData.official_price?.discount_remarks && dynamicHotelData.official_price.discount_remarks.length > 0 && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            {dynamicHotelData.official_price.discount_remarks.join(', ')}
          </div>
        )}
      </div>
    );
  }

  // Show static fallback
  return (
    <a 
      href="/search" 
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
    >
      Check Direct Rates
    </a>
  );
}
