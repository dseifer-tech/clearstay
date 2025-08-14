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
          href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`}
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
      <div className="space-y-8">
        {/* Main Hotel Card with Lead Rate */}
        {dynamicHotelData.official_price?.rate_per_night && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-4">Best Available Rate</p>
              
              <div className="text-4xl font-bold text-green-600 mb-2">
                ${dynamicHotelData.official_price.rate_per_night} CAD
              </div>
              <div className="text-sm text-gray-500 mb-6">per night</div>
              
              <a 
                href={dynamicHotelData.official_price.link || hotel.booking_url} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg"
              >
                Book Best Rate
              </a>
            </div>
          </div>
        )}
        
        {/* Room Cards Grid */}
        {dynamicHotelData.rooms && dynamicHotelData.rooms.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 text-center lg:text-left">
              Available Room Types
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {dynamicHotelData.rooms.map((room: any, index: number) => (
                <div key={index} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                  {/* Room Image */}
                  {room.images && room.images.length > 0 && (
                    <div className="w-full h-48 relative overflow-hidden">
                      <img 
                        src={room.images[0]} 
                        alt={room.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                  
                  {/* Room Details */}
                  <div className="p-6">
                    {/* Room Name */}
                    <h4 className="font-semibold text-gray-900 text-lg mb-3 line-clamp-2">
                      {room.name}
                    </h4>
                    
                    {/* Room Price */}
                    {room.rate_per_night && (
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        ${room.rate_per_night} CAD
                        <span className="text-sm font-normal text-gray-500 ml-1">/night</span>
                      </div>
                    )}
                    
                    {/* Room Total - only show if different */}
                    {room.total_rate && room.total_rate !== room.rate_per_night && (
                      <div className="text-sm text-gray-600 mb-3">
                        Total: ${room.total_rate} CAD
                      </div>
                    )}
                    
                    {/* Room Guests */}
                    {room.num_guests && (
                      <div className="text-sm text-gray-500 flex items-center mb-4">
                        <span className="mr-2">👥</span>
                        Sleeps {room.num_guests} guests
                      </div>
                    )}
                    
                    {/* Book Room Button */}
                    <a 
                      href={room.link || dynamicHotelData.official_price?.link || hotel.booking_url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full text-center shadow-sm"
                    >
                      Book This Room
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        

        
        {/* Dynamic Remarks - only show if there are any */}
        {(dynamicHotelData.official_price?.remarks?.length > 0 || dynamicHotelData.official_price?.discount_remarks?.length > 0) && (
          <div className="space-y-3">
            {dynamicHotelData.official_price?.remarks && dynamicHotelData.official_price.remarks.length > 0 && (
              <div className="text-sm text-blue-600 bg-blue-50 p-4 rounded-xl border border-blue-100">
                {dynamicHotelData.official_price.remarks.join(', ')}
              </div>
            )}
            
            {dynamicHotelData.official_price?.discount_remarks && dynamicHotelData.official_price.discount_remarks.length > 0 && (
              <div className="text-sm text-green-600 bg-green-50 p-4 rounded-xl border border-green-100">
                {dynamicHotelData.official_price.discount_remarks.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Show static fallback
  return (
    <a 
      href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
    >
      Check Direct Rates
    </a>
  );
}
