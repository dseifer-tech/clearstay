import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClearStay - Book Direct. Stay Transparent.',
  description: 'Commission-free hotel booking platform for Toronto. Book directly with hotels, no middleman fees.',
  keywords: 'hotel booking, Toronto hotels, direct booking, no commission, transparent pricing',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
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