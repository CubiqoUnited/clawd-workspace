'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import CubeGrid from './CubeGrid';
import CharacterCard from './CharacterCard';

const characters = [
  {
    name: 'Cubiqo Worlds',
    tagline: 'The Mind That Connects All Worlds',
    icon: 'gradient-cube',
    color: 'from-cubiqo-purple to-cubiqo-blue',
  },
  {
    name: 'Dicey',
    tagline: "Don't be Dicey, Get Dicey",
    icon: 'dark-cube',
    color: 'from-gray-800 to-gray-900',
  },
  {
    name: 'Headlines',
    tagline: 'Stay Informed',
    icon: 'news-cube',
    color: 'from-cubiqo-blue to-cubiqo-cyan',
  },
  {
    name: 'Coz Everyone',
    tagline: 'Deserves a Break',
    icon: 'smile-cube',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Vocspad',
    tagline: 'Voice & Sound',
    icon: 'waveform-cube',
    color: 'from-cubiqo-cyan to-teal-500',
  },
  {
    name: 'Settings',
    tagline: 'Your World. Your Rules.',
    icon: 'settings-cube',
    color: 'from-gray-700 to-gray-800',
  },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with cube grid animation */}
      <div className="absolute inset-0 z-0">
        <CubeGrid />
      </div>

      {/* Tech grid overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan bg-clip-text text-transparent">
              CUBIQO WORLDS
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-light">
            Meet the faces that power your universe.
          </p>
        </motion.div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {characters.map((character, index) => (
            <CharacterCard key={character.name} {...character} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-3 px-8 py-4 text-xl font-semibold bg-gradient-to-r from-cubiqo-purple to-cubiqo-blue hover:from-cubiqo-blue hover:to-cubiqo-cyan rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cubiqo-purple/50 transform hover:scale-105"
          >
            Get Free Access
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-30" />
    </section>
  );
}
