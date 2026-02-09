export default function AdminDashboard() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Dashboard - CubiQo Web Portal</title>
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
            background: rgba(0, 0, 0, 0.95);
          }
          .logo {
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(90deg, #9333EA 0%, #3B82F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .nav {
            display: flex;
            gap: 20px;
            margin-top: 10px;
          }
          .nav a {
            color: #9CA3AF;
            text-decoration: none;
            font-size: 0.9rem;
          }
          .nav a:hover {
            color: white;
          }
          
          /* Dashboard */
          .dashboard {
            padding: 40px 0;
          }
          .dashboard-header {
            margin-bottom: 40px;
          }
          .dashboard-header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #E5E7EB;
          }
          .dashboard-header p {
            color: #9CA3AF;
            font-size: 1.1rem;
          }
          
          /* Stats Grid */
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }
          .stat-card {
            background: #111827;
            border-radius: 12px;
            padding: 24px;
            border: 1px solid #374151;
          }
          .stat-value {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
          }
          .stat-label {
            color: #9CA3AF;
            font-size: 0.9rem;
          }
          .stat-1 .stat-value { color: #3B82F6; }
          .stat-2 .stat-value { color: #10B981; }
          .stat-3 .stat-value { color: #F59E0B; }
          .stat-4 .stat-value { color: #9333EA; }
          
          /* Projects */
          .projects {
            background: #111827;
            border-radius: 12px;
            padding: 30px;
            border: 1px solid #374151;
            margin-bottom: 40px;
          }
          .projects h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: #E5E7EB;
          }
          .project-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #374151;
          }
          .project-item:last-child {
            border-bottom: none;
          }
          .project-name {
            font-weight: 500;
            color: #E5E7EB;
          }
          .project-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
          }
          .status-active {
            background: #10B98120;
            color: #10B981;
          }
          .status-draft {
            background: #F59E0B20;
            color: #F59E0B;
          }
          
          /* Actions */
          .actions {
            display: flex;
            gap: 15px;
            margin-bottom: 40px;
          }
          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
          }
          .btn-primary {
            background: linear-gradient(90deg, #9333EA 0%, #3B82F6 100%);
            color: white;
          }
          .btn-secondary {
            background: #1f2937;
            color: white;
            border: 1px solid #374151;
          }
          
          /* Footer */
          footer {
            padding: 40px 0;
            text-align: center;
            color: #6B7280;
            border-top: 1px solid #333;
            font-size: 0.9rem;
          }
          
          /* Responsive */
          @media (max-width: 768px) {
            .stats-grid { grid-template-columns: 1fr; }
            .actions { flex-direction: column; }
            .dashboard-header h1 { font-size: 2rem; }
          }
        `}</style>
      </head>
      <body>
        {/* Header */}
        <header>
          <div className="container">
            <div className="logo">CubiQo Web Portal</div>
            <div className="nav">
              <a href="/">Home</a>
              <a href="/admin" style={{color: 'white'}}>Dashboard</a>
              <a href="/signup">Sign Up</a>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <section className="dashboard">
          <div className="container">
            <div className="dashboard-header">
              <h1>Admin Dashboard</h1>
              <p>Manage your websites, analytics, and deployments</p>
            </div>
            
            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card stat-1">
                <div className="stat-value">12</div>
                <div className="stat-label">Active Sites</div>
              </div>
              <div className="stat-card stat-2">
                <div className="stat-value">3,847</div>
                <div className="stat-label">Monthly Visitors</div>
              </div>
              <div className="stat-card stat-3">
                <div className="stat-value">98%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-card stat-4">
                <div className="stat-value">$2,450</div>
                <div className="stat-label">Monthly Revenue</div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="actions">
              <a href="#" className="btn btn-primary">Create New Site</a>
              <a href="#" className="btn btn-secondary">View Templates</a>
              <a href="#" className="btn btn-secondary">Analytics</a>
            </div>
            
            {/* Projects */}
            <div className="projects">
              <h2>Recent Projects</h2>
              <div className="project-item">
                <div className="project-name">E-commerce Store</div>
                <div className="project-status status-active">Active</div>
              </div>
              <div className="project-item">
                <div className="project-name">Blog Platform</div>
                <div className="project-status status-active">Active</div>
              </div>
              <div className="project-item">
                <div className="project-name">Portfolio Site</div>
                <div className="project-status status-draft">Draft</div>
              </div>
              <div className="project-item">
                <div className="project-name">SaaS Dashboard</div>
                <div className="project-status status-active">Active</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <p>CubiQo Web Portal Admin • Simple static page • No React errors</p>
            <p style={{marginTop: '10px'}}>© 2026 CubiQo • All functionality working</p>
          </div>
        </footer>

        <script>
          console.log('Admin Dashboard - Static HTML Version');
          console.log('No React hooks. No API calls. Just works.');
          
          // Simple interactivity
          document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
              e.preventDefault();
              alert('Button clicked! In a real app, this would create a new site.');
            });
          });
        </script>
      </body>
    </html>
  );
}