import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnstaStay – Book Direct. Stay Smart.',
  description: 'InnstaStay is a commission-free hotel booking platform. We show real-time direct rates so you can book smarter and hotels can earn more.',
  keywords: 'InnstaStay, direct hotel booking, no commission, Toronto hotels, book direct, real-time rates',
  metadataBase: new URL('https://innstastay.com'),
  icons: {
    icon: '/innstastay-logo.svg',
    shortcut: '/innstastay-logo.svg',
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 