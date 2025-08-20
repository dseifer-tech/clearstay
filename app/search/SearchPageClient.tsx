'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, ExternalLink, Eye, Search, Menu, Shield, CheckCircle, Zap, Calendar, Clock, CreditCard, Building, Users, MapPin } from 'lucide-react';
import Link from 'next/link';
import { HOTEL_SLUG_MAP, TORONTO_HOTELS } from '@/lib/hotels';
import { format, addDays } from 'date-fns';
import SearchBarWide from '@/app/components/SearchBarWide';
import MobileMenu from '@/app/components/MobileMenu';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import OptimizedImage from '@/app/components/OptimizedImage';
import { gtmEvent } from '@/lib/ga4';
import ProfessionalCalendar from '@/app/components/ProfessionalCalendar';
import { proxify } from '@/lib/img';

interface HotelRoom {
  hotel: string;
  link: string;
  before_taxes: number | null;
  source: string;
  address: string;
  rating: number;
  image: string | null;
  remarks: string | null;
  discount_remarks: string | null;
  description: string;
}

// Quick Search Component
function QuickSearch({ onSearch }: { onSearch: (checkin: string, checkout: string) => void }) {
  const options = [
    { id: 'week', label: 'Next Week (7 nights)', icon: Calendar, days: 7, emoji: '📅' },
    { id: 'tomorrow', label: 'Tomorrow (1 night)', icon: Clock, days: 1, emoji: '⚡' },
    { id: 'weekend', label: 'This Weekend', icon: Calendar, days: 3, emoji: '🎒' },
    { id: 'nextMonth', label: 'Next Month', icon: Calendar, days: 30, emoji: '🗓️' },
  ];

  const handleQuickSearch = (days: number) => {
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const checkout = addDays(today, 1 + days);
    
    onSearch(
      format(tomorrow, 'yyyy-MM-dd'),
      format(checkout, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex flex-wrap gap-2 overflow-x-auto">
        {options.map(({ id, label, icon: Icon, days, emoji }) => (
          <button
            key={id}
            className="quick-search-pill inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm
                       hover:bg-white transition whitespace-nowrap"
            onClick={() => handleQuickSearch(days)}
          >
            <span className="text-base">{emoji}</span>
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// View Toggle Component
function ViewToggle({ view, setView }: { view: 'list' | 'map'; setView: (v: 'list' | 'map') => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 mb-2 flex items-center justify-between">
      <div className="text-sm text-zinc-600">Showing results for Toronto</div>
      <div className="inline-flex rounded-xl border border-zinc-200 p-1">
        <button
          className={`px-3 py-1.5 text-sm rounded-lg transition ${view === 'list' ? 'bg-white shadow-sm' : 'hover:bg-zinc-50'}`}
          onClick={() => setView('list')}
        >
          List
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-lg transition ${view === 'map' ? 'bg-white shadow-sm' : 'hover:bg-zinc-50'}`}
          onClick={() => setView('map')}
        >
          Map
        </button>
      </div>
    </div>
  );
}

// Why Book Direct Section
function WhyDirect() {
  const items = [
    { 
      icon: Building, 
      title: 'Hotel-Direct Rates', 
      desc: 'Book straight with the property. No OTA markups.',
      benefit: 'Save up to 20% compared to OTAs'
    },
    { 
      icon: CreditCard, 
      title: 'Transparent Pricing', 
      desc: 'No hidden fees. What you see is what you pay.',
      benefit: '100% Secure Booking'
    },
    { 
      icon: Users, 
      title: 'Better Support', 
      desc: 'Changes handled by the hotel, fast and flexible.',
      benefit: '24/7 Direct Support'
    },
  ];
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Why book direct on InnstaStay?</h2>
        <p className="text-zinc-600 mb-8">Experience the difference of booking directly with hotels</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc, benefit }) => (
            <div key={title} className="fade-in-up rounded-2xl border border-zinc-200 p-6 bg-white card-hover-lift">
              <Icon className="h-6 w-6 mb-4 text-blue-600 icon-hover-scale" />
              <div className="font-semibold text-lg mb-2">{title}</div>
              <p className="text-sm text-zinc-600 mb-3">{desc}</p>
              <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                {benefit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Attractions Section
function Attractions() {
  const pois = [
    { 
      name: 'CN Tower', 
      min: '8 min', 
      img: proxify('https://lh5.googleusercontent.com/p/AF1QipMt1ZolVWnJTgIMqogAUCjh9EldFh8vSDHY5TU=s10000', 'CN Tower'),
      rating: 4.5,
      type: 'Landmark'
    },
    { 
      name: 'Royal Ontario Museum', 
      min: '10 min', 
      img: proxify('https://lh5.googleusercontent.com/p/AF1QipPI-2hASi1fH2dzw3hOyxjk2UV9CVV9P3sKUYuX=s10000', 'Royal Ontario Museum'),
      rating: 4.3,
      type: 'Museum'
    },
    { 
      name: 'Ripley\'s Aquarium', 
      min: '9 min', 
      img: proxify('https://lh5.googleusercontent.com/p/AF1QipMvGKOVckX0M2FfmY-77Mt9eykQw6pHyHgmK067=s10000', 'Ripley\'s Aquarium'),
      rating: 4.4,
      type: 'Aquarium'
    },
  ];
  
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h3 className="text-lg font-semibold mb-2">Top attractions in Toronto</h3>
      <p className="text-zinc-600 mb-6">Explore the best of Toronto during your stay</p>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pois.map(p => (
          <div key={p.name} className="fade-in-up min-w-[280px] rounded-2xl overflow-hidden border border-zinc-200 bg-white card-hover-lift shadow-sm">
            <div className="h-40 w-full bg-zinc-100 image-hover-zoom relative">
              <OptimizedImage 
                src={p.img} 
                alt={p.name} 
                fill={true}
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                <MapPin className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-lg">{p.name}</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{p.rating}</span>
                </div>
              </div>
              <div className="text-sm text-zinc-600 mb-2">{p.min} from downtown</div>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                {p.type}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Hotel Categories Component
function Categories({ onChange }: { onChange: (k: string) => void }) {
  const tabs = ['All', 'Luxury', 'Budget-Friendly', 'Family', 'Extended Stay'];
  const [active, setActive] = useState('All');
  
  const handleChange = (tab: string) => {
    setActive(tab);
    onChange(tab);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => handleChange(t)}
            className={`px-3 py-1.5 rounded-full border text-sm transition ${
              active === t 
                ? 'bg-white shadow-sm border-zinc-200' 
                : 'border-zinc-200 hover:bg-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotels, setHotels] = useState<HotelRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    addDays(new Date(), 1),
    addDays(new Date(), 2)
  ]);
  const [searchParamsState, setSearchParamsState] = useState({
    adults: 2,
    children: 0
  });

  // Create a mapping from hotel names to slugs
  const hotelNameToSlug = TORONTO_HOTELS.reduce((acc, hotel) => {
    acc[hotel.name] = HOTEL_SLUG_MAP[hotel.token];
    return acc;
  }, {} as Record<string, string>);

  // Sync state with URL parameters
  useEffect(() => {
    const checkin = searchParams?.get('checkin');
    const checkout = searchParams?.get('checkout');
    const adults = searchParams?.get('adults');
    const children = searchParams?.get('children');

    if (checkin && checkout) {
      try {
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        setDateRange([checkinDate, checkoutDate]);
      } catch (error) {
        console.error('Error parsing dates from URL:', error);
        setDateRange([addDays(new Date(), 1), addDays(new Date(), 2)]);
      }
    }

    if (adults) {
      setSearchParamsState(prev => ({ ...prev, adults: parseInt(adults) || 2 }));
    }
    if (children) {
      setSearchParamsState(prev => ({ ...prev, children: parseInt(children) || 0 }));
    }
  }, [searchParams]);

  // Fetch hotels when search parameters are present
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const checkin = searchParams?.get('checkin');
        const checkout = searchParams?.get('checkout');
        const adults = searchParams?.get('adults');
        const children = searchParams?.get('children');

        if (!checkin || !checkout || !adults || !children) {
          // No search parameters - don't fetch
          return;
        }

        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

                 const data = await response.json();
         setHotels(data);
        
        // Track successful hotel search
        gtmEvent('hotel_search', {
          location: 'toronto',
          adults: parseInt(adults),
          children: parseInt(children),
          checkin_date: checkin,
          checkout_date: checkout,
          results_count: data.length
        });
      } catch (err) {
        setError('Failed to load hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleBookDirect = (bookingUrl: string, hotelName: string) => {
    if (bookingUrl) {
      // Track booking click
      gtmEvent('booking_click', {
        hotel_name: hotelName,
        source: 'search_results'
      });
      window.open(bookingUrl, '_blank');
    }
  };

  const handleQuickSearch = (checkin: string, checkout: string) => {
    router.push(`/search?checkin=${checkin}&checkout=${checkout}&adults=2&children=0`);
  };

  const handleCategoryChange = (category: string) => {
    // Filter hotels based on category (implement filtering logic)
    // TODO: Implement category filtering
  };

  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setDateRange([start, end]);
  };

  const handleSearch = () => {
    const checkIn = dateRange[0] ? format(dateRange[0], 'yyyy-MM-dd') : format(addDays(new Date(), 1), 'yyyy-MM-dd');
    const checkOut = dateRange[1] ? format(dateRange[1], 'yyyy-MM-dd') : format(addDays(new Date(), 2), 'yyyy-MM-dd');
    
    const searchUrl = `/search?checkin=${checkIn}&checkout=${checkOut}&adults=${searchParamsState.adults}&children=${searchParamsState.children}`;
    router.push(searchUrl);
  };

  const handleTravelerChange = (type: 'adults' | 'children', value: number) => {
    setSearchParamsState({
      ...searchParamsState,
      [type]: value
    });
  };

  const getTravelerText = () => {
    const total = searchParamsState.adults + searchParamsState.children;
    return `${total} traveler${total > 1 ? 's' : ''}, 1 room`;
  };

  // Get current search parameters
  const checkin = searchParams?.get('checkin');
  const checkout = searchParams?.get('checkout');
  const adults = searchParams?.get('adults') || '2';
  const children = searchParams?.get('children') || '0';
  const near = searchParams?.get('near');
  const area = searchParams?.get('area');
  const type = searchParams?.get('type');
  const location = searchParams?.get('location');

  // Calculate nights
  const nights = checkin && checkout ? 
    Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24)) : 
    1;

  // Create dynamic H1 based on search parameters
  let h1Text = 'Book Direct. Save More.';
  let subtitleText = 'Compare direct rates from Toronto hotels—no middlemen, no commission.';
  
  if (checkin && checkout) {
    let locationText = 'Toronto';
    if (near) {
      locationText = `near ${near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
    } else if (area) {
      locationText = `${area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}, Toronto`;
    } else if (location) {
      locationText = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    
    h1Text = `${locationText} Hotels`;
    subtitleText = `${nights} night stay • Direct booking • No fees`;
  } else if (near) {
    const nearText = near.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `Hotels near ${nearText}`;
    subtitleText = 'Toronto • Direct rates • No middlemen';
  } else if (area) {
    const areaText = area.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `${areaText} Hotels`;
    subtitleText = 'Toronto • Direct booking • No fees';
  } else if (type) {
    const typeText = type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    h1Text = `${typeText} Hotels in Toronto`;
    subtitleText = 'Direct rates • No middlemen • Commission-free';
  }

  // Show loading spinner if loading
  if (loading) {
    return <LoadingSpinner message="Searching for hotels..." variant="search" />;
  }

  // Show error if there's an error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
            
            {/* Right Side - Search Icon and CTA Button */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button className="hidden md:block hover:text-blue-600 transition-colors duration-200 p-2">
                <Search className="w-5 h-5" />
              </button>
              
              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Search Hotels
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 hover:text-blue-600 transition-colors duration-200"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />

      {/* HERO SECTION */}
      <section className="relative insta-hero-gradient">
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            {h1Text}
          </h1>
          <p className="mt-2 text-zinc-600">
            {subtitleText}
          </p>

          {/* Search bar */}
          <div className="mt-6">
            <div className="enhanced-search-bar">
              <SearchBarWide
                dateLabel="Dates"
                dateValue={dateRange[0] && dateRange[1] 
                  ? `${format(dateRange[0], 'MMM dd')} – ${format(dateRange[1], 'MMM dd')}`
                  : 'Select dates'
                }
                onOpenDates={() => setShowDatePicker(!showDatePicker)}
                paxLabel="Travelers"
                paxValue={getTravelerText()}
                onOpenPax={() => setShowTravelerModal(!showTravelerModal)}
                onSearch={handleSearch}
              />
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
            <span className="trust-icon inline-flex items-center gap-1">
              <Shield className="h-4 w-4" /> SSL Secure
            </span>
            <span className="trust-icon inline-flex items-center gap-1">
              <CheckCircle className="h-4 w-4" /> Verified Rates
            </span>
            <span className="trust-icon inline-flex items-center gap-1">
              <Zap className="h-4 w-4" /> No Hidden Fees
            </span>
            <span className="trust-icon ml-auto text-xs text-zinc-500">Powered by InnstaStay</span>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      {!checkin || !checkout ? (
        <QuickSearch onSearch={handleQuickSearch} />
      ) : null}

      

      {/* Search Results */}
      {hotels.length > 0 ? (
        <>
          {/* View Toggle */}
          <ViewToggle view={view} setView={setView} />
          
          {/* Hotel Categories */}
          <Categories onChange={handleCategoryChange} />

          {/* Results Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {hotels.length} Hotel{hotels.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="text-sm text-gray-600">
                {nights} night{nights !== 1 ? 's' : ''} • {adults} adult{parseInt(adults) !== 1 ? 's' : ''}
                {parseInt(children) > 0 && ` • ${children} child${parseInt(children) !== 1 ? 'ren' : ''}`}
              </div>
            </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {hotels.map((hotel, index) => {
                 // Create a subtle color variation for each card
                 const colorVariants = [
                   'from-blue-500/10 to-indigo-500/10 border-blue-200/50',
                   'from-emerald-500/10 to-teal-500/10 border-emerald-200/50',
                   'from-purple-500/10 to-violet-500/10 border-purple-200/50',
                   'from-amber-500/10 to-orange-500/10 border-amber-200/50',
                   'from-rose-500/10 to-pink-500/10 border-rose-200/50',
                   'from-cyan-500/10 to-blue-500/10 border-cyan-200/50'
                 ];
                 const colorVariant = colorVariants[index % colorVariants.length];
                 
                 return (
                   <div key={index} className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border ${colorVariant} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
                     {/* Gradient overlay for subtle color */}
                     <div className={`absolute inset-0 bg-gradient-to-br ${colorVariant} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                     
                     {/* Hotel Image */}
                     <div className="h-56 w-full relative overflow-hidden">
                       {hotel.image ? (
                         <OptimizedImage 
                           src={proxify(hotel.image, hotel.hotel)} 
                           alt={hotel.hotel} 
                           fill
                           className="object-cover group-hover:scale-110 transition-transform duration-700"
                           wrapperClassName="h-56 w-full relative overflow-hidden"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         />
                       ) : (
                         <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                           <Building className="w-12 h-12 text-slate-400" />
                         </div>
                       )}
                       
                       {/* Rating Badge */}
                       {hotel.rating && (
                         <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                           <Star className="w-4 h-4 text-amber-500 fill-current" />
                           <span className="text-sm font-bold text-slate-800">{hotel.rating}</span>
                         </div>
                       )}
                       
                       {/* Premium Badge */}
                       <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                         Premium
                       </div>
                     </div>

                    {/* Hotel Info */}
                    <div className="p-6 relative z-10">
                      <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {hotel.hotel}
                      </h3>
                      
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {hotel.address}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        {hotel.before_taxes ? (
                          <div>
                            <span className="text-3xl font-bold text-green-600">
                              ${hotel.before_taxes} CAD
                            </span>
                            <span className="text-sm text-slate-500 ml-2">per night</span>
                          </div>
                        ) : (
                          <span className="text-xl font-semibold text-slate-600">Price on request</span>
                        )}
                        
                        <div className="text-xs text-slate-500 text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Shield className="w-3 h-3" />
                            <span>Direct booking</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>No fees</span>
                          </div>
                        </div>
                      </div>

                      {/* Remarks */}
                      {hotel.remarks && (
                        <div className="text-xs text-blue-600 mb-4 bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200/50">
                          {hotel.remarks}
                        </div>
                      )}

                      {/* Discount Remarks */}
                      {hotel.discount_remarks && (
                        <div className="text-xs text-green-600 mb-4 bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-xl border border-green-200/50">
                          {hotel.discount_remarks}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleBookDirect(hotel.link, hotel.hotel)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Book Direct
                        </button>
                        
                        <Link
                          href={`/hotels/${hotelNameToSlug[hotel.hotel] || hotel.hotel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                          className="bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/50 transition-colors duration-500 pointer-events-none"></div>
                  </div>
                );
               })}
            </div>
          </div>
        </>
      ) : (
        // No search parameters or no results
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {checkin && checkout ? 'No hotels found' : 'Search for hotels'}
            </h2>
            <p className="text-gray-600 mb-6">
              {checkin && checkout 
                ? 'Try adjusting your search criteria or dates.'
                : 'Enter your travel dates to find available hotels in Toronto.'
              }
            </p>
            
            {!checkin || !checkout ? (
              <>
                                 {/* Hotel Directory */}
                 <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 rounded-2xl shadow-xl border border-slate-200/50">
                   <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Featured Hotels in Toronto</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {[
                       { name: "Pantages Hotel Downtown Toronto", slug: "pantages-hotel-downtown-toronto", img: "https://lh5.googleusercontent.com/p/AF1QipMt1ZolVWnJTgIMqogAUCjh9EldFh8vSDHY5TU=s10000" },
                       { name: "Town Inn Suites", slug: "town-inn-suites", img: "https://lh5.googleusercontent.com/p/AF1QipN2HhQs9GSWKldSNWx_1o4EC3ojDlzgG9UVxgV1=s10000" },
                       { name: "One King West Hotel & Residence", slug: "one-king-west-hotel-residence", img: "https://lh5.googleusercontent.com/p/AF1QipPI-2hASi1fH2dzw3hOyxjk2UV9CVV9P3sKUYuX=s10000" },
                       { name: "The Omni King Edward Hotel", slug: "the-omni-king-edward-hotel", img: "https://lh5.googleusercontent.com/p/AF1QipMvGKOVckX0M2FfmY-77Mt9eykQw6pHyHgmK067=s10000" },
                       { name: "Chelsea Hotel, Toronto", slug: "chelsea-hotel-toronto", img: "https://photos.hotelbeds.com/giata/original/04/049472/049472a_hb_f_004.JPG" },
                       { name: "The Anndore House - JDV by Hyatt", slug: "the-anndore-house-jdv", img: "https://lh5.googleusercontent.com/p/AF1QipOh__jl8gimUkhS0FUaJSr1ft0-WORdu7KieteX=s10000" },
                       { name: "Sutton Place Hotel Toronto", slug: "sutton-place-hotel-toronto", img: "https://lh5.googleusercontent.com/p/AF1QipPFImvLwmvVatoeTOPO-h4UCI53SGoH1ITu0BbY=s10000" },
                       { name: "Ace Hotel Toronto", slug: "ace-hotel-toronto", img: "https://lh5.googleusercontent.com/p/AF1QipNGix9dVAg06s82e08vaUXkAhqFlV2XPyTByWkj=s10000" }
                     ].map((hotel, index) => {
                       // Create a subtle color variation for each card
                       const colorVariants = [
                         'from-blue-500/10 to-indigo-500/10 border-blue-200/50',
                         'from-emerald-500/10 to-teal-500/10 border-emerald-200/50',
                         'from-purple-500/10 to-violet-500/10 border-purple-200/50',
                         'from-amber-500/10 to-orange-500/10 border-amber-200/50',
                         'from-rose-500/10 to-pink-500/10 border-rose-200/50',
                         'from-cyan-500/10 to-blue-500/10 border-cyan-200/50'
                       ];
                       const colorVariant = colorVariants[index % colorVariants.length];
                       
                       return (
                         <Link
                           key={hotel.slug}
                           href={`/hotels/${hotel.slug}`}
                           className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border ${colorVariant} shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
                         >
                           <div className="p-6">
                             <div className="flex items-center gap-4">
                               <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative group-hover:scale-110 transition-transform duration-300">
                                 <OptimizedImage 
                                   src={proxify(hotel.img, hotel.name)} 
                                   alt={hotel.name} 
                                   fill
                                   className="object-cover"
                                   sizes="64px"
                                 />
                               </div>
                               <div className="flex-1">
                                 <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                                   {hotel.name}
                                 </div>
                                 <div className="flex items-center gap-2 mt-2">
                                   <div className="text-xs text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1 rounded-full font-medium border border-green-200/50">
                                     Direct Booking
                                   </div>
                                   <div className="text-xs text-slate-500 flex items-center gap-1">
                                     <Shield className="w-3 h-3" />
                                     <span>No Commission</span>
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                           
                           {/* Subtle border glow on hover */}
                           <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/50 transition-colors duration-500 pointer-events-none"></div>
                         </Link>
                       );
                     })}
                   </div>
                 </div>
              </>
            ) : (
              <button
                onClick={() => router.push('/search')}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                New Search
              </button>
            )}
          </div>
        </div>
      )}

             {/* Section Divider */}
       <div className="section-divider"></div>

       {/* Why Book Direct Section */}
       <WhyDirect />

       {/* Section Divider */}
       <div className="section-divider"></div>

               {/* Attractions Section */}
        <Attractions />

        {/* Professional Calendar Modal */}
        <ProfessionalCalendar
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onDateRangeChange={handleDateRangeChange}
          minDate={new Date()}
          maxDate={addDays(new Date(), 365)}
        />

        {/* Traveler Modal */}
        {showTravelerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Select Travelers</h3>
                <button
                  onClick={() => setShowTravelerModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close traveler selection"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Adults</p>
                    <p className="text-xs text-neutral-500">Ages 13+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTravelerChange('adults', Math.max(1, searchParamsState.adults - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Decrease adults"
                    >
                      <span className="text-gray-600">−</span>
                    </button>
                    <span className="w-8 text-center font-medium">{searchParamsState.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleTravelerChange('adults', Math.min(6, searchParamsState.adults + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Increase adults"
                    >
                      <span className="text-gray-600">+</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-800">Children</p>
                    <p className="text-xs text-neutral-500">Ages 0-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTravelerChange('children', Math.max(0, searchParamsState.children - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Decrease children"
                    >
                      <span className="text-gray-600">−</span>
                    </button>
                    <span className="w-8 text-center font-medium">{searchParamsState.children}</span>
                    <button
                      type="button"
                      onClick={() => handleTravelerChange('children', Math.min(4, searchParamsState.children + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Increase children"
                    >
                      <span className="text-gray-600">+</span>
                    </button>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowTravelerModal(false)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
     </div>
   );
 }
