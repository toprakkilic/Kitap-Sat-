// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { adminService, bookService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, RevenueData } from '../types';
import BookCard from '../components/BookCard';

const AdminDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reports, setReports] = useState<RevenueData[]>([]);
  
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    price: 0, 
    coverImage: '' 
  });

  const loadAllData = async () => {
    try {
      const [booksRes, reportsRes] = await Promise.all([
        bookService.getAll(),
        adminService.getMonthlyReports()
      ]);
      setBooks(booksRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      console.error("Veri yükleme hatası:", error);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Sistemi temizleyip Golden State (Satışa Hazır) durumuna döndürmek istiyor musunuz?")) {
      await adminService.resetSystem();
      alert("Sistem başarıyla sıfırlandı ve demo verileri yüklendi!");
      loadAllData();
    }
  };

  // --- YENİ EKLENEN FONKSİYON ---
  const handleBulkSeed = async () => {
    if (window.confirm("Sisteme 100 adet rastgele kitap eklenecek. Onaylıyor musunuz?")) {
      try {
        await adminService.seedBulkData();
        alert("100 kitap başarıyla oluşturuldu!");
        loadAllData();
      } catch (error) {
        alert("Toplu kitap ekleme sırasında bir hata oluştu.");
      }
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || newBook.price <= 0) {
      alert("Lütfen tüm alanları geçerli şekilde doldurun!");
      return;
    }

    try {
      await bookService.create(newBook);
      setNewBook({ title: '', author: '', price: 0, coverImage: '' }); 
      alert("Kitap başarıyla eklendi!");
      loadAllData(); 
    } catch (error) {
      alert("Kitap eklenirken bir hata oluştu.");
    }
  };

  useEffect(() => { loadAllData(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Yönetici Dashboard</h2>
        
        {/* BUTONLARIN OLDUĞU KISIM GÜNCELLENDİ */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleBulkSeed} 
            style={{ backgroundColor: '#f39c12', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            100 Rastgele Kitap Üret
          </button>
          
          <button 
            onClick={handleReset} 
            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Admin Reset (Golden State)
          </button>
        </div>
      </div>

      <section style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h3>Aylık Satış Raporu (Revenue)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={reports}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#3498db" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ marginTop: 0 }}>Yeni Kitap Ekle</h3>
        <form onSubmit={handleAddBook} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '5px' }}>Kitap Adı</label>
            <input 
              type="text" 
              value={newBook.title}
              onChange={e => setNewBook({...newBook, title: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="Örn: Nutuk"
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '5px' }}>Yazar</label>
            <input 
              type="text" 
              value={newBook.author}
              onChange={e => setNewBook({...newBook, author: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="Örn: M. Kemal Atatürk"
            />
          </div>
          
          <div style={{ flex: '1 1 250px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '5px' }}>Kapak Fotoğrafı URL</label>
            <input 
              type="text" 
              value={newBook.coverImage}
              onChange={e => setNewBook({...newBook, coverImage: e.target.value})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="https://resim-linki.com/kapak.jpg"
            />
          </div>

          <div style={{ flex: '0 1 100px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '5px' }}>Fiyat (TL)</label>
            <input 
              type="number" 
              value={newBook.price || ''}
              onChange={e => setNewBook({...newBook, price: Number(e.target.value)})}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder="0"
            />
          </div>
          <button 
            type="submit" 
            style={{ padding: '10px 25px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '38px' }}
          >
            Ekle
          </button>
        </form>
      </section>

      <h3>Envanter Yönetimi</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            actionButton={
              <button 
                onClick={async () => { if(window.confirm("Silinsin mi?")) { await bookService.delete(book.id); loadAllData(); } }}
                style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Sistemden Kaldır
              </button>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;