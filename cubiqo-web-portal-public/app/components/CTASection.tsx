'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cubiqo-purple/10 to-black" />
      
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Ready to Experience
            </span>
            <br />
            <span className="bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan bg-clip-text text-transparent">
              Intelligence, Reimagined?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Start with free access. No credit card required.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <a
              href="/signup"
              className="group inline-flex items-center gap-4 px-12 py-6 text-2xl font-bold bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan hover:from-cubiqo-cyan hover:via-cubiqo-blue hover:to-cubiqo-purple rounded-full transition-all duration-500 shadow-2xl hover:shadow-cubiqo-purple/50 transform hover:scale-105 relative overflow-hidden"
            >
              {/* Animated glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan blur-xl opacity-50"
              />
              
              <span className="relative">Get Free Access</span>
              <svg 
                className="relative w-8 h-8 group-hover:translate-x-2 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 text-lg"
          >
            Trusted by individuals and teams who demand more.
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-cubiqo-purple rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cubiqo-cyan rounded-full opacity-20 blur-3xl" />
    </section>
  );
}
