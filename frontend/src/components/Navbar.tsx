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

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#2c3e50',
      color: 'white',
      marginBottom: '20px'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>📚 Kitabevi Demo</Link>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user.role === 'admin' ? (
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>Yönetici Paneli</Link>
        ) : (
          <Link to="/store" style={{ color: 'white', textDecoration: 'none' }}>Kitap Mağazası</Link>
        )}
        
        <span style={{ fontSize: '0.9rem', color: '#bdc3c7' }}>
          Hoş geldin, <strong>{user.username}</strong> ({user.role})
        </span>
        
        <button 
          onClick={handleLogout}
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '5px 15px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Çıkış Yap
        </button>
      </div>
    </nav>
  );
};

export default Navbar;