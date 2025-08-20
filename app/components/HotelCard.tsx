import { Star, Shield, DollarSign, Eye, Building } from 'lucide-react';
import { Hotel } from '@/types/hotel';
import { HOTEL_SLUG_MAP } from '@/lib/hotels';
import OptimizedImage from './OptimizedImage';
import { proxify } from '@/lib/img';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export default function HotelCard({ hotel, index }: HotelCardProps) {
  const slug = HOTEL_SLUG_MAP[hotel.token];
  
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
    <div className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border ${colorVariant} shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}>
      {/* Gradient overlay for subtle color */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorVariant} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Hotel Image */}
      <div className="h-56 w-full relative overflow-hidden">
        {hotel.image_url ? (
          <OptimizedImage 
            src={proxify(hotel.image_url, hotel.name)} 
            alt={hotel.name} 
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            wrapperClassName="h-56 w-full relative overflow-hidden"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
            <Building className="w-12 h-12 text-slate-400" />
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
          <Star className="w-4 h-4 text-amber-500 fill-current" />
          <span className="text-sm font-bold text-slate-800">{hotel.rating}</span>
        </div>
        
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          Premium
        </div>
      </div>

      {/* Hotel Info */}
      <div className="p-6 relative z-10">
        <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {hotel.name}
        </h3>
        
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {hotel.address}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {hotel.amenities?.slice(0, 2).map((amenity: string, index: number) => (
            <span
              key={`amenity-${amenity}`}
              className="text-xs bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-6 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Direct Booking</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            <span>No Commission</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-3">
          <a
            href={`/hotels/${slug}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Eye className="w-4 h-4" />
            View Hotel
          </a>
        </div>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-300/50 transition-colors duration-500 pointer-events-none"></div>
    </div>
  );
}
