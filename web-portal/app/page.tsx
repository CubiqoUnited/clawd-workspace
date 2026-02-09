export default function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CubiQo Web Portal - Visual Website Builder</title>
        <meta name="description" content="No-code website builder platform. Design, deploy, and manage websites with SEO and analytics." />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000; 
            color: white;
            line-height: 1.6;
          }
          .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
          
          /* Header */
          header {
            padding: 24px 0;
            border-bottom: 1px solid #333;
            position: sticky;
            top: 0;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            z-index: 100;
          }
          .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(90deg, #9333EA 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          /* Hero */
          .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            padding: 80px 0;
            background: radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          }
          .hero-content {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
          }
          .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 24px;
            background: linear-gradient(90deg, #9333EA 0%, #3B82F6 50%, #06B6D4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .hero p {
            font-size: 1.5rem;
            color: #9CA3AF;
            margin-bottom: 48px;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(90deg, #9333EA 0%, #3B82F6 100%);
            color: white;
            padding: 16px 40px;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            text-decoration: none;
            transition: transform 0.3s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          
          /* Features */
          .section {
            padding: 100px 0;
            border-bottom: 1px solid #333;
          }
          .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 60px;
            color: #E5E7EB;
          }
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }
          .feature-card {
            background: #111827;
            border-radius: 16px;
            padding: 32px;
            border: 1px solid #374151;
            transition: transform 0.3s;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            border-color: #9333EA;
          }
          .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #06B6D4;
          }
          .feature-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: #E5E7EB;
          }
          
          /* Footer */
          footer {
            padding: 60px 0;
            text-align: center;
            color: #9CA3AF;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .hero p { font-size: 1.2rem; }
            .section-title { font-size: 2rem; }
            .features-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </head>
      <body>
        {/* Header */}
        <header>
          <div className="container">
            <div className="logo">CubiQo Web Portal</div>
          </div>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>Visual Website Builder Platform</h1>
              <p>Like modularapp.preview.emergentagent.com, but for websites. Drag-and-drop design, SEO automation, analytics, and one-click deployment.</p>
              <a href="/admin" className="cta-button">Launch Dashboard</a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="section">
          <div className="container">
            <h2 className="section-title">Complete Website Management Platform</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3 className="feature-title">Visual Designer</h3>
                <p>Drag-and-drop interface with live preview. No coding required.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3 className="feature-title">One-Click Deployment</h3>
                <p>Deploy to Vercel, Netlify, GitHub Pages, or custom domains.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3 className="feature-title">SEO Automation</h3>
                <p>Automatic meta tags, sitemaps, Open Graph, and optimization.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3 className="feature-title">Analytics Dashboard</h3>
                <p>Google Analytics integration with custom dashboards and reports.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3 className="feature-title">A/B Testing</h3>
                <p>Test designs and content variations with statistical analysis.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3 className="feature-title">Growth Tools</h3>
                <p>Email marketing, social media integration, and user feedback.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container" style={{textAlign: 'center'}}>
            <h2 className="section-title">Ready to Build Your Next Website?</h2>
            <p style={{fontSize: '1.2rem', color: '#9CA3AF', maxWidth: '600px', margin: '0 auto 40px'}}>
              Start with our free plan. No credit card required. Build, deploy, and grow websites without code.
            </p>
            <a href="/signup" className="cta-button" style={{background: 'linear-gradient(90deg, #10B981, #3B82F6)'}}>
              Get Started Free
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <p style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', color: 'white'}}>CubiQo Web Portal</p>
            <p>Visual website builder platform • Inspired by modularapp.preview.emergentagent.com</p>
            <p style={{marginTop: '20px', fontSize: '0.9rem', color: '#6B7280'}}>
              © 2026 CubiQo • Static HTML version • No authentication issues
            </p>
          </div>
        </footer>

        <script dangerouslySetInnerHTML={{
          __html: `
            console.log('CubiQo Web Portal - Landing Page Loaded');
            console.log('Dashboard available at /admin');
          `
        }} />
      </body>
    </html>
  );
}