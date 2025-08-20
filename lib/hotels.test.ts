import { HOTEL_SLUG_MAP, SLUG_TO_TOKEN, TORONTO_HOTELS, buildBookingUrl } from './hotels';

describe('Hotel Data', () => {
  describe('HOTEL_SLUG_MAP', () => {
    test('contains all expected hotels', () => {
      expect(HOTEL_SLUG_MAP).toHaveProperty('ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ');
      expect(HOTEL_SLUG_MAP).toHaveProperty('ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ');
      expect(Object.keys(HOTEL_SLUG_MAP)).toHaveLength(8);
    });

    test('maps tokens to correct slugs', () => {
      expect(HOTEL_SLUG_MAP['ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ']).toBe('pantages-hotel-downtown-toronto');
      expect(HOTEL_SLUG_MAP['ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ']).toBe('town-inn-suites');
    });
  });

  describe('SLUG_TO_TOKEN', () => {
    test('is inverse of HOTEL_SLUG_MAP', () => {
      expect(SLUG_TO_TOKEN['pantages-hotel-downtown-toronto']).toBe('ChUIuuHw2tTc5roDGgkvbS8wOGw0bHIQAQ');
      expect(SLUG_TO_TOKEN['town-inn-suites']).toBe('ChgI-qf9yYXimbHBARoLL2cvMXRoeDAxemoQAQ');
    });

    test('has same number of entries as HOTEL_SLUG_MAP', () => {
      expect(Object.keys(SLUG_TO_TOKEN)).toHaveLength(Object.keys(HOTEL_SLUG_MAP).length);
    });
  });

  describe('TORONTO_HOTELS', () => {
    test('contains all 8 hotels', () => {
      expect(TORONTO_HOTELS).toHaveLength(8);
    });

    test('each hotel has required properties', () => {
      TORONTO_HOTELS.forEach(hotel => {
        expect(hotel).toHaveProperty('name');
        expect(hotel).toHaveProperty('token');
        expect(hotel).toHaveProperty('booking_url');
        expect(hotel).toHaveProperty('rating');
        expect(hotel).toHaveProperty('address');
        expect(hotel).toHaveProperty('amenities');
        expect(hotel).toHaveProperty('image_url');
      });
    });

    test('hotel names are unique', () => {
      const names = TORONTO_HOTELS.map(hotel => hotel.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    test('hotel tokens are unique', () => {
      const tokens = TORONTO_HOTELS.map(hotel => hotel.token);
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(tokens.length);
    });

    test('ratings are within valid range', () => {
      TORONTO_HOTELS.forEach(hotel => {
        expect(hotel.rating).toBeGreaterThanOrEqual(0);
        expect(hotel.rating).toBeLessThanOrEqual(5);
      });
    });

    test('amenities are arrays', () => {
      TORONTO_HOTELS.forEach(hotel => {
        expect(Array.isArray(hotel.amenities)).toBe(true);
        expect(hotel.amenities.length).toBeGreaterThan(0);
      });
    });
  });
});

describe('buildBookingUrl', () => {
  const mockHotel = TORONTO_HOTELS[0]; // Pantages Hotel

  test('replaces all placeholders correctly', () => {
    const searchParams = {
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      adults: 2,
      children: 1
    };

    const result = buildBookingUrl(mockHotel, searchParams);

    expect(result).toContain('DateIn=2024-12-01');
    expect(result).toContain('DateOut=2024-12-03');
    expect(result).toContain('Adults=2');
    expect(result).toContain('Children=1');
    expect(result).not.toContain('{checkin}');
    expect(result).not.toContain('{checkout}');
    expect(result).not.toContain('{adults}');
    expect(result).not.toContain('{children}');
  });

  test('handles zero children', () => {
    const searchParams = {
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      adults: 2,
      children: 0
    };

    const result = buildBookingUrl(mockHotel, searchParams);
    expect(result).toContain('Children=0');
  });

  test('handles single adult', () => {
    const searchParams = {
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      adults: 1,
      children: 0
    };

    const result = buildBookingUrl(mockHotel, searchParams);
    expect(result).toContain('Adults=1');
  });

  test('works with different date formats', () => {
    const searchParams = {
      checkIn: '2024/12/01',
      checkOut: '2024/12/03',
      adults: 2,
      children: 0
    };

    const result = buildBookingUrl(mockHotel, searchParams);
    expect(result).toContain('DateIn=2024/12/01');
    expect(result).toContain('DateOut=2024/12/03');
  });

  test('handles hotel with dash format placeholders', () => {
    const omniHotel = TORONTO_HOTELS.find(h => h.name === 'The Omni King Edward Hotel')!;
    const searchParams = {
      checkIn: '2024-12-01',
      checkOut: '2024-12-03',
      adults: 2,
      children: 1
    };

    const result = buildBookingUrl(omniHotel, searchParams);
    expect(result).toContain('arrival=2024-12-01');
    expect(result).toContain('departure=2024-12-03');
    expect(result).toContain('adults[1]=2');
    expect(result).toContain('children[1]=1');
  });
});
