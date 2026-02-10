'use client';

import { useState } from 'react';

export default function RealAdminDashboard() {
  const [step, setStep] = useState(1);
  const [siteName, setSiteName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'alex' | 'vollebak' | null>(null);
  const [theme, setTheme] = useState({
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#3B82F6'
  });
  const [shopifyConfig, setShopifyConfig] = useState({
    storeUrl: '',
    apiKey: ''
  });
  const [printifyConfig, setPrintifyConfig] = useState({
    apiKey: '',
    shopId: ''
  });

  const templates = [
    {
      id: 'alex',
      name: 'Alex\'s E-commerce Template',
      description: 'Modern product grid with cart, Shopify/Printify ready',
      image: 'https://via.placeholder.com/400x250/1F2937/FFFFFF?text=Alex+Template'
    },
    {
      id: 'vollebak',
      name: 'Vollebak Replica',
      description: 'Futuristic, tech-focused design for premium brands',
      image: 'https://via.placeholder.com/400x250/0F172A/FFFFFF?text=Vollebak+Template'
    }
  ];

  const handleCreateSite = async () => {
    // This would call the backend to generate the site
    alert(`Creating site: ${siteName}\nTemplate: ${selectedTemplate}\nTheme: ${JSON.stringify(theme)}`);
    
    // In production, this would:
    // 1. Generate site files
    // 2. Deploy to Vercel/Netlify
    // 3. Set up Shopify/Printify integration
    // 4. Return the live URL
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 1: Choose Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                  onClick={() => setSelectedTemplate(template.id as any)}
                >
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{template.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => selectedTemplate && setStep(2)}
              disabled={!selectedTemplate}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Site Details
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 2: Site Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                  placeholder="My Merch Store"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Theme Colors</label>
                <div className="flex gap-4">
                  <div>
                    <div className="text-xs mb-1">Primary</div>
                    <input
                      type="color"
                      value={theme.primary}
                      onChange={(e) => setTheme({...theme, primary: e.target.value})}
                      className="w-12 h-12 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="text-xs mb-1">Secondary</div>
                    <input
                      type="color"
                      value={theme.secondary}
                      onChange={(e) => setTheme({...theme, secondary: e.target.value})}
                      className="w-12 h-12 cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="text-xs mb-1">Accent</div>
                    <input
                      type="color"
                      value={theme.accent}
                      onChange={(e) => setTheme({...theme, accent: e.target.value})}
                      className="w-12 h-12 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!siteName}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Integrations
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Step 3: Integrations</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Shopify Integration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Store URL</label>
                    <input
                      type="text"
                      value={shopifyConfig.storeUrl}
                      onChange={(e) => setShopifyConfig({...shopifyConfig, storeUrl: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                      placeholder="your-store.myshopify.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <input
                      type="password"
                      value={shopifyConfig.apiKey}
                      onChange={(e) => setShopifyConfig({...shopifyConfig, apiKey: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                      placeholder="shpat_xxxxxxxxxxxxxxxx"
                    />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Printify Integration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <input
                      type="password"
                      value={printifyConfig.apiKey}
                      onChange={(e) => setPrintifyConfig({...printifyConfig, apiKey: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Shop ID</label>
                    <input
                      type="text"
                      value={printifyConfig.shopId}
                      onChange={(e) => setPrintifyConfig({...printifyConfig, shopId: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                      placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-semibold"
              >
                Back
              </button>
              <button
                onClick={handleCreateSite}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold"
              >
                Launch Site
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Merchandise Site Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create real e-commerce sites with Shopify & Printify integration
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-sm font-medium ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              Template
            </div>
            <div className={`text-sm font-medium ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              Details
            </div>
            <div className={`text-sm font-medium ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              Integrations
            </div>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          {renderStep()}
        </div>

        {/* AI Assistant */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-lg font-semibold mb-2">🤖 AI Assembly Assistant</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help setting up? The AI can help you configure your store, choose products, and optimize for sales.
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold">
            Ask AI Assistant
          </button>
        </div>

        {/* Created Sites */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Your Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example site - would be dynamic in production */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">Example Store</h3>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded">
                  Live
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Alex Template • Shopify Connected</p>
              <a href="#" className="text-blue-600 dark:text-blue-400 text-sm">https://example-store.vercel.app</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}