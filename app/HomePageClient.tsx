'use client';

import { useState, useEffect, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { Search, Shield, DollarSign, X, ArrowRight, CheckCircle, Building, Users, CreditCard, Calendar, Eye, Clock, Link, Star, Heart, Zap, User, Menu } from 'lucide-react';
import { SearchParams } from '@/types/hotel';
import { TORONTO_HOTELS, HOTEL_SLUG_MAP } from '@/lib/hotels';
import SearchBarWide from '@/app/components/SearchBarWide';
import ProfessionalCalendar from '@/app/components/ProfessionalCalendar';
import StickyMobileCTA from '@/app/components/StickyMobileCTA';
import FAQ from '@/app/components/FAQ';
import MobileMenu from '@/app/components/MobileMenu';
import StickySearchBar from '@/app/components/StickySearchBar';
import SearchShortcuts from '@/app/components/SearchShortcuts';
import SecondaryCTA from '@/app/components/SecondaryCTA';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import OptimizedImage from '@/app/components/OptimizedImage';
import { proxify } from '@/lib/img';
import dynamic from 'next/dynamic';

// Lazy load the hotel card component for better performance
const HotelCard = dynamic(() => import('./components/HotelCard'), {
  loading: () => <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />,
  ssr: false
});

export default function HomePageClient() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    checkIn: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    checkOut: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    adults: 2,
    children: 0
  });

  const [isSearching, setIsSearching] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    addDays(new Date(), 1),
    addDays(new Date(), 2)
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle date range changes
  const handleDateRangeChange = (start: Date | null, end: Date | null) => {
    setDateRange([start, end]);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    const checkIn = dateRange[0] ? format(dateRange[0], 'yyyy-MM-dd') : searchParams.checkIn;
    const checkOut = dateRange[1] ? format(dateRange[1], 'yyyy-MM-dd') : searchParams.checkOut;
    
    const searchUrl = `/search?checkin=${checkIn}&checkout=${checkOut}&adults=${searchParams.adults}&children=${searchParams.children}`;
    
    // Show loading spinner for a brief moment before redirecting
    setTimeout(() => {
      window.location.href = searchUrl;
    }, 500);
  };

  const handleTravelerChange = (type: 'adults' | 'children', value: number) => {
    setSearchParams({
      ...searchParams,
      [type]: value
    });
  };

  const getTravelerText = () => {
    const total = searchParams.adults + searchParams.children;
    return `${total} traveler${total > 1 ? 's' : ''}, 1 room`;
  };

  // Show loading spinner when searching
  if (isSearching) {
    return <LoadingSpinner message="Preparing your search..." variant="search" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-white">
      {/* Sticky Navigation */}
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
                   className="h-12 sm:h-16 md:h-20 w-auto block"
                   priority={true}
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
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Compare Rates
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

      {/* HERO START */}
      <section id="hero" className="hero">
                 <picture className="hero-media">
           <OptimizedImage
             src="/hero/homepage.jpg"
             alt="Toronto skyline with CN Tower at golden hour"
             className="hero-img"
             width={1920} 
             height={800}
             priority={true}
             sizes="100vw"
           />
         </picture>

        {/* Gradient overlays */}
        <div className="hero-overlay hero-overlay-dark"></div>
        <div className="hero-overlay hero-overlay-fade"></div>

        {/* Content */}
        <div className="hero-content" role="region" aria-label="Find direct hotel rates in downtown Toronto">
          <h1 className="hero-title">Downtown Toronto Hotels — Book Direct</h1>
          <p className="hero-sub">Live rates from verified downtown hotels. No middlemen, no extra fees.</p>

          <div
            id="search-widget"
            className="mx-auto w-[min(980px,96vw)] p-0 bg-transparent border-0 shadow-none"
          >
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

          <ul className="trust" aria-label="Reasons to book direct in downtown Toronto">
            <li>📍 Downtown Toronto</li>
            <li>⚡ Live Direct Rates</li>
            <li>🟢 No Platform Fees</li>
          </ul>
        </div>
      </section>
      {/* HERO END */}

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              How InnstaStay Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Book direct with verified hotels—clear prices, no surprises.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">1. Search Hotels</h3>
                             <p className="text-neutral-600 leading-relaxed">
                 Enter your dates and preferences. We&apos;ll show you verified hotels with real-time availability.
               </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">2. Compare Direct Rates</h3>
                             <p className="text-neutral-600 leading-relaxed">
                 See the hotel&apos;s actual price—no markups, no hidden fees, no booking charges.
               </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Link className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">3. Book Direct</h3>
                             <p className="text-neutral-600 leading-relaxed">
                 You book directly on the hotel&apos;s website. Keep all loyalty benefits and points.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              What You Get
            </h2>
                         <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
               The hotel&apos;s best available price with all the benefits of direct booking.
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Transparent Pricing</h3>
                             <p className="text-neutral-600 text-sm leading-relaxed">The hotel&apos;s actual rate with no markups or hidden fees</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Flexible Cancellation</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Loyalty perks and cancellation policies directly from the hotel</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Loyalty Perks</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Earn points and benefits when available through direct booking</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">0% Commission</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">No booking fees or commissions — ever</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Directory Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">
              Featured Hotels in Toronto
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of premium hotels in downtown Toronto. Each property offers direct booking with no commissions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TORONTO_HOTELS.map((hotel, index) => (
              <HotelCard key={hotel.token} hotel={hotel} index={index} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/search" 
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Hotels →
            </a>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <SecondaryCTA />

      {/* Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Verified by InnstaStay</h3>
              <p className="text-neutral-600 text-sm">All hotels are verified and trusted partners</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Official Rate</h3>
              <p className="text-neutral-600 text-sm">No markups or hidden fees</p>
            </div>
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <X className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">No Commissions</h3>
              <p className="text-neutral-600 text-sm">Direct booking with hotels</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Optional CTA Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Downtown stays, zero commission.
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Skip the middlemen and find your hotel in downtown Toronto with real-time prices from the source.
          </p>
          <a 
            href="/search" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Find a Hotel in Downtown Toronto →
          </a>
        </div>
      </section>

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Travelers</h3>
              <button
                onClick={() => setShowTravelerModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adults</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTravelerChange('adults', Math.max(1, searchParams.adults - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{searchParams.adults}</span>
                  <button
                    onClick={() => handleTravelerChange('adults', searchParams.adults + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTravelerChange('children', Math.max(0, searchParams.children - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{searchParams.children}</span>
                  <button
                    onClick={() => handleTravelerChange('children', searchParams.children + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowTravelerModal(false)}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onClick={handleSearch} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
}
