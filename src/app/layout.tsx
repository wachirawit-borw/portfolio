import './globals.css'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ZURFRK | Wachirawit Borwonsuk',
  description: 'Personal portfolio of Wachirawit Borwonsuk, a Fullstack Web Developer.',
  keywords: ['Wachirawit Borwonsuk', 'fullstack developer', 'Next.js', 'React', 'portfolio', 'web development', 'ZURFRK'],
  openGraph: {
    title: 'ZURFRK | Wachirawit Borwonsuk',
    description: 'Explore the portfolio of Wachirawit Borwonsuk, showcasing fullstack projects, skills, and professional experience.',
    url: 'https://zurfrk.vercel.app',
    siteName: 'Wachirawit Borwonsuk Portfolio',
    images: [
      {
        url: '/pictures/og-image.webp',
        width: 1200,
        height: 524,
        alt: 'Wachirawit Borwonsuk Portfolio Website',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/pictures/favicon.ico',
    shortcut: '/pictures/favicon.ico',
    apple: '/pictures/favicon.ico',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
