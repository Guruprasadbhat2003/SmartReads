import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Library, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookList from '../components/books/BookList';
import AlgorithmSelector from '../components/recommendation/AlgorithmSelector';
import BookCard from '../components/books/BookCard';

const Home: React.FC = () => {
  const { books, recentlyViewed, recommendations, algorithmType, loading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

  useEffect(() => {
    // Set featured books (random 5 books with high ratings)
    if (books.length > 0) {
      const highRatedBooks = [...books]
        .filter(book => book.rating >= 4.0)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setFeaturedBooks(highRatedBooks);
    }
  }, [books]);

  useEffect(() => {
    // Filter books based on search term
    if (searchTerm.trim()) {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [searchTerm, books]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary-800 to-primary-900 text-white py-16"
      >
        <div className="container-custom mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-serif font-bold mb-6"
            >
              Discover Your Next Favorite Book
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl mb-8"
            >
              Our advanced ML algorithms analyze thousands of books to find your perfect match
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative max-w-xl mx-auto"
            >
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for books by title, author, or genre..."
                className="w-full px-6 py-4 rounded-full text-dark-800 focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
              <button className="absolute right-2 top-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                <Search size={24} />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container-custom mx-auto py-12">
        {/* Search Results */}
        {filteredBooks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
              <Search size={24} className="mr-2 text-primary-600" />
              Search Results
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredBooks.slice(0, 10).map((book) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookCard
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    image_url={book.image_url}
                    rating={book.rating}
                    genre={book.genre}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Books */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
            <TrendingUp size={24} className="mr-2 text-primary-600" />
            Featured Books
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  image_url={book.image_url}
                  rating={book.rating}
                  genre={book.genre}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Algorithm Selector */}
        <AlgorithmSelector />

        {/* Recommendations */}
        {recentlyViewed.length > 0 && (
          <BookList 
            title={`Recommendations based on your history (${algorithmType})`}
            books={recommendations}
            algorithm={algorithmType}
            loading={loading}
          />
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <BookList 
            title="Recently Viewed"
            books={recentlyViewed}
          />
        )}

        {/* All Books */}
        <BookList 
          title="Explore Our Collection"
          books={books.slice(0, 10)}
        />
      </div>
    </div>
  );
};

export default Home;