import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const footerLinks = {
    Products: [
      { label: 'Quantum Jacket', href: '/products/quantum-jacket' },
      { label: 'Solar Hoodie', href: '/products/solar-hoodie' },
      { label: 'Gravity Pants', href: '/products/gravity-pants' },
      { label: 'All Products', href: '/products' },
    ],
    Technology: [
      { label: 'Materials', href: '/technology/materials' },
      { label: 'Sustainability', href: '/technology/sustainability' },
      { label: 'Research', href: '/technology/research' },
      { label: 'Innovation', href: '/technology/innovation' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
    Support: [
      { label: 'Help Center', href: '/support' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/vollebak', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/vollebak', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/vollebak', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/vollebak', label: 'YouTube' },
  ]

  return (
    <footer className="bg-vollebak-black border-t border-vollebak-gray">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-vollebak-cyan to-vollebak-blue rounded-lg flex items-center justify-center">
                <span className="text-vollebak-black font-bold text-xl">V</span>
              </div>
              <span className="text-3xl font-bold text-gradient">VOLLEBACK</span>
            </div>
            <p className="text-vollebak-light/70 mb-6 max-w-md">
              Creating clothes for the future with cutting-edge technology,
              sustainable materials, and space-age design.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-vollebak-gray rounded-lg hover:bg-vollebak-cyan/10 hover:text-vollebak-cyan transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-vollebak-cyan" />
                <span className="text-vollebak-light/70">contact@vollebak.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-vollebak-cyan" />
                <span className="text-vollebak-light/70">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-vollebak-cyan" />
                <span className="text-vollebak-light/70">San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-vollebak-light/70 hover:text-vollebak-cyan transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-vollebak-gray my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-vollebak-light/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Vollebak. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/privacy" className="text-vollebak-light/60 hover:text-vollebak-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-vollebak-light/60 hover:text-vollebak-cyan transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-vollebak-light/60 hover:text-vollebak-cyan transition-colors">
              Cookie Policy
            </Link>
            <Link href="/sitemap" className="text-vollebak-light/60 hover:text-vollebak-cyan transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-vollebak-gray">
          {[
            'Sustainable Materials',
            'Carbon Neutral',
            'Ethical Manufacturing',
            '1% for the Planet',
            'Vegan Certified',
          ].map((badge) => (
            <div
              key={badge}
              className="px-4 py-2 bg-vollebak-gray/50 rounded-full text-sm text-vollebak-light/70"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer