import React from 'react';
import BookCard from './BookCard';
import { motion } from 'framer-motion';

interface Book {
  id: number;
  title: string;
  author: string;
  image_url: string;
  rating: number;
  genre: string;
}

interface BookListProps {
  title: string;
  books: Book[];
  algorithm?: string;
  loading?: boolean;
}

const BookList: React.FC<BookListProps> = ({ title, books, algorithm, loading = false }) => {
  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
        <div className="flex justify-center items-center py-12">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
        <div className="bg-primary-50 p-8 rounded-lg text-center">
          <p className="text-dark-600">No books available in this section yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            image_url={book.image_url}
            rating={book.rating}
            genre={book.genre}
            algorithm={algorithm}
            similarityScore={Math.random()} // This would come from the API in a real app
          />
        ))}
      </motion.div>
    </div>
  );
};

export default BookList;