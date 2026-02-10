'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Brain, Mic, Eye, Users, Plug } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Zero data retention. End-to-end encryption. Private mode deployment.',
    gradient: 'from-cubiqo-purple to-purple-600',
  },
  {
    icon: Brain,
    title: 'Multi-Model Intelligence',
    description: 'Claude, OpenAI, specialized models. Intelligent routing per context.',
    gradient: 'from-cubiqo-blue to-blue-600',
  },
  {
    icon: Mic,
    title: 'Voice & Text',
    description: 'Natural speech recognition. Text commands. Seamless switching.',
    gradient: 'from-cubiqo-cyan to-teal-500',
  },
  {
    icon: Eye,
    title: 'Context Aware',
    description: 'Learns preferences locally. Remembers conversations. Anticipates needs.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Shared workspaces. Role-based access. Secure coordination.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Connect existing tools. Extensible platform. Custom workflows.',
    gradient: 'from-cyan-500 to-teal-600',
  },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-cubiqo-purple/10 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 overflow-hidden transition-all duration-300 hover:border-transparent hover:scale-105">
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-[1px]`}>
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Glow effect */}
                  <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
