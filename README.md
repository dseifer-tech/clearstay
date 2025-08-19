# InnstaStay - Commission-Free Hotel Booking Platform

A modern, commission-free hotel booking platform built with Next.js 14, designed to connect travelers directly with hotels in Toronto, eliminating middlemen and hidden fees.

## 🚀 Live Demo
**Production Site:** [https://www.innstastay.com](https://www.innstastay.com)

## 🎯 Project Overview

InnstaStay is a direct booking platform that:
- **Eliminates commissions** - Hotels pay no booking fees
- **Provides real-time rates** - Live pricing from hotel APIs
- **Offers transparent pricing** - No hidden fees or markups
- **Focuses on Toronto hotels** - Curated selection of premium properties

## 🏗️ Architecture & Tech Stack

### Frontend
- **Next.js 14** - App Router with Server & Client Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **React Hooks** - State management

### Backend & APIs
- **SerpAPI** - Hotel data and real-time pricing
- **Next.js API Routes** - Serverless backend functions
- **Rate Limiting** - API protection
- **Input Validation** - Sanitized user inputs

### SEO & Analytics
- **Google Analytics 4** - User tracking
- **Structured Data** - Schema.org markup
- **Open Graph** - Social media optimization
- **Twitter Cards** - Enhanced social sharing
- **Canonical URLs** - SEO best practices

### Deployment
- **Vercel** - Production hosting
- **GitHub** - Version control
- **Automatic deployments** - CI/CD pipeline

## 📁 Project Structure

```
ClearStay/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── search/               # Hotel search endpoint
│   ├── components/               # Reusable components
│   │   ├── FAQ.tsx              # FAQ component
│   │   ├── HotelPageTracker.tsx # Analytics tracking
│   │   ├── MobileMenu.tsx       # Mobile navigation
│   │   └── SecondaryCTA.tsx     # Call-to-action component
│   ├── contact/                  # Contact page
│   ├── globals.css              # Global styles
│   ├── hotels/                  # Hotel pages
│   │   ├── [slug]/              # Dynamic hotel pages
│   │   │   ├── page.tsx         # Hotel detail page
│   │   │   ├── DynamicHotelData.tsx # Dynamic pricing component
│   │   │   └── NearbyPlacesSection.tsx
│   │   └── toronto-downtown/    # Downtown hotels page
│   ├── search/                  # Search functionality
│   │   ├── page.tsx             # Search page
│   │   └── SearchPageClient.tsx # Search client component
│   ├── about/                   # About page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── lib/                         # Utility libraries
│   ├── hotels.ts               # Hotel data & mappings
│   └── hotelData.ts            # API integration
├── public/                      # Static assets
│   ├── images/                 # Image assets
│   └── innstastay-logo.svg     # Brand logo
└── README.md                   # This file
```

## 🏨 Hotel Integration

### Supported Hotels
- **Town Inn Suites** - Extended stay accommodations
- **One King West Hotel & Residence** - Luxury downtown
- **The Anndore House - JDV by Hyatt** - Boutique hotel
- **Pantages Hotel Downtown Toronto** - Historic luxury
- **The Omni King Edward Hotel** - Classic elegance
- **Chelsea Hotel, Toronto** - Family-friendly
- **Sutton Place Hotel Toronto** - Business luxury
- **Ace Hotel Toronto** - Modern boutique

### Data Sources
- **Static Hotel Data** - Curated hotel information
- **SerpAPI Integration** - Real-time pricing and availability
- **Dynamic Room Types** - Individual room offerings
- **Amenity Lists** - Hotel features and services

## 🎨 UI/UX Features

### Homepage
- **Hero Section** - Animated gradient background
- **Search Interface** - Date picker with guest selection
- **Featured Hotels** - Curated hotel showcase
- **Trust Signals** - SSL, verified rates, no hidden fees
- **Quick Search Pills** - Preset date ranges

### Search Page
- **Enhanced Hero** - Sticky search bar with glass effect
- **Quick Search** - Pill buttons for common date ranges
- **View Toggle** - Map/List view options
- **Why Book Direct** - 3-column benefit section
- **Top Attractions** - Mini carousel
- **Hotel Categories** - Tabbed navigation
- **Responsive Grid** - Hotel cards with pricing

### Hotel Detail Pages
- **Dynamic Pricing** - Real-time rate display
- **Room Cards** - Individual room offerings in grid
- **Professional Layout** - Hotel image with lead rate
- **Booking Integration** - Direct hotel booking links
- **Amenity Display** - Hotel features and services
- **Location Information** - Address and area details

### Navigation
- **Sticky Header** - Always accessible navigation
- **Mobile Menu** - Responsive mobile navigation
- **Breadcrumb Navigation** - Clear page hierarchy
- **Search Integration** - Preserved search parameters

## 🔧 Key Features

### Dynamic Pricing
- **Real-time Rates** - Live pricing from hotel APIs
- **Room Availability** - Individual room type display
- **Price Comparison** - Per-night vs total pricing
- **Booking Links** - Direct hotel booking integration

### Search Functionality
- **Date Selection** - Flexible check-in/check-out
- **Guest Configuration** - Adults and children selection
- **Parameter Preservation** - Maintains search context
- **Back Navigation** - Returns to search results

### SEO Optimization
- **Meta Tags** - Unique titles and descriptions
- **Structured Data** - Schema.org markup
- **Canonical URLs** - Prevents duplicate content
- **Open Graph** - Social media optimization
- **Sitemap Generation** - Search engine indexing

### User Experience
- **Loading States** - Smooth loading indicators
- **Error Handling** - Graceful error messages
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliance
- **Performance** - Optimized loading speeds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SerpAPI account (for hotel data)

### Installation
```bash
# Clone the repository
git clone https://github.com/dseifer-tech/innstastay.git
cd ClearStay

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SerpAPI key to .env.local

# Run development server
npm run dev
```

### Environment Variables
```env
SERPAPI_KEY=your_serpapi_key_here
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📊 Analytics & Tracking

### Google Analytics 4
- **Page Views** - Track user navigation
- **Hotel Interactions** - Monitor hotel page visits
- **Booking Clicks** - Track conversion attempts
- **Search Analytics** - Monitor search behavior

### Custom Events
- **Hotel Page Views** - Individual hotel tracking
- **Search Submissions** - Search query tracking
- **Booking Attempts** - Conversion tracking
- **Navigation Patterns** - User journey analysis

## 🔒 Security & Performance

### Security Measures
- **Input Sanitization** - Prevents XSS attacks
- **Rate Limiting** - API protection
- **CSP Headers** - Content Security Policy
- **HTTPS Only** - Secure connections

### Performance Optimizations
- **Image Optimization** - Next.js image optimization with proxy API for external images
- **Code Splitting** - Automatic bundle splitting
- **Static Generation** - Pre-rendered pages
- **CDN Integration** - Global content delivery

## 🐛 Troubleshooting Guide

### Image Loading Issues

#### Problem: Hotel images not displaying on homepage and search pages
**Symptoms:**
- Images show as blank spaces or gray placeholders
- Network requests return 200 status but images don't render
- Console shows no errors but images remain invisible

**Root Cause:**
- External hotel image URLs (Google Maps, Hotelbeds) blocked by CORS policies
- Next.js image optimization double-encoding proxy URLs
- CSS opacity loading states preventing image display

**Solution Implemented:**
1. **Created Proxy API Route** (`/api/hotel-images`)
   - Server-side endpoint to fetch external images
   - Bypasses client-side CORS restrictions
   - Handles authentication headers for external APIs

2. **Updated Image Component** (`OptimizedImage.tsx`)
   - Detects proxy URLs and bypasses Next.js image optimization
   - Uses regular `<img>` tags for proxy URLs to prevent double-encoding
   - Removed opacity loading states for proxy URLs (images display immediately)

3. **Content Security Policy Updates** (`next.config.js`)
   - Added external image domains to `img-src` directive
   - Updated from deprecated `images.domains` to `images.remotePatterns`
   - Configured Google Fonts and other external resources

4. **Data Layer Updates** (`lib/hotelData.ts`)
   - Modified `fetch_all_hotels` and `fetch_individual_hotel` functions
   - Converts direct API image URLs to proxy URLs before caching
   - Ensures consistent proxy URL usage across all components

**Key Technical Details:**
- Proxy URLs format: `/api/hotel-images?url=${encodeURIComponent(originalUrl)}&hotel=${encodeURIComponent(hotelName)}`
- Images with proxy URLs display immediately with `opacity-100` (no loading state)
- Network requests show 200 status indicating successful loading
- Parent containers must have defined heights (`h-48`, `min-height: 192px`) for absolutely positioned images

**Current Status:**
- ✅ Proxy API working (200 status codes)
- ✅ Images loading successfully
- ✅ CSS opacity issues resolved
- ✅ Debug code removed
- ✅ Clean production-ready code

**Verification Steps:**
1. Check Network tab for `/api/hotel-images` requests with 200 status
2. Inspect image elements for correct `src` attributes and `opacity-100` classes
3. Verify parent containers have proper height and positioning context

## 🖼️ Image Optimization System

### Overview
The image optimization system provides secure, performant image delivery for both local and external hotel images. It eliminates mixed usage of raw `<img>` tags and `next/image`, resolves proxy and optimization mismatches, and ensures proper caching and security.

### Architecture Components

#### 1. Image Proxy API (`/api/hotel-images`)
**Purpose:** Secure server-side proxy for external images
**Location:** `app/api/hotel-images/route.ts`

**Key Features:**
- **SSRF Protection:** Blocks private IPs, localhost, and internal networks
- **Content Validation:** Ensures responses are actual images
- **Google Photos Optimization:** Downsizes massive images (s10000 → s1200)
- **Streaming Responses:** Prevents memory issues on Vercel
- **Error Handling:** Returns transparent 1x1 PNG on failures
- **Caching:** CDN-friendly cache headers (24h cache, 7d stale-while-revalidate)

**Configuration:**
```typescript
export const runtime = 'nodejs';           // Force Node.js runtime
export const dynamic = 'force-dynamic';    // Disable Vercel caching
export const revalidate = 0;               // Disable ISR
```

**Security Measures:**
```typescript
const BLOCKED = new Set(['localhost', '127.0.0.1']);
const PRIVATE = [/^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[0-1])\./, /^169\.254\./];
```

#### 2. OptimizedImage Component
**Purpose:** Centralized image component with consistent optimization
**Location:** `app/components/OptimizedImage.tsx`

**Key Features:**
- **Dual Styling:** Separate `className` (for `<img>`) and `wrapperClassName` (for container)
- **Proxy Detection:** Automatically uses `unoptimized=true` for proxy URLs
- **Loading States:** Skeleton loading with blur placeholders
- **Error Handling:** Graceful fallback for failed images
- **Performance:** Priority loading and fetch priority hints

**Critical Layout Fix:**
```tsx
// WRONG - causes zero-height images with fill prop
<div className="h-48 w-full relative">
  <OptimizedImage
    src={proxify(hotel.image_url, hotel.name)}
    alt={hotel.name}
    fill
    className="object-cover h-48 w-full relative" // ❌ className on <img> doesn't size wrapper
  />
</div>

// CORRECT - wrapperClassName handles sizing
<OptimizedImage
  src={proxify(hotel.image_url, hotel.name)}
  alt={hotel.name}
  fill
  className="object-cover" // ✅ styles the <img> element
  wrapperClassName="h-48 w-full relative rounded-xl overflow-hidden" // ✅ styles the wrapper
/>
```

#### 3. Proxify Helper Function
**Purpose:** Safely convert external URLs to proxy URLs
**Location:** `lib/img.ts`

**Key Features:**
- **Bullet-proof:** Unwraps accidental double-proxying
- **Local Asset Support:** Preserves local paths (`/logo.svg`)
- **URL Validation:** Handles malformed URLs gracefully

**Usage:**
```typescript
import { proxify } from '@/lib/img';

// External image → proxy URL
proxify('https://lh5.googleusercontent.com/photo.jpg', 'Hotel Name')
// Returns: /api/hotel-images?url=https%3A%2F%2Flh5.googleusercontent.com%2Fphoto.jpg&hotel=Hotel%20Name

// Local asset → unchanged
proxify('/innstastay-logo.svg', 'Hotel Name')
// Returns: /innstastay-logo.svg

// Already proxied → unwrapped and re-proxied
proxify('/api/hotel-images?url=https://example.com/image.jpg', 'Hotel Name')
// Returns: /api/hotel-images?url=https%3A%2F%2Fexample.com%2Fimage.jpg&hotel=Hotel%20Name
```

#### 4. Constants and Configuration
**Purpose:** Centralized configuration for image optimization
**Location:** `lib/constants.ts`

**Key Constants:**
```typescript
export const BLUR_PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAD0lEQVR4nGMAAQAABQABNqv1nQAAAABJRU5ErkJggg==';
export const IMAGE_OPTIMIZATION = {
  CACHE: {
    PROXY: 'public, s-maxage=86400, stale-while-revalidate=604800',
    FALLBACK: 'public, s-maxage=600',
  }
};
```

### Implementation Checklist

#### ✅ Completed Fixes
1. **Eliminated Mixed Usage**
   - Converted all raw `<img>` tags to `OptimizedImage`
   - Consistent proxy usage across all components

2. **Proxy Safety & Caching**
   - SSRF protection with IP validation
   - Content-type validation and forwarding
   - CDN-friendly cache headers
   - Transparent PNG error fallback

3. **Google Photos Optimization**
   - URL normalization to prevent oversized responses
   - Automatic downsizing (s10000 → s1200)
   - Prevents Vercel function timeouts

4. **Layout Issues Resolved**
   - Fixed `fill` prop requiring sized, relative parent
   - Applied sizing classes to `wrapperClassName`
   - Separated image styling (`className`) from container styling (`wrapperClassName`)

5. **Double-Proxying Prevention**
   - Bullet-proof `proxify` function
   - Auto-unwrapping in API route
   - Consistent usage patterns

#### 🔧 Critical Implementation Details

**1. Vercel Deployment Requirements:**
```typescript
// app/api/hotel-images/route.ts
export const runtime = 'nodejs';           // Required for fetch() and streaming
export const dynamic = 'force-dynamic';    // Prevents aggressive caching
export const revalidate = 0;               // Disables ISR
```

**2. Streaming Response Pattern:**
```typescript
// Prevents memory/size issues on Vercel
if (upstream.body) {
  return new NextResponse(upstream.body as any, {
    status: 200,
    headers: { 'Content-Type': type, 'Cache-Control': cacheHeader }
  });
}
```

**3. Layout Requirements for Fill Images:**
```tsx
// Parent container MUST have:
// - position: relative (or relative class)
// - explicit height (h-48, h-56, etc.)
// - explicit width (w-full, w-80, etc.)

<OptimizedImage
  src={proxify(imageUrl, hotelName)}
  alt={hotelName}
  fill
  className="object-cover" // styles the <img>
  wrapperClassName="h-48 w-full relative rounded-xl overflow-hidden" // styles the wrapper
/>
```

**4. Error Handling Pattern:**
```typescript
// Transparent 1x1 PNG fallback
const b64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAD0lEQVR4nGMAAQAABQABNqv1nQAAAABJRU5ErkJggg==';
return new NextResponse(Buffer.from(b64, 'base64'), {
  status: 502,
  headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, s-maxage=600' }
});
```

### Debugging Guide

#### Common Issues and Solutions

**1. Images Not Visible (200 OK but blank)**
- **Cause:** Layout issue - `fill` prop needs sized, relative parent
- **Solution:** Apply sizing classes to `wrapperClassName`
- **Check:** Inspect element for zero-height wrapper div

**2. Double-Proxying Errors (400 Bad Request)**
- **Cause:** URL parameter already contains proxy URL
- **Solution:** Use `proxify()` helper consistently, never build proxy URLs manually
- **Check:** Network tab for malformed proxy URLs

**3. Vercel Function Timeouts**
- **Cause:** Oversized Google Photos images
- **Solution:** URL normalization in proxy API
- **Check:** Image URLs containing `=s10000` or similar large sizes

**4. CORS Errors**
- **Cause:** Direct external image requests from client
- **Solution:** Always use proxy for external images
- **Check:** Network tab for direct external requests

#### Verification Commands
```bash
# Check for any remaining raw <img> tags
grep -r "<img" app/ --include="*.tsx" --include="*.ts"

# Verify proxy usage
grep -r "proxify(" app/ --include="*.tsx" --include="*.ts"

# Check for manual proxy URL construction
grep -r "/api/hotel-images?url=" app/ --include="*.tsx" --include="*.ts"
```

### Performance Impact
- **Proxy Overhead:** ~50-100ms per external image
- **Caching Benefit:** 24-hour CDN cache reduces repeat requests
- **Memory Usage:** Streaming responses prevent Vercel memory limits
- **Bundle Size:** Minimal impact (shared constants and helper)

### Security Considerations
- **SSRF Protection:** Blocks private IPs and internal networks
- **Content Validation:** Ensures responses are actual images
- **URL Sanitization:** Prevents injection attacks
- **Error Handling:** Safe fallbacks prevent information leakage

## 🎯 Business Model

### Commission-Free Approach
- **No Booking Fees** - Hotels pay zero commissions
- **Direct Integration** - Straight to hotel booking systems
- **Transparent Pricing** - No hidden markups
- **Hotel Partnership** - Direct relationships with properties

### Revenue Streams
- **Hotel Partnerships** - Direct relationships
- **Premium Features** - Enhanced hotel listings
- **Analytics Services** - Hotel performance insights
- **White Label Solutions** - Platform licensing

## 🔮 Future Roadmap

### Phase 1 (Current)
- ✅ Toronto hotel integration
- ✅ Dynamic pricing display
- ✅ Search functionality
- ✅ Mobile responsiveness

### Phase 2 (Planned)
- 🔄 Multi-city expansion
- 🔄 Hotel management dashboard
- 🔄 Advanced filtering options
- 🔄 User accounts and favorites

### Phase 3 (Future)
- 📋 Loyalty program
- 📋 Hotel review system
- 📋 Booking management
- 📋 Mobile app development

## 🤝 Contributing

### Development Guidelines
- **TypeScript** - All new code must be typed
- **ESLint** - Follow linting rules
- **Component Structure** - Use functional components
- **Testing** - Write tests for new features

### Code Style
- **Prettier** - Automatic code formatting
- **Conventional Commits** - Standard commit messages
- **Branch Naming** - Feature/issue-based branches
- **PR Reviews** - All changes require review

## 📞 Support & Contact

### Technical Support
- **Email:** info@innstastay.com
- **GitHub Issues:** Report bugs and feature requests
- **Documentation:** Inline code documentation

### Business Inquiries
- **Partnerships:** info@innstastay.com
- **Hotel Integration:** info@innstastay.com
- **Media Inquiries:** info@innstastay.com

## 📄 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- **SerpAPI** - Hotel data and pricing
- **Next.js Team** - Amazing React framework
- **Vercel** - Deployment platform
- **Tailwind CSS** - Utility-first CSS framework

---

**Built with ❤️ for travelers who book smart.**
