// frontend/src/pages/UserStore.tsx
import React, { useEffect, useState } from 'react';
import { bookService, orderService } from '../services/api';
import { Book } from '../types';
import BookCard from '../components/BookCard';

const UserStore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const { data } = await bookService.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Kitaplar yüklenemedi");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const addToCart = (book: Book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Sepetiniz boş!");
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      await orderService.placeOrder(total);
      alert(`Toplam ₺${total} tutarındaki ${cart.length} adet kitap satın alındı!`);
      setCart([]);
    } catch (error) {
      alert("Satın alma hatası");
    }
  };

  // --- YENİ RENK PALETİ STİLLERİ ---
  const storeContainerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    gap: '32px',
    fontFamily: 'sans-serif',
    backgroundColor: '#D3DAD9', // Ana Zemin
    minHeight: '100vh'
  };

  const cartPanelStyle = {
    flex: '0 0 350px',
    backgroundColor: '#37353E', // Koyu Kart Tonu
    color: '#D3DAD9',
    padding: '24px',
    borderRadius: '24px',
    border: '1px solid #44444E',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '90px', // Navbar yüksekliğine göre ayarlandı
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
  };

  const addToCartButtonStyle = {
    marginTop: '12px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#715A5A', // Vurgu Rengi
    color: '#D3DAD9',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  };

  const checkoutButtonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#715A5A',
    color: '#D3DAD9',
    border: 'none',
    borderRadius: '14px',
    fontWeight: '800',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'all 0.2s',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  };

  return (
    <div style={storeContainerStyle}>
      {/* SOL TARAF: Kitap Listesi */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#37353E', margin: 0, letterSpacing: '-0.025em' }}>
            Kitap <span style={{ color: '#715A5A' }}>Mağazası</span>
          </h2>
          <p style={{ color: '#44444E', marginTop: '8px', fontWeight: 600 }}>Toprak ile kapınıza gelecek yeni dünyalar.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '32px' }}>
          {books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              actionButton={
                <button 
                  onClick={() => addToCart(book)} 
                  style={addToCartButtonStyle}
                  onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.2)'}
                  onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
                >
                  Sepete Ekle
                </button>
              }
            />
          ))}
        </div>
      </div>

      {/* SAĞ TARAF: Sepet Paneli */}
      <div style={cartPanelStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #44444E', paddingBottom: '20px' }}>
          <span style={{ fontSize: '1.5rem', backgroundColor: '#44444E', padding: '8px', borderRadius: '12px' }}>🛒</span>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>Sipariş Özeti</h3>
          <span style={{ backgroundColor: '#715A5A', color: '#D3DAD9', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800, marginLeft: 'auto' }}>
            {cart.length} ÜRÜN
          </span>
        </div>

        <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '20px', paddingRight: '8px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ color: '#D3DAD9', opacity: 0.5, fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                Sevkiyat listesi boş.
              </p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '12px', borderRadius: '12px', backgroundColor: '#44444E', border: '1px solid rgba(113, 90, 90, 0.3)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D3DAD9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                  <span style={{ fontSize: '0.8rem', color: '#715A5A', fontWeight: 700 }}>₺{item.price}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(index)} 
                  style={{ border: 'none', background: 'transparent', color: '#715A5A', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '1px solid #44444E', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ color: '#D3DAD9', opacity: 0.6, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Toplam Ödenecek</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <span style={{ fontSize: '2rem', fontWeight: 900, color: '#D3DAD9' }}>
               ₺{cart.reduce((sum, item) => sum + item.price, 0)}
             </span>
          </div>
          
          <button 
            onClick={handleCheckout}
            style={cart.length === 0 ? { ...checkoutButtonStyle, backgroundColor: '#44444E', color: '#37353E', cursor: 'not-allowed', boxShadow: 'none' } : checkoutButtonStyle}
            disabled={cart.length === 0}
            onMouseOver={(e) => !cart.length ? null : e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => !cart.length ? null : e.currentTarget.style.transform = 'scale(1)'}
          >
            Satın Almayı Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStore;