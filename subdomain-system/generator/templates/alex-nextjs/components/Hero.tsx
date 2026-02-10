'use client'

import { ArrowRight, Shield, Truck, RefreshCw } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="text-sm font-semibold text-primary-600">🎯 Premium Quality</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="block">Shop Premium</span>
            <span className="block text-primary-600">Products Online</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-10">
            Discover our collection of high-quality products with fast shipping,
            excellent customer service, and competitive prices.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 font-bold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Browse Categories
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <RefreshCw className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">30-Day Returns</h3>
                <p className="text-sm text-gray-600">Easy return policy</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full opacity-20 -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary-50 rounded-full opacity-30 -z-10" />
    </section>
  )
}

export default Hero