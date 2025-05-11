import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  publisher: string;
  image_url: string;
  rating: number;
  genre: string;
  description: string;
}

interface AppContextProps {
  books: Book[];
  recentlyViewed: Book[];
  recommendations: Book[];
  algorithmType: string;
  loading: boolean;
  error: string | null;
  setAlgorithmType: (type: string) => void;
  addToRecentlyViewed: (book: Book) => void;
  getRecommendations: (bookId: number, algorithm?: string) => Promise<void>;
  getBookById: (id: number) => Book | undefined;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Book[]>([]);
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [algorithmType, setAlgorithmType] = useState<string>('cosine');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all books on initial load
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call to our backend
        // For now, we'll just simulate with a timeout
        setTimeout(() => {
          // We'll use mock data for now
          import('../data/mockBooks').then(({ default: mockBooks }) => {
            setBooks(mockBooks);
            setLoading(false);
          });
        }, 1000);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  const addToRecentlyViewed = (book: Book) => {
    setRecentlyViewed(prev => {
      // Remove the book if it already exists in the array
      const filtered = prev.filter(b => b.id !== book.id);
      // Add the book to the beginning of the array
      return [book, ...filtered].slice(0, 5); // Keep only the 5 most recent
    });
  };

  const getRecommendations = async (bookId: number, algorithm = algorithmType) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to our backend
      // For now, we'll just simulate with a timeout
      setTimeout(() => {
        // Get random 5 books as recommendations (excluding the current book)
        const randomBooks = books
          .filter(book => book.id !== bookId)
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        
        setRecommendations(randomBooks);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch recommendations');
      setLoading(false);
      console.error('Error fetching recommendations:', err);
    }
  };

  const getBookById = (id: number) => {
    return books.find(book => book.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        books,
        recentlyViewed,
        recommendations,
        algorithmType,
        loading,
        error,
        setAlgorithmType,
        addToRecentlyViewed,
        getRecommendations,
        getBookById
      }}
    >
      {children}
    </AppContext.Provider>
  );
};