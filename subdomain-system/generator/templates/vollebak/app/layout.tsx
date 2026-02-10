import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { DefaultSeo } from 'next-seo'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vollebak - Clothes from the Future',
  description: 'Premium futuristic apparel with cutting-edge technology and sustainable materials.',
  keywords: ['futuristic clothing', 'tech apparel', 'sustainable fashion', 'premium wear'],
}

const SEO_CONFIG = {
  title: 'Vollebak - Clothes from the Future',
  description: 'Premium futuristic apparel with cutting-edge technology and sustainable materials.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vollebak.com',
    title: 'Vollebak - Clothes from the Future',
    description: 'Premium futuristic apparel with cutting-edge technology and sustainable materials.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vollebak',
      },
    ],
  },
  twitter: {
    handle: '@vollebak',
    site: '@vollebak',
    cardType: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-vollebak-black text-vollebak-light`}>
        <DefaultSeo {...SEO_CONFIG} />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}