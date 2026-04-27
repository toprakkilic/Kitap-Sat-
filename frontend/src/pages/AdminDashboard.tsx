import React, { useEffect, useState } from 'react';
import { adminService, bookService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, RevenueData } from '../types';
import BookCard from '../components/BookCard';

const AdminDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reports, setReports] = useState<RevenueData[]>([]);
  
  // Düzenleme modunda mıyız? Hangi kitap?
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [newBook, setNewBook] = useState({ 
    title: '', 
    author: '', 
    price: 0, 
    coverImage: '' 
  });

  const calculateTotalRevenue = () => {
    return reports.reduce((acc, curr) => acc + curr.revenue, 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 });
  };

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

  // Düzenleme butonuna basınca çalışır
  const handleEditClick = (book: Book) => {
    setEditingId(book.id);
    setNewBook({
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage || ''
    });
    // Formu görmesi için kullanıcıyı yukarı taşı
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleReset = async () => {
    if (window.confirm("Sistemi temizleyip Golden State durumuna döndürmek istiyor musunuz?")) {
      await adminService.resetSystem();
      alert("Sistem sıfırlandı!");
      loadAllData();
    }
  };

  const handleBulkSeed = async () => {
    if (window.confirm("100 adet kitap eklenecek. Onaylıyor musunuz?")) {
      try {
        await adminService.seedBulkData();
        alert("100 kitap oluşturuldu!");
        loadAllData();
      } catch (error) {
        alert("Hata oluştu.");
      }
    }
  };

  // Form gönderimi (Hem Kaydet hem Güncelle için)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // GÜNCELLEME (PUT)
        await bookService.update(editingId, newBook);
        alert("Kitap güncellendi!");
      } else {
        // YENİ KAYIT (POST)
        await bookService.create(newBook);
        alert("Kitap eklendi!");
      }
      
      // Formu sıfırla
      setEditingId(null);
      setNewBook({ title: '', author: '', price: 0, coverImage: '' }); 
      loadAllData(); 
    } catch (error) {
      alert("İşlem sırasında bir hata oluştu.");
    }
  };

  useEffect(() => {
  loadAllData();

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl + Shift + R
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
      e.preventDefault(); // sayfa refresh olmasın
      handleReset();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // cleanup
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []);

  // --- STİLLER (Aynen Korundu) ---
  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#37353E', backgroundColor: '#D3DAD9', minHeight: '100vh' };
  const cardStyle = { backgroundColor: '#37353E', color: '#D3DAD9', padding: '24px', borderRadius: '16px', marginBottom: '32px', border: '1px solid #44444E', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' };
  const statsCardStyle = { ...cardStyle, display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', background: 'linear-gradient(135deg, #715A5A 0%, #37353E 100%)', border: 'none' };
  const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #44444E', fontSize: '0.95rem', outline: 'none', backgroundColor: '#44444E', color: '#D3DAD9', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#715A5A', marginBottom: '8px', textTransform: 'uppercase' as const };
  const buttonPrimary = { padding: '12px 24px', backgroundColor: '#715A5A', color: '#D3DAD9', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', transition: 'all 0.2s' };
  const resetButtonStyle = { ...buttonPrimary, backgroundColor: 'transparent', border: '1px solid #715A5A', color: '#715A5A' };

  return (
    <div style={containerStyle}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#37353E' }}>Yönetici Dashboard</h2>
          <p style={{ margin: '4px 0 0', color: '#44444E', fontWeight: 500 }}>Sistem envanterini ve satış raporlarını yönetin.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleBulkSeed} style={buttonPrimary}>100 Kitap Üret</button>
          <button onClick={handleReset} style={resetButtonStyle}>Sistemi Sıfırla</button>
        </div>
      </div>

      {/* ÜST ANALİZ ALANI */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '8px' }}>
        <div style={statsCardStyle}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#D3DAD9', opacity: 0.8, textTransform: 'uppercase' }}>Toplam Brüt Gelir</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '12px 0' }}>₺{calculateTotalRevenue()}</h1>
            <span style={{ color: '#D3DAD9', fontSize: '0.75rem', fontWeight: 600 }}>AKTİF SATIŞ VERİLERİ</span>
        </div>

        <section style={cardStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.1rem', color: '#715A5A' }}>Aylık Satış Analizi</h3>
            <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <LineChart data={reports}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#44444E" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#D3DAD9', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#D3DAD9', fontSize: 11}} dx={-10} />
                <Tooltip contentStyle={{ backgroundColor: '#37353E', borderRadius: '12px', border: '1px solid #715A5A', color: '#D3DAD9' }} />
                <Line type="monotone" dataKey="revenue" stroke="#715A5A" strokeWidth={4} dot={{ r: 4, fill: '#715A5A' }} />
                </LineChart>
            </ResponsiveContainer>
            </div>
        </section>
      </div>

      {/* HİBRİT FORM (EKLEME & DÜZENLEME) */}
      <section style={cardStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.1rem', color: '#715A5A' }}>
          {editingId ? "Seçili Kitabı Düzenle" : "Envantere Yeni Kitap Ekle"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px' }}>
            <label style={labelStyle}>Kitap Adı</label>
            <input type="text" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={labelStyle}>Yazar</label>
            <input type="text" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ flex: '1 1 280px' }}>
            <label style={labelStyle}>Kapak URL</label>
            <input type="text" value={newBook.coverImage} onChange={e => setNewBook({...newBook, coverImage: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ flex: '0 1 120px' }}>
            <label style={labelStyle}>Fiyat (TL)</label>
            <input type="number" value={newBook.price || ''} onChange={e => setNewBook({...newBook, price: Number(e.target.value)})} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={buttonPrimary}>
              {editingId ? "Güncelle" : "Kaydet"}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => { setEditingId(null); setNewBook({ title: '', author: '', price: 0, coverImage: '' }); }}
                style={{ ...buttonPrimary, backgroundColor: 'transparent', border: '1px solid #D3DAD9' }}
              >
                İptal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ENVANTER LİSTESİ */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', color: '#37353E' }}>
        Envanter Yönetimi 
        <span style={{ fontSize: '0.9rem', backgroundColor: '#37353E', marginLeft: '12px', padding: '4px 12px', borderRadius: '20px', color: '#D3DAD9' }}>
          {books.length} Kitap
        </span>
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px' }}>
        {books.map(book => (
          <BookCard 
            key={book.id} 
            book={book} 
            actionButton={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <button 
                  onClick={() => handleEditClick(book)}
                  style={{ ...buttonPrimary, width: '100%', padding: '10px', fontSize: '0.8rem' }}
                >
                  Düzenle
                </button>
                <button 
                  onClick={async () => { if(window.confirm("Silinsin mi?")) { await bookService.delete(book.id); loadAllData(); } }}
                  style={{ 
                    width: '100%', padding: '10px', backgroundColor: 'transparent', 
                    color: '#715A5A', border: '1px solid #715A5A', borderRadius: '10px', 
                    cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem'
                  }}
                >
                  Kaldır
                </button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;