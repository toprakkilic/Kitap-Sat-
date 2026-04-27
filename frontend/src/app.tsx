// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // 👈 Yeni eklenen sayfa
import AdminDashboard from './pages/AdminDashboard';
import UserStore from './pages/UserStore';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş ve Kayıt sayfaları Navbar istemediği için Layout dışında */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* 👈 Kayıt rotası */}
        
        {/* Diğer tüm sayfalar Layout (Navbar + Footer) içinde */}
        <Route path="/admin" element={
          <Layout>
            <AdminDashboard />
          </Layout>
        } />
        
        <Route path="/store" element={
          <Layout>
            <UserStore />
          </Layout>
        } />
        
        {/* Varsayılan yönlendirme: Uygulama açıldığında giriş sayfasına atar */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;