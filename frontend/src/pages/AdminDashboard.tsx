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

  // --- PROFESYONEL STİL OBJELERİ ---
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    marginBottom: '32px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#64748b',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.025em'
  };

  const buttonPrimary = {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
  };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.025em' }}>Yönetici Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.95rem' }}>Sistem envanterini ve satış raporlarını buradan yönetebilirsiniz.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleBulkSeed} style={{ ...buttonPrimary, backgroundColor: '#f59e0b', boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)' }}>
            100 Rastgele Kitap Üret
          </button>
          
          <button onClick={handleReset} style={{ ...buttonPrimary, backgroundColor: '#ef4444', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.2)' }}>
            Sistemi Sıfırla
          </button>
        </div>
      </div>

      {/* GRAFİK ANALİZ */}
      <section style={cardStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem', fontWeight: 700 }}>Aylık Satış Analizi</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={reports}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} 
                cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563eb" 
                strokeWidth={4} 
                dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8, strokeWidth: 0 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* YENİ KAYIT FORMU */}
      <section style={cardStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem', fontWeight: 700 }}>Envantere Kitap Ekle</h3>
        <form onSubmit={handleAddBook} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px' }}>
            <label style={labelStyle}>Kitap Adı</label>
            <input 
              type="text" 
              value={newBook.title}
              onChange={e => setNewBook({...newBook, title: e.target.value})}
              style={inputStyle}
              placeholder="Örn: Nutuk"
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={labelStyle}>Yazar</label>
            <input 
              type="text" 
              value={newBook.author}
              onChange={e => setNewBook({...newBook, author: e.target.value})}
              style={inputStyle}
              placeholder="Örn: M. Kemal Atatürk"
            />
          </div>
          
          <div style={{ flex: '1 1 280px' }}>
            <label style={labelStyle}>Kapak Fotoğrafı URL</label>
            <input 
              type="text" 
              value={newBook.coverImage}
              onChange={e => setNewBook({...newBook, coverImage: e.target.value})}
              style={inputStyle}
              placeholder="https://gorsel-linki.com/kapak.jpg"
            />
          </div>

          <div style={{ flex: '0 1 120px' }}>
            <label style={labelStyle}>Birim Fiyat (TL)</label>
            <input 
              type="number" 
              value={newBook.price || ''}
              onChange={e => setNewBook({...newBook, price: Number(e.target.value)})}
              style={inputStyle}
              placeholder="0"
            />
          </div>
          <button type="submit" style={{ ...buttonPrimary, backgroundColor: '#059669', height: '48px', padding: '0 32px', boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.2)' }}>
            Kaydet
          </button>
        </form>
      </section>

      {/* ENVANTER LİSTESİ */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        Envanter Yönetimi 
        <span style={{ fontSize: '0.9rem', backgroundColor: '#e2e8f0', padding: '4px 12px', borderRadius: '20px', color: '#475569' }}>
          {books.length} Kayıt
        </span>
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px' }}>
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            actionButton={
              <button 
                onClick={async () => { if(window.confirm("Bu kayıt kalıcı olarak silinecektir. Devam edilsin mi?")) { await bookService.delete(book.id); loadAllData(); } }}
                style={{ 
                  marginTop: '16px', 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#fff', 
                  color: '#64748b', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
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