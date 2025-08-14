import { Hotel } from '@/types/hotel';

// Slug-Token mapping for dynamic hotel pages
export const HOTEL_SLUG_MAP: Record<string, string> = {
  "ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ": "pantages-hotel-downtown-toronto",
  "ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ": "town-inn-suites",
  "ChYIu__-9drx1LbWARoJL20vMDhjNGJ2EAE": "one-king-west-hotel-residence",
  "ChYIkv69nuv-zoT7ARoJL20vMDhoeTJrEAE": "the-omni-king-edward-hotel",
  "ChkIqY3kqoyj49-pARoML2cvMWhjMnpocnZ4EAE": "chelsea-hotel-toronto",
  "ChoIhpvZ14Ln1MShARoNL2cvMTFnOW1mbTB3ZhAB": "the-anndore-house-jdv",
  "ChkI6ffjk7GsktVCGg0vZy8xMW5tbF9objJwEAE": "sutton-place-hotel-toronto",
  "ChkI2N-3xo2i371FGg0vZy8xMXJzYzM2X2hmEAE": "ace-hotel-toronto",
};

export const SLUG_TO_TOKEN = Object.fromEntries(
  Object.entries(HOTEL_SLUG_MAP).map(([token, slug]) => [slug, token])
);

export const TORONTO_HOTELS: Hotel[] = [
  {
    name: "Pantages Hotel Downtown Toronto",
    token: "ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ",
    booking_url: "https://bookings.travelclick.com/102298?Adults={adults}&Children={children}&DateIn={checkin}&DateOut={checkout}&domain=pantageshotel.com&identifier=#/accommodation/room",
    rating: 4.2,
    address: "200 Victoria Street, Toronto, ON M5B 1V8",
    amenities: ["Free WiFi", "Restaurant", "Fitness Center", "Business Center"],
    image_url: "https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Pantages+Hotel"
  },
  {
    name: "Town Inn Suites",
    token: "ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ",
    booking_url: "https://bookings.travelclick.com/104140?Adults={adults}&Children={children}&DateIn={checkin}&DateOut={checkout}&domain=towninn.com&identifier=#/accommodation/room",
    rating: 4.0,
    address: "620 Church Street, Toronto, ON M4Y 2G2",
    amenities: ["Free WiFi", "Kitchen", "Free Breakfast", "Pool"],
    image_url: "https://via.placeholder.com/400x300/059669/FFFFFF?text=Town+Inn+Suites"
  },
  {
    name: "One King West Hotel & Residence",
    token: "ChYIu__-9drx1LbWARoJL20vMDhjNGJ2EAE",
    booking_url: "https://bookings.travelclick.com/95964?&DateIn={checkin}&DateOut={checkout}&domain=www.onekingwest.com#/accommodation/room",
    rating: 4.4,
    address: "1 King Street West, Toronto, ON M5H 1A1",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Concierge"],
    image_url: "https://via.placeholder.com/400x300/DC2626/FFFFFF?text=One+King+West"
  },
  {
    name: "The Omni King Edward Hotel",
    token: "ChYIkv69nuv-zoT7ARoJL20vMDhoeTJrEAE",
    booking_url: "https://bookings.omnihotels.com/rates-room1?hotel=110052&arrival={checkin_dash}&departure={checkout_dash}&nights=1&rooms=1&adults[1]={adults}&children[1]={children}&ratePlanCategory=&language=en-us",
    rating: 4.3,
    address: "37 King Street East, Toronto, ON M5C 1E9",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Historic Building"],
    image_url: "https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Omni+King+Edward"
  },
  {
    name: "Chelsea Hotel, Toronto",
    token: "ChkIqY3kqoyj49-pARoML2cvMWhjMnpocnZ4EAE",
    booking_url: "https://reservation.brilliantbylangham.com/?a&adult={adults}&arrive={checkin_dash}&chain=10316&child={children}&config=brilliant&currency=CAD&depart={checkout_dash}&hotel=59052&level=hotel&locale=en-US&productcurrency=CAD&rooms=1&theme=brilliant",
    rating: 4.1,
    address: "33 Gerrard Street West, Toronto, ON M5G 1Z4",
    amenities: ["Free WiFi", "Restaurant", "Pool", "Kids Club"],
    image_url: "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Chelsea+Hotel"
  },
  {
    name: "The Anndore House - JDV by Hyatt",
    token: "ChoIhpvZ14Ln1MShARoNL2cvMTFnOW1mbTB3ZhAB",
    booking_url: "https://www.hyatt.com/shop/rooms/torjd?rooms=1&checkinDate={checkin_dash}&checkoutDate={checkout_dash}",
    rating: 4.2,
    address: "15 Charles Street East, Toronto, ON M4Y 1S1",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Boutique Hotel"],
    image_url: "https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Anndore+House"
  },
  {
    name: "Sutton Place Hotel Toronto",
    token: "ChkI6ffjk7GsktVCGg0vZy8xMW5tbF9objJwEAE",
    booking_url: "https://reservations.suttonplace.com/114627?&adults={adults}&datein={checkin}&dateout={checkout}&domain=www.suttonplace.com&languageid=1&rooms=1#/datesofstay",
    rating: 4.0,
    address: "955 Bay Street, Toronto, ON M5S 2A2",
    amenities: ["Free WiFi", "Restaurant", "Fitness Center", "Downtown Location"],
    image_url: "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Sutton+Place"
  },
  {
    name: "Ace Hotel Toronto",
    token: "ChkI2N-3xo2i371FGg0vZy8xMXJzYzM2X2hmEAE",
    booking_url: "https://reservations.acehotel.com/?adult={adults}&arrive={checkin_dash}&chain=7231&child={children}&currency=CAD&depart={checkout_dash}&dest=ACE&hotel=36680&level=hotel&locale=en-US&productcurrency=CAD&rooms=1",
    rating: 4.3,
    address: "51 Camden Street, Toronto, ON M5V 1V2",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Art Gallery"],
    image_url: "https://via.placeholder.com/400x300/6366F1/FFFFFF?text=Ace+Hotel"
  }
];

export function buildBookingUrl(hotel: Hotel, searchParams: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}): string {
  const { checkIn, checkOut, adults, children } = searchParams;
  const checkin_dash = checkIn.replace("/", "-");
  const checkout_dash = checkOut.replace("/", "-");
  
  return hotel.booking_url
    .replace("{checkin}", checkIn)
    .replace("{checkout}", checkOut)
    .replace("{checkin_dash}", checkin_dash)
    .replace("{checkout_dash}", checkout_dash)
    .replace("{adults}", adults.toString())
    .replace("{children}", children.toString());
} 