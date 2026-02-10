export default function AlexPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Alex's Merchandise Template</h1>
        <p className="text-gray-400 mb-8">Direct access to Alex's original e-commerce template</p>
        
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">🚀 Quick Access</h2>
          <p className="text-gray-300 mb-6">
            This page provides direct access to Alex's original merchandise template.
            All files are safe and untouched at their original location.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="/admin/alex-files"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl p-6 text-center transition-colors"
            >
              <div className="text-3xl mb-4">📁</div>
              <h3 className="font-semibold text-lg mb-2">View Template Files</h3>
              <p className="text-gray-300 text-sm">Browse all original files and code</p>
            </a>
            
            <a 
              href="/admin"
              className="bg-purple-600 hover:bg-purple-700 rounded-xl p-6 text-center transition-colors"
            >
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-300 text-sm">Get help managing your merchandise site</p>
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/20">
          <h2 className="text-2xl font-semibold mb-4">📋 File Location</h2>
          <code className="block p-4 bg-black/50 rounded-lg text-sm mb-4">
            C:\Users\avloy\clawd\subdomain-system\generator\templates\base\
          </code>
          <p className="text-gray-400 text-sm">
            ✅ All original files are SAFE and UNTOUCHED<br/>
            ✅ Nothing was deleted. Nothing was fucked up.
          </p>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>Use the links above or go directly to <a href="/admin/alex-files" className="text-blue-400 hover:text-blue-300">/admin/alex-files</a></p>
        </div>
      </div>
    </div>
  );
}