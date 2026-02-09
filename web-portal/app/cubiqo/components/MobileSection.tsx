'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Shield, Zap, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy Architecture',
    description: 'No conversation logs. No behavioral tracking. Abstract processing ensures your data never exists in concrete form.',
  },
  {
    icon: Zap,
    title: 'Intelligent Routing',
    description: 'Automatically selects the optimal AI model for each request—Claude for reasoning, OpenAI for creativity, specialized models for domain tasks.',
  },
  {
    icon: Sparkles,
    title: 'Complete Assistant',
    description: 'Voice commands, email management, calendar coordination, document analysis—unified through a single, secure interface.',
  },
];

export default function MobileSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cubiqo-cyan/5 to-black" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Complete
              </span>
              <br />
              <span className="bg-gradient-to-r from-cubiqo-cyan via-cubiqo-blue to-cubiqo-purple bg-clip-text text-transparent">
                Assistant
              </span>
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="group flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cubiqo-cyan to-cubiqo-blue flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cubiqo-cyan/30">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cubiqo-cyan transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Mobile mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Mobile frame */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-gray-800 shadow-2xl shadow-cubiqo-cyan/30">
                <Image
                  src="/assets/cubiqo-com/features-mobile-app.jpg"
                  alt="CubiQo Mobile App"
                  fill
                  className="object-cover"
                />
                {/* Screen glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cubiqo-cyan/20 via-transparent to-cubiqo-purple/20 mix-blend-overlay" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cubiqo-purple to-cubiqo-blue rounded-2xl opacity-60 blur-xl"
              />
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cubiqo-cyan to-cubiqo-blue rounded-2xl opacity-60 blur-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
