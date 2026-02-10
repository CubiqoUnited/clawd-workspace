import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { DefaultSeo } from 'next-seo'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-commerce Store - Premium Products',
  description: 'Shop premium products with fast shipping and excellent customer service.',
  keywords: ['ecommerce', 'shopping', 'products', 'online store'],
}

const SEO_CONFIG = {
  title: 'E-commerce Store - Premium Products',
  description: 'Shop premium products with fast shipping and excellent customer service.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://store.example.com',
    title: 'E-commerce Store - Premium Products',
    description: 'Shop premium products with fast shipping and excellent customer service.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'E-commerce Store',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <DefaultSeo {...SEO_CONFIG} />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}