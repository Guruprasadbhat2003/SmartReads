# backend/app.py
from flask import Flask, request, jsonify
import pandas as pd
import pickle
from sklearn.neighbors import NearestNeighbors

app = Flask(__name__)

# Load data
df = pd.read_csv('backend/data/processed_books.csv')

# Load models
knn_model = pickle.load(open('backend/models/knn_model.pkl', 'rb'))
svm_model = pickle.load(open('backend/models/svm_model.pkl', 'rb'))

@app.route('/recommend', methods=['POST'])
def recommend():
    book_title = request.json['title']
    book = df[df['title'].str.lower() == book_title.lower()]
    if book.empty:
        return jsonify({'error': 'Book not found'}), 404

    features = book[['average_rating', 'num_pages', 'ratings_count', 'authors_encoded', 'publisher_encoded']]
    distances, indices = knn_model.kneighbors(features, n_neighbors=6)

    recommendations = df.iloc[indices[0][1:]][['title', 'authors', 'average_rating']].to_dict(orient='records')
    return jsonify(recommendations)

@app.route('/analytics/data', methods=['GET'])
def analytics():
    genre_count = df['authors'].value_counts().head(10)
    rating_distribution = df['average_rating'].value_counts().sort_index()
    return jsonify({
        'top_authors': genre_count.to_dict(),
        'rating_distribution': rating_distribution.to_dict()
    })

@app.route('/compare', methods=['GET'])
def compare():
    return jsonify({
        'KNN': {'type': 'Recommender', 'info': 'Nearest Neighbors based recommendations'},
        'SVM': {'accuracy': 'Around 83%', 'use': 'Classification of Popular/Unpopular books'}
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
