import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Suspense } from 'react'
import PageViewTracker from './components/PageViewTracker'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Compare Direct Hotel Rates in Toronto – InnstaStay Commission-Free Booking',
  description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save with InnstaStay.',
  keywords: 'InnstaStay, Toronto hotels, downtown Toronto hotels, book direct, no commission, transparent hotel prices, direct hotel booking, Toronto accommodation',
  metadataBase: new URL('https://www.innstastay.com'),
  icons: {
    icon: '/browser.png',
    shortcut: '/browser.png',
    apple: '/iPhone.png',
    other: {
      rel: 'icon',
      url: '/Android.png',
      sizes: '192x192',
      type: 'image/png',
    },
  },
  robots: 'index, follow',
  openGraph: {
    title: 'Compare Direct Hotel Rates in Toronto – InnstaStay Commission-Free Booking',
    description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save with InnstaStay.',
    url: 'https://www.innstastay.com',
    siteName: 'InnstaStay',
    images: [
      {
        url: '/innstastay-logo.svg',
        width: 1200,
        height: 630,
        alt: 'InnstaStay - Commission-Free Hotel Booking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare Direct Hotel Rates in Toronto – InnstaStay Commission-Free Booking',
    description: 'Compare real-time direct hotel rates in downtown Toronto. No middlemen, no fees—book direct and save with InnstaStay.',
    images: ['/innstastay-logo.svg'],
  },
}

export const viewport = {
  themeColor: '#1F60C4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
             <head>
         {/* Google Tag Manager */}
         <script dangerouslySetInnerHTML={{
           __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
           })(window,document,'script','dataLayer','GTM-T22LS2CW');`
         }} />
         {/* End Google Tag Manager */}
        
        {/* Preload main font for performance */}
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Standard Favicon */}
        <link rel="icon" href="/browser.png" type="image/png" />
        
        {/* Apple iOS */}
        <link rel="apple-touch-icon" href="/iPhone.png" sizes="180x180" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="InnstaStay" />
        
        {/* Android/Chrome */}
        <link rel="icon" href="/Android.png" sizes="192x192" type="image/png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={inter.className}>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "InnstaStay",
              "url": "https://www.innstastay.com",
              "logo": "https://www.innstastay.com/innstastay-logo.svg",
              "description": "Commission-free hotel booking platform connecting travelers directly with verified hotels in downtown Toronto.",
              "foundingDate": "2024",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Toronto",
                "addressRegion": "ON",
                "addressCountry": "CA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hello@innstastay.com"
              },
              "sameAs": [
                "https://twitter.com/innstastay",
                "https://linkedin.com/company/innstastay"
              ]
            })
          }}
                 />
         {/* Google Tag Manager (noscript) */}
         <noscript dangerouslySetInnerHTML={{
           __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T22LS2CW"
           height="0" width="0" style="display:none;visibility:hidden"></iframe>`
         }} />
         {/* End Google Tag Manager (noscript) */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        {children}
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <img
                  src="/innstastay-logo.svg"
                  alt="InnstaStay Logo"
                  className="h-8 w-auto mr-3"
                />
                <span className="text-sm text-gray-300">Commission-Free Hotel Booking</span>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </a>
                <span className="text-gray-500">© 2024 InnstaStay. All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 