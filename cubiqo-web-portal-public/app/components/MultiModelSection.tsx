'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const principles = [
  'Zero data retention—conversations exist only in transit',
  'Intelligent routing to optimal AI models per context',
  'Abstract understanding through visual semantics',
  'End-to-end encryption on all communications',
];

export default function MultiModelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cubiqo-purple/5 to-black" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-cubiqo-purple/30 shadow-2xl shadow-cubiqo-purple/20">
              <Image
                src="/assets/cubiqo-com/features-multi-model.jpg"
                alt="Multi-Model AI System"
                fill
                className="object-cover"
                priority
              />
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cubiqo-purple/20 via-transparent to-cubiqo-cyan/20" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 bg-cubiqo-purple/20 border border-cubiqo-purple/50 rounded-full text-sm font-semibold text-cubiqo-purple mb-6">
              Built for Privacy
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Multi-Model
              </span>
              <br />
              <span className="bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan bg-clip-text text-transparent">
                AI System
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Cubiqo intelligently routes your requests to the most suitable AI model—whether Claude, OpenAI, or specialized systems—ensuring optimal performance for every task. Your data remains abstract and never stored. Always secure.
            </p>

            {/* Core Principles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Core Principles:</h3>
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-gradient-to-r from-cubiqo-purple to-cubiqo-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
