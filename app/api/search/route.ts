import { NextRequest, NextResponse } from 'next/server';
import { fetch_individual_hotel, fetch_all_hotels } from '@/lib/hotelData';

// Simple rate limiting cache
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 30; // Max 30 requests per minute
  
  const record = rateLimitCache.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitCache.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Input sanitization function
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
}

// Validate date format and range
function validateDate(dateStr: string): { isValid: boolean; date: Date | null; error?: string } {
  // Check format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { isValid: false, date: null, error: 'Invalid date format. Use YYYY-MM-DD format.' };
  }
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { isValid: false, date: null, error: 'Invalid date.' };
  }
  
  // Check if date is in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return { isValid: false, date: null, error: 'Date must be in the future.' };
  }
  
  // Check if date is not too far in the future (1 year)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  if (date > maxDate) {
    return { isValid: false, date: null, error: 'Date cannot be more than 1 year in the future.' };
  }
  
  return { isValid: true, date };
}

export async function GET(request: NextRequest) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
      ? 'https://www.innstastay.com' 
      : 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers });
  }

  // Rate limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ 
      error: 'Rate limit exceeded. Please try again later.' 
    }, { status: 429, headers });
  }

  const { searchParams } = new URL(request.url);
  
  // Sanitize and validate all inputs
  const checkin = sanitizeInput(searchParams.get('checkin') || '');
  const checkout = sanitizeInput(searchParams.get('checkout') || '');
  const adults = sanitizeInput(searchParams.get('adults') || '');
  const children = sanitizeInput(searchParams.get('children') || '');
  const slug = sanitizeInput(searchParams.get('slug') || ''); // For individual hotel requests

  // Validate required parameters
  if (!checkin || !checkout || !adults || !children) {
    return NextResponse.json({ 
      error: 'Missing required parameters: checkin, checkout, adults, children' 
    }, { status: 400, headers });
  }

  // Validate dates
  const checkinValidation = validateDate(checkin);
  if (!checkinValidation.isValid) {
    return NextResponse.json({ 
      error: checkinValidation.error 
    }, { status: 400, headers });
  }

  const checkoutValidation = validateDate(checkout);
  if (!checkoutValidation.isValid) {
    return NextResponse.json({ 
      error: checkoutValidation.error 
    }, { status: 400, headers });
  }

  // Validate date range
  if (checkinValidation.date! >= checkoutValidation.date!) {
    return NextResponse.json({ 
      error: 'Checkout date must be after checkin date.' 
    }, { status: 400, headers });
  }

  // Validate traveler counts
  const adultsNum = parseInt(adults);
  const childrenNum = parseInt(children);

  if (isNaN(adultsNum) || isNaN(childrenNum) || adultsNum < 1 || adultsNum > 10 || childrenNum < 0 || childrenNum > 10) {
    return NextResponse.json({ 
      error: 'Invalid traveler count. Adults must be 1-10, children 0-10.' 
    }, { status: 400, headers });
  }

  // Validate slug if provided
  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ 
      error: 'Invalid hotel slug format.' 
    }, { status: 400, headers });
  }

  try {
    // If slug is provided, return individual hotel data
    if (slug) {
      console.log(`API: Fetching individual hotel data for slug: ${slug}`);
      const hotelData = await fetch_individual_hotel(slug, checkin, checkout, adultsNum, childrenNum);
      console.log(`API: Successfully fetched hotel data for ${slug}:`, hotelData);
      return NextResponse.json(hotelData, { headers });
    } else {
      // Otherwise, return all hotels for search
      console.log(`API: Fetching all hotels data`);
      const hotels = await fetch_all_hotels(checkin, checkout, adultsNum, childrenNum);
      console.log(`API: Successfully fetched all hotels data:`, hotels);
      return NextResponse.json(hotels, { headers });
    }
  } catch (error) {
    console.error('API Error fetching hotel data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch hotel data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500, headers });
  }
} 