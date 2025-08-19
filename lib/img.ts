// Helper function to proxify external URLs for image optimization
export const proxify = (url?: string, hotel?: string) => {
  if (!url) return '';
  if (url.startsWith('/')) return url; // local asset
  return `/api/hotel-images?url=${encodeURIComponent(url)}&hotel=${encodeURIComponent(hotel ?? '')}`;
};
