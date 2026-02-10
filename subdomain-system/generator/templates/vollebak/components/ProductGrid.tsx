'use client'

import { ShoppingCart, Star, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'Quantum Jacket',
    category: 'Outerwear',
    price: 499,
    rating: 4.9,
    description: 'Self-heating nanotechnology with adaptive insulation',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
    features: ['Self-heating', 'Waterproof', 'GPS Embedded'],
    tags: ['Bestseller', 'New'],
  },
  {
    id: 2,
    name: 'Solar Hoodie',
    category: 'Activewear',
    price: 299,
    rating: 4.8,
    description: 'Solar-powered charging with built-in battery pack',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w-800&auto=format&fit=crop',
    features: ['Solar Charging', 'USB Port', 'Moisture Wicking'],
    tags: ['Sustainable'],
  },
  {
    id: 3,
    name: 'Gravity Pants',
    category: 'Bottoms',
    price: 349,
    rating: 4.7,
    description: 'Variable resistance training with smart fabric technology',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop',
    features: ['Resistance Training', 'Smart Sensors', 'Compression Fit'],
    tags: ['Tech'],
  },
  {
    id: 4,
    name: 'Nebula Tee',
    category: 'Basics',
    price: 129,
    rating: 4.6,
    description: 'Phase-changing material that adapts to body temperature',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop',
    features: ['Temperature Adaptive', 'Odor Resistant', 'UV Protection'],
    tags: ['Essential'],
  },
  {
    id: 5,
    name: 'Orion Backpack',
    category: 'Accessories',
    price: 399,
    rating: 4.9,
    description: 'Anti-gravity suspension with emergency beacon',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop',
    features: ['Anti-Gravity', 'Emergency Beacon', 'Solar Panel'],
    tags: ['Bestseller'],
  },
  {
    id: 6,
    name: 'Aurora Gloves',
    category: 'Accessories',
    price: 199,
    rating: 4.5,
    description: 'Haptic feedback and touchscreen compatibility',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop',
    features: ['Haptic Feedback', 'Touchscreen', 'Heated'],
    tags: ['New', 'Tech'],
  },
]

const ProductGrid = () => {
  return (
    <section className="py-20 bg-vollebak-dark">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 mb-4"
          >
            <Zap className="w-5 h-5 text-vollebak-cyan" />
            <span className="text-vollebak-cyan font-semibold">FUTURE TECH</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="block">Engineered for</span>
            <span className="text-gradient">Tomorrow's World</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-vollebak-light/70 max-w-3xl mx-auto"
          >
            Each product is designed with cutting-edge technology and sustainable materials,
            tested in extreme conditions for maximum performance.
          </motion.p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-vollebak-gray rounded-2xl overflow-hidden border border-vollebak-cyan/10 card-hover"
            >
              {/* Product image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-bold rounded-full bg-vollebak-black/80 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm text-vollebak-cyan font-medium">
                      {product.category}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{product.name}</h3>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                </div>

                <p className="text-vollebak-light/70 mb-4">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-vollebak-black/50 border border-vollebak-cyan/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gradient">
                      ${product.price}
                    </div>
                    <div className="text-sm text-vollebak-light/50">
                      Free shipping worldwide
                    </div>
                  </div>
                  
                  <button className="flex items-center space-x-2 px-6 py-3 bg-vollebak-cyan text-vollebak-black font-bold rounded-lg hover:bg-vollebak-cyan/90 transition-colors group/btn">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 border-2 border-vollebak-cyan/30 text-vollebak-cyan font-bold rounded-lg hover:border-vollebak-cyan hover:bg-vollebak-cyan/10 transition-all duration-300">
            View All Products
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductGrid