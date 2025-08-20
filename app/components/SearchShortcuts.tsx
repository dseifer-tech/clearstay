"use client";

import { MapPin, Building, Star } from 'lucide-react';

const shortcuts = [
  {
    title: "Hotels near CN Tower",
    description: "Downtown luxury stays",
    icon: <Building className="w-5 h-5" />,
    href: "/search?near=cn-tower"
  },
  {
    title: "Union Station Hotels",
    description: "Perfect for transit",
    icon: <MapPin className="w-5 h-5" />,
    href: "/search?near=union-station"
  },
  {
    title: "Boutique Hotels",
    description: "Unique downtown stays",
    icon: <Star className="w-5 h-5" />,
    href: "/search?type=boutique"
  },
  {
    title: "Financial District",
    description: "Business-friendly",
    icon: <Building className="w-5 h-5" />,
    href: "/search?area=financial-district"
  }
];

export default function SearchShortcuts() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Popular Searches</h3>
          <p className="text-sm text-gray-600">Quick access to popular destinations</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {shortcuts.map((shortcut, index) => (
            <a
              key={shortcut.title}
              href={shortcut.href}
              className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                  {shortcut.icon}
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                {shortcut.title}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                {shortcut.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
