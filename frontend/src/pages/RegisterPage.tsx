// frontend/src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Backend servisindeki register metodunu çağırıyoruz
      await authService.register({ username, password });
      alert('Kayıt başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.');
      navigate('/login');
    } catch (error: any) {
      // Backend'den gelen ConflictException (409) hatasını yakalar
      const errorMsg = error.response?.data?.message || 'Kayıt sırasında bir hata oluştu.';
      alert(errorMsg);
    }
  };

  // --- RENK PALETİ STİLLERİ (Login ile tam uyumlu) ---
  const pageContainerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3DAD9',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#37353E',
    padding: '48px',
    borderRadius: '28px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const,
    border: '1px solid #44444E'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '20px',
    borderRadius: '12px',
    border: '1px solid #44444E',
    backgroundColor: '#44444E',
    color: '#D3DAD9',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s'
  };

  const buttonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#715A5A',
    color: '#D3DAD9',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 10px 15px -3px rgba(113, 90, 90, 0.3)',
    transition: 'all 0.2s',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left' as const,
    fontSize: '0.75rem',
    fontWeight: '800',
    color: '#715A5A',
    marginBottom: '8px',
    marginLeft: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.025em'
  };

  return (
    <div style={pageContainerStyle}>
      <div style={cardStyle}>
        {/* LOGO ALANI */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            width: '70px', 
            height: '70px', 
            backgroundColor: '#715A5A', 
            borderRadius: '20px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '28px',
            marginBottom: '20px',
            boxShadow: '0 15px 20px -5px rgba(0, 0, 0, 0.3)'
          }}>
            📚
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#D3DAD9', margin: 0, letterSpacing: '-0.025em' }}>
            Yeni <span style={{ color: '#715A5A' }}>Hesap</span>
          </h2>
          <p style={{ color: '#D3DAD9', opacity: 0.6, marginTop: '12px', fontSize: '0.95rem', fontWeight: 500 }}>
            Toprak Ailesine Katılın
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '4px' }}>
            <label style={labelStyle}>Kullanıcı Adı Belirle</label>
            <input 
              type="text" 
              placeholder="Benzersiz bir kullanıcı adı" 
              required
              onChange={(e) => setUsername(e.target.value)} 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#715A5A'}
              onBlur={(e) => e.target.style.borderColor = '#44444E'}
            />
          </div>

          <div style={{ marginBottom: '4px' }}>
            <label style={labelStyle}>Erişim Şifresi</label>
            <input 
              type="password" 
              placeholder="Güçlü bir şifre seçin" 
              required
              onChange={(e) => setPassword(e.target.value)} 
              style={inputStyle}
              onFocus={(e) => e.target.style.borderColor = '#715A5A'}
              onBlur={(e) => e.target.style.borderColor = '#44444E'}
            />
          </div>

          <button 
            type="submit" 
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
          >
            Kaydı Tamamla
          </button>
        </form>

        {/* GİRİŞE DÖNÜŞ LİNKİ */}
        <p style={{ marginTop: '24px', fontSize: '0.85rem', color: '#D3DAD9' }}>
          Zaten hesabınız var mı?{' '}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#715A5A', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            Giriş Yapın
          </span>
        </p>

        <p style={{ marginTop: '32px', fontSize: '0.75rem', color: '#D3DAD9', opacity: 0.4, fontStyle: 'italic', fontWeight: 600, letterSpacing: '0.1em' }}>
          TOPRAK LOJİSTİK & YAZILIM A.Ş.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;