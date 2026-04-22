// frontend/src/components/BookCard.tsx
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  actionButton?: React.ReactNode; // Farklı sayfalar için farklı butonlar
}

const BookCard: React.FC<BookCardProps> = ({ book, actionButton }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      textAlign: 'center',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <img 
        src={book.coverImage || 'https://via.placeholder.com/150x200?text=No+Cover'} 
        alt={book.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} 
      />
      <h3 style={{ margin: '10px 0 5px', fontSize: '1.1rem' }}>{book.title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>{book.author}</p>
      <p style={{ fontWeight: 'bold', color: '#2c3e50', fontSize: '1.2rem' }}>₺{book.price}</p>
      {actionButton}
    </div>
  );
};

export default BookCard;