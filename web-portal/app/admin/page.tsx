export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your web portal projects and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-blue-500 mb-2">12</div>
            <div className="text-gray-400">Active Sites</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-green-500 mb-2">3,847</div>
            <div className="text-gray-400">Monthly Visitors</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-yellow-500 mb-2">98%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl font-bold text-purple-500 mb-2">$2,450</div>
            <div className="text-gray-400">Monthly Revenue</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:opacity-90 transition">
            Create New Site
          </button>
          <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold border border-gray-700 hover:bg-gray-700 transition">
            View Templates
          </button>
          <button className="px-6 py-3 bg-gray-800 rounded-lg font-semibold border border-gray-700 hover:bg-gray-700 transition">
            Analytics
          </button>
        </div>

        {/* Projects */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <div className="font-medium">E-commerce Store</div>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <div className="font-medium">Blog Platform</div>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-800">
              <div className="font-medium">Portfolio Site</div>
              <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-sm">Draft</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <div className="font-medium">SaaS Dashboard</div>
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">Active</span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8">
          <a href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Portal
          </a>
        </div>
      </div>
    </div>
  );
}