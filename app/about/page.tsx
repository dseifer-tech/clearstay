'use client';

import { Search, Shield, DollarSign, X, ArrowRight, CheckCircle, Building, Users, CreditCard, Eye, Clock, Link, Star, Heart, Zap, TrendingDown, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef5ff] to-white">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <a href="/" className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  className="h-12 sm:h-16 md:h-20 w-auto block"
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-8 text-md font-medium text-neutral-700">
                <li><a href="/" className="hover:text-blue-600 transition-colors duration-200">Home</a></li>
                <li><a href="/about" className="hover:text-blue-600 transition-colors duration-200">About</a></li>
                <li><a href="/search" className="hover:text-blue-600 transition-colors duration-200">Toronto Hotels</a></li>
              </ul>
              <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Search Hotels
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <a href="/search" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm">
                Search
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Why We Built InnstaStay
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We believe in direct, honest hotel booking — no commissions, no inflated rates, no middlemen. 
              Just real prices from real hotels, delivered with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              The Problem With Traditional Booking
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Traditional booking platforms create a lose-lose situation for everyone except the middleman.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Our Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              What InnstaStay Does Differently
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Our simple 4-step process ensures you get the best rates directly from verified hotels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Verify Real Hotels</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Only legitimate, verified properties make it onto our platform. 
                We thoroughly vet each hotel to ensure quality and reliability.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Pull Real-Time Prices</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Direct from the hotel's own systems, no delays or intermediaries. 
                Using Google's Hotel API for accurate, up-to-date pricing.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">We Show Actual Rates</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                No markup, no hidden fees, no booking charges. 
                Just the hotel's real price, displayed with complete transparency.
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                <Link className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-3">You Book Direct</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                You book on the hotel's real site, not ours. 
                Direct relationship with the hotel, full loyalty benefits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
              What You Get
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              The benefits of direct booking without the hassle of searching multiple sites.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">No commissions or booking fees — ever</h3>
                  <p className="text-sm text-neutral-600 mt-1">We don't charge hotels or guests any fees for using our platform.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">The hotel's best available price</h3>
                  <p className="text-sm text-neutral-600 mt-1">Direct rates from the hotel's own booking system, no markups.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">Full transparency</h3>
                  <p className="text-sm text-neutral-600 mt-1">See exactly what you're paying for with no hidden fees or charges.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">Loyalty perks when available</h3>
                  <p className="text-sm text-neutral-600 mt-1">Earn points and benefits directly from the hotel's loyalty program.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">Support from the hotel</h3>
                  <p className="text-sm text-neutral-600 mt-1">Direct customer service from the hotel, not a third-party call center.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">Verified properties only</h3>
                  <p className="text-sm text-neutral-600 mt-1">Every hotel on our platform is thoroughly vetted and verified.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            Ready to see the difference?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start searching with real prices, from real hotels — no middlemen, no hidden fees, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Hotels
            </a>
            <a 
              href="/" 
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
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
    </div>
  );
} 