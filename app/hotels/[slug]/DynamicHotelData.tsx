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
  console.log('🔍 DynamicHotelData component loaded');
  console.log('🔍 Props:', { slug, searchParams, hotel: hotel.name, hasSearchParams });
  
  const [dynamicHotelData, setDynamicHotelData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hasSearchParams) {
      console.log('🔍 No search parameters, using static data');
      return;
    }

    const fetchDynamicData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Fetching dynamic data for slug:', slug);
        console.log('🔍 Search params:', searchParams);
        
        const apiUrl = `/api/search?checkin=${searchParams.checkin}&checkout=${searchParams.checkout}&adults=${searchParams.adults}&children=${searchParams.children}&slug=${slug}`;
        console.log('🔍 API URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        console.log('🔍 Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('🔍 API Response data:', data);
          setDynamicHotelData(data);
          console.log('🔍 Set dynamicHotelData:', data);
        } else {
          console.error('🔍 API Error:', response.status, response.statusText);
          setError(`API Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error('🔍 Error fetching dynamic hotel data:', error);
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
      <div className="space-y-3">
        {/* Dynamic Price Display */}
        {dynamicHotelData.before_taxes ? (
          <div className="text-center sm:text-left">
            <div className="text-2xl font-bold text-green-600">
              ${dynamicHotelData.before_taxes} CAD
            </div>
            <div className="text-sm text-gray-500">per night</div>
          </div>
        ) : null}
        
        {/* Dynamic Booking Button */}
        <a 
          href={dynamicHotelData.link || hotel.booking_url} 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg text-sm font-semibold transition-all duration-200 transform hover:-translate-y-0.5 w-full sm:w-auto"
        >
          Book Direct Now
        </a>
        
        {/* Dynamic Remarks */}
        {dynamicHotelData.remarks && (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            {dynamicHotelData.remarks}
          </div>
        )}
        
        {dynamicHotelData.discount_remarks && (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            {dynamicHotelData.discount_remarks}
          </div>
        )}
      </div>
    );
  }

  // Show static fallback
  return (
    <div className="space-y-2">
      <div className="text-xs text-blue-500 bg-blue-50 p-1 rounded">
        Component loaded - No search params or no data
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
