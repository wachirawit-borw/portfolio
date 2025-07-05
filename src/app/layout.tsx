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
    url: 'https://zurfrk-portfolio.vercel.app', // กรุณาเปลี่ยนเป็น URL จริงของคุณเมื่อ deploy
    siteName: 'Wachirawit Borwonsuk Portfolio',
    images: [
      {
        url: '/og-image.png', // คุณต้องสร้างและวางไฟล์นี้ในโฟลเดอร์ /public
        width: 1200,
        height: 630,
        alt: 'Wachirawit Borwonsuk Portfolio Website',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // คุณต้องสร้างและวางไฟล์นี้ในโฟลเดอร์ /public
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
