import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnstaStay | Direct Hotel Rates in Downtown Toronto',
  description: 'Compare real-time hotel prices in downtown Toronto. InnstaStay connects you to trusted hotels with no commission, no markups — just direct rates.',
  keywords: 'InnstaStay, Toronto hotels, downtown Toronto hotels, book direct, no commission, transparent hotel prices',
  metadataBase: new URL('https://innstastay.com'),
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
  robots: 'index, follow'
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
        {/* Standard Favicon */}
        <link rel="icon" href="/browser.png" type="image/png" />
        
        {/* Apple iOS */}
        <link rel="apple-touch-icon" href="/iPhone.png" sizes="180x180" />
        
        {/* Android/Chrome */}
        <link rel="icon" href="/Android.png" sizes="192x192" type="image/png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 