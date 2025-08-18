/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', 
      'lh5.googleusercontent.com',
      'maps.googleapis.com', 
      'images.unsplash.com',
      'photos.hotelbeds.com'
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
                                           {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://serpapi.com https://lh3.googleusercontent.com https://maps.googleapis.com https://images.unsplash.com https://www.google-analytics.com https://region1.google-analytics.com; frame-src https://www.googletagmanager.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
            },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 