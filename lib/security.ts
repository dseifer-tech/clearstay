// Security configuration and utilities for InnstaStay

export interface SecurityConfig {
  maxRequestSize: number;
  rateLimitWindow: number;
  maxRequestsPerWindow: number;
  allowedOrigins: string[];
  allowedImageDomains: string[];
}

export const securityConfig: SecurityConfig = {
  maxRequestSize: 1024 * 1024, // 1MB
  rateLimitWindow: 60 * 1000, // 1 minute
  maxRequestsPerWindow: 30,
  allowedOrigins: [
    'https://www.innstastay.com',
    'http://localhost:3000'
  ],
  allowedImageDomains: [
    'lh3.googleusercontent.com',
    'maps.googleapis.com',
    'images.unsplash.com'
  ]
};

// Input sanitization
export function sanitizeString(input: string, maxLength: number = 100): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[&]/g, '&amp;') // Escape ampersands
    .substring(0, maxLength);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate URL format
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Validate date format and range
export function validateDate(dateStr: string): { isValid: boolean; date: Date | null; error?: string } {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { isValid: false, date: null, error: 'Invalid date format. Use YYYY-MM-DD format.' };
  }
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { isValid: false, date: null, error: 'Invalid date.' };
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return { isValid: false, date: null, error: 'Date must be in the future.' };
  }
  
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  if (date > maxDate) {
    return { isValid: false, date: null, error: 'Date cannot be more than 1 year in the future.' };
  }
  
  return { isValid: true, date };
}

// Validate hotel slug format
export function isValidHotelSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}

// Generate secure random string
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Rate limiting cache
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitCache.set(ip, { 
      count: 1, 
      resetTime: now + securityConfig.rateLimitWindow 
    });
    return true;
  }
  
  if (record.count >= securityConfig.maxRequestsPerWindow) {
    return false;
  }
  
  record.count++;
  return true;
}

// Security headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://serpapi.com https://lh3.googleusercontent.com https://maps.googleapis.com https://images.unsplash.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
  };
}
