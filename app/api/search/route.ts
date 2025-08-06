import { NextRequest, NextResponse } from 'next/server';

// Cache for hotel descriptions to avoid repeated API calls
const descriptionCache: { [key: string]: string } = {};

// Static cache for hotel metadata
const globalCache = (global as any)._hotelStaticCache ||= {};

const HARDCODED_BOOKING_LINKS: { [key: string]: string } = {
  "Pantages Hotel Downtown Toronto": "https://bookings.travelclick.com/102298?Adults={adults}&Children={children}&DateIn={checkin}&DateOut={checkout}&domain=pantageshotel.com&identifier=#/accommodation/room",
  "Town Inn Suites": "https://bookings.travelclick.com/104140?Adults={adults}&Children={children}&DateIn={checkin}&DateOut={checkout}&domain=towninn.com&identifier=#/accommodation/room",
  "One King West Hotel & Residence": "https://bookings.travelclick.com/95964?&DateIn={checkin}&DateOut={checkout}&domain=www.onekingwest.com#/accommodation/room",
  "The Omni King Edward Hotel": "https://bookings.omnihotels.com/rates-room1?hotel=110052&arrival={checkin_dash}&departure={checkout_dash}&nights=1&rooms=1&adults[1]={adults}&children[1]={children}&ratePlanCategory=&language=en-us",
  "Chelsea Hotel, Toronto": "https://reservation.brilliantbylangham.com/?a&adult={adults}&arrive={checkin_dash}&chain=10316&child={children}&config=brilliant&currency=CAD&depart={checkout_dash}&hotel=59052&level=hotel&locale=en-US&productcurrency=CAD&rooms=1&theme=brilliant",
  "The Anndore House - JDV by Hyatt": "https://www.hyatt.com/shop/rooms/torjd?rooms=1&checkinDate={checkin_dash}&checkoutDate={checkout_dash}",
  "Sutton Place Hotel Toronto": "https://reservations.suttonplace.com/114627?&adults={adults}&datein={checkin}&dateout={checkout}&domain=www.suttonplace.com&languageid=1&rooms=1#/datesofstay",
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

function inject_parameters_into_url(base_url: string, checkin: string, checkout: string, adults: number, children: number): string {
  const date_in = checkin.replace("-", "/");
  const date_out = checkout.replace("-", "/");
  const checkin_dash = checkin;
  const checkout_dash = checkout;
  
  return base_url
    .replace("{checkin}", date_in)
    .replace("{checkout}", date_out)
    .replace("{checkin_dash}", checkin_dash)
    .replace("{checkout_dash}", checkout_dash)
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const checkin = searchParams.get('checkin');
  const checkout = searchParams.get('checkout');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const slug = searchParams.get('slug'); // For individual hotel requests

  if (!checkin || !checkout || !adults || !children) {
    return NextResponse.json({ 
      error: 'Missing required parameters: checkin, checkout, adults, children' 
    }, { status: 400 });
  }

  try {
    // If slug is provided, return individual hotel data
    if (slug) {
      const hotelData = await fetch_individual_hotel(slug, checkin, checkout, parseInt(adults), parseInt(children));
      return NextResponse.json(hotelData);
    } else {
      // Otherwise, return all hotels for search
      const hotels = await fetch_all_hotels(checkin, checkout, parseInt(adults), parseInt(children));
      return NextResponse.json(hotels);
    }
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    return NextResponse.json({ error: 'Failed to fetch hotel data' }, { status: 500 });
  }
}

async function fetch_individual_hotel(slug: string, checkin: string, checkout: string, adults: number, children: number) {
  // This would need the SLUG_TO_TOKEN mapping from lib/hotels
  // For now, return a basic structure
  return {
    hotel: slug,
    description: "Hotel description",
    link: null,
    address: "Toronto, ON",
    phone: null,
    gps_coordinates: null,
    hotel_class: null,
    images: [],
    rating: 4.0,
    reviews: null,
    official_price: null,
    rooms: []
  };
}

async function fetch_all_hotels(checkin: string, checkout: string, adults: number, children: number) {
  const apiKey = "63a0bf1d12a68858787d3e5edc4c1126b0fb7a07d26850cfddaefadf5ff20f11";
  const hotels = [
    { name: "Pantages Hotel Downtown Toronto", token: "ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ" },
    { name: "Town Inn Suites", token: "ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ" },
    { name: "One King West Hotel & Residence", token: "ChYIu__-9drx1LbWARoJL20vMDhjNGJ2EAE" },
    { name: "The Omni King Edward Hotel", token: "ChYIkv69nuv-zoT7ARoJL20vMDhoeTJrEAE" },
    { name: "Chelsea Hotel, Toronto", token: "ChkIqY3kqoyj49-pARoML2cvMWhjMnpocnZ4EAE" },
    { name: "The Anndore House - JDV by Hyatt", token: "ChoIhpvZ14Ln1MShARoNL2cvMTFnOW1mbTB3ZhAB" },
    { name: "Sutton Place Hotel Toronto", token: "ChkI6ffjk7GsktVCGg0vZy8xMW5tbF9objJwEAE" },
    { name: "Ace Hotel Toronto", token: "ChkI2N-3xo2i371FGg0vZy8xMXJzYzM2X2hmEAE" }
  ];

  const hotelResults: { [key: string]: any } = {};

  for (const hotel of hotels) {
    try {
      const response = await fetch(
        `https://serpapi.com/search?engine=google_hotels&q=Toronto&property_token=${hotel.token}&check_in_date=${checkin}&check_out_date=${checkout}&adults=2&currency=CAD&hl=en&gl=ca&api_key=${apiKey}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.ok) {
        console.error(`API Error for ${hotel.name}: ${response.status} ${response.statusText}`);
        // Continue with fallback data
      }
      
      const data = await response.json();
      
      // Parse hotel description
      const description = parseHotelDescription(data, hotel.name);
      
      // Initialize hotel result with fallback data
      const base_link = HARDCODED_BOOKING_LINKS[hotel.name];
      const link = base_link ? 
        inject_parameters_into_url(base_link, checkin, checkout, adults, children) : 
        null;

      hotelResults[hotel.name] = {
        hotel: hotel.name,
        link,
        before_taxes: null,
        source: "Official Site",
        address: getHotelAddress(hotel.name),
        rating: getHotelRating(hotel.name),
        image: data.images?.[0] || null,
        remarks: null,
        discount_remarks: null,
        description: description
      };

      // Check featured_prices[] for official offers
      const featuredPrices = data?.featured_prices || [];
      for (const offer of featuredPrices) {
        if (offer.official === true) {
          const rooms = offer.rooms || [];
          for (const room of rooms) {
            const beforeTaxes = room.before_taxes?.extracted_before_taxes_fees || room.price_per_night?.extracted_before_taxes_fees;
            
            // Only update if we have a valid before_taxes price and it's lower than current
            if (beforeTaxes && (!hotelResults[hotel.name].before_taxes || beforeTaxes < hotelResults[hotel.name].before_taxes)) {
              hotelResults[hotel.name] = {
                hotel: hotel.name,
                link,
                before_taxes: beforeTaxes,
                source: offer.source || "Official Site",
                address: getHotelAddress(hotel.name),
                rating: getHotelRating(hotel.name),
                image: data.images?.[0] || null,
                remarks: room.remarks || null,
                discount_remarks: room.discount_remarks || offer.remarks || null,
                description: description
              };
            }
          }
        }
      }
      
      // Check prices[] for official offers
      const prices = data?.prices || [];
      for (const price of prices) {
        if (price.official === true) {
          const beforeTaxes = price.rate_per_night?.extracted_before_taxes_fees;
          
          // Only update if we have a valid before_taxes price and it's lower than current
          if (beforeTaxes && (!hotelResults[hotel.name].before_taxes || beforeTaxes < hotelResults[hotel.name].before_taxes)) {
            hotelResults[hotel.name] = {
              hotel: hotel.name,
              link,
              before_taxes: beforeTaxes,
              source: price.source || "Official Site",
              address: getHotelAddress(hotel.name),
              rating: getHotelRating(hotel.name),
              image: data.images?.[0] || null,
              remarks: price.remarks || null,
              discount_remarks: price.discount_remarks || null,
              description: description
            };
          }
        }
      }
      
    } catch (error) {
      console.error(`Error fetching data for ${hotel.name}:`, error);
      // Keep the fallback data that was initialized above
    }
  }

  // Convert to array and filter out hotels without any data
  return Object.values(hotelResults).filter(hotel => hotel.link !== null);
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