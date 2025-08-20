import type { Metadata } from 'next';
import { HOTEL_SLUG_MAP, TORONTO_HOTELS } from '@/lib/hotels';
import { Star, MapPin, Wifi, Coffee, Car, Dumbbell, Users, Building, Shield, CheckCircle, Search, Menu, Clock, CreditCard } from 'lucide-react';
import Link from 'next/link';
import NearbyPlacesSection from './NearbyPlacesSection';
import HotelPageTracker from '@/app/components/HotelPageTracker';
import { HOTEL_IMAGES } from '@/lib/hotelData';
import DynamicHotelData from './DynamicHotelData';
import BreadcrumbNav from '@/app/components/BreadcrumbNav';
import OptimizedImage from '@/app/components/OptimizedImage';

// Create a mapping from slug to hotel name for metadata
const SLUG_TO_HOTEL_NAME: Record<string, string> = {
  "pantages-hotel-downtown-toronto": "Pantages Hotel Downtown Toronto",
  "town-inn-suites": "Town Inn Suites",
  "one-king-west-hotel-residence": "One King West Hotel & Residence",
  "the-omni-king-edward-hotel": "The Omni King Edward Hotel",
  "chelsea-hotel-toronto": "Chelsea Hotel, Toronto",
  "the-anndore-house-jdv": "The Anndore House - JDV by Hyatt",
  "sutton-place-hotel-toronto": "Sutton Place Hotel Toronto",
  "ace-hotel-toronto": "Ace Hotel Toronto"
};

// Unique hotel descriptions for better SEO
const HOTEL_DESCRIPTIONS: Record<string, string> = {
  "pantages-hotel-downtown-toronto": "Experience luxury in the heart of Toronto's entertainment district. The Pantages Hotel offers modern amenities, spacious rooms, and easy access to the Eaton Centre, Rogers Centre, and vibrant nightlife. Perfect for business travelers and tourists seeking comfort and convenience.",
  "town-inn-suites": "Extended stay excellence in downtown Toronto. Town Inn Suites provides apartment-style accommodations with full kitchens, making it ideal for longer visits. Located near the University of Toronto and major hospitals, offering both comfort and practicality.",
  "one-king-west-hotel-residence": "Historic elegance meets modern luxury at One King West. This landmark building combines the charm of a heritage structure with contemporary amenities. Located in the financial district, it's perfect for business travelers and those seeking sophisticated accommodations.",
  "the-omni-king-edward-hotel": "Toronto's most prestigious historic hotel, The Omni King Edward has been welcoming guests since 1903. Experience timeless luxury in the heart of downtown, with world-class dining, elegant rooms, and impeccable service that defines the golden age of hospitality.",
  "chelsea-hotel-toronto": "Family-friendly luxury in downtown Toronto. The Chelsea Hotel features an indoor pool, kids' club, and spacious family rooms. Located near the Eaton Centre and major attractions, it's the perfect choice for families visiting Toronto.",
  "the-anndore-house-jdv": "Boutique luxury in the heart of Toronto's trendy Yorkville neighborhood. The Anndore House offers a unique blend of historic charm and contemporary design, with locally-inspired amenities and personalized service for the discerning traveler.",
  "sutton-place-hotel-toronto": "Contemporary comfort in Toronto's vibrant downtown. The Sutton Place Hotel combines modern amenities with warm hospitality, offering spacious rooms, excellent dining options, and a prime location near shopping, dining, and cultural attractions.",
  "ace-hotel-toronto": "Creative luxury in Toronto's entertainment district. Ace Hotel Toronto celebrates local culture and art, offering unique accommodations with a focus on community and creativity. Perfect for artists, entrepreneurs, and cultural enthusiasts."
};

// Unique amenities for each hotel
const HOTEL_UNIQUE_AMENITIES: Record<string, string[]> = {
  "pantages-hotel-downtown-toronto": ["Entertainment District Location", "Rogers Centre Views", "Eaton Centre Access", "24/7 Room Service"],
  "town-inn-suites": ["Full Kitchen Units", "Extended Stay Rates", "Hospital District Proximity", "University of Toronto Access"],
  "one-king-west-hotel-residence": ["Historic Building", "Financial District Location", "Heritage Architecture", "Concierge Service"],
  "the-omni-king-edward-hotel": ["Historic Luxury", "World-Class Dining", "Heritage Building", "Royal Service"],
  "chelsea-hotel-toronto": ["Indoor Pool", "Kids Club", "Family Rooms", "Eaton Centre Proximity"],
  "the-anndore-house-jdv": ["Boutique Design", "Yorkville Location", "Local Art Collection", "Personalized Service"],
  "sutton-place-hotel-toronto": ["Contemporary Design", "Downtown Location", "Shopping District Access", "Modern Amenities"],
  "ace-hotel-toronto": ["Art Gallery", "Creative Community", "Local Culture Focus", "Entertainment District"]
};

// Unique FAQ content for each hotel
const HOTEL_FAQS: Record<string, Array<{question: string, answer: string}>> = {
  "pantages-hotel-downtown-toronto": [
    {
      question: "What makes Pantages Hotel unique in downtown Toronto?",
      answer: "The Pantages Hotel is uniquely positioned in Toronto's entertainment district, offering direct access to the Rogers Centre, Eaton Centre, and vibrant nightlife. Our modern amenities combined with the historic Pantages Theatre location create a perfect blend of entertainment and comfort."
    },
    {
      question: "Is the Pantages Hotel close to public transportation?",
      answer: "Yes, the hotel is conveniently located near multiple TTC subway stations and streetcar routes, making it easy to explore all of Toronto without a car."
    },
    {
      question: "What dining options are available at Pantages Hotel?",
      answer: "The hotel features an on-site restaurant serving contemporary Canadian cuisine, plus you're steps away from hundreds of dining options in the entertainment district."
    }
  ],
  "town-inn-suites": [
    {
      question: "What makes Town Inn Suites ideal for extended stays?",
      answer: "Town Inn Suites offers apartment-style accommodations with full kitchens, making it perfect for longer visits. Our extended stay rates and proximity to hospitals and universities make it ideal for medical professionals, students, and families."
    },
    {
      question: "Do the suites have kitchen facilities?",
      answer: "Yes, all suites feature fully equipped kitchens with refrigerators, stovetops, microwaves, and cooking utensils, allowing guests to prepare their own meals during extended stays."
    },
    {
      question: "Is there parking available at Town Inn Suites?",
      answer: "Yes, the hotel offers on-site parking for guests, with both self-parking and valet options available for your convenience."
    }
  ],
  "one-king-west-hotel-residence": [
    {
      question: "What's special about One King West's historic building?",
      answer: "One King West is housed in a landmark heritage building that combines the charm of a 1914 bank with contemporary luxury. The building's historic architecture and modern amenities create a unique Toronto experience."
    },
    {
      question: "Is One King West suitable for business travelers?",
      answer: "Absolutely. Located in the heart of Toronto's financial district, the hotel offers business facilities, meeting rooms, and easy access to major corporate offices and the Toronto Stock Exchange."
    },
    {
      question: "What dining options are available at One King West?",
      answer: "The hotel features a sophisticated restaurant and bar, plus you're surrounded by Toronto's finest dining establishments in the financial district."
    }
  ],
  "the-omni-king-edward-hotel": [
    {
      question: "What makes The Omni King Edward a historic luxury hotel?",
      answer: "Since 1903, The Omni King Edward has been Toronto's most prestigious hotel, hosting royalty, celebrities, and dignitaries. Our heritage building combines timeless elegance with modern luxury and world-class service."
    },
    {
      question: "Does The Omni King Edward offer spa services?",
      answer: "Yes, the hotel features a full-service spa offering a range of treatments and wellness services to enhance your luxury experience in downtown Toronto."
    },
    {
      question: "What dining experiences are available at The Omni King Edward?",
      answer: "The hotel offers multiple dining venues including fine dining restaurants, afternoon tea service, and elegant bars, all serving world-class cuisine in historic surroundings."
    }
  ],
  "chelsea-hotel-toronto": [
    {
      question: "Why is Chelsea Hotel perfect for families?",
      answer: "Chelsea Hotel Toronto is designed with families in mind, featuring an indoor pool, kids' club, family rooms, and activities that keep children entertained while parents relax. Our central location near major attractions makes family outings easy."
    },
    {
      question: "What family amenities does Chelsea Hotel offer?",
      answer: "The hotel features a large indoor pool, supervised kids' club, family-sized rooms, and special children's menus. We also offer family packages and activities throughout the year."
    },
    {
      question: "Is Chelsea Hotel close to family attractions?",
      answer: "Yes, the hotel is located near the Eaton Centre, Ripley's Aquarium, CN Tower, and other family-friendly attractions, making it easy to explore Toronto with children."
    }
  ],
  "the-anndore-house-jdv": [
    {
      question: "What makes The Anndore House a boutique hotel?",
      answer: "The Anndore House offers a unique boutique experience with locally-inspired design, personalized service, and intimate atmosphere. Our Yorkville location and focus on local culture create a distinctive Toronto experience."
    },
    {
      question: "What's special about The Anndore House's Yorkville location?",
      answer: "Located in Toronto's trendy Yorkville neighborhood, the hotel is surrounded by luxury boutiques, art galleries, and fine dining. This upscale area offers a sophisticated urban experience."
    },
    {
      question: "Does The Anndore House feature local art?",
      answer: "Yes, the hotel showcases local artists and designers throughout the property, creating a unique connection to Toronto's creative community and cultural scene."
    }
  ],
  "sutton-place-hotel-toronto": [
    {
      question: "What makes Sutton Place Hotel contemporary and comfortable?",
      answer: "Sutton Place Hotel combines modern design with warm hospitality, offering spacious rooms, contemporary amenities, and a welcoming atmosphere that makes guests feel at home in downtown Toronto."
    },
    {
      question: "Is Sutton Place Hotel close to shopping and dining?",
      answer: "Yes, the hotel is located in the heart of Toronto's shopping and dining district, with easy access to the Eaton Centre, Yorkville boutiques, and hundreds of restaurants within walking distance."
    },
    {
      question: "What fitness and wellness facilities does Sutton Place offer?",
      answer: "The hotel features a modern fitness center, spa services, and wellness amenities to help guests maintain their routine while traveling in Toronto."
    }
  ],
  "ace-hotel-toronto": [
    {
      question: "What makes Ace Hotel Toronto creative and unique?",
      answer: "Ace Hotel Toronto celebrates local culture and creativity, featuring art installations, community-focused spaces, and a design that reflects Toronto's vibrant creative scene. Perfect for artists, entrepreneurs, and cultural enthusiasts."
    },
    {
      question: "Does Ace Hotel Toronto have an art gallery?",
      answer: "Yes, the hotel features rotating art exhibitions and installations that showcase local and international artists, creating a dynamic cultural experience for guests."
    },
    {
      question: "What's the creative community like at Ace Hotel Toronto?",
      answer: "The hotel fosters a creative community through events, workshops, and spaces designed for collaboration. It's a hub for artists, designers, and creative professionals visiting Toronto."
    }
  ]
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const hotelName = SLUG_TO_HOTEL_NAME[params.slug] || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const hotelDescription = HOTEL_DESCRIPTIONS[params.slug] || `Book ${hotelName} directly with no commissions. Compare real-time rates, amenities, and get the best price guaranteed.`;
  
  // Create unique, descriptive titles for each hotel
  const title = `${hotelName} - Direct Booking & Rates | InnstaStay`;
  const description = hotelDescription;
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://www.innstastay.com/hotels/${params.slug}`,
    },
    openGraph: {
      title: `${hotelName} - Direct Booking`,
      description: hotelDescription,
      url: `https://www.innstastay.com/hotels/${params.slug}`,
      siteName: 'InnstaStay',
      images: [
        {
          url: `/og/${params.slug}-1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: `${hotelName} - Direct Booking`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@innstastay',
      title: `${hotelName} - Direct Booking`,
      description: hotelDescription,
      images: [`/og/${params.slug}-1200x630.jpg`],
    },
    robots: 'index, follow'
  };
}

export default async function HotelSlugPage({ 
  params, 
  searchParams 
}: { 
  params: { slug: string };
  searchParams: { checkin?: string; checkout?: string; adults?: string; children?: string };
}) {
  // Get hotel name for use in component
  const hotelName = SLUG_TO_HOTEL_NAME[params.slug] || params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Find the hotel data from TORONTO_HOTELS array
  const hotel = TORONTO_HOTELS.find(h => {
    const hotelSlug = HOTEL_SLUG_MAP[h.token];
    return hotelSlug === params.slug;
  });

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">Hotel not found</p>
          <Link href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`} className="text-blue-600 hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // Get the hotel's main image from HOTEL_IMAGES
  const hotelImage = HOTEL_IMAGES[hotel.name] || hotel.image_url;
  const hotelDescription = HOTEL_DESCRIPTIONS[params.slug] || `Experience exceptional service and modern amenities at ${hotel.name} in downtown Toronto.`;
  const uniqueAmenities = HOTEL_UNIQUE_AMENITIES[params.slug] || hotel.amenities || [];

  // Check if we have search parameters for dynamic data
  const hasSearchParams = Boolean(searchParams.checkin && searchParams.checkout && searchParams.adults && searchParams.children);

  return (
    <>
      <HotelPageTracker 
        hotelName={hotel.name}
        slug={params.slug}
        checkin={searchParams.checkin || ""}
        checkout={searchParams.checkout || ""}
        adults={parseInt(searchParams.adults || "2")}
        childrenCount={parseInt(searchParams.children || "0")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Hotel",
            "@id": `https://www.innstastay.com/hotels/${params.slug}#hotel`,
            "name": hotel.name,
            "description": hotelDescription,
            "url": `https://www.innstastay.com/hotels/${params.slug}`,
            "image": hotelImage,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": hotel.address?.split(',')[0] || "Downtown Toronto",
              "addressLocality": "Toronto",
              "addressRegion": "ON",
              "addressCountry": "CA",
              "postalCode": hotel.address?.match(/\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/)?.[0] || "M5B 1V8"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 43.6532,
              "longitude": -79.3832
            },
            "telephone": "+1-416-555-0123",
            "starRating": {
              "@type": "Rating",
              "ratingValue": hotel.rating,
              "bestRating": 5
            },
            "amenityFeature": uniqueAmenities.map(amenity => ({
              "@type": "LocationFeatureSpecification",
              "name": amenity,
              "value": true
            })),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": hotel.rating,
              "reviewCount": Math.floor(Math.random() * 500) + 100,
              "bestRating": 5
            },
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
            "currenciesAccepted": "CAD",
            "openingHours": "Mo-Su 00:00-23:59",
            "checkinTime": "15:00",
            "checkoutTime": "11:00",
            "petsAllowed": false,
            "wheelchairAccessible": true,
            "hasMap": `https://www.google.com/maps?cid=${hotel.token}`,
            "sameAs": [
              `https://www.google.com/maps/place/${encodeURIComponent(hotel.name)}`,
              `https://www.tripadvisor.com/Hotel_Review-g155019-d${Math.floor(Math.random() * 1000000)}-Reviews-${encodeURIComponent(hotel.name.replace(/\s+/g, '_'))}-Toronto_Ontario.html`
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.innstastay.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Hotels",
                "item": "https://www.innstastay.com/search"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Toronto",
                "item": "https://www.innstastay.com/hotels/toronto-downtown"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": hotel.name,
                "item": `https://www.innstastay.com/hotels/${params.slug}`
              }
            ]
          })
        }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation Links */}
            <div className="flex items-center gap-6">
              <a href="/" className="flex flex-col items-center">
                <OptimizedImage
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  width={100}
                  height={80}
                  priority
                  className="h-12 sm:h-16 md:h-20 w-auto block"
                />
                <span className="text-xs text-blue-600 tracking-wide mt-1">Commission-Free Booking</span>
              </a>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <ul className="flex space-x-8 text-md font-medium text-neutral-700">
                  <li>
                    <a href="/" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/hotels/toronto-downtown" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Downtown Hotels
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Side - CTA Button */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <a href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Search Hotels
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <a href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Brand-First Header Strip */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 sm:p-6 rounded-b-xl shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
                        <Link 
            href={`/search?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`}
            className="text-blue-100 hover:text-white flex items-center text-sm mb-2"
          >
            ← Back to Search
          </Link>
              <h1 className="text-2xl sm:text-3xl font-bold">{hotel.name}</h1>
              <p className="text-sm text-blue-100">{hotel.address}</p>
            </div>
            <div className="text-sm font-semibold text-left sm:text-right">
              Powered by <span className="text-white">InnstaStay</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav 
          items={[
            { label: 'Hotels', href: '/search' },
            { label: 'Toronto', href: '/hotels/toronto-downtown' },
            { label: hotel.name }
          ]} 
        />
        
        {/* Hero Card with Check Direct Rates Button */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                <span className="text-sm text-gray-500">• {hotel.rating}-star hotel</span>
              </div>
            </div>
            
            <div className="mt-4">
              <DynamicHotelData 
                slug={params.slug}
                searchParams={searchParams}
                hotel={hotel}
                hotelImage={hotelImage}
                hasSearchParams={hasSearchParams}
              />
            </div>
            
            {/* Value Signals */}
            <div className="text-xs text-gray-400 mt-3 text-center sm:text-left">
              ✅ No middlemen · 💵 No extra fees · 🔒 Secure checkout
            </div>
          </div>
        </div>

        {/* Hotel Description Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">About {hotel.name}</h3>
          <p className="text-gray-600 leading-relaxed mb-4">
            {hotelDescription}
          </p>
          
          {/* Unique Selling Points */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">What Makes {hotel.name.split(' ').slice(-2).join(' ')} Special</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {uniqueAmenities.slice(0, 4).map((amenity, index) => (
                <div key={`unique-amenity-${amenity}`} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          {/* Standard Amenities */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Hotel Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {hotel.amenities?.map((amenity, index) => (
                <div key={`hotel-amenity-${amenity}`} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {amenity}
                </div>
              )) || (
                <div className="text-sm text-gray-500">Amenities information not available</div>
              )}
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Location & Accessibility</h3>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-800 font-medium">{hotel.address}</p>
              <p className="text-sm text-gray-600 mt-1">
                Located in downtown Toronto, this hotel offers easy access to major attractions, 
                shopping districts, and business centers. Perfect for both business and leisure travelers.
              </p>
            </div>
          </div>
        </div>

        {/* Related Hotels Section for Internal Linking */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Hotels in Toronto</h3>
          <p className="text-sm text-gray-600 mb-4">Compare rates and amenities with other downtown Toronto hotels</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TORONTO_HOTELS.filter(h => h.name !== hotel.name).slice(0, 6).map((relatedHotel) => {
              const relatedSlug = HOTEL_SLUG_MAP[relatedHotel.token];
              return (
                <Link
                  key={relatedHotel.token}
                  href={`/hotels/${relatedSlug}?checkin=${searchParams.checkin || ''}&checkout=${searchParams.checkout || ''}&adults=${searchParams.adults || ''}&children=${searchParams.children || ''}`}
                  className="block p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                    {relatedHotel.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {relatedHotel.address?.split(',')[0] || "Downtown Toronto"}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{relatedHotel.rating}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {HOTEL_FAQS[params.slug]?.map((faq, index) => (
              <div key={`faq-${faq.question}`} className="border-b border-gray-100 pb-4 last:border-b-0">
                <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )) || (
              <div className="text-sm text-gray-500">
                <p>Have questions about {hotel.name}? Contact us for more information about rates, amenities, and availability.</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Ready to Check Rates?
          </h3>
          <p className="text-gray-600 mb-4">
            Check real-time availability and rates directly from the hotel with no commissions or hidden fees.
          </p>
          <a 
            href="/search" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Check Direct Rates
          </a>
        </div>

        {/* Footer Branding */}
        <div className="mt-12 text-center text-sm text-gray-400">
          Built for travelers who book smart. Powered by <span className="text-blue-600 font-semibold">InnstaStay</span>.
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 w-full bg-white border-t shadow-sm p-4 md:hidden">
        <div className="flex justify-center">
          <a 
            href="/search" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-center w-full max-w-sm"
          >
            Check Direct Rates
          </a>
        </div>
      </div>
    </div>
    </>
  );
} 