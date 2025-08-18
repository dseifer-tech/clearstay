"use client";
import { useEffect } from "react";
import { gtmEvent } from "@/lib/ga4";

interface HotelPageTrackerProps {
  hotelName: string;
  slug: string;
  checkin: string;
  checkout: string;
  adults: number;
  childrenCount: number;
}

export default function HotelPageTracker({ 
  hotelName, 
  slug, 
  checkin, 
  checkout, 
  adults, 
  childrenCount 
}: HotelPageTrackerProps) {
  useEffect(() => {
    // Track hotel page view
    gtmEvent('hotel_view', {
      hotel_name: hotelName,
      hotel_slug: slug,
      checkin_date: checkin,
      checkout_date: checkout,
      adults: adults,
      children: childrenCount
    });
  }, [hotelName, slug, checkin, checkout, adults, childrenCount]);

  const handleBookDirect = (bookingUrl: string) => {
    gtmEvent('booking_click', {
      hotel_name: hotelName,
      hotel_slug: slug,
      source: 'hotel_page'
    });
    window.open(bookingUrl, '_blank');
  };

  // Expose the handler globally for use in the page
  useEffect(() => {
    // @ts-ignore
    window.handleHotelBooking = handleBookDirect;
    
    return () => {
      // @ts-ignore
      delete window.handleHotelBooking;
    };
  }, [hotelName, slug, handleBookDirect]);

  return null;
}
