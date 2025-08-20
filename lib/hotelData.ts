import { SLUG_TO_TOKEN } from '@/lib/hotels';

// Cache for hotel descriptions to avoid repeated API calls
const descriptionCache: { [key: string]: string } = {};

// Static cache for hotel metadata
const globalCache = (global as any)._hotelStaticCache ||= {};

// Environment validation
import { validateEnv } from '@/lib/env';

// Timeout wrapper for API requests
async function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 9000): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    // For fetch requests, we'll pass the signal in the actual fetch call
    return await promise;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Helper function to format date as MM/DD/YYYY
function formatDateToMMDDYYYY(dateString: string): string {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

const HARDCODED_BOOKING_LINKS: { [key: string]: string } = {
  "Pantages Hotel Downtown Toronto": "https://reservations.travelclick.com/102298?&adults={adults}&children={children}&rooms=1&datein={datein_mmddyyyy}&dateout={dateout_mmddyyyy}",
  "Town Inn Suites": "https://www.towninn.com/book/accommodations?adults={adults}&children={children}&datein={datein_mmddyyyy}&dateout={dateout_mmddyyyy}&rooms=1",
  "One King West Hotel & Residence": "https://reservations.travelclick.com/95964?&adults={adults}&children={children}&rooms=1&datein={datein_mmddyyyy}&dateout={dateout_mmddyyyy}",
  "The Omni King Edward Hotel": "https://bookings.omnihotels.com/rates-room1?hotel=110052&arrival={checkin_dash}&departure={checkout_dash}&nights=1&rooms=1&adults[1]={adults}&children[1]={children}&ratePlanCategory=&language=en-us",
  "Chelsea Hotel, Toronto": "https://reservation.brilliantbylangham.com/?a&adult={adults}&arrive={checkin_dash}&chain=10316&child={children}&config=brilliant&currency=CAD&depart={checkout_dash}&hotel=59052&level=hotel&locale=en-US&productcurrency=CAD&rooms=1&theme=brilliant",
  "The Anndore House - JDV by Hyatt": "https://www.hyatt.com/shop/rooms/torjd?rooms=1&checkinDate={checkin_dash}&checkoutDate={checkout_dash}",
  "Sutton Place Hotel Toronto": "https://reservations.travelclick.com/114627?&adults={adults}&children={children}&rooms=1&datein={datein_mmddyyyy}&dateout={dateout_mmddyyyy}",
  "Ace Hotel Toronto": "https://reservations.acehotel.com/?adult={adults}&arrive={checkin_dash}&chain=7231&child={children}&currency=CAD&depart={checkout_dash}&dest=ACE&hotel=36680&level=hotel&locale=en-US&productcurrency=CAD&rooms=1"
};

// Pre-populated descriptions for each hotel
const HOTEL_DESCRIPTIONS: { [key: string]: string } = {
  "Pantages Hotel Downtown Toronto": "Located in the heart of downtown Toronto, this boutique hotel offers modern amenities and easy access to major attractions. Perfect for business and leisure travelers.",
  "Town Inn Suites": "Spacious suites with full kitchens, ideal for extended stays. Located in the vibrant Church-Wellesley Village, close to shopping and dining.",
  "One King West Hotel & Residence": "Historic building with modern luxury, featuring stunning city views and premium amenities. Located in the financial district.",
  "The Omni King Edward Hotel": "Toronto's most prestigious hotel, offering classic elegance and world-class service. Historic landmark with modern luxury.",
  "Chelsea Hotel, Toronto": "Family-friendly hotel with indoor pool and rooftop garden. Located in the heart of downtown with easy access to attractions.",
  "The Anndore House - JDV by Hyatt": "Boutique hotel with unique design and local character. Located in the trendy Yorkville neighborhood.",
  "Sutton Place Hotel Toronto": "Upscale hotel with sophisticated amenities and excellent dining options. Perfect for business and leisure travelers.",
  "Ace Hotel Toronto": "Contemporary design hotel with artistic flair and cultural programming. Located in the vibrant Entertainment District."
};

// Hotel name mapping for slugs
const SLUG_TO_HOTEL_NAME: { [key: string]: string } = {
  "pantages-hotel-downtown-toronto": "Pantages Hotel Downtown Toronto",
  "town-inn-suites": "Town Inn Suites",
  "one-king-west-hotel-residence": "One King West Hotel & Residence",
  "the-omni-king-edward-hotel": "The Omni King Edward Hotel",
  "chelsea-hotel-toronto": "Chelsea Hotel, Toronto",
  "the-anndore-house-jdv": "The Anndore House - JDV by Hyatt",
  "sutton-place-hotel-toronto": "Sutton Place Hotel Toronto",
  "ace-hotel-toronto": "Ace Hotel Toronto"
};

// Hotel images using original external URLs with proxy
export const HOTEL_IMAGES: { [key: string]: string } = {
  "Pantages Hotel Downtown Toronto": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipMt1ZolVWnJTgIMqogAUCjh9EldFh8vSDHY5TU=s10000&hotel=Pantages%20Hotel%20Downtown%20Toronto",
  "Town Inn Suites": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipN2HhQs9GSWKldSNWx_1o4EC3ojDlzgG9UVxgV1=s10000&hotel=Town%20Inn%20Suites",
  "One King West Hotel & Residence": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipPI-2hASi1fH2dzw3hOyxjk2UV9CVV9P3sKUYuX=s10000&hotel=One%20King%20West%20Hotel%20%26%20Residence",
  "The Omni King Edward Hotel": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipMvGKOVckX0M2FfmY-77Mt9eykQw6pHyHgmK067=s10000&hotel=The%20Omni%20King%20Edward%20Hotel",
  "Chelsea Hotel, Toronto": "/api/hotel-images?url=https://photos.hotelbeds.com/giata/original/04/049472/049472a_hb_f_004.JPG&hotel=Chelsea%20Hotel%2C%20Toronto",
  "The Anndore House - JDV by Hyatt": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipOh__jl8gimUkhS0FUaJSr1ft0-WORdu7KieteX=s10000&hotel=The%20Anndore%20House%20-%20JDV%20by%20Hyatt",
  "Sutton Place Hotel Toronto": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipPFImvLwmvVatoeTOPO-h4UCI53SGoH1ITu0BbY=s10000&hotel=Sutton%20Place%20Hotel%20Toronto",
  "Ace Hotel Toronto": "/api/hotel-images?url=https://lh5.googleusercontent.com/p/AF1QipNGix9dVAg06s82e08vaUXkAhqFlV2XPyTByWkj=s10000&hotel=Ace%20Hotel%20Toronto"
};

function inject_parameters_into_url(base_url: string, checkin: string, checkout: string, adults: number, children: number): string {
  const date_in = checkin.replace("-", "/");
  const date_out = checkout.replace("-", "/");
  const checkin_dash = checkin;
  const checkout_dash = checkout;
  
  // Format for Sutton Place: YYYY/MM-DD (e.g., 2025/08-26)
  const checkin_slash = checkin.replace("-", "/");
  const checkout_slash = checkout.replace("-", "/");
  
  // Format for Town Inn: MM/DD/YYYY (e.g., 08/25/2025)
  const checkin_mmddyyyy = formatDateToMMDDYYYY(checkin);
  const checkout_mmddyyyy = formatDateToMMDDYYYY(checkout);
  
  return base_url
    .replace("{checkin}", date_in)
    .replace("{checkout}", date_out)
    .replace("{checkin_dash}", checkin_dash)
    .replace("{checkout_dash}", checkout_dash)
    .replace("{checkin_slash}", checkin_slash)
    .replace("{checkout_slash}", checkout_slash)
    .replace("{datein_mmddyyyy}", checkin_mmddyyyy)
    .replace("{dateout_mmddyyyy}", checkout_mmddyyyy)
    .replace("{adults}", adults.toString())
    .replace("{children}", children.toString());
}

function parseHotelDescription(data: any, hotelName: string): string {
  // Check if we have a cached description
  if (descriptionCache[hotelName]) {
    return descriptionCache[hotelName];
  }

  // Try to extract description from various sources in the API response
  let description = "";

  // Check for description in the main hotel data
  if (data.description) {
    description = data.description;
  } else if (data.about && data.about.description) {
    description = data.about.description;
  } else if (data.hotel_info && data.hotel_info.description) {
    description = data.hotel_info.description;
  } else if (data.overview && data.overview.description) {
    description = data.overview.description;
  }

  // If no description found in API, use the pre-populated one
  if (!description || description.trim() === "") {
    description = HOTEL_DESCRIPTIONS[hotelName] || "A comfortable hotel in downtown Toronto with modern amenities and excellent service.";
  }

  // Clean up the description
  description = description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Cache the description for future use
  descriptionCache[hotelName] = description;

  return description;
}

export async function fetch_individual_hotel(slug: string, checkin: string, checkout: string, adults: number, children: number) {
  const token = SLUG_TO_TOKEN[slug];
  if (!token) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const hotelName = SLUG_TO_HOTEL_NAME[slug];
  if (!hotelName) {
    throw new Error(`Hotel not found for slug: ${slug}`);
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SERPAPI_KEY environment variable is required in production');
    }
    return getFallbackHotelData(slug, hotelName, checkin, checkout, adults, children);
  }

  const serpUrl = `https://serpapi.com/search.json?engine=google_hotels&q=Toronto&property_token=${token}&check_in_date=${checkin}&check_out_date=${checkout}&adults=${adults}&children=${children}&currency=CAD&hl=en&gl=ca&api_key=${apiKey}`;

  try {
    const controller = new AbortController();
    const response = await withTimeout(
      fetch(serpUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }),
      9000 // 9 second timeout
    );

    if (!response.ok) {
      console.error(`API Error for ${hotelName}: ${response.status} ${response.statusText}`);
      return getFallbackHotelData(slug, hotelName, checkin, checkout, adults, children);
    }

    const data = await response.json();

    // Extract hotel metadata from the response
    const hotelMetadata = data.hotel_info || data.hotel || {};
    const hotelImages = data.images || [];
    const hotelRating = data.rating || data.hotel_class || getHotelRating(hotelName);
    const hotelDescription = data.description || data.about?.description || HOTEL_DESCRIPTIONS[hotelName];

    // Cache static hotel metadata per property_token
    if (!globalCache[token]) {
      globalCache[token] = {
        hotel: hotelMetadata.name || hotelName,
        description: hotelDescription || HOTEL_DESCRIPTIONS[hotelName],
        link: hotelMetadata.link || "",
        address: hotelMetadata.address || getHotelAddress(hotelName),
        phone: hotelMetadata.phone || "",
        gps_coordinates: hotelMetadata.gps_coordinates || null,
        hotel_class: hotelMetadata.hotel_class || hotelRating,
        images: hotelImages.map((img: any) => {
          const directUrl = img.original_image || img;
          if (typeof directUrl === 'string') {
            return `/api/hotel-images?url=${encodeURIComponent(directUrl)}&hotel=${encodeURIComponent(hotelName)}`;
          }
          return directUrl;
        }),
        rating: hotelRating,
        reviews: data.reviews || null,
        nearby_places: data.nearby_places || [],
      };
    }

    const metadata = globalCache[token];

    // Always use hardcoded booking links for consistency and reliability
    const base_link = HARDCODED_BOOKING_LINKS[hotelName];
    const hardcoded_link = base_link ? 
      inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
      null;

    // Grab pricing information from API for display purposes only
    const featuredPrices = data.featured_prices || [];
    const prices = data.prices || [];

    const directFeatured = featuredPrices.find((p: any) => p.official);
    const directFallback = prices.find((p: any) => p.official && p.rate_per_night?.extracted_before_taxes_fees);

    const selectedOffer = directFeatured || directFallback;

    let official_price = null;
    let rooms: any[] = [];

    if (selectedOffer) {
      official_price = {
        source: selectedOffer.source,
        rate_per_night: selectedOffer.rate_per_night?.extracted_before_taxes_fees || null,
        total_rate: selectedOffer.total_rate?.extracted_before_taxes_fees || null,
        link: hardcoded_link, // Always use hardcoded link
        free_cancellation: selectedOffer.free_cancellation || false,
        free_cancellation_until_date: selectedOffer.free_cancellation_until_date || null,
        remarks: selectedOffer.remarks || [],
        discount_remarks: selectedOffer.discount_remarks || [],
      };

      if (selectedOffer.rooms?.length > 0) {
        rooms = selectedOffer.rooms
          .filter((room: any) => {
            // Filter out generic room names that don't provide useful information
            const genericNames = [
              'Flexible Rate', 
              'Standard Rate', 
              'Basic Rate',
              'Advance Purchase',
              '15% Off Advance Purchase',
              'Flexible',
              'Standard',
              'Basic',
              'Rate',
              'Room',
              'Guest Room',
              'Standard Room',
              'Basic Room'
            ];
            
            // Also filter out rooms without images and with generic names
            const hasImages = room.images && room.images.length > 0;
            const isGenericName = genericNames.some(name => 
              room.name?.toLowerCase() === name.toLowerCase()
            );
            
            // Only filter out exact matches, not partial matches
            return !isGenericName && hasImages;
          })
          .map((room: any) => ({
            name: room.name,
            rate_per_night: room.rate_per_night?.extracted_before_taxes_fees || null,
            total_rate: room.total_rate?.extracted_before_taxes_fees || null,
            images: room.images || [],
            link: hardcoded_link, // Always use hardcoded link for room bookings too
            num_guests: room.num_guests || null,
          }));
      }
    } else if (hardcoded_link) {
      // If no API pricing found, still show the hardcoded booking link
      official_price = {
        source: "Official Site",
        rate_per_night: null,
        total_rate: null,
        link: hardcoded_link,
        free_cancellation: false,
        free_cancellation_until_date: null,
        remarks: [],
        discount_remarks: [],
      };
    }

    return {
      ...metadata,
      official_price,
      rooms
    };

  } catch (error) {
    console.error(`Error fetching data for ${hotelName}:`, error);
    return getFallbackHotelData(slug, hotelName, checkin, checkout, adults, children);
  }
}

function getFallbackHotelData(slug: string, hotelName: string, checkin: string, checkout: string, adults: number, children: number) {
  const base_link = HARDCODED_BOOKING_LINKS[hotelName];
  
  const link = base_link ? 
    inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
    null;

  const result = {
    hotel: hotelName,
    description: HOTEL_DESCRIPTIONS[hotelName] || "A comfortable hotel in downtown Toronto with modern amenities and excellent service.",
    link: link,
    address: getHotelAddress(hotelName),
    phone: null,
    gps_coordinates: null,
    hotel_class: null,
    images: [HOTEL_IMAGES[hotelName]], // Add fallback image to images array
    image: HOTEL_IMAGES[hotelName], // Add direct image property
    rating: getHotelRating(hotelName),
    reviews: null,
    official_price: link ? {
      source: "Official Site",
      rate_per_night: null,
      total_rate: null,
      link: link,
      free_cancellation: false,
      free_cancellation_until_date: null,
      remarks: [],
      discount_remarks: [],
    } : null,
    rooms: []
  };
  
  return result;
}

// Helper function to fetch a single hotel with timeout and error handling
async function fetchSingleHotel(hotel: { name: string; token: string }, checkin: string, checkout: string, adults: number, children: number, apiKey: string) {
  try {
    const controller = new AbortController();
    const serpUrl = `https://serpapi.com/search.json?engine=google_hotels&q=Toronto&property_token=${hotel.token}&check_in_date=${checkin}&check_out_date=${checkout}&adults=${adults}&children=${children}&currency=CAD&hl=en&gl=ca&api_key=${apiKey}`;
    
    const response = await withTimeout(
      fetch(serpUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }),
      8000 // 8 second timeout for parallel requests
    );
    
    if (!response.ok) {
      console.warn(`API Error for ${hotel.name}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
      
    // Parse hotel description
    const description = parseHotelDescription(data, hotel.name);
    
    // Initialize hotel result with fallback data
    const base_link = HARDCODED_BOOKING_LINKS[hotel.name];
    const link = base_link ? 
      inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
      null;

    // Use the same image logic as the slug pages - prioritize API images
    let hotelImage = HOTEL_IMAGES[hotel.name]; // Default to fallback
    
    if (data.images && data.images.length > 0) {
      const firstImage = data.images[0];
      let directImageUrl = null;
      
      if (typeof firstImage === 'string') {
        directImageUrl = firstImage;
      } else if (firstImage && typeof firstImage === 'object') {
        directImageUrl = firstImage.original_image || firstImage.thumbnail || firstImage.url || firstImage.src;
      }
      
      if (directImageUrl) {
        hotelImage = `/api/hotel-images?url=${encodeURIComponent(directImageUrl)}&hotel=${encodeURIComponent(hotel.name)}`;
      }
    }
    
    let hotelResult = {
      hotel: hotel.name,
      link: link,
      before_taxes: null,
      source: "Official Site",
      address: getHotelAddress(hotel.name),
      rating: getHotelRating(hotel.name),
      image: hotelImage,
      remarks: null,
      discount_remarks: null,
      description: description,
      hasDirectRate: false
    };

    // Check featured_prices[] for official offers
    const featuredPrices = data?.featured_prices || [];
    for (const offer of featuredPrices) {
      const isOTA = offer.source && (
        offer.source.toLowerCase().includes('trivago') ||
        offer.source.toLowerCase().includes('booking.com') ||
        offer.source.toLowerCase().includes('expedia') ||
        offer.source.toLowerCase().includes('hotels.com') ||
        offer.source.toLowerCase().includes('orbitz') ||
        offer.source.toLowerCase().includes('priceline') ||
        offer.source.toLowerCase().includes('kayak') ||
        offer.source.toLowerCase().includes('tripadvisor')
      );
      
      if (offer.official === true && !isOTA) {
        const rooms = offer.rooms || [];
        for (const room of rooms) {
          const beforeTaxes = room.rate_per_night?.extracted_before_taxes_fees || room.before_taxes?.extracted_before_taxes_fees || room.price_per_night?.extracted_before_taxes_fees;
          
          if (beforeTaxes && (!hotelResult.before_taxes || beforeTaxes < hotelResult.before_taxes)) {
            hotelResult = {
              ...hotelResult,
              before_taxes: beforeTaxes,
              source: offer.source || "Official Site",
              remarks: room.remarks || null,
              discount_remarks: room.discount_remarks || offer.remarks || null,
              hasDirectRate: true
            };
          }
        }
      }
    }
    
    // Check prices[] for official offers
    const prices = data?.prices || [];
    for (const price of prices) {
      const isOTA = price.source && (
        price.source.toLowerCase().includes('trivago') ||
        price.source.toLowerCase().includes('booking.com') ||
        price.source.toLowerCase().includes('expedia') ||
        price.source.toLowerCase().includes('hotels.com') ||
        price.source.toLowerCase().includes('orbitz') ||
        price.source.toLowerCase().includes('priceline') ||
        price.source.toLowerCase().includes('kayak') ||
        price.source.toLowerCase().includes('tripadvisor')
      );
      
      if (price.official === true && !isOTA) {
        const beforeTaxes = price.rate_per_night?.extracted_before_taxes_fees;
        
        if (beforeTaxes && (!hotelResult.before_taxes || beforeTaxes < hotelResult.before_taxes)) {
          hotelResult = {
            ...hotelResult,
            before_taxes: beforeTaxes,
            source: price.source || "Official Site",
            remarks: price.remarks || null,
            discount_remarks: price.discount_remarks || null,
            hasDirectRate: true
          };
        }
      }
    }
    
    return hotelResult;
    
  } catch (error) {
    console.warn(`Error fetching data for ${hotel.name}:`, error);
    return null; // Return null for failed requests to be filtered out
  }
}

export async function fetch_all_hotels(checkin: string, checkout: string, adults: number, children: number) {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SERPAPI_KEY environment variable is required in production');
    }
    return getFallbackHotelDataForAllHotels(checkin, checkout, adults, children);
  }

  const hotels = [
    { name: "Pantages Hotel Downtown Toronto", token: "ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ" },
    { name: "Town Inn Suites", token: "ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ" },
    { name: "One King West Hotel & Residence", token: "ChYIu__-9drx1LbWARoJL20vMDhjNGJ2EAE" },
    { name: "The Omni King Edward Hotel", token: "ChYIkv69nuv-zoT7ARoJL20vMDhoeTJrEAE" },
    { name: "Chelsea Hotel, Toronto", token: "ChkIqY3kqoyj49-pARoML2cvMWhjMnpocnZ4EAE" },
    { name: "The Anndore House - JDV by Hyatt", token: "ChoIhpvZ14Ln1MShARoNL2cvMTFnOW1mbTB3ZhAB" },
    { name: "Sutton Place Hotel Toronto", token: "ChkI6ffjk7GsktVCGg0vZy8xMW5tbF9vajJwEAE" },
    { name: "Ace Hotel Toronto", token: "ChkI2N-3xo2i371FGg0vZy8xMXJzYzM2X2hmEAE" }
  ];

  // Create tasks for bounded parallel execution
  const tasks = hotels.map(hotel => () => fetchSingleHotel(hotel, checkin, checkout, adults, children, apiKey));
  
  // Bounded concurrency execution
  const concurrency = 6;
  const queue: Promise<any>[] = [];
  const results: any[] = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      results.push(result);
      return result;
    }).catch(() => {
      results.push(null);
      return null;
    });
    
    queue.push(promise);
    
    if (queue.length >= concurrency) {
      await Promise.race(queue);
      // Remove settled promises
      for (let i = queue.length - 1; i >= 0; i--) {
        if (await Promise.race([queue[i].then(() => true, () => true), Promise.resolve(false)])) {
          queue.splice(i, 1);
        }
      }
    }
  }
  
  // Wait for remaining promises
  await Promise.allSettled(queue);
  
  // Filter out null results and add fallback data for failed requests
  const validResults = results.filter(hotel => hotel !== null);
  const failedHotels = hotels.filter((_, index) => results[index] === null);
  
  // Add fallback data for failed hotels
  const fallbackResults = failedHotels.map(hotel => {
    const base_link = HARDCODED_BOOKING_LINKS[hotel.name];
    const link = base_link ? 
      inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
      null;
    
    return {
      hotel: hotel.name,
      link,
      before_taxes: null,
      source: "Official Site",
      address: getHotelAddress(hotel.name),
      rating: getHotelRating(hotel.name),
      image: HOTEL_IMAGES[hotel.name],
      remarks: null,
      discount_remarks: null,
      description: HOTEL_DESCRIPTIONS[hotel.name] || "A comfortable hotel in downtown Toronto with modern amenities and excellent service.",
      hasDirectRate: false
    };
  });
  
  const allResults = [...validResults, ...fallbackResults];
  
  // Sort hotels to prioritize those with direct pricing
  return allResults
    .filter(hotel => hotel.link !== null)
    .sort((a, b) => {
      if (!a || !b) return 0;
      
      const aHasDirectRate = 'hasDirectRate' in a ? a.hasDirectRate : false;
      const bHasDirectRate = 'hasDirectRate' in b ? b.hasDirectRate : false;
      
      if (aHasDirectRate && !bHasDirectRate) return -1;
      if (!aHasDirectRate && bHasDirectRate) return 1;
      
      if (a.before_taxes && !b.before_taxes) return -1;
      if (!a.before_taxes && b.before_taxes) return 1;
      
      if (a.rating && b.rating) {
        return b.rating - a.rating;
      }
      
      return 0;
    });
}

function getHotelAddress(hotelName: string): string {
  const addresses: { [key: string]: string } = {
    "Pantages Hotel Downtown Toronto": "200 Victoria Street, Toronto, ON M5B 1V8",
    "Town Inn Suites": "620 Church Street, Toronto, ON M4Y 2G2",
    "One King West Hotel & Residence": "1 King Street West, Toronto, ON M5H 1A1",
    "The Omni King Edward Hotel": "37 King Street East, Toronto, ON M5C 1E9",
    "Chelsea Hotel, Toronto": "33 Gerrard Street West, Toronto, ON M5G 1Z4",
    "The Anndore House - JDV by Hyatt": "15 Charles Street East, Toronto, ON M4Y 1S1",
    "Sutton Place Hotel Toronto": "955 Bay Street, Toronto, ON M5S 2A2",
    "Ace Hotel Toronto": "51 Camden Street, Toronto, ON M5V 1V2"
  };
  return addresses[hotelName] || "Toronto, ON";
}

function getHotelRating(hotelName: string): number {
  const ratings: { [key: string]: number } = {
    "Pantages Hotel Downtown Toronto": 4.2,
    "Town Inn Suites": 4.0,
    "One King West Hotel & Residence": 4.4,
    "The Omni King Edward Hotel": 4.3,
    "Chelsea Hotel, Toronto": 4.1,
    "The Anndore House - JDV by Hyatt": 4.2,
    "Sutton Place Hotel Toronto": 4.0,
    "Ace Hotel Toronto": 4.3
  };
  return ratings[hotelName] || 4.0;
} 

function getFallbackHotelDataForAllHotels(checkin: string, checkout: string, adults: number, children: number) {
  const hotels = [
    "Pantages Hotel Downtown Toronto",
    "Town Inn Suites", 
    "One King West Hotel & Residence",
    "The Omni King Edward Hotel",
    "Chelsea Hotel, Toronto",
    "The Anndore House - JDV by Hyatt",
    "Sutton Place Hotel Toronto",
    "Ace Hotel Toronto"
  ];

  return hotels.map(hotelName => {
    const base_link = HARDCODED_BOOKING_LINKS[hotelName];
    const link = base_link ? 
      inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
      null;

    return {
      hotel: hotelName,
      link,
      before_taxes: null,
      source: "Official Site",
      address: getHotelAddress(hotelName),
      rating: getHotelRating(hotelName),
      image: HOTEL_IMAGES[hotelName],
      remarks: null,
      discount_remarks: null,
      description: HOTEL_DESCRIPTIONS[hotelName] || "A comfortable hotel in downtown Toronto with modern amenities and excellent service."
    };
  }).filter(hotel => hotel.link !== null);
} 