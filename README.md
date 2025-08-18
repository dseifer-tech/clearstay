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
- Extra wrapper divs interfering with absolutely positioned images

**Solution Implemented:**
1. **Created Proxy API Route** (`/api/hotel-images`)
   - Server-side endpoint to fetch external images
   - Bypasses client-side CORS restrictions
   - Handles authentication headers for external APIs

2. **Updated Image Component** (`OptimizedImage.tsx`)
   - Detects proxy URLs and bypasses Next.js image optimization
   - Removes wrapper divs for `fill={true}` images with proxy URLs
   - Uses regular `<img>` tags for proxy URLs to prevent double-encoding

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
- Images with `fill={true}` render directly without wrapper divs when using proxy URLs
- Network requests show 200 status with "(memory cache)" indicating successful loading
- Parent containers must have defined heights (`h-48`, `min-height: 192px`) for absolutely positioned images

**Verification Steps:**
1. Check Network tab for `/api/hotel-images` requests with 200 status
2. Inspect image elements for correct `src` attributes and `opacity-100` classes
3. Verify parent containers have proper height and positioning context
4. Confirm no extra wrapper divs interfering with absolute positioning

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
