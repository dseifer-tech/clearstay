// lib/img.ts
export const proxify = (raw?: string, hotel?: string) => {
  if (!raw) return '';
  // If already our proxy or a local asset, just return it
  if (raw.startsWith('/api/hotel-images') || raw.startsWith('/')) return raw;

  // If someone passed a proxied URL by mistake, unwrap it
  try {
    const u = new URL(raw, 'https://dummy.invalid');
    if (u.pathname === '/api/hotel-images' && u.searchParams.get('url')) {
      raw = u.searchParams.get('url')!;
    }
  } catch {} // ignore parse errors

  return `/api/hotel-images?url=${encodeURIComponent(raw)}&hotel=${encodeURIComponent(hotel ?? '')}`;
};
