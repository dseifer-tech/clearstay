'use client';

import { useState } from 'react';
import { Search, Shield, DollarSign, X, ArrowRight, CheckCircle, Building, Users, CreditCard, Eye, Clock, Link, Star, Heart, Zap, TrendingDown, TrendingUp, Menu } from 'lucide-react';
import FAQ from '@/app/components/FAQ';
import MobileMenu from '@/app/components/MobileMenu';
import SecondaryCTA from '@/app/components/SecondaryCTA';
import { TORONTO_HOTELS, HOTEL_SLUG_MAP } from '@/lib/hotels';

export default function AboutPageClient() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

             {/* Hero Section with Background Image - Same size as homepage */}
       <section className="hero">
         <picture className="hero-media">
           <img
             src="/hero/about.jpg"
             alt="About InnstaStay - Commission-free hotel booking"
             className="hero-img"
             width="1920" 
             height="800"
             loading="eager" 
             fetchPriority="high"
             decoding="async"
           />
         </picture>
         
         {/* Gradient overlays */}
         <div className="hero-overlay hero-overlay-dark"></div>
         <div className="hero-overlay hero-overlay-fade"></div>
         
         {/* Content */}
         <div className="hero-content" role="region" aria-label="About InnstaStay - Commission-free hotel booking">
           <h1 className="hero-title">Why We Built InnstaStay</h1>
           <p className="hero-sub">
             We were tired of watching travelers overpay while hotels lost revenue to middlemen. 
             We believe in direct, honest hotel booking — no commissions, no inflated rates, no hidden fees.
           </p>
         </div>
       </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">The Problem with Hotel Booking</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Traditional booking platforms add 15-30% in commissions and fees, driving up prices for travelers while taking revenue from hotels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inflated Prices</h3>
              <p className="text-gray-600">
                Booking platforms add 15-30% in commissions, making hotels more expensive for travelers.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Hidden Fees</h3>
              <p className="text-gray-600">
                Service charges, booking fees, and other hidden costs that aren't disclosed upfront.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <X className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lost Revenue</h3>
              <p className="text-gray-600">
                Hotels lose significant revenue to middlemen, reducing their ability to invest in guest experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect travelers directly with hotels, eliminating middlemen and ensuring everyone gets a better deal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Travelers</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Transparent Pricing</strong>
                    <p className="text-gray-600 text-sm">See the hotel's actual rate with no hidden fees</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Direct Booking</strong>
                    <p className="text-gray-600 text-sm">Book directly with the hotel and keep all loyalty benefits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Better Service</strong>
                    <p className="text-gray-600 text-sm">Direct communication with the hotel for special requests</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6">For Hotels</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Keep More Revenue</strong>
                    <p className="text-gray-600 text-sm">No commission fees eating into your profits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Direct Guest Relationship</strong>
                    <p className="text-gray-600 text-sm">Build loyalty and repeat business directly</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Better Guest Experience</strong>
                    <p className="text-gray-600 text-sm">Invest savings into improving your property</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">How InnstaStay Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We partner with verified hotels to provide real-time availability and pricing directly from their systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Search & Compare</h3>
              <p className="text-gray-600">
                Enter your dates and see real-time availability and pricing from verified hotels.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Transparent Pricing</h3>
              <p className="text-gray-600">
                See the hotel's actual rate with no markups, commissions, or hidden fees.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Link className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Book Direct</h3>
              <p className="text-gray-600">
                You're redirected to the hotel's official website to complete your booking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Directory Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-6">
              Our Featured Hotels
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of premium hotels in downtown Toronto. Each property offers direct booking with no commissions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TORONTO_HOTELS.map((hotel) => {
              const slug = HOTEL_SLUG_MAP[hotel.token];
              return (
                <div key={hotel.token} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {/* Hotel Image */}
                  <div className="h-48 w-full relative">
                    {hotel.image_url ? (
                      <img 
                        src={hotel.image_url} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Hotel Image</span>
                      </div>
                    )}
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">{hotel.rating}</span>
                    </div>
                  </div>

                  {/* Hotel Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                      {hotel.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                      {hotel.address}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`/hotels/${slug}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Hotel
                      </a>
                    </div>
                  </div>
                </div>
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

      {/* FAQ Section */}
      <FAQ />

      {/* AboutPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About InnstaStay",
            "description": "Learn how InnstaStay eliminates middlemen to provide direct hotel booking in Toronto. No commissions, no markups, just the hotel's actual price.",
            "url": "https://www.innstastay.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "InnstaStay",
              "description": "Commission-free hotel booking platform connecting travelers directly with verified hotels in downtown Toronto."
            }
          })
        }}
      />

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
}
