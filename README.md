# InnstaStay - Commission-Free Hotel Booking Platform

A modern, commission-free hotel booking platform for independent hotels, starting with Toronto. InnstaStay provides a high-trust, no-middleman experience by connecting guests directly to hotel booking engines with Apple-style polish and travel-tech simplicity.

## 🎯 Mission

**For Hotels**: No commissions, use their real booking engine, act as a transparent traffic source.
**For Guests**: Cleaner prices, confidence of "booking direct," InnstaStay mimics hotel's booking engine layout and passes bookings directly.

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Data Source**: SerpAPI Google Hotel Search API
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Date Handling**: Custom ProfessionalCalendar component with enhanced navigation
- **Animations**: CSS keyframes and Tailwind transitions
- **Deployment**: Vercel with automatic deployments

## 🚀 Features

### Current Implementation

#### Homepage (`/`)
- **Modern Hero Section**: Soft gradient background with centered headline and search box
- **Enhanced Search Form**: Horizontally segmented card with date range picker, traveler selector, and CTA button
- **Professional Date Picker**: Custom calendar component with prominent month navigation arrows
- **Trust-Building Sections**: "How It Works," "What You Get," and hotel directory with internal linking
- **Premium Navigation**: Sticky navbar with InnstaStay branding, navigation links, and "Compare Rates" CTA
- **Hotel Directory**: Featured hotels section with internal links to improve SEO
- **Subtle Animations**: Fade-in and slide-up effects on page load
- **Mobile-First Design**: Responsive layout with mobile menu and optimized touch interactions
- **SEO Optimized**: Unique metadata, H1 headings, and internal linking structure

#### About Page (`/about`)
- **Trust-Building Content**: Explains InnstaStay's mission and differentiators
- **Problem Section**: 3-column card layout explaining issues with traditional booking
- **Solution Section**: 4-step visual flow showing how InnstaStay works differently
- **Benefits Section**: List of user benefits with checkmark icons
- **Hotel Directory**: Internal linking to hotel pages for SEO improvement
- **Consistent Design**: Matches homepage styling and navigation
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Unique metadata and proper heading structure

#### Search Results (`/search`)
- **Enhanced Card Design**: Soft white cards with rounded corners, subtle shadows, and hover effects
- **Hotel Descriptions**: Parsed and cached hotel descriptions displayed in each card
- **Improved Typography**: Bold hotel names, golden ratings, neighborhood information
- **Price Badge**: Repositioned pricing as a green badge in bottom-right corner
- **Action Buttons**: Enhanced "Book Direct" and "Check Direct for Best Rate" buttons with icons
- **Hotel Images**: Placeholder images for visual appeal
- **Responsive Layout**: Mobile-friendly design with proper spacing
- **Real-Time Rates**: Aligned API calls with individual hotel pages for consistent rate display
- **Dual Functionality**: Displays search form when no parameters provided, results when parameters present
- **Dynamic H1 Headings**: Contextual headings based on search parameters
- **Hotel Directory**: Internal linking when no search parameters present
- **Consistent Navigation**: Matches homepage navigation bar styling

#### Toronto Downtown Page (`/hotels/toronto-downtown`)
- **Hero Section**: Gradient background with compelling headline and value proposition
- **Why Downtown Toronto**: 3-column grid explaining benefits with custom SVG icons
- **Nearby Attractions**: 15 points of interest with images, ratings, and Google links
- **SEO Optimization**: Comprehensive metadata with keywords and JSON-LD schema markup
- **Local SEO**: Structured data for attractions to improve local search visibility
- **Commission-Free Messaging**: Clear value proposition throughout the page
- **Unique Metadata**: Distinct title and description for SEO

#### Unified API Integration (`/api/search`)
- **Single Endpoint**: Unified `/api/search` handles both search results and individual hotel data
- **Smart Routing**: Automatically detects if `slug` parameter is provided for individual hotel requests
- **Enhanced Data Processing**: 
  - Filters for official offers only (`official: true`)
  - Extracts `extracted_before_taxes_fees` for accurate pricing
  - Parses and caches hotel descriptions
  - Removes generic room entries with intelligent filtering
- **Advanced Room Filtering**: Filters out generic room names and entries without images
- **Raw JSON Debugging**: Automatically saves all SerpAPI responses to `raw.json/` directory for debugging
- **Static Metadata Caching**: Caches hotel metadata per property token for performance
- **Real-Time Pricing**: Never caches rates to ensure fresh pricing data
- **SerpAPI Integration**: Uses `google_hotels` engine with proper query parameters
- **Consistent API Calls**: Aligned search and individual hotel API call formats for consistent rate extraction
- **Search Prioritization**: Hotels with direct rates are prioritized in search results

#### Premium Hotel Detail Pages (`/hotels/[slug]`)
- **Brand-First Header**: Gradient header with hotel name, address, and InnstaStay branding
- **Hero Card Design**: Side-by-side layout with hotel image and comprehensive information
- **Trust & Price Block**: Prominent pricing display with "Direct Rate from Hotel Website" messaging
- **Trust Badges**: Visual indicators for "No middlemen," "No hidden fees," "Secure booking"
- **Polished Room Grid**: Responsive 3-column grid layout for room cards with images and pricing
- **Enhanced Room Cards**: Each room shows image, name, price, guest count, and booking link
- **Mobile Sticky CTA**: Bottom-fixed booking button on mobile devices
- **InnstaStay Branding**: Consistent branding throughout with "Powered by InnstaStay" messaging
- **Professional Polish**: Premium design with shadows, gradients, and smooth transitions
- **Dynamic Metadata**: SEO-optimized with unique title, description, and OpenGraph tags for each hotel
- **JSON-LD Schema**: Structured data for better search engine visibility
- **Hardcoded Booking Links**: Always uses direct hotel booking links with dynamic date parameters
- **OTA Filtering**: Ensures only official hotel rates are displayed, no OTA prices

### Hotel Coverage (Toronto)

Currently supports 8 Toronto hotels with enhanced descriptions and hardcoded booking links:
- **Pantages Hotel Downtown Toronto**: Direct booking via TravelClick
- **Town Inn Suites**: Direct booking via Town Inn website
- **One King West Hotel & Residence**: Direct booking via TravelClick
- **The Omni King Edward Hotel**: Direct booking via hotel website
- **Chelsea Hotel, Toronto**: Direct booking via hotel website
- **The Anndore House - JDV by Hyatt**: Direct booking via hotel website
- **Sutton Place Hotel Toronto**: Direct booking via TravelClick
- **Ace Hotel Toronto**: Direct booking via hotel website

## 🎨 Design Philosophy

- **Apple-Style Polish**: Clean, modern interface with travel-tech simplicity
- **Trust-First Design**: Premium navigation, trust badges, and transparent pricing
- **Mobile-First**: Responsive design optimized for all devices
- **Microinteractions**: Hover states, button animations, and smooth transitions
- **Color Palette**: Light base with deep blue accents and secondary highlights
- **Typography**: Modern geometric fonts with increased line height and letter spacing
- **Brand Consistency**: InnstaStay logo properly scaled across all pages with CLS optimization
- **Multi-Device Favicon**: Support for browser, iPhone, and Android favicon formats
- **Enhanced Navigation**: Prominent month navigation arrows in date picker

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Environment Variables
Create a `.env.local` file in the root directory with:
```
SERPAPI_KEY=your_serpapi_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Debugging Features
- **Raw JSON Files**: All SerpAPI responses are automatically saved to `raw.json/` directory
- **Timestamped Files**: Each API call creates a unique timestamped file for debugging
- **Console Logging**: Detailed console output for API responses and data processing

## 📁 Project Structure

```
ClearStay/
├── app/
│   ├── api/
│   │   └── search/route.ts    # Unified API endpoint for search and individual hotels
│   ├── components/
│   │   ├── ProfessionalCalendar.tsx  # Enhanced date picker with prominent navigation
│   │   ├── SearchBarWide.tsx         # Main search component
│   │   ├── HomePageClient.tsx        # Client-side homepage logic
│   │   ├── SearchPageClient.tsx      # Client-side search logic
│   │   ├── AboutPageClient.tsx       # Client-side about page logic
│   │   └── ...                       # Other UI components
│   ├── hotels/
│   │   ├── [slug]/page.tsx    # Premium hotel detail pages with enhanced design
│   │   └── toronto-downtown/page.tsx  # Toronto Downtown landing page with attractions
│   ├── about/page.tsx         # About page with trust-building content
│   ├── search/page.tsx        # Enhanced search results page with dual functionality
│   ├── globals.css            # Global styles with custom datepicker styling
│   ├── layout.tsx             # Root layout with metadata and multi-device favicon
│   └── page.tsx               # Modern homepage with enhanced search form
├── public/
│   ├── innstastay-logo.svg    # InnstaStay logo (SVG) - properly scaled
│   ├── browser.png            # Browser favicon
│   ├── iPhone.png             # iPhone favicon
│   └── Android.png            # Android favicon
├── types/
│   └── hotel.ts              # TypeScript interfaces
├── lib/
│   ├── hotels.ts             # Hotel data, utilities, and slug mappings
│   └── hotelData.ts          # Centralized hotel data fetching logic with hardcoded links
├── raw.json/                 # Debug directory for SerpAPI responses
├── data/                     # Data files (gitignored)
├── .gitignore               # Git ignore rules
├── package.json             # Node.js dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── README.md               # Project documentation
```

## 🔄 Data Flow

1. **User Input**: Date range and guest count on homepage with enhanced date picker
2. **Unified API Call**: Frontend calls `/api/search` with parameters (with or without slug)
3. **Smart Routing**: API automatically detects request type and routes accordingly
4. **SerpAPI Integration**: Backend fetches data from SerpAPI for each hotel
5. **Enhanced Data Processing**: 
   - Filters for official offers only (`official: true`)
   - Extracts `extracted_before_taxes_fees` for accurate pricing
   - Parses and caches hotel descriptions
   - Filters out generic room entries and entries without images
   - Saves raw JSON responses for debugging
   - Prioritizes hotels with direct rates in search results
6. **Hardcoded Booking Links**: Always uses direct hotel booking links with dynamic date parameters
7. **Frontend Display**: 
   - Search results: Shows one rate per hotel with descriptions and enhanced styling
   - Hotel details: Premium layout with hero card, trust badges, and room grid
8. **Direct Booking**: Seamless integration with hotel booking engines for commission-free bookings

## 🚧 Current Status

### ✅ Completed
- Next.js project setup with TypeScript and Tailwind CSS
- **Modern Homepage**: Redesigned with Apple-style polish and enhanced search form
- **Enhanced Search Results**: Improved card design, typography, and user experience
- **About Page**: New trust-building page with InnstaStay's mission and differentiators
- **Premium Navigation**: Consistent navbar across all pages with enhanced styling
- **Hotel Descriptions**: Parsed and displayed hotel descriptions with caching
- **Professional Date Picker**: Custom calendar component with prominent month navigation arrows
- **Unified API Structure**: Single `/api/search` endpoint handles both search and individual hotel requests
- **Premium Hotel Detail Pages**: Complete redesign with brand-first header, hero card, and polished room grid
- **Enhanced Data Extraction**: Correctly extracts `extracted_before_taxes_fees` for accurate pricing
- **Advanced Room Filtering**: Intelligent filtering removes generic room entries and entries without images
- **Raw JSON Debugging**: Automatic saving of all SerpAPI responses for development and debugging
- **Static Metadata Caching**: Performance optimization with cached hotel metadata
- **Trust-Building Elements**: Visual trust badges and InnstaStay branding throughout
- **Mobile-First Design**: Responsive design with mobile-specific features like sticky CTAs
- **Hardcoded Booking Links**: Always uses direct hotel booking links with dynamic date parameters
- **OTA Price Filtering**: Ensures only official hotel rates are displayed on slug pages
- **Search Result Prioritization**: Hotels with direct rates are prioritized in search results
- **SEO Optimization**: 
  - Dynamic metadata for all pages with unique titles and descriptions
  - Proper H1 heading structure across all pages
  - Internal linking to resolve orphaned pages
  - Server/client component separation for better SEO
- **Navigation Improvements**: 
  - Removed redundant search icon
  - "Compare Rates" button properly links to search page
  - Enhanced month navigation arrows in date picker
- **Vercel Deployment**: Automatic deployments with Git integration
- **TypeScript Safety**: Comprehensive type checking and error handling

### 🔄 In Progress
- Performance optimization for large datasets
- Additional error handling and loading states
- Testing and validation of booking link functionality

### 📋 Planned
- Additional cities beyond Toronto
- User reviews and ratings integration
- Advanced search filters and sorting
- Mobile app development
- Hotel partner onboarding system
- Real-time availability updates
- Hotel image galleries and virtual tours
- Guest review integration
- Advanced room comparison features
- Analytics and conversion tracking

## 🎯 Key Features

### Search Experience
- **Professional Date Picker**: Custom calendar with prominent month navigation arrows
- **Intelligent Month Navigation**: Prevents auto-search during month browsing
- **Traveler Selection**: Modal-based guest and room selector
- **Real-Time Pricing**: Direct from hotel booking engines with `extracted_before_taxes_fees`
- **Commission-Free Rates**: Only official hotel rates displayed
- **Search Prioritization**: Hotels with direct rates appear first in results
- **Consistent Rate Display**: Search and individual hotel pages show same rate information

### Premium Hotel Detail Pages
- **Brand-First Design**: Professional header with InnstaStay branding
- **Hero Card Layout**: Side-by-side hotel image and information display
- **Trust & Price Block**: Prominent pricing with trust indicators
- **Polished Room Grid**: Responsive 3-column layout for room options
- **Mobile Sticky CTA**: Bottom-fixed booking button for mobile users
- **InnstaStay Branding**: Consistent "Powered by InnstaStay" messaging
- **SEO Optimization**: Dynamic metadata and structured data for search engines
- **Hardcoded Booking Links**: Always uses direct hotel booking links with dynamic parameters
- **OTA Filtering**: Ensures only official hotel rates are displayed

### Toronto Downtown Landing Page
- **Local SEO Focus**: Comprehensive metadata and structured data for attractions
- **Nearby Attractions**: 15 points of interest with ratings and descriptions
- **Value Proposition**: Clear messaging about commission-free booking
- **Visual Design**: Hero gradient and 3-column benefit grid
- **Google Integration**: Direct links to Google search for each attraction
- **Unique Metadata**: Distinct title and description for SEO

### Trust & Transparency
- **Hotel Descriptions**: Detailed information about each property
- **Direct Booking**: Links go directly to hotel websites via hardcoded URLs
- **No Hidden Fees**: Transparent pricing with no markups
- **Verified Hotels**: Only legitimate, verified properties
- **Trust Badges**: Visual indicators for security and transparency
- **OTA Filtering**: Ensures only official hotel rates are displayed

### User Experience
- **Modern Design**: Clean, trustworthy interface with premium feel
- **Responsive Layout**: Optimized for all devices with mobile-first approach
- **Smooth Animations**: Subtle microinteractions and transitions
- **Clear Navigation**: Intuitive site structure with consistent branding
- **Enhanced Date Picker**: Professional calendar with prominent navigation arrows
- **Detailed Hotel Pages**: Comprehensive information with room availability and amenities
- **SEO-Friendly URLs**: Clean, descriptive hotel URLs for better discoverability
- **Brand Consistency**: InnstaStay logo properly scaled across all pages
- **Performance Optimized**: CLS fixes and Core Web Vitals improvements

### Development & Debugging
- **Raw JSON Files**: Automatic saving of all API responses for debugging
- **Enhanced Filtering**: Intelligent removal of generic room entries
- **Performance Optimization**: Static metadata caching for improved performance
- **Unified API**: Single endpoint handles multiple use cases efficiently
- **Centralized Data Logic**: `lib/hotelData.ts` for consistent data fetching
- **Multi-Device Support**: Favicon support for all major platforms
- **TypeScript Safety**: Comprehensive type checking and error handling
- **Vercel Deployment**: Automatic deployments with Git integration

## 🤝 Contributing

This is a private project for InnstaStay. For questions or collaboration, please contact the development team.

## 📄 License

Private project - All rights reserved.
