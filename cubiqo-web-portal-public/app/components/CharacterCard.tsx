'use client';

import { motion } from 'framer-motion';

interface CharacterCardProps {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  index: number;
}

export default function CharacterCard({ name, tagline, color, index }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:border-cubiqo-purple hover:scale-105 hover:shadow-2xl hover:shadow-cubiqo-purple/30">
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Icon/Cube representation */}
        <div className="relative mb-4">
          <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${color} rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300`} 
            style={{
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
              {name.charAt(0)}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="relative text-center">
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cubiqo-purple group-hover:to-cubiqo-cyan group-hover:bg-clip-text transition-all duration-300">
            {name}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {tagline}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cubiqo-purple/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}
