'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Shield, Zap, Cloud, Eye, Brain, Mic, Calendar, Plug } from 'lucide-react';

const capabilities = [
  { name: 'BYO Mode', description: 'Your AI, Your Rules' },
  { name: 'Zero Storage Mode', description: 'Conversations exist only in transit' },
  { name: 'Co-Op Wallet', description: 'Shared resources, shared benefits' },
  { name: 'Context Awareness', description: 'Understands your world' },
];

const features = [
  {
    icon: Shield,
    title: 'Zero Data Retention',
    description: 'Conversations exist only in transit. No logs, no behavioral tracking.',
  },
  {
    icon: Zap,
    title: 'End-to-End Encryption',
    description: 'Military-grade security on all communications. Your data remains abstract and never stored.',
  },
  {
    icon: Cloud,
    title: 'Private Mode Deployment',
    description: 'Run on your infrastructure with full control. Bring your own node for complete autonomy.',
  },
  {
    icon: Eye,
    title: 'Team Collaboration',
    description: 'Shared workspaces with role-based access. Coordinate across organizations securely.',
  },
  {
    icon: Brain,
    title: 'Multi-Model Intelligence',
    description: 'Routes requests to optimal AI—Claude for reasoning, OpenAI for creativity, specialized models for domain tasks.',
  },
  {
    icon: Mic,
    title: 'Voice & Text Interface',
    description: 'Natural speech recognition and text I/O. Switch seamlessly between interaction modes.',
  },
  {
    icon: Calendar,
    title: 'Intelligent Scheduling',
    description: 'Email and calendar management with context. Automated booking and coordination.',
  },
  {
    icon: Plug,
    title: 'API Integration',
    description: 'Connect with your existing tools. Extensible platform for custom workflows.',
  },
];

export default function IntelligenceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-cubiqo-blue/5 to-black" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan bg-clip-text text-transparent">
              Intelligence, Reimagined
            </span>
          </h2>
        </motion.div>

        {/* Capabilities Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-cubiqo-blue hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cubiqo-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-2">{capability.name}</h3>
                <p className="text-sm text-gray-400">{capability.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Cooperative Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-br from-cubiqo-purple/20 to-cubiqo-blue/20 border-2 border-cubiqo-purple rounded-2xl">
            <h3 className="text-2xl font-bold text-white">
              The Cooperative V.A. The World Needs
            </h3>
            <div className="px-6 py-3 bg-gradient-to-r from-cubiqo-purple to-cubiqo-blue rounded-full">
              <span className="text-sm font-bold tracking-wider">CERTIFIED CO OP ASSIST</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cubiqo-cyan transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cubiqo-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="relative flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cubiqo-purple to-cubiqo-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cubiqo-cyan transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
