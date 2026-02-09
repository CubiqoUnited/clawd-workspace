'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link href="/cubiqo">
            <h1 className="text-4xl font-bold mb-4 cursor-pointer">
              <span className="bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan bg-clip-text text-transparent">
                CubiQo
              </span>
            </h1>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Get Free Access</h2>
          <p className="text-gray-400">Start your journey to intelligence, reimagined.</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-cubiqo-purple transition-colors text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-cubiqo-purple transition-colors text-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-cubiqo-purple transition-colors text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cubiqo-purple via-cubiqo-blue to-cubiqo-cyan hover:from-cubiqo-cyan hover:via-cubiqo-blue hover:to-cubiqo-purple rounded-lg font-semibold transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-cubiqo-purple/50 transform hover:scale-105"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-cubiqo-blue hover:text-cubiqo-cyan transition-colors">
              Sign in
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our{' '}
          <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </main>
  );
}
