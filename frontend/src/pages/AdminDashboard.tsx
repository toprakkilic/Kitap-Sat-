// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { adminService, bookService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Book, RevenueData } from '../types';
import BookCard from '../components/BookCard';

const AdminDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [reports, setReports] = useState<RevenueData[]>([]);

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

  useEffect(() => { loadAllData(); }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Yönetici Dashboard</h2>
        <button 
          onClick={handleReset} 
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Admin Reset (Golden State)
        </button>
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