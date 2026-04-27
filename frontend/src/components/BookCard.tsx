// frontend/src/components/BookCard.tsx
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  actionButton?: React.ReactNode; 
}

const BookCard: React.FC<BookCardProps> = ({ book, actionButton }) => {
  // --- YENİ RENK PALETİ STİLLERİ ---
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#37353E', // Palet: Ana Koyu Ton
    borderRadius: '20px',
    padding: '16px',
    textAlign: 'center' as const,
    border: '1px solid #44444E', // Palet: Yumuşak Antrasit
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    height: '100%',
    boxSizing: 'border-box' as const
  };

  const imageWrapperStyle = {
    width: '100%',
    height: '240px',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#44444E', // Palet: Yumuşak Antrasit (Resim arkası)
    marginBottom: '16px',
    position: 'relative' as const
  };

  const priceBadgeStyle = {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    backgroundColor: '#715A5A', // Palet: Vurgu Tonu
    padding: '6px 12px',
    borderRadius: '8px',
    fontWeight: '800',
    fontSize: '0.85rem',
    color: '#D3DAD9', // Palet: Açık Ton
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
  };

  return (
    <div style={cardStyle} className="book-card-hover">
      {/* GÖRSEL ALANI */}
      <div style={imageWrapperStyle}>
        <img 
          src={book.coverImage || 'https://via.placeholder.com/150x200?text=Kapak+Yok'} 
          alt={book.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'contain', 
            backgroundColor: '#44444E', // Koyu zemin ile bütünlük
            padding: '8px',
            boxSizing: 'border-box'
          }} 
        />
        {/* Fiyat Etiketi */}
        <div style={priceBadgeStyle}>₺{book.price}</div>
      </div>

      {/* METİN İÇERİĞİ */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' as const }}>
        <h3 style={{ 
          margin: '0 0 6px 0', 
          fontSize: '1.05rem', 
          fontWeight: '800', 
          color: '#D3DAD9', // Palet: Açık Yazı Rengi
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.8rem'
        }}>
          {book.title}
        </h3>
        
        <p style={{ 
          color: '#715A5A', // Yazarı vurgu rengiyle belirginleştirdik
          fontSize: '0.85rem', 
          fontWeight: '600',
          margin: '0 0 16px 0',
          fontStyle: 'italic'
        }}>
          {book.author}
        </p>
      </div>

      {/* BUTON ALANI */}
      <div style={{ marginTop: 'auto' }}>
        {/* Not: actionButton içindeki butonun stillerini de AdminDashboard veya UserStore'da düzenleyeceğiz */}
        {actionButton}
      </div>
    </div>
  );
};

export default BookCard;