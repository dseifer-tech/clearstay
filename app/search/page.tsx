'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, MapPin, ExternalLink, Eye, Search, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { HOTEL_SLUG_MAP } from '@/lib/hotels';
import { format, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotels, setHotels] = useState<HotelRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTravelerModal, setShowTravelerModal] = useState(false);
  const [hasSelectedDates, setHasSelectedDates] = useState(false);
  const [isNavigatingMonths, setIsNavigatingMonths] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const travelerModalRef = useRef<HTMLDivElement>(null);

  // Search form state
  const [searchForm, setSearchForm] = useState({
    checkIn: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    checkOut: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    adults: 2,
    children: 0
  });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    addDays(new Date(), 1),
    addDays(new Date(), 2)
  ]);

  // Handle date range changes
  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    if (isNavigatingMonths) {
      return;
    }
    
    setDateRange(dates);
    
    if (dates[0] && dates[1]) {
      setHasSelectedDates(true);
    } else {
      setHasSelectedDates(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    const checkIn = dateRange[0] ? format(dateRange[0], 'yyyy-MM-dd') : searchForm.checkIn;
    const checkOut = dateRange[1] ? format(dateRange[1], 'yyyy-MM-dd') : searchForm.checkOut;
    
    const searchUrl = `/search?checkin=${checkIn}&checkout=${checkOut}&adults=${searchForm.adults}&children=${searchForm.children}`;
    router.push(searchUrl);
  };

  const handleTravelerChange = (type: 'adults' | 'children', value: number) => {
    setSearchForm({
      ...searchForm,
      [type]: value
    });
  };

  const getTravelerText = () => {
    const total = searchForm.adults + searchForm.children;
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

  // Fetch hotels when search parameters are present
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const checkin = searchParams.get('checkin');
        const checkout = searchParams.get('checkout');
        const adults = searchParams.get('adults');
        const children = searchParams.get('children');

        if (!checkin || !checkout || !adults || !children) {
          // No search parameters - show search form
          setLoading(false);
          return;
        }

        setLoading(true);
        const response = await fetch(
          `/api/search?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const data = await response.json();
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels');
        console.error('Error fetching hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const handleBookDirect = (bookingUrl: string) => {
    if (bookingUrl) {
      window.open(bookingUrl, '_blank');
    }
  };

  // Show search form if no search parameters
  if (!searchParams.get('checkin') && !searchParams.get('checkout')) {
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
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                    Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Form Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-neutral-800 tracking-tight leading-tight">
                Find Your Perfect Stay
                <br />
                <span className="text-blue-600">Compare Real Hotel Rates</span>
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 mt-4 sm:mt-6 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Search for hotels in Toronto and compare real-time direct rates from trusted properties.
                <br />
                No markups, no hidden fees — just transparent pricing from verified hotels.
              </p>
            </div>
            
            {/* Search Form */}
            <div className="mt-8 sm:mt-12 animate-fade-in-up">
              <form onSubmit={handleSearch} className="bg-white shadow-xl rounded-xl px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
                
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
                        onMonthChange={(date) => {
                          setIsNavigatingMonths(true);
                          setTimeout(() => setIsNavigatingMonths(false), 100);
                        }}
                        onCalendarOpen={() => {
                          setHasSelectedDates(false);
                          setIsNavigatingMonths(false);
                        }}
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
                            {hasSelectedDates && dateRange[0] && dateRange[1] && (
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
                              onClick={() => handleTravelerChange('adults', Math.max(1, searchForm.adults - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-gray-600">−</span>
                            </button>
                            <span className="w-8 text-center font-medium">{searchForm.adults}</span>
                            <button
                              type="button"
                              onClick={() => handleTravelerChange('adults', Math.min(6, searchForm.adults + 1))}
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
                              onClick={() => handleTravelerChange('children', Math.max(0, searchForm.children - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-gray-600">−</span>
                            </button>
                            <span className="w-8 text-center font-medium">{searchForm.children}</span>
                            <button
                              type="button"
                              onClick={() => handleTravelerChange('children', Math.min(4, searchForm.children + 1))}
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
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-lg text-gray-600">Searching for hotels...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
            <p className="text-lg text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Compare Rates
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h2>
            <p className="text-gray-600">
              {hotels.length} hotels found for your search
            </p>
          </div>

          {hotels.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No hotels found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="space-y-6">
              {hotels.map((hotel, index) => {
                // Find the hotel token to get the slug
                const hotelToken = Object.keys(HOTEL_SLUG_MAP).find(token => 
                  hotel.hotel.toLowerCase().includes(HOTEL_SLUG_MAP[token].replace(/-/g, ' ').toLowerCase())
                );
                const slug = hotelToken ? HOTEL_SLUG_MAP[hotelToken] : null;
                const checkin = searchParams.get('checkin');
                const checkout = searchParams.get('checkout');
                const adults = searchParams.get('adults');
                const children = searchParams.get('children');
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 border border-zinc-100 p-4 sm:p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                          {/* Hotel Image Placeholder */}
                          <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold text-sm">Hotel</span>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2">{hotel.hotel}</h4>
                            <div className="flex items-center text-sm text-yellow-500 mb-2">
                              <Star className="w-4 h-4 mr-1" />
                              <span className="font-medium">{hotel.rating}</span>
                              <span className="mx-2 text-zinc-400">•</span>
                              <span className="text-zinc-500">Downtown Toronto</span>
                            </div>
                            <p className="text-sm text-neutral-600 mb-3">{hotel.address}</p>
                            
                            {/* Hotel Description */}
                            {hotel.description && (
                              <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                                {hotel.description}
                              </p>
                            )}
                            
                            {hotel.remarks && (
                              <p className="text-sm text-blue-600 mb-2">{hotel.remarks}</p>
                            )}
                            {hotel.discount_remarks && (
                              <p className="text-sm text-green-600 mb-2">{hotel.discount_remarks}</p>
                            )}
                            
                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                              <button
                                onClick={() => handleBookDirect(hotel.link)}
                                disabled={!hotel.link}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                              >
                                <ExternalLink className="w-4 h-4" />
                                {hotel.before_taxes ? "Book Direct" : "Check Direct for Best Rate"}
                              </button>
                              
                              {slug && checkin && checkout && (
                                <Link
                                  href={`/hotels/${slug}?checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 sm:px-6 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-start sm:items-end mt-4 sm:mt-0">
                        {hotel.before_taxes && (
                          <div className="bg-green-100 text-green-800 font-bold px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg">
                            ${hotel.before_taxes} / night
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 