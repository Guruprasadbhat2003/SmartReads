import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Calendar, User, BookOpen, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookList from '../components/books/BookList';
import AlgorithmSelector from '../components/recommendation/AlgorithmSelector';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, addToRecentlyViewed, getRecommendations, recommendations, algorithmType, loading } = useAppContext();
  const [book, setBook] = useState<any | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const bookId = parseInt(id);
      const bookData = getBookById(bookId);
      
      if (bookData) {
        setBook(bookData);
        addToRecentlyViewed(bookData);
        getRecommendations(bookId, algorithmType);
      }
    }
  }, [id, getBookById, addToRecentlyViewed, getRecommendations, algorithmType]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!book) {
    return (
      <div className="pt-24 container-custom mx-auto min-h-screen flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Book Detail Header */}
      <section className="bg-gradient-to-r from-primary-900 to-primary-800 py-12">
        <div className="container-custom mx-auto">
          <Link to="/" className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <img 
                src={book.image_url} 
                alt={book.title} 
                className="rounded-lg shadow-lg max-h-96 object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 text-white"
            >
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{book.title}</h1>
              <p className="text-xl opacity-90 mb-4">by {book.author}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Star size={16} className="text-yellow-400 mr-1" fill="#facc15" />
                  <span>{book.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Calendar size={16} className="mr-1" />
                  <span>{book.year}</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <BookOpen size={16} className="mr-1" />
                  <span>{book.genre}</span>
                </div>
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <User size={16} className="mr-1" />
                  <span>{book.publisher}</span>
                </div>
              </div>
              
              <p className="opacity-90 mb-6 leading-relaxed">
                {book.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={toggleFavorite}
                  className={`btn flex items-center ${
                    isFavorite ? 'bg-red-500 hover:bg-red-600 text-white' : 'btn-outline'
                  }`}
                >
                  <Heart size={18} className="mr-2" fill={isFavorite ? "white" : "none"} />
                  {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                </button>
                <button className="btn btn-outline flex items-center">
                  <Share2 size={18} className="mr-2" />
                  Share
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom mx-auto py-12">
        {/* Algorithm Selector */}
        <AlgorithmSelector />
        
        {/* Recommendations */}
        <BookList 
          title={`Similar Books (${algorithmType})`}
          books={recommendations}
          algorithm={algorithmType}
          loading={loading}
        />

        {/* Book Details */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-serif font-bold mb-4">About this Book</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-serif font-semibold mb-3">Details</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-dark-500">Title:</span>
                  <span className="font-medium">{book.title}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-500">Author:</span>
                  <span className="font-medium">{book.author}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-500">Publisher:</span>
                  <span className="font-medium">{book.publisher}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-500">Publication Year:</span>
                  <span className="font-medium">{book.year}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-500">Genre:</span>
                  <span className="font-medium">{book.genre}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-dark-500">Rating:</span>
                  <span className="font-medium flex items-center">
                    {book.rating.toFixed(1)}
                    <Star size={14} className="text-yellow-500 ml-1" fill="#f59e0b" />
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif font-semibold mb-3">Summary</h3>
              <p className="text-dark-700 leading-relaxed">
                {book.description}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Themes</h4>
                <div className="flex flex-wrap gap-2">
                  {["Adventure", "Coming of Age", "Friendship", "Mystery"].map((theme) => (
                    <span key={theme} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookDetails;