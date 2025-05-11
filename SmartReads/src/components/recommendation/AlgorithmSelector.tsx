import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const algorithms = [
  { id: 'cosine', name: 'Cosine Similarity', description: 'Content-based filtering using vector similarity' },
  { id: 'knn', name: 'K-Nearest Neighbors', description: 'Find similar books based on user preferences' },
  { id: 'matrix', name: 'Matrix Factorization', description: 'Collaborative filtering using SVD' },
  { id: 'cluster', name: 'Clustering', description: 'Group similar books by attributes' }
];

const AlgorithmSelector: React.FC = () => {
  const { algorithmType, setAlgorithmType } = useAppContext();

  return (
    <div className="my-8">
      <h2 className="text-2xl font-serif font-bold mb-4">Recommendation Algorithm</h2>
      <p className="text-dark-600 mb-6">Select an algorithm to see different recommendation results</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {algorithms.map((algorithm) => (
          <motion.div
            key={algorithm.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-colors ${
              algorithmType === algorithm.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-dark-200 hover:border-primary-300'
            }`}
            onClick={() => setAlgorithmType(algorithm.id)}
          >
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full mr-2 ${
                algorithmType === algorithm.id 
                  ? 'bg-primary-600' 
                  : 'bg-dark-200'
              }`}></div>
              <h3 className="font-semibold">{algorithm.name}</h3>
            </div>
            <p className="text-sm text-dark-600">{algorithm.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;