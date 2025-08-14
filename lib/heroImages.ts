// Hero image paths and fallbacks
export const HERO_IMAGES = {
  // Main pages
  homepage: '/hero/homepage.jpg',
  about: '/hero/about.jpg',
  search: '/hero/search.jpg',
  'toronto-downtown': '/hero/toronto-downtown.jpg',
  
  // Hotel pages
  'pantages-hotel-downtown-toronto': '/hero/pantages-hotel-downtown-toronto.jpg',
  'town-inn-suites': '/hero/town-inn-suites.jpg',
  'one-king-west-hotel-residence': '/hero/one-king-west-hotel-residence.jpg',
  'the-omni-king-edward-hotel': '/hero/the-omni-king-edward-hotel.jpg',
  'chelsea-hotel-toronto': '/hero/chelsea-hotel-toronto.jpg',
  'the-anndore-house-jdv': '/hero/the-anndore-house-jdv.jpg',
  'sutton-place-hotel-toronto': '/hero/sutton-place-hotel-toronto.jpg',
  'ace-hotel-toronto': '/hero/ace-hotel-toronto.jpg',
} as const;

// Fallback images for when specific hero images aren't available
export const FALLBACK_IMAGES = {
  hotel: '/hero/hotel-fallback.jpg',
  page: '/hero/page-fallback.jpg',
} as const;

/**
 * Get hero image path for a given slug
 * @param slug - Page or hotel slug
 * @returns Hero image path or fallback
 */
export function getHeroImage(slug: string): string {
  return HERO_IMAGES[slug as keyof typeof HERO_IMAGES] || FALLBACK_IMAGES.page;
}

/**
 * Get hero image for hotel pages
 * @param hotelSlug - Hotel slug
 * @returns Hotel-specific hero image or fallback
 */
export function getHotelHeroImage(hotelSlug: string): string {
  return HERO_IMAGES[hotelSlug as keyof typeof HERO_IMAGES] || FALLBACK_IMAGES.hotel;
}

/**
 * Get alt text for hero images
 * @param slug - Page or hotel slug
 * @returns Descriptive alt text
 */
export function getHeroAltText(slug: string): string {
  const altTexts: Record<string, string> = {
    homepage: 'Toronto skyline with modern hotels - Commission-free booking with InnstaStay',
    about: 'InnstaStay team working on commission-free hotel booking platform',
    search: 'Hotel search and comparison interface - Find the best direct rates',
    'toronto-downtown': 'Downtown Toronto skyline with CN Tower - Premium hotel locations',
    'pantages-hotel-downtown-toronto': 'Pantages Hotel Downtown Toronto - Art deco luxury in the heart of the city',
    'town-inn-suites': 'Town Inn Suites - Modern boutique accommodation in downtown Toronto',
    'one-king-west-hotel-residence': 'One King West Hotel & Residence - Historic luxury in Toronto\'s financial district',
    'the-omni-king-edward-hotel': 'The Omni King Edward Hotel - Classic elegance in downtown Toronto',
    'chelsea-hotel-toronto': 'Chelsea Hotel Toronto - Family-friendly accommodation with amenities',
    'the-anndore-house-jdv': 'The Anndore House - JDV by Hyatt - Boutique hotel with character',
    'sutton-place-hotel-toronto': 'Sutton Place Hotel Toronto - Upscale comfort in the heart of the city',
    'ace-hotel-toronto': 'Ace Hotel Toronto - Contemporary design and artistic atmosphere',
  };
  
  return altTexts[slug] || 'InnstaStay - Commission-free hotel booking in Toronto';
}
