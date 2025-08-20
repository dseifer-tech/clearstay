import { NextRequest, NextResponse } from 'next/server';
import { fetch_individual_hotel, fetch_all_hotels } from '@/lib/hotelData';
import { z } from 'zod';

// Zod schema for search parameters validation
const SearchParamsSchema = z.object({
  slug: z.string()
    .regex(/^[a-z0-9-]+$/, 'Invalid hotel slug format')
    .optional(),
  checkin: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD format')
    .refine(dateStr => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return false;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date >= today;
    }, 'Date must be today or in the future')
    .refine(dateStr => {
      const date = new Date(dateStr);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      
      return date <= maxDate;
    }, 'Date cannot be more than 1 year in the future'),
  checkout: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD format')
    .refine(dateStr => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return false;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      return date >= today;
    }, 'Date must be today or in the future')
    .refine(dateStr => {
      const date = new Date(dateStr);
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      
      return date <= maxDate;
    }, 'Date cannot be more than 1 year in the future'),
  adults: z.coerce.number()
    .int('Adults must be a whole number')
    .min(1, 'At least 1 adult is required')
    .max(10, 'Maximum 10 adults allowed'),
  children: z.coerce.number()
    .int('Children must be a whole number')
    .min(0, 'Children cannot be negative')
    .max(10, 'Maximum 10 children allowed')
}).refine(data => {
  // Cross-field validation: checkout must be after checkin
  if (data.checkin && data.checkout) {
    const checkinDate = new Date(data.checkin);
    const checkoutDate = new Date(data.checkout);
    return checkoutDate > checkinDate;
  }
  return true;
}, {
  message: 'Checkout date must be after checkin date',
  path: ['checkout']
});

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

// Helper function to sanitize string inputs (basic security)
function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 100); // Limit length
}

// Add revalidation interval for better caching
export const revalidate = 30; // Revalidate every 30 seconds

export async function GET(request: NextRequest) {
  // CORS and caching headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' 
      ? 'https://www.innstastay.com' 
      : 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Cache-Control': 's-maxage=30, stale-while-revalidate=120', // Cache for 30s, serve stale for 2 minutes
    'Vary': 'Accept-Encoding'
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
  
  // Extract and sanitize parameters
  const rawParams = {
    slug: searchParams.get('slug') ? sanitizeString(searchParams.get('slug')!) : undefined,
    checkin: searchParams.get('checkin') ? sanitizeString(searchParams.get('checkin')!) : '',
    checkout: searchParams.get('checkout') ? sanitizeString(searchParams.get('checkout')!) : '',
    adults: searchParams.get('adults') || '',
    children: searchParams.get('children') || ''
  };

  // Validate parameters with Zod schema
  const validation = SearchParamsSchema.safeParse(rawParams);
  
  if (!validation.success) {
    const errors = validation.error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    
    return NextResponse.json({ 
      error: 'Invalid request parameters',
      details: errors
    }, { status: 400, headers });
  }

  const { slug, checkin, checkout, adults, children } = validation.data;

  try {
    // If slug is provided, return individual hotel data
    if (slug) {
      const hotelData = await fetch_individual_hotel(slug, checkin, checkout, adults, children);
      return NextResponse.json(hotelData, { headers });
    } else {
      // Otherwise, return all hotels for search
      const hotels = await fetch_all_hotels(checkin, checkout, adults, children);
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