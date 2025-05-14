from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.decomposition import TruncatedSVD
import json
import os

app = Flask(__name__)
CORS(app)

# Load the dataset
def load_dataset():
    # Check if we have a cached version
    if os.path.exists('backend/data/books.csv'):
        return pd.read_csv('backend/data/books.csv')
    
    books = []
    for i in range(1, 2001):
        book = {
            'id': i,
            'title': f"Book Title {i}",
            'author': f"Author {i % 100}",
            'year': np.random.randint(1900, 2023),
            'publisher': f"Publisher {i % 20}",
            'genre': np.random.choice(['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 
                                    'Fantasy', 'Romance', 'Thriller', 'Horror', 'Biography']),
            'rating': round(np.random.uniform(1, 5), 1),
            'pages': np.random.randint(100, 800),
            'language': np.random.choice(['English', 'Spanish', 'French', 'German', 'Chinese']),
            'description': f"Description for book {i}..."
        }
        books.append(book)
    
    df = pd.DataFrame(books)
    
    # Create directory if it doesn't exist
    os.makedirs('backend/data', exist_ok=True)
    
    # Save to CSV for future use
    df.to_csv('backend/data/books.csv', index=False)
    
    return df

# Load the dataset
books_df = load_dataset()

# Preprocessing for recommendation algorithms
def preprocess_data():
    # Create features for content-based filtering
    # One-hot encode categorical features
    genres = pd.get_dummies(books_df['genre'], prefix='genre')
    publishers = pd.get_dummies(books_df['publisher'], prefix='publisher')
    
    # Normalize numerical features
    years_normalized = (books_df['year'] - books_df['year'].min()) / (books_df['year'].max() - books_df['year'].min())
    ratings_normalized = (books_df['rating'] - 1) / 4  # Ratings are 1-5
    
    # Combine features
    features = pd.concat([genres, publishers, 
                         years_normalized.rename('year'), 
                         ratings_normalized.rename('rating')], axis=1)
    
    return features

# Recommendation algorithms
def cosine_similarity_recommendations(book_id, num_recommendations=5):
    features = preprocess_data()
    
    # Find the index of the book
    book_index = books_df[books_df['id'] == book_id].index[0]
    
    # Calculate cosine similarity between this book and all others
    similarities = cosine_similarity([features.iloc[book_index]], features)
    
    # Get the indices of the most similar books
    similar_indices = similarities[0].argsort()[::-1]
    
    # Filter out the book itself
    similar_indices = [idx for idx in similar_indices if idx != book_index]
    
    # Get the top N recommendations
    recommendations = books_df.iloc[similar_indices[:num_recommendations]]
    
    return recommendations.to_dict(orient='records')

def knn_recommendations(book_id, num_recommendations=5, n_neighbors=6):
    features = preprocess_data()
    
    # Find the index of the book
    book_index = books_df[books_df['id'] == book_id].index[0]
    
    # Create a KNN model
    model = NearestNeighbors(n_neighbors=n_neighbors, algorithm='auto')
    model.fit(features)
    
    # Find the nearest neighbors
    distances, indices = model.kneighbors([features.iloc[book_index]])
    
    # Filter out the book itself
    recommendations_indices = [idx for idx in indices[0] if idx != book_index]
    
    # Get the top N recommendations
    recommendations = books_df.iloc[recommendations_indices[:num_recommendations]]
    
    return recommendations.to_dict(orient='records')

def matrix_factorization_recommendations(book_id, num_recommendations=5):
    features = preprocess_data()
    
    # Find the index of the book
    book_index = books_df[books_df['id'] == book_id].index[0]
    
    # Apply SVD for dimensionality reduction
    svd = TruncatedSVD(n_components=20, random_state=42)
    latent_features = svd.fit_transform(features)
    
    # Calculate similarity in the latent space
    similarities = cosine_similarity([latent_features[book_index]], latent_features)
    
    # Get the indices of the most similar books
    similar_indices = similarities[0].argsort()[::-1]
    
    # Filter out the book itself
    similar_indices = [idx for idx in similar_indices if idx != book_index]
    
    # Get the top N recommendations
    recommendations = books_df.iloc[similar_indices[:num_recommendations]]
    
    return recommendations.to_dict(orient='records')

def clustering_recommendations(book_id, num_recommendations=5, n_clusters=10):
    features = preprocess_data()
    
    # Find the index and details of the book
    book_index = books_df[books_df['id'] == book_id].index[0]
    
    # Apply KMeans clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    clusters = kmeans.fit_predict(features)
    
    # Find the cluster of the target book
    book_cluster = clusters[book_index]
    
    # Get all books in the same cluster
    same_cluster_indices = np.where(clusters == book_cluster)[0]
    
    # Filter out the book itself
    same_cluster_indices = [idx for idx in same_cluster_indices if idx != book_index]
    
    # If there are not enough books in the cluster, add from other clusters
    if len(same_cluster_indices) < num_recommendations:
        remaining = num_recommendations - len(same_cluster_indices)
        other_indices = [idx for idx in range(len(books_df)) if idx != book_index and idx not in same_cluster_indices]
        np.random.shuffle(other_indices)
        same_cluster_indices.extend(other_indices[:remaining])
    
    # Get the recommendations
    recommendations = books_df.iloc[same_cluster_indices[:num_recommendations]]
    
    return recommendations.to_dict(orient='records')

# API endpoints
@app.route('/api/books', methods=['GET'])
def get_books():
    # Optional parameters for pagination
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=20, type=int)
    
    # Calculate start and end indices
    start = (page - 1) * limit
    end = start + limit
    
    # Return the specified page of books
    return jsonify(books_df.iloc[start:end].to_dict(orient='records'))

@app.route('/api/book/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = books_df[books_df['id'] == book_id]
    if not book.empty:
        return jsonify(book.iloc[0].to_dict())
    else:
        return jsonify({'error': 'Book not found'}), 404

@app.route('/api/recommend', methods=['GET'])
def recommend():
    # Get parameters from request
    book_id = request.args.get('book_id', type=int)
    algorithm = request.args.get('algorithm', default='cosine', type=str)
    num_recommendations = request.args.get('count', default=5, type=int)
    
    if not book_id:
        return jsonify({'error': 'Missing book_id parameter'}), 400
    
    # Check if book exists
    if books_df[books_df['id'] == book_id].empty:
        return jsonify({'error': 'Book not found'}), 404
    
    # Generate recommendations based on selected algorithm
    if algorithm == 'cosine':
        recommendations = cosine_similarity_recommendations(book_id, num_recommendations)
    elif algorithm == 'knn':
        recommendations = knn_recommendations(book_id, num_recommendations)
    elif algorithm == 'matrix':
        recommendations = matrix_factorization_recommendations(book_id, num_recommendations)
    elif algorithm == 'cluster':
        recommendations = clustering_recommendations(book_id, num_recommendations)
    else:
        return jsonify({'error': 'Invalid algorithm selected'}), 400
    
    return jsonify(recommendations)

@app.route('/api/dataset/stats', methods=['GET'])
def get_dataset_stats():
    # Generate statistics about the dataset
    stats = {
        'total_books': len(books_df),
        'average_rating': books_df['rating'].mean(),
        'genres': books_df['genre'].value_counts().to_dict(),
        'years_range': [int(books_df['year'].min()), int(books_df['year'].max())],
        'publishers': books_df['publisher'].nunique(),
        'authors': books_df['author'].nunique()
    }
    return jsonify(stats)

@app.route('/api/algorithms/performance', methods=['GET'])
def get_algorithm_performance():
    # In a real app, this would be calculated based on actual performance metrics
    # For this demo, we'll return simulated performance data
    performance = {
        'cosine': {
            'accuracy': 87.2,
            'precision': 0.84,
            'recall': 0.82,
            'f1_score': 0.83,
            'training_time': '1.2s',
            'prediction_time': '0.003s'
        },
        'knn': {
            'accuracy': 82.5,
            'precision': 0.78,
            'recall': 0.75,
            'f1_score': 0.76,
            'training_time': 'N/A',
            'prediction_time': '0.8s'
        },
        'matrix': {
            'accuracy': 91.3,
            'precision': 0.88,
            'recall': 0.86,
            'f1_score': 0.87,
            'training_time': '45s',
            'prediction_time': '0.005s'
        },
        'cluster': {
            'accuracy': 79.4,
            'precision': 0.76,
            'recall': 0.74,
            'f1_score': 0.75,
            'training_time': '18s',
            'prediction_time': '0.002s'
        }
    }
    return jsonify(performance)

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'message': 'Book Recommendation API',
        'endpoints': [
            '/api/books',
            '/api/book/<book_id>',
            '/api/recommend?book_id=<book_id>&algorithm=<algorithm>&count=<count>',
            '/api/dataset/stats',
            '/api/algorithms/performance'
        ]
    })

if __name__ == '__main__':
    # Create data directory and initialize dataset
    load_dataset()
    
    # Start the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)