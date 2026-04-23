// frontend/src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // --- KURUMSAL LAYOUT STİLLERİ ---
  const wrapperStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#f8fafc', // Daha modern ve ferah bir slate tonu
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  const mainContentStyle = {
    flex: 1, // İçerik az olsa bile footer'ı en alta iter
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
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#ffffff'
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      
      <main style={mainContentStyle}>
        {/* Sayfa içeriklerinin geldiği yer */}
        {children}
      </main>

      <footer style={footerStyle}>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
          © 2026 Kitabevi Yazılım Mühendisliği Ödevi
        </p>
        <div style={{ marginTop: '8px', color: '#94a3b8', fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <span style={{ color: '#3b82f6', fontWeight: 800 }}>Golden State</span> Demo — Kamyonet Lojistik & Yazılım
        </div>
      </footer>
    </div>
  );
};

export default Layout;