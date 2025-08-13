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

export default function HomePage() {
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
                <img
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  width={100}
                  height={80}
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
                    <a href="/search" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Compare Rates
                    </a>
                  </li>
                  <li>
                    <a href="/hotels/toronto-downtown" className="hover:border-b-2 border-blue-600 pb-1 transition-colors duration-200">
                      Downtown Hotels
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
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Compare Rates
                </button>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setShowMobileMenu(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm flex items-center gap-2"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-4 h-4" />
                  Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Center Stage */}
      <section className="relative pt-14 pb-12 bg-gradient-to-b from-[#EFF5FF] to-white">
        <div className="mx-auto max-w-6xl text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Unlock the Best <span className="text-blue-600">Direct Hotel Deals</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            No middlemen, no hidden fees — compare live rates in under 10 seconds.
          </p>
        </div>

        <div className="mt-6">
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
            onSearch={() => handleSearch({ preventDefault: () => {} } as any)}
          />
        </div>

        {/* Trust chips - unified styling */}
        <div className="mt-4 flex flex-wrap justify-center gap-3 px-6">
          {["Google Verified", "8 Trusted Hotels", "0% Commission"].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full text-sm bg-white shadow-sm ring-1 ring-black/5">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Search Shortcuts */}
      <SearchShortcuts />

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
              >
                <X className="w-6 h-6" />
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
                    onClick={() => handleTravelerChange('adults', Math.max(1, searchParams.adults - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600">−</span>
                  </button>
                  <span className="w-8 text-center font-medium">{searchParams.adults}</span>
                  <button
                    type="button"
                    onClick={() => handleTravelerChange('adults', Math.min(6, searchParams.adults + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
                    onClick={() => handleTravelerChange('children', Math.max(0, searchParams.children - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600">−</span>
                  </button>
                  <span className="w-8 text-center font-medium">{searchParams.children}</span>
                  <button
                    type="button"
                    onClick={() => handleTravelerChange('children', Math.min(4, searchParams.children + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
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

      {/* Why We Built InnstaStay */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              The Problem We're Solving
            </h2>
            <p className="text-lg text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              Traditional booking platforms add <strong>15–30% commission fees</strong>, driving up costs for both hotels and guests. 
              <br />
              We believe in transparency and fair pricing for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <X className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Hotels Lose Revenue</h3>
              <p className="text-neutral-600 leading-relaxed">Up to 30% of revenue goes to middlemen instead of improving guest experience and hotel amenities.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Guests Pay More</h3>
              <p className="text-neutral-600 leading-relaxed">Hidden fees and markups inflate prices without adding any real value to your stay.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Building className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Everyone Loses</h3>
              <p className="text-neutral-600 leading-relaxed">Except the middleman who takes commissions without providing real value to either party.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              The InnstaStay Solution
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
              We connect you directly to <strong>verified hotels</strong> with <strong>real-time pricing</strong> — 
              <br />
              no middlemen, no markups, just better stays.
            </p>
          </div>
          
          {/* Visual representation of the solution */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Traditional Booking</h3>
                <p className="text-sm text-neutral-600">Hidden fees + 30% commission</p>
              </div>
              
              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 text-blue-500 hidden md:block" />
                <ArrowRight className="w-8 h-8 text-blue-500 rotate-90 md:hidden" />
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">InnstaStay</h3>
                <p className="text-sm text-neutral-600">Direct booking + 0% commission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Our simple 4-step process ensures you get the best rates directly from verified hotels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Verify Real Hotels</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Only legitimate, verified properties make it onto our platform</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Pull Real-Time Prices</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Using Google's Hotel API for accurate, up-to-date pricing</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">You See True Rates</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">No markups, no hidden fees, just the hotel's real price</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Link className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">You Book Direct</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">You book directly with the hotel, not through us</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              What You Get
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              The hotel's best available price with all the benefits of direct booking.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Transparent Pricing</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">The hotel's actual rate with no markups or hidden fees</p>
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              Featured Hotels in Toronto
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of premium hotels in downtown Toronto. Each property offers direct booking with no commissions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TORONTO_HOTELS.map((hotel) => {
              const slug = HOTEL_SLUG_MAP[hotel.token];
              return (
                <a
                  key={hotel.token}
                  href={`/hotels/${slug}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden hover:border-blue-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                      </div>
                      <Building className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {hotel.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {hotel.address}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.amenities?.slice(0, 2).map((amenity: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                        View Details →
                      </span>
                      <span className="text-xs text-gray-500">Direct Booking</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/search" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
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

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA onClick={() => handleSearch({ preventDefault: () => {} } as any)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
} 