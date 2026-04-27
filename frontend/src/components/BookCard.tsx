// frontend/src/components/BookCard.tsx
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  actionButton?: React.ReactNode; 
}

const BookCard: React.FC<BookCardProps> = ({ book, actionButton }) => {
  // --- KURUMSAL KART STİLLERİ ---
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '16px',
    textAlign: 'center' as const,
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    height: '100%', // Kartların aynı boyda kalması için
    boxSizing: 'border-box' as const
  };

  const imageWrapperStyle = {
    width: '100%',
    height: '240px',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    marginBottom: '16px',
    position: 'relative' as const
  };

  const priceBadgeStyle = {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    padding: '4px 10px',
    borderRadius: '8px',
    fontWeight: '800',
    fontSize: '0.9rem',
    color: '#0f172a',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            // 'cover' yerine 'contain' kullanarak tüm kapağın görünmesini sağlıyoruz
            objectFit: 'contain', 
            // Resimden boş kalan yerlerin çirkin durmaması için hafif bir zemin rengi
            backgroundColor: '#f8fafc',
            // Resim kenarlara sıfır yapışmasın, biraz nefes alsın dersen padding ekleyebilirsin
            padding: '4px',
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
          color: '#0f172a',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.8rem' // Uzun ve kısa isimlerin hizasını korur
        }}>
          {book.title}
        </h3>
        
        <p style={{ 
          color: '#64748b', 
          fontSize: '0.85rem', 
          fontWeight: '500',
          margin: '0 0 16px 0',
          fontStyle: 'italic'
        }}>
          {book.author}
        </p>
      </div>

      {/* BUTON ALANI */}
      <div style={{ marginTop: 'auto' }}>
        {actionButton}
      </div>
    </div>
  );
};

export default BookCard;