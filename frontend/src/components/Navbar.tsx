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

  // --- YENİ RENK PALETİ STİLLERİ ---
const navStyle = {
  position: 'fixed' as const, // Sayfaya yapıştırır
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000, // Diğer her şeyin üstünde görünmesi için
  backgroundColor: '#37353E',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '70px', // Navbar yüksekliğini sabitleyelim
  boxSizing: 'border-box' as const,
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
};

  const linkStyle = {
    color: '#D3DAD9',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'opacity 0.2s'
  };

  const logoutButtonStyle = {
    backgroundColor: '#715A5A', // Palet: Vurgu Tonu
    color: '#D3DAD9',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.8rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <nav style={navStyle}>
      {/* LOGO ALANI */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          fontSize: '1.3rem', 
          backgroundColor: '#715A5A', 
          padding: '6px', 
          borderRadius: '8px', 
          lineHeight: 1,
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)' 
        }}>
          📚
        </div>
        <Link to="/" style={{ ...linkStyle, fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.025em' }}>
          Kitabevi <span style={{ color: '#715A5A' }}>Demo</span>
        </Link>
      </div>
      
      {/* SAĞ TARAF: NAVİGASYON VE PROFİL */}
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', borderRight: '1px solid #44444E', paddingRight: '20px' }}>
          {user.role === 'admin' ? (
            <Link to="/admin" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Yönetici Paneli</Link>
          ) : (
            <Link to="/store" style={linkStyle} onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'} onMouseOut={(e) => e.currentTarget.style.opacity = '1'}>Kitap Mağazası</Link>
          )}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.7rem', color: '#715A5A', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {user.role}
          </span>
          <span style={{ fontSize: '0.9rem', color: '#D3DAD9', fontWeight: '600' }}>
            {user.username}
          </span>
        </div>
        
        <button 
          onClick={handleLogout}
          style={logoutButtonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.filter = 'brightness(1.2)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Navbar;