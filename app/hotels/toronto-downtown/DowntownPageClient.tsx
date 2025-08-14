'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from '@/app/components/MobileMenu';

export default function DowntownPageClient() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div>
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

      {/* Hero Section with Background Image - Same size as homepage */}
      <section className="hero">
        <picture className="hero-media">
          <img
            src="/hero/toronto-downtown.jpg"
            alt="Downtown Toronto skyline with CN Tower"
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
        <div className="hero-content" role="region" aria-label="Find direct hotel rates in downtown Toronto">
          <h1 className="hero-title">Downtown Toronto Hotels</h1>
          <p className="hero-sub">Looking for a hotel in downtown Toronto? InnstaStay lets you compare real-time direct prices from trusted hotels near Yonge Street, Union Station, Eaton Centre, and more — with no markups, no commissions, and no fake discounts.</p>
          
          {/* Search Button */}
          <div className="mb-6">
            <a
              href="/search?location=toronto&area=downtown"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Search Downtown Hotels
            </a>
          </div>
          
          {/* Trust Badges */}
          <ul className="trust" aria-label="Reasons to book direct in downtown Toronto">
            <li>📍 Downtown Toronto</li>
            <li>⚡ Live Direct Rates</li>
            <li>🟢 No Platform Fees</li>
          </ul>
        </div>
      </section>

      {/* Why Downtown Toronto Icons Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 21h8m-4-4v4m-8-6V5a2 2 0 012-2h8a2 2 0 012 2v10"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Central & Walkable</h3>
              <p className="text-gray-600 text-sm mt-1">Stay near events, shopping, business hubs, and transit — all within walking distance.</p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8c1.657 0 3 1.567 3 3.5S13.657 15 12 15s-3-1.567-3-3.5S10.343 8 12 8z"></path>
                  <path d="M12 3v5m0 10v3m7-10h-4m-6 0H5"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Real-Time Direct Prices</h3>
              <p className="text-gray-600 text-sm mt-1">Compare official rates pulled live from hotel booking engines — no commission, no middlemen.</p>
            </div>

            <div>
              <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.75 17l.72 2.16a.75.75 0 001.42 0L12.59 17h4.66a.75.75 0 00.54-1.28l-3.87-4.01a.75.75 0 010-1.06l3.87-4.01a.75.75 0 00-.54-1.28h-4.66L11.89 4.84a.75.75 0 00-1.42 0L9.75 7H5.25a.75.75 0 00-.54 1.28l3.87 4.01a.75.75 0 010 1.06L4.71 17a.75.75 0 00.54 1.28h4.5z"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">No Booking Fees</h3>
              <p className="text-gray-600 text-sm mt-1">We don't add fees. You book directly with the hotel and pay exactly what they charge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Nearby Attractions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "CN Tower",
                link: "https://www.google.com/search?q=CN+Tower",
                thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToC6Dg8U9nucWiitonjOGkMhhIqrf6NalAdrVeYXaiQkDqBuDy",
                rating: 4.6,
                reviews: 81033,
                description: "Over 553-metre landmark tower with panoramic city views and a glass floor experience."
              },
              {
                name: "Royal Ontario Museum",
                link: "https://www.google.com/search?q=Royal+Ontario+Museum",
                thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTm301sIsH1CmyGx9hhuENMH3Ni1yzLZJvjE6iGGfo88sCYNTWw",
                rating: 4.7,
                reviews: 39728,
                description: "Natural history and world cultures exhibits — including fossils, artifacts, and more."
              },
              {
                name: "Ripley's Aquarium of Canada",
                link: "https://www.google.com/search?q=Ripley's+Aquarium+of+Canada",
                thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQoCFpB93wBlMQcUqbnrBUM1I-BIS30KwpXkEZFawxcbOjHCqj_",
                rating: 4.6,
                reviews: 64115,
                description: "Modern aquarium featuring diverse aquatic species, tunnel exhibits, and family-friendly events."
              },
              {
                name: "Art Gallery of Ontario",
                link: "https://www.google.com/search?q=Art+Gallery+of+Ontario",
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH4mdIZfQ-6BC-k4mO9xxXPB-eYZd37_oe73iDacYf_JkhBscP",
                rating: 4.7,
                reviews: 17844,
                description: "One of North America's largest art museums with a major Canadian and European collection."
              },
              {
                name: "Casa Loma",
                link: "https://www.google.com/search?q=Casa+Loma",
                thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT_DhhHAloXWTAcX84ZiwdwYHjlM13s9Jsl5SlBh3qc-jzyUUM6",
                rating: 4.5,
                reviews: 31533,
                description: "Grand 1914 castle featuring regular tours & gardens that are open seasonally."
              },
              {
                name: "St. Lawrence Market",
                link: "https://www.google.com/search?q=St.+Lawrence+Market",
                thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSNzfS0Yisnz-lksUXqnJyMsg_Oqz0b1LqBRxC_0LQ1hfXII1C6",
                rating: 4.6,
                reviews: 39009,
                description: "Spacious market with 100+ vendors, bakers, butchers & artisans, with produce & antiques on weekends."
              },
              {
                name: "Toronto Islands",
                link: "https://www.google.com/search?q=Toronto+Islands",
                thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT5in4EAwdgmFl5BBC-t_R2_Emd0JAJ-ynG1DciT5_xRScBGvmU",
                rating: 4.7,
                reviews: 1828,
                description: "Islands across from downtown offering recreational activities, beaches & family-friendly attractions."
              },
              {
                name: "Hockey Hall of Fame",
                link: "https://www.google.com/search?q=Hockey+Hall+of+Fame",
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM1-Y71XhtzuTXoaA9QPngRo_Ds6c8ohJef9f6C3PdeyY10b_1",
                rating: 4.7,
                reviews: 6735,
                description: "Massive hockey museum with gear, games, and the Stanley Cup on display."
              },
              {
                name: "CF Toronto Eaton Centre",
                link: "https://www.google.com/search?q=CF+Toronto+Eaton+Centre",
                thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDE1qITYSV9U8ypboYS1QEp0nkwrgVHCLr3nZ38X39o6HgPsLI",
                rating: 4.5,
                reviews: 54664,
                description: "Sprawling shopping mall with a historic glass roof and 250+ stores and boutiques."
              },
              {
                name: "High Park",
                link: "https://www.google.com/search?q=High+Park",
                thumbnail: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQp4kuV2jzlxXpYaKLz52C-WXb3Rn-1HjGssXnCrd8xKK3YiyYq",
                rating: 4.7,
                reviews: 27472,
                description: "Expansive park featuring trails, gardens, sports areas, a zoo, and more."
              },
              {
                name: "Nathan Phillips Square",
                link: "https://www.google.com/search?q=Nathan+Phillips+Square",
                thumbnail: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRthVVW_oiEDVRgiMPp6fNOFu2EosC7h_nQCkNi-0R5MaFy7_HK",
                rating: 4.6,
                reviews: 39192,
                description: "Lively civic square with skating rink, concerts, and seasonal events in front of city hall."
              },
              {
                name: "Rogers Centre",
                link: "https://www.google.com/search?q=rogers+centre",
                thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTbvlNUduS39Z2g6TkzqhL235pD6Zc1bGYAvkRsi7Bs7q9Sdcix",
                rating: 4.1,
                reviews: 10,
                description: "Iconic sports stadium and concert venue, home to the Toronto Blue Jays."
              },
              {
                name: "Evergreen Brick Works",
                link: "https://www.google.com/search?q=Evergreen+Brick+Works",
                thumbnail: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nor1qie4iFue-79QngzpnpqFQ0LSCHZODMKmJY0Om-hxTc7uksmJ6yK5DUhf2QYYPTywunRd3vD5XR4bqRPoC8ugDGbL1TNOqoiGw5JLAMfAHOsgojrT95P6yLz-JrAUr_mi0RLJA=w180-h120-k-no",
                rating: 4.6,
                reviews: 9764,
                description: "Eco-friendly attraction with markets, trails, and cultural events in a former industrial space."
              },
              {
                name: "EdgeWalk at the CN Tower",
                link: "https://www.google.com/search?q=EdgeWalk+at+the+CN+Tower",
                thumbnail: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np4G1N9h-UwdvK6T8kdGAi-ztiyCA2kjues-JBUhppqLTBKM6AyvThbsXudM6Xq2evgPd9cobNjdINhRSg-H-p_bcN-6kfZguvHntKq8FH7ZSqBN23FgQhju2Qqi3QtSD1vMIcp=w160-h120-k-no",
                rating: 4.8,
                reviews: 744,
                description: "Outdoor skywalk experience at the top of the CN Tower for thrill-seekers."
              },
              {
                name: "Sankofa Square",
                link: "https://www.google.com/search?q=Sankofa+Square",
                thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQMmZ6Ii1YyVijipK7Gfnv4SWhlDtTYwKFgeiSng78ZclY6ggz9",
                rating: 4.5,
                reviews: 20990,
                description: "Downtown public space hosting community events, concerts, and cultural activations."
              }
            ].map((poi, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4">
                <img
                  src={poi.thumbnail}
                  alt={poi.name}
                  className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <a href={`/search?near=${poi.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                    <h3 className="text-lg font-semibold text-blue-600 hover:underline">{poi.name}</h3>
                  </a>
                  <p className="text-sm text-gray-500 mb-1">
                    ⭐ {poi.rating} ({poi.reviews.toLocaleString()} reviews)
                  </p>
                  <p className="text-sm text-gray-700">{poi.description}</p>
                  <a 
                    href={`/search?near=${poi.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Find hotels near {poi.name} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Menu */}
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
}
