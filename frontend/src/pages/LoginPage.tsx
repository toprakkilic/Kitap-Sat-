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

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Kitabevi Demo Giriş</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Kullanıcı Adı" onChange={(e) => setUsername(e.target.value)} /><br/>
        <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} /><br/>
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
};

export default LoginPage;