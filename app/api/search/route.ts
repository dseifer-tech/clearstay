import { NextRequest, NextResponse } from 'next/server';
import { fetch_individual_hotel, fetch_all_hotels } from '@/lib/hotelData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const slug = searchParams.get('slug'); // For individual hotel requests

  if (!checkin || !checkout || !adults || !children) {
    return NextResponse.json({ 
      error: 'Missing required parameters: checkin, checkout, adults, children' 
    }, { status: 400 });
  }

  try {
    // If slug is provided, return individual hotel data
    if (slug) {
      console.log(`API: Fetching individual hotel data for slug: ${slug}`);
      const hotelData = await fetch_individual_hotel(slug, checkin, checkout, parseInt(adults), parseInt(children));
      console.log(`API: Successfully fetched hotel data for ${slug}:`, hotelData);
      return NextResponse.json(hotelData);
    } else {
      // Otherwise, return all hotels for search
      console.log(`API: Fetching all hotels data`);
      const hotels = await fetch_all_hotels(checkin, checkout, parseInt(adults), parseInt(children));
      console.log(`API: Successfully fetched all hotels data:`, hotels);
      return NextResponse.json(hotels);
    }
  } catch (error) {
    console.error('API Error fetching hotel data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch hotel data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 