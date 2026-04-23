// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authService.login({ username, password });
      localStorage.setItem('user', JSON.stringify(data));
      
      if (data.role === 'admin') navigate('/admin');
      else navigate('/store');
    } catch (error) {
      alert('Hatalı giriş!');
    }
  };

  // --- KURUMSAL STİL TANIMLARI ---
  const pageContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9', // Hafif gri-mavi zemin
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const loginCardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#2563eb', // Kurumsal mavi
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    transition: 'background-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left' as const,
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '6px',
    marginLeft: '4px'
  };

  return (
    <div style={pageContainerStyle}>
      <div style={loginCardStyle}>
        {/* LOGO ALANI */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: '#2563eb', 
            borderRadius: '16px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '24px',
            marginBottom: '16px',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
          }}>
            📚
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Hoş Geldiniz</h2>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.95rem' }}>Kitabevi Yönetim Sistemi</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '4px' }}>
            <label style={labelStyle}>Kullanıcı Adı</label>
            <input 
              type="text" 
              placeholder="Kullanıcı adınızı girin" 
              onChange={(e) => setUsername(e.target.value)} 
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '4px' }}>
            <label style={labelStyle}>Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setPassword(e.target.value)} 
              style={inputStyle}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            Giriş Yap
          </button>
        </form>

        <p style={{ marginTop: '32px', fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
          Kamyonet Lojistik & Yazılım A.Ş.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;