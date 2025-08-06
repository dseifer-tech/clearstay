'use client';

import { useState, useEffect, useRef } from 'react';
import { format, addDays } from 'date-fns';
import { Search, Shield, DollarSign, X, ArrowRight, CheckCircle, Building, Users, CreditCard, Calendar, Eye, Clock, Link, Star, Heart, Zap, User } from 'lucide-react';
import { SearchParams } from '@/types/hotel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  const datePickerRef = useRef<HTMLDivElement>(null);
  const travelerModalRef = useRef<HTMLDivElement>(null);

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    if (dates[0] && dates[1]) {
      setSearchParams({
        ...searchParams,
        checkIn: format(dates[0], 'yyyy-MM-dd'),
        checkOut: format(dates[1], 'yyyy-MM-dd')
      });
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    const searchUrl = `/search?checkin=${searchParams.checkIn}&checkout=${searchParams.checkOut}&adults=${searchParams.adults}&children=${searchParams.children}`;
    window.location.href = searchUrl;
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

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (travelerModalRef.current && !travelerModalRef.current.contains(event.target as Node)) {
        setShowTravelerModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <a href="/" className="text-2xl font-bold text-blue-600 tracking-tight">ClearStay</a>
            </div>
            <ul className="flex space-x-8 text-md font-medium text-neutral-700">
              <li><a href="/" className="hover:text-blue-600 transition-colors duration-200">Home</a></li>
              <li><a href="/about" className="hover:text-blue-600 transition-colors duration-200">About</a></li>
              <li><a href="/search" className="hover:text-blue-600 transition-colors duration-200">Toronto Hotels</a></li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Compare Rates
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 tracking-tight leading-tight">
              Book with Confidence.
              <br />
              <span className="text-blue-600">Stay with Trust.</span>
            </h1>
            <p className="text-xl text-neutral-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              Toronto's commission-free hotel booking platform. No markups, no games — just real prices from verified hotels.
            </p>
          </div>
          
          {/* Search Form */}
          <div className="mt-12 animate-fade-in-up">
            <form onSubmit={handleSearch} className="bg-white shadow-xl rounded-xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto">
              
              {/* Dates */}
              <div className="relative w-full md:w-auto" ref={datePickerRef}>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 w-full md:w-auto hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-neutral-500">Dates</p>
                    <p className="text-sm font-medium text-neutral-800">
                      {dateRange[0] && dateRange[1] 
                        ? `${format(dateRange[0], 'MMM dd')} – ${format(dateRange[1], 'MMM dd')}`
                        : 'Select dates'
                      }
                    </p>
                  </div>
                </button>
                
                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 z-50">
                    <DatePicker
                      selectsRange={true}
                      startDate={dateRange[0]}
                      endDate={dateRange[1]}
                      onChange={handleDateRangeChange}
                      minDate={new Date()}
                      dateFormat="MMM dd"
                      inline
                      monthsShown={1}
                      shouldCloseOnSelect={false}
                      renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                          <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <span className="text-lg font-semibold text-gray-900">
                            {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </span>
                          <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                      calendarContainer={({ children, ...props }) => (
                        <div {...props} className="bg-white rounded-xl shadow-2xl border border-gray-200">
                          {children}
                          {dateRange[0] && dateRange[1] && (
                            <div className="p-4 border-t border-gray-200">
                              <button
                                type="button"
                                onClick={() => {
                                  setShowDatePicker(false);
                                  handleSearch({ preventDefault: () => {} } as any);
                                }}
                                disabled={isSearching}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                              >
                                {isSearching ? (
                                  <>
                                    <div className="inline w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Searching...
                                  </>
                                ) : (
                                  <>
                                    <Search className="w-4 h-4 mr-2" />
                                    Search Hotels
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Travelers */}
              <div className="relative w-full md:w-auto" ref={travelerModalRef}>
                <button
                  type="button"
                  onClick={() => setShowTravelerModal(!showTravelerModal)}
                  className="flex items-center gap-3 border border-gray-200 rounded-lg px-4 py-3 w-full md:w-auto hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                >
                  <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-neutral-500">Travelers</p>
                    <p className="text-sm font-medium text-neutral-800">{getTravelerText()}</p>
                  </div>
                </button>
                
                {showTravelerModal && (
                  <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
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
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                type="submit"
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 w-full md:w-auto transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isSearching ? (
                  <>
                    <div className="inline w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Hotels
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Why We Built ClearStay */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              Why We Built ClearStay
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Traditional booking platforms add 15-30% commission fees, driving up costs for both hotels and guests. We believe in transparency and fair pricing for everyone.
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

      {/* Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Verified by ClearStay</h3>
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
    </div>
  );
} 