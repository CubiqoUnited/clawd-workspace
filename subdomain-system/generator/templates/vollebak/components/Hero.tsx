'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-futuristic">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-vollebak-cyan/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vollebak-blue/5 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-vollebak-gray/50 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-vollebak-cyan/20"
          >
            <Sparkles className="w-4 h-4 text-vollebak-cyan" />
            <span className="text-sm font-medium text-vollebak-cyan">Clothes from the Future</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="block">Where Technology</span>
            <span className="block text-gradient">Meets Apparel</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-vollebak-light/70 mb-10 max-w-3xl mx-auto"
          >
            Premium futuristic clothing engineered with cutting-edge materials,
            sustainable technology, and space-age design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-vollebak-cyan to-vollebak-blue text-vollebak-black font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              Explore Collection
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/technology"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-vollebak-cyan/30 text-vollebak-cyan font-bold rounded-lg hover:border-vollebak-cyan hover:bg-vollebak-cyan/10 transition-all duration-300"
            >
              Learn About Technology
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-vollebak-gray/30"
          >
            {[
              { value: '100+', label: 'Materials Tested' },
              { value: '5Y', label: 'Product Lifespan' },
              { value: '0%', label: 'Waste Generated' },
              { value: '∞', label: 'Future Ready' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-vollebak-light/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-vollebak-cyan rounded-full animate-float" />
      <div className="absolute top-20 right-20 w-6 h-6 bg-vollebak-blue rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-vollebak-cyan rounded-full animate-float" style={{ animationDelay: '2s' }} />
    </section>
  )
}

export default Hero