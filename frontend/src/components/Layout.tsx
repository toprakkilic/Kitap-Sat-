// frontend/src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // --- YENİ RENK PALETİ STİLLERİ ---
  const wrapperStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#D3DAD9', // Ana zemin rengi
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#37353E' // Ana metin rengi
  };

  const mainContentStyle = {
    flex: 1,
    maxWidth: '1280px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
    boxSizing: 'border-box' as const
  };

  const footerStyle = {
    textAlign: 'center' as const,
    padding: '40px 20px',
    marginTop: '60px',
    borderTop: '1px solid #44444E', // İkinci ton ile ayırıcı çizgi
    backgroundColor: '#37353E', // Footer'ı koyu antrasit yaparak vurguladık
    color: '#D3DAD9' // Footer metni açık renk
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      
      <main style={mainContentStyle}>
        {children}
      </main>

      <footer style={footerStyle}>
        <p style={{ margin: 0, color: '#D3DAD9', fontSize: '0.9rem', fontWeight: 600 }}>
          © 2026 Kitabevi Yazılım Mühendisliği Ödevi
        </p>
        <div style={{ marginTop: '8px', color: '#D3DAD9', opacity: 0.7, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <span style={{ color: '#715A5A', fontWeight: 800 }}>Golden State</span> Demo — Toprak Lojistik & Yazılım
        </div>
      </footer>
    </div>
  );
};

export default Layout;