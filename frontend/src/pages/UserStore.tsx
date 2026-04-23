// frontend/src/pages/UserStore.tsx
import React, { useEffect, useState } from 'react';
import { bookService, orderService } from '../services/api';
import { Book } from '../types';
import BookCard from '../components/BookCard';

const UserStore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  // SEPET ARRAY'İ: Kitapları burada tutacağız
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

  // Sepete Ekleme Fonksiyonu
  const addToCart = (book: Book) => {
    setCart([...cart, book]); // Mevcut sepet array'ine yeni kitabı ekle
  };

  // Sepetten Çıkarma Fonksiyonu
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Sepeti Tamamen Satın Alma (Backend'e toplu gönderim)
  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Sepetiniz boş!");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    try {
      await orderService.placeOrder(total); // Toplam tutarı gönderiyoruz
      alert(`Toplam ₺${total} tutarındaki ${cart.length} adet kitap satın alındı!`);
      setCart([]); // Sepeti temizle
    } catch (error) {
      alert("Satın alma hatası");
    }
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* SOL TARAF: Kitap Listesi */}
      <div style={{ flex: 3 }}>
        <h2>Kitap Mağazası</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
          {books.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              actionButton={
                <button 
                  onClick={() => addToCart(book)} 
                  style={{ marginTop: '10px', width: '100%', padding: '10px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Sepete Ekle
                </button>
              }
            />
          ))}
        </div>
      </div>

      {/* SAĞ TARAF: Sepet Paneli */}
      <div style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #ddd', height: 'fit-content' }}>
        <h3>🛒 Sepetim ({cart.length})</h3>
        {cart.map((item, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            <span style={{ fontSize: '0.9rem' }}>{item.title}</span>
            <div>
               <span style={{ fontWeight: 'bold', marginRight: '10px' }}>₺{item.price}</span>
               <button onClick={() => removeFromCart(index)} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}>x</button>
            </div>
          </div>
        ))}
        <hr />
        <h4>Toplam: ₺{cart.reduce((sum, item) => sum + item.price, 0)}</h4>
        <button 
          onClick={handleCheckout}
          style={{ width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Satın Almayı Tamamla
        </button>
      </div>
    </div>
  );
};

export default UserStore;