'use client'

import { ShoppingCart, Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Premium T-Shirt',
    price: 29.99,
    rating: 4.5,
    description: 'High-quality cotton t-shirt',
    image: 'https://via.placeholder.com/300x300/3b82f6/FFFFFF?text=T-Shirt',
  },
  {
    id: 2,
    name: 'Classic Hoodie',
    price: 59.99,
    rating: 4.8,
    description: 'Comfortable and warm hoodie',
    image: 'https://via.placeholder.com/300x300/1d4ed8/FFFFFF?text=Hoodie',
  },
  {
    id: 3,
    name: 'Canvas Bag',
    price: 24.99,
    rating: 4.3,
    description: 'Durable canvas tote bag',
    image: 'https://via.placeholder.com/300x300/60a5fa/FFFFFF?text=Bag',
  },
  {
    id: 4,
    name: 'Baseball Cap',
    price: 19.99,
    rating: 4.6,
    description: 'Adjustable baseball cap',
    image: 'https://via.placeholder.com/300x300/2563eb/FFFFFF?text=Cap',
  },
  {
    id: 5,
    name: 'Sticker Pack',
    price: 9.99,
    rating: 4.7,
    description: 'Set of 10 vinyl stickers',
    image: 'https://via.placeholder.com/300x300/93c5fd/000000?text=Stickers',
  },
  {
    id: 6,
    name: 'Phone Case',
    price: 14.99,
    rating: 4.4,
    description: 'Protective phone case',
    image: 'https://via.placeholder.com/300x300/bfdbfe/000000?text=Case',
  },
]

const ProductGrid = () => {
  const [cart, setCart] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCart([...cart, productId])
    // Show notification
    alert('Added to cart!')
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium products with excellent quality and affordable prices.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="card hover:shadow-xl transition-shadow"
            >
              {/* Product image */}
              <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product info */}
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </div>
                  
                  <button
                    onClick={() => addToCart(product.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductGrid