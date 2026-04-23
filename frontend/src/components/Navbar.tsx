// frontend/src/components/Navbar.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  // --- KURUMSAL NAVBAR STİLLERİ ---
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#0f172a', // Daha derin, modern bir gece mavisi/siyah
    color: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1000,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const linkStyle = {
    color: '#f1f5f9',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'color 0.2s'
  };

  const logoutButtonStyle = {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    padding: '8px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    transition: 'all 0.2s'
  };

  return (
    <nav style={navStyle}>
      {/* LOGO ALANI */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '1.5rem', backgroundColor: '#3b82f6', padding: '5px', borderRadius: '10px', lineHeight: 1 }}>
          📚
        </div>
        <Link to="/" style={{ ...linkStyle, fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
          Kitabevi <span style={{ color: '#3b82f6' }}>Demo</span>
        </Link>
      </div>
      
      {/* SAĞ TARAF: NAVİGASYON VE PROFİL */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', borderRight: '1px solid #334155', paddingRight: '20px' }}>
          {user.role === 'admin' ? (
            <Link to="/admin" style={linkStyle}>Yönetici Paneli</Link>
          ) : (
            <Link to="/store" style={linkStyle}>Kitap Mağazası</Link>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {user.role}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: '600' }}>
            {user.username}
          </span>
        </div>
        
        <button 
          onClick={handleLogout}
          style={logoutButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = '#ef4444';
          }}
        >
          Çıkış
        </button>
      </div>
    </nav>
  );
};

export default Navbar;