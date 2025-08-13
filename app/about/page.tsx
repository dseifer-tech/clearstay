'use client';

import { useState } from 'react';
import { Search, Shield, DollarSign, X, ArrowRight, CheckCircle, Building, Users, CreditCard, Eye, Clock, Link, Star, Heart, Zap, TrendingDown, TrendingUp, Menu } from 'lucide-react';
import FAQ from '@/app/components/FAQ';
import MobileMenu from '@/app/components/MobileMenu';
import SecondaryCTA from '@/app/components/SecondaryCTA';

export default function AboutPage() {
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
                <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Search Hotels
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

      {/* Hero Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Why We Built InnstaStay</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We were tired of watching travelers overpay while hotels lost revenue to middlemen. 
            We believe in direct, honest hotel booking — no commissions, no inflated rates, no hidden fees.
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">The Problem With Traditional Hotel Booking</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            For decades, big booking platforms have taken 15–30% commissions while providing little real value. 
            This creates a lose-lose situation for everyone except the middleman.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <TrendingDown className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Hotels Lose Profit</h3>
              <p className="text-neutral-600 leading-relaxed">
                Up to 30% of revenue goes to OTAs instead of improving guest experience, 
                amenities, and hotel services.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Guests Pay More</h3>
              <p className="text-neutral-600 leading-relaxed">
                Hidden markups, booking fees, and inflated rates mean guests pay more 
                while receiving fewer loyalty benefits.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Building className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Everyone Loses</h3>
              <p className="text-neutral-600 leading-relaxed">
                Except the middleman who takes commissions without providing real value 
                to either hotels or guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">What InnstaStay Does Differently</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We believe in direct, honest hotel booking — no commissions, no markups, just better stays.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="text-center group">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold mb-4">1</div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Verify Real Hotels</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Only legitimate, verified properties make it onto our platform. 
                We thoroughly vet each hotel to ensure quality and reliability.
              </p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold mb-4">2</div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Pull Real-Time Prices</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Direct from the hotel's own systems, no delays or intermediaries. 
                Direct from the hotel's own systems for accurate, up-to-date pricing.
              </p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold mb-4">3</div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Show Actual Rates</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                No markup, no hidden fees, no booking charges. 
                Just the hotel's real price, displayed with complete transparency.
              </p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold mb-4">4</div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">You Book Direct</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                You book on the hotel's real site, not ours. 
                Direct relationship with the hotel, full loyalty benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Trusted by Local Hotels in Toronto</h2>
          <p className="text-lg text-gray-600 mb-12">We've partnered with verified hotels across downtown Toronto to bring you the best direct rates.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Pantages Hotel</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Town Inn Suites</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">One King West</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-sm">King Edward</h3>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              What You Get
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              The benefits of direct booking without the hassle of searching multiple sites.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">No Commissions</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">We don't charge hotels or guests any fees for using our platform.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Best Available Price</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Direct rates from the hotel's own booking system, no markups.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Loyalty Perks</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Earn points and benefits directly from the hotel's loyalty program.</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center group hover:shadow-lg transition-shadow duration-200">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">Verified Properties</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">Every hotel on our platform is thoroughly vetted and verified.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <SecondaryCTA 
        title="Ready to Experience Direct Booking?"
        subtitle="Start comparing live rates from Toronto's top hotels right now."
      />

      {/* Proof Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Trusted by Toronto Hotels</h2>
          <p className="text-neutral-600 mb-8">
            Verified partners committed to transparent, commission-free booking.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {/* Replace with real logos */}
            <div className="h-12 rounded-md bg-gray-100 shadow-sm" />
            <div className="h-12 rounded-md bg-gray-100 shadow-sm" />
            <div className="h-12 rounded-md bg-gray-100 shadow-sm" />
            <div className="h-12 rounded-md bg-gray-100 shadow-sm" />
            <div className="h-12 rounded-md bg-gray-100 shadow-sm" />
          </div>
          <figure className="mt-8 max-w-3xl mx-auto">
            <blockquote className="text-neutral-700 italic">
              "Direct bookings through InnstaStay helped us reduce OTA costs and reinvest in guest experience."
            </blockquote>
            <figcaption className="mt-2 text-sm text-neutral-500">
              — Toronto Hotel GM
            </figcaption>
          </figure>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { name: "Pantages Hotel Downtown Toronto", slug: "pantages-hotel-downtown-toronto", rating: "4.2" },
              { name: "Town Inn Suites", slug: "town-inn-suites", rating: "4.0" },
              { name: "One King West Hotel & Residence", slug: "one-king-west-hotel-residence", rating: "4.4" },
              { name: "The Omni King Edward Hotel", slug: "the-omni-king-edward-hotel", rating: "4.3" },
              { name: "Chelsea Hotel, Toronto", slug: "chelsea-hotel-toronto", rating: "4.1" },
              { name: "The Anndore House - JDV by Hyatt", slug: "the-anndore-house-jdv", rating: "4.2" },
              { name: "Sutton Place Hotel Toronto", slug: "sutton-place-hotel-toronto", rating: "4.0" },
              { name: "Ace Hotel Toronto", slug: "ace-hotel-toronto", rating: "4.3" }
            ].map((hotel) => (
              <a
                key={hotel.slug}
                href={`/hotels/${hotel.slug}`}
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
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                      View Details →
                    </span>
                    <span className="text-xs text-gray-500">Direct Booking</span>
                  </div>
                </div>
              </a>
            ))}
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="group bg-white rounded-xl p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold">Do I still get loyalty points?</summary>
              <p className="mt-2 text-neutral-600">
                Yes. You book direct with the hotel and keep benefits.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold">Are there fees to use InnstaStay?</summary>
              <p className="mt-2 text-neutral-600">
                No. We show the hotel's actual price with 0% commission.
              </p>
            </details>
            <details className="group bg-white rounded-xl p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-semibold">Where do your prices come from?</summary>
              <p className="mt-2 text-neutral-600">
                Direct from the hotel's own system in real time.
              </p>
            </details>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do I still get loyalty points?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. You book direct with the hotel and keep benefits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are there fees to use InnstaStay?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. We show the hotel's actual price with 0% commission.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Where do your prices come from?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Direct from the hotel's own system in real time.",
                  },
                },
              ],
            }),
          }}
        />
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Book Smarter?</h2>
        <p className="text-lg text-gray-600 mb-8">Compare live, direct rates from Toronto's top hotels in seconds.</p>
        <a 
          href="/search" 
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Compare Rates Now
        </a>
        <p className="text-sm text-gray-500 mt-2">It's free and only takes 10 seconds.</p>
      </section>

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
} 