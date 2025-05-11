import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  image_url: string;
  rating: number;
  genre: string;
  algorithm?: string;
  similarityScore?: number;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  image_url,
  rating,
  genre,
  algorithm,
  similarityScore
}) => {
  const { getBookById, addToRecentlyViewed } = useAppContext();

  const handleClick = () => {
    const book = getBookById(id);
    if (book) {
      addToRecentlyViewed(book);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="card card-book overflow-hidden h-full"
    >
      <Link to={`/book/${id}`} onClick={handleClick}>
        <div className="relative">
          <img 
            src={image_url} 
            alt={title} 
            className="card-book-img"
          />
          {algorithm && (
            <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
              {algorithm}
            </div>
          )}
          {similarityScore && similarityScore > 0.8 && (
            <div className="absolute bottom-2 right-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
              <Award size={12} className="mr-1" />
              {(similarityScore * 100).toFixed(0)}% match
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-serif font-semibold text-lg line-clamp-2 mb-1">{title}</h3>
          <p className="text-dark-500 text-sm mb-2">{author}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-full">
              {genre}
            </span>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-500 mr-1" fill="#f59e0b" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;