// frontend/src/pages/UserStore.tsx
import React, { useEffect, useState } from 'react';
import { bookService, orderService } from '../services/api';
import { Book } from '../types';
import BookCard from '../components/BookCard';

const UserStore = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const { data } = await bookService.getAll();
      setBooks(data);
    } catch (error) {
      console.error("Kitaplar yüklenemedi");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleBuy = async (price: number) => {
    try {
      await orderService.placeOrder(price);
      alert("Satın alma işlemi başarılı! Keyifli okumalar.");
    } catch (error) {
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div>
      <header style={{ marginBottom: '30px' }}>
        <h2>Kitap Mağazası</h2>
        <p>Dilediğiniz kitabı seçip anında satın alabilirsiniz.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '25px' }}>
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            actionButton={
              <button 
                onClick={() => handleBuy(book.price)} 
                style={{ marginTop: '10px', width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Hemen Satın Al
              </button>
            }
          />
        ))}
      </div>
      
      {books.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#7f8c8d' }}>
          <h3>Henüz kitap bulunmuyor.</h3>
          <p>Admin panelinden sistemi resetleyerek kitapları yükleyebilirsiniz.</p>
        </div>
      )}
    </div>
  );
};

export default UserStore;