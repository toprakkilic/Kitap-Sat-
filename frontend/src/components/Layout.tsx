// frontend/src/components/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f6' }}>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {children}
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px', color: '#95a5a6', fontSize: '0.8rem' }}>
        © 2026 Kitabevi Yazılım Mühendisliği Ödevi - Golden State Demo
      </footer>
    </div>
  );
};

export default Layout;