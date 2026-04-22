// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserStore from './pages/UserStore';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login sayfası Navbar istemediği için Layout dışında tutulabilir */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Diğer tüm sayfalar Layout içinde */}
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
        
        {/* Varsayılan yönlendirme */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;