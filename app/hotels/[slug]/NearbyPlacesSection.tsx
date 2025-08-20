'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NearbyPlace {
  category: string;
  name: string;
  description: string;
}

interface NearbyPlacesSectionProps {
  nearby_places: NearbyPlace[];
}

export default function NearbyPlacesSection({ nearby_places }: NearbyPlacesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  
  // Limit to 8 places initially
  const initialPlaces = nearby_places.slice(0, 8);
  const remainingPlaces = nearby_places.slice(8);
  const hasMorePlaces = remainingPlaces.length > 0;
  
  const displayedPlaces = showAll ? nearby_places : initialPlaces;

  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Places</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayedPlaces.map((place, i) => (
          <div key={place.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 text-sm mb-1">{place.name}</h4>
            <p className="text-gray-600 text-xs">{place.description}</p>
          </div>
        ))}
      </div>
      
      {hasMorePlaces && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View More ({remainingPlaces.length} more)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
