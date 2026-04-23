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

  // --- KURUMSAL STİL OBJELERİ ---
  const storeContainerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '40px 20px',
    display: 'flex',
    gap: '32px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  };

  const cartPanelStyle = {
    flex: '0 0 350px',
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid #e2e8f0',
    height: 'fit-content',
    position: 'sticky' as const,
    top: '20px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
  };

  const addToCartButtonStyle = {
    marginTop: '12px',
    width: '100%',
    padding: '12px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
  };

  const checkoutButtonStyle = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '20px',
    boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.3)'
  };

  return (
    <div style={storeContainerStyle}>
      {/* SOL TARAF: Kitap Listesi */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Kitap Mağazası</h2>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Yeni dünyaları keşfetmek için koleksiyonumuza göz atın.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '28px' }}>
          {books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              actionButton={
                <button 
                  onClick={() => addToCart(book)} 
                  style={addToCartButtonStyle}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '16px' }}>
          <span style={{ fontSize: '1.5rem' }}>🛒</span>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>Sepetim</h3>
          <span style={{ backgroundColor: '#2563eb', color: 'white', padding: '2px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>
            {cart.length}
          </span>
        </div>

        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', paddingRight: '4px' }}>
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic', padding: '20px 0' }}>
              Sepetiniz şu an boş.
            </p>
          ) : (
            cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '8px', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{item.title}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>₺{item.price}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(index)} 
                  style={{ border: 'none', background: '#fee2e2', color: '#ef4444', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#64748b', fontWeight: 600 }}>Genel Toplam</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              ₺{cart.reduce((sum, item) => sum + item.price, 0)}
            </span>
          </div>
          
          <button 
            onClick={handleCheckout}
            style={cart.length === 0 ? { ...checkoutButtonStyle, backgroundColor: '#cbd5e1', boxShadow: 'none', cursor: 'not-allowed' } : checkoutButtonStyle}
            disabled={cart.length === 0}
          >
            Satın Almayı Tamamla
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStore;