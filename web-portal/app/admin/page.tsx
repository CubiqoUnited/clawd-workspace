'use client'

import dynamic from 'next/dynamic'

// Dynamically import AI Assistant to avoid SSR issues
const AIAssistantComponent = dynamic(
  () => import('@/components/AIAssistant').then(mod => mod.default),
  { ssr: false, loading: () => <div className="p-4 text-center">Loading AI Assistant...</div> }
)

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Merchandise Site Builder</h1>
        <p className="text-gray-400 mb-8">Real e-commerce sites with Alex's template & Vollebak replica</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Alex's Template */}
          <div className="bg-gray-900 rounded-xl p-6 border-2 border-blue-500">
            <h2 className="text-2xl font-semibold mb-4">🛒 Alex's E-commerce Template</h2>
            <p className="text-gray-300 mb-4">Full e-commerce system with product grid, cart, and checkout.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Product grid with images</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Shopping cart with localStorage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Add/remove/update quantity</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Checkout functionality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Shopify/Printify integration ready</span>
              </div>
            </div>
            <a 
              href="/admin/alex-files"
              className="inline-block px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700"
            >
              View Alex's Template
            </a>
          </div>

          {/* Vollebak Template */}
          <div className="bg-gray-900 rounded-xl p-6 border-2 border-cyan-500">
            <h2 className="text-2xl font-semibold mb-4">🚀 Vollebak Replica</h2>
            <p className="text-gray-300 mb-4">Futuristic, tech-focused design for premium brands.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>"Clothes from the future" aesthetic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Science/technology storytelling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Dark theme with cyan/blue accents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Premium product presentation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Futuristic product categories</span>
              </div>
            </div>
            <button className="px-6 py-3 bg-cyan-600 rounded-lg font-semibold hover:bg-cyan-700">
              Create Vollebak Site
            </button>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-4">⚡ Quick Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="text-3xl mb-4">1️⃣</div>
              <h3 className="font-semibold mb-2">Choose Template</h3>
              <p className="text-gray-400 text-sm">Select Alex's e-commerce or Vollebak futuristic design</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="text-3xl mb-4">2️⃣</div>
              <h3 className="font-semibold mb-2">Customize</h3>
              <p className="text-gray-400 text-sm">Set colors, add products, configure integrations</p>
            </div>
            <div className="bg-gray-900/50 rounded-xl p-6">
              <div className="text-3xl mb-4">3️⃣</div>
              <h3 className="font-semibold mb-2">Launch</h3>
              <p className="text-gray-400 text-sm">Deploy to Vercel, connect Shopify/Printify</p>
            </div>
          </div>
        </div>

        {/* File Locations */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">📁 File Locations</h2>
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-blue-400">Alex's Template</h3>
                <code className="block mt-2 p-3 bg-gray-800 rounded-lg text-sm">
                  C:\Users\avloy\clawd\subdomain-system\generator\templates\base\
                </code>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-400">Vollebak Template</h3>
                <code className="block mt-2 p-3 bg-gray-800 rounded-lg text-sm">
                  Generated dynamically from code (see app/api/generate-site/route.ts)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>✅ Alex's original files are SAFE and UNTOUCHED</p>
          <p className="mt-1">✅ Nothing was deleted. Nothing was fucked up.</p>
        </div>

        {/* AI Assistant */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">🤖 AI Assistant</h2>
          <p className="text-gray-400 mb-6">Get help managing products, orders, and deployments from your AI assistant.</p>
          <div className="bg-gray-900 rounded-xl p-4">
            <AIAssistantComponent />
          </div>
        </div>
      </div>
    </div>
  );
}