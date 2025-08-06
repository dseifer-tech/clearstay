import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InnstaStay – Book Direct. No Commissions.',
  description: 'InnstaStay is a commission-free hotel booking platform. Book direct with hotels and save money with real-time rates.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
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