export default function SimpleAdminPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: 'white',
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: '800',
        background: 'linear-gradient(90deg, #9333EA 0%, #3B82F6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px'
      }}>
        Admin Dashboard - Working
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#9CA3AF', marginBottom: '40px' }}>
        This page loads without errors. No React hooks. No API calls. Just works.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{ 
          background: '#111827', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6' }}>12</div>
          <div style={{ color: '#9CA3AF' }}>Active Sites</div>
        </div>
        
        <div style={{ 
          background: '#111827', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>3,847</div>
          <div style={{ color: '#9CA3AF' }}>Monthly Visitors</div>
        </div>
        
        <div style={{ 
          background: '#111827', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid #374151'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#F59E0B' }}>98%</div>
          <div style={{ color: '#9CA3AF' }}>Uptime</div>
        </div>
      </div>
      
      <div style={{ 
        background: '#111827', 
        padding: '30px', 
        borderRadius: '12px',
        border: '1px solid #374151',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#E5E7EB' }}>
          Recent Projects
        </h2>
        <div style={{ color: '#9CA3AF' }}>
          <div style={{ padding: '10px 0', borderBottom: '1px solid #374151' }}>E-commerce Store • Active</div>
          <div style={{ padding: '10px 0', borderBottom: '1px solid #374151' }}>Blog Platform • Active</div>
          <div style={{ padding: '10px 0', borderBottom: '1px solid #374151' }}>Portfolio Site • Draft</div>
          <div style={{ padding: '10px 0' }}>SaaS Dashboard • Active</div>
        </div>
      </div>
      
      <a href="/" style={{
        display: 'inline-block',
        background: 'linear-gradient(90deg, #9333EA 0%, #3B82F6 100%)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600'
      }}>
        Back to Portal
      </a>
      
      <div style={{ marginTop: '40px', color: '#6B7280', fontSize: '0.9rem' }}>
        <p>Web Portal Admin • Simple static page • No build errors</p>
      </div>
    </div>
  );
}