'use client'

import { useState } from 'react'
import { Menu, X, ShoppingCart, Search, User } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount] = useState(3) // Mock data

  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'Technology', href: '/technology' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Stories', href: '/stories' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-vollebak-black/95 backdrop-blur-md border-b border-vollebak-cyan/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-vollebak-cyan to-vollebak-blue rounded-lg flex items-center justify-center">
              <span className="text-vollebak-black font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold text-gradient">VOLLEBACK</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-vollebak-light/80 hover:text-vollebak-cyan transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-vollebak-gray/50 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-vollebak-light/80" />
            </button>
            
            <Link href="/cart" className="relative p-2 hover:bg-vollebak-gray/50 rounded-lg transition-colors">
              <ShoppingCart className="w-5 h-5 text-vollebak-light/80" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vollebak-cyan text-vollebak-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="p-2 hover:bg-vollebak-gray/50 rounded-lg transition-colors">
              <User className="w-5 h-5 text-vollebak-light/80" />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-vollebak-gray/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-vollebak-light" />
              ) : (
                <Menu className="w-6 h-6 text-vollebak-light" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-vollebak-gray pt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-vollebak-light/80 hover:text-vollebak-cyan transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar