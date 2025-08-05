export interface HotelOffer {
  id: string;
  room_name: string;
  rate_name: string;
  price: number;
  currency: string;
  cancellation_policy?: string;
  amenities?: string[];
  is_official: boolean;
}

export interface Hotel {
  name: string;
  token: string;
  booking_url: string;
  image_url?: string;
  rating?: number;
  address?: string;
  amenities?: string[];
  offers?: HotelOffer[];
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

export interface BookingUrlParams {
  DateIn: string;
  DateOut: string;
  Adults: number;
  Children: number;
} 