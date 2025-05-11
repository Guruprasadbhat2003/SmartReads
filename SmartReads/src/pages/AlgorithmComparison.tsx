import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCompare, Info, FileText, Layers } from 'lucide-react';
import AlgorithmPerformanceChart from '../components/charts/AlgorithmPerformanceChart';

type Algorithm = {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  use_cases: string[];
  performance: {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
    training_time: string;
    prediction_time: string;
  };
};

const AlgorithmComparison: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  const algorithms: Algorithm[] = [
    {
      id: 'cosine',
      name: 'Cosine Similarity',
      description: 'Measures the cosine of the angle between two vectors in a multi-dimensional space. It is used for content-based filtering, comparing book attributes like genre, author style, and themes.',
      strengths: [
        'Simple and efficient for high-dimensional data',
        'Works well with sparse data',
        'Easy to interpret and implement',
        'Does not require user historical data'
      ],
      weaknesses: [
        'Cannot capture latent relationships',
        'Requires good feature engineering',
        'May perform poorly for new books with limited features',
        'Does not consider user preferences directly'
      ],
      use_cases: [
        'Finding similar books based on content',
        'Subject-based recommendations',
        'New user recommendations (cold start)'
      ],
      performance: {
        accuracy: 87.2,
        precision: 0.84,
        recall: 0.82,
        f1_score: 0.83,
        training_time: '1.2s',
        prediction_time: '0.003s'
      }
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors',
      description: 'Identifies books that are most similar to a given book by finding the K most similar items based on user ratings or item features. Works for both user-based and item-based collaborative filtering.',
      strengths: [
        'Intuitive algorithm',
        'No training phase required',
        'Effective for niche recommendations',
        'Adapts well as new ratings come in'
      ],
      weaknesses: [
        'Computationally expensive for large datasets',
        'Suffers from sparsity issues',
        'Sensitive to the choice of similarity metric and K value',
        'Cold start problem for new users/items'
      ],
      use_cases: [
        'Personalized recommendations based on user history',
        'Finding books similar to ones a user has enjoyed',
        'Small to medium-sized recommendation systems'
      ],
      performance: {
        accuracy: 82.5,
        precision: 0.78,
        recall: 0.75,
        f1_score: 0.76,
        training_time: 'N/A',
        prediction_time: '0.8s'
      }
    },
    {
      id: 'matrix',
      name: 'Matrix Factorization (SVD)',
      description: 'Decomposes the user-item interaction matrix into lower-dimensional matrices representing latent factors. Used for collaborative filtering to discover hidden patterns in user preferences.',
      strengths: [
        'Discovers latent features automatically',
        'Handles sparse data well',
        'Excellent performance on large datasets',
        'Can capture complex patterns in user preferences'
      ],
      weaknesses: [
        'Computationally intensive training phase',
        'Requires tuning of hyperparameters',
        'Difficult to incorporate new items/users',
        'Less interpretable than other methods'
      ],
      use_cases: [
        'Large-scale recommendation systems',
        'Discovering reading patterns',
        'Personalized recommendations for active users'
      ],
      performance: {
        accuracy: 91.3,
        precision: 0.88,
        recall: 0.86,
        f1_score: 0.87,
        training_time: '45s',
        prediction_time: '0.005s'
      }
    },
    {
      id: 'cluster',
      name: 'Clustering',
      description: 'Groups similar books or users into clusters based on shared characteristics. Uses algorithms like K-means to segment the dataset into meaningful groups for targeted recommendations.',
      strengths: [
        'Effective for finding user segments with similar tastes',
        'Reduces dimensionality of the problem',
        'Can handle cold start for new users by assigning to clusters',
        'Computationally efficient at prediction time'
      ],
      weaknesses: [
        'Quality depends on choice of clustering algorithm',
        'Difficult to determine optimal number of clusters',
        'May oversimplify complex user preferences',
        'Less personalized than other methods'
      ],
      use_cases: [
        'Book genre classification',
        'Reader segmentation',
        'General recommendations for user groups',
        'Content organization and discovery'
      ],
      performance: {
        accuracy: 79.4,
        precision: 0.76,
        recall: 0.74,
        f1_score: 0.75,
        training_time: '18s',
        prediction_time: '0.002s'
      }
    }
  ];

  const selectedAlgorithmData = selectedAlgorithm 
    ? algorithms.find(algo => algo.id === selectedAlgorithm) 
    : null;

  return (
    <div className="pt-20 bg-dark-50 min-h-screen">
      <section className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-12">
        <div className="container-custom mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold mb-4"
          >
            Algorithm Comparison
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-90 max-w-3xl"
          >
            Compare the performance of different recommendation algorithms to understand their strengths and weaknesses
          </motion.p>
        </div>
      </section>

      <div className="container-custom mx-auto py-8">
        {/* Algorithm Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4">Select Algorithm for Details</h2>
          <div className="flex flex-wrap gap-3">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => setSelectedAlgorithm(algo.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  selectedAlgorithm === algo.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-dark-600 hover:bg-primary-50'
                }`}
              >
                <GitCompare size={18} className="mr-2" />
                {algo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Details */}
        {selectedAlgorithmData && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-2xl font-serif font-bold mb-4">{selectedAlgorithmData.name}</h2>
            <p className="mb-6 text-dark-600">{selectedAlgorithmData.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2 flex items-center">
                  <Info size={18} className="mr-2" />
                  Strengths
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-dark-700">
                  {selectedAlgorithmData.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-dark-50 p-4 rounded-lg">
                <h3 className="font-semibold text-dark-800 mb-2 flex items-center">
                  <Info size={18} className="mr-2" />
                  Weaknesses
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-dark-700">
                  {selectedAlgorithmData.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-secondary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-800 mb-2 flex items-center">
                  <Layers size={18} className="mr-2" />
                  Use Cases
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-dark-700">
                  {selectedAlgorithmData.use_cases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-dark-50 p-4 rounded-lg">
              <h3 className="font-semibold text-dark-800 mb-4 flex items-center">
                <FileText size={18} className="mr-2" />
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <p className="text-sm text-dark-500">Accuracy</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.accuracy}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-500">Precision</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.precision}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-500">Recall</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.recall}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-500">F1 Score</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.f1_score}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-500">Training Time</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.training_time}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-dark-500">Prediction Time</p>
                  <p className="text-2xl font-semibold text-primary-700">{selectedAlgorithmData.performance.prediction_time}</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Performance Charts */}
        <h2 className="text-2xl font-serif font-bold mb-4">Algorithm Performance Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <AlgorithmPerformanceChart
              title="Accuracy Comparison"
              chartType="bar"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <AlgorithmPerformanceChart
              title="Precision and Recall Comparison"
              chartType="bar"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <AlgorithmPerformanceChart
            title="Algorithm Performance Metrics"
            chartType="radar"
          />
        </div>

        {/* Algorithm Explanation */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-serif font-bold mb-4">How These Algorithms Work</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Book recommendation systems use machine learning algorithms to suggest books that users might enjoy based on various data points. 
              Here's a brief explanation of how each algorithm approaches the recommendation problem:
            </p>
            
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">Cosine Similarity</h3>
            <p>
              Cosine similarity measures the cosine of the angle between two vectors in a multi-dimensional space. For book recommendations, 
              each book is represented as a vector of features (genre, topics, writing style, etc.). The algorithm then calculates how similar 
              books are to each other by computing the cosine similarity between their feature vectors. Books with a higher similarity score 
              are considered more alike.
            </p>
            
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">K-Nearest Neighbors (KNN)</h3>
            <p>
              KNN is a simple but effective algorithm that finds the K most similar items to a given item. In the context of book recommendations, 
              it can be used to find books similar to those a user has already enjoyed. The algorithm calculates a distance metric 
              (often Euclidean distance or cosine similarity) between books or users and selects the K nearest ones to make recommendations.
            </p>
            
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">Matrix Factorization (SVD)</h3>
            <p>
              Matrix Factorization is a collaborative filtering technique that works by decomposing the user-item interaction matrix (users × books) 
              into lower-dimensional matrices of latent factors. These latent factors represent underlying characteristics that explain user preferences. 
              Singular Value Decomposition (SVD) is a common technique used for this factorization. The algorithm can identify patterns that aren't 
              immediately obvious, making it powerful for personalized recommendations.
            </p>
            
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">Clustering</h3>
            <p>
              Clustering algorithms group similar users or books together based on their characteristics. K-means is a popular clustering technique 
              that partitions the data into K clusters, where each observation belongs to the cluster with the nearest mean. For book recommendations, 
              clustering can be used to segment users with similar reading preferences or to group books with similar attributes, making it easier to 
              generate recommendations within these clusters.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlgorithmComparison;