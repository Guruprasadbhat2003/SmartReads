# SmartReads: ML-Based Book Recommendation System

SmartReads is a sophisticated book recommendation system that leverages machine learning algorithms to provide personalized book recommendations based on user preferences and book similarities.

## Features

- **Multiple ML Algorithms**: Implements four different recommendation approaches:
  - Cosine Similarity for content-based filtering
  - K-Nearest Neighbors (KNN) for similarity matching
  - Matrix Factorization (SVD) for collaborative filtering
  - Clustering for user segmentation

- **Interactive UI**: Clean, responsive interface with:
  - Book browsing and search functionality
  - Detailed book information pages
  - Algorithm selection for different recommendation approaches

- **Data Visualization**: Comprehensive visualizations showing:
  - Dataset characteristics and distributions
  - Algorithm performance metrics and comparisons

## Technology Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, Chart.js
- **Backend**: Python Flask API with scikit-learn
- **Data Visualization**: React-ChartJS-2
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- Python 3.8+ with pip

### Installation

1. Clone the repository
2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:

```bash
npm run backend
```

2. In a separate terminal, start the frontend development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `/src`: React frontend code
  - `/components`: Reusable UI components
  - `/pages`: Main application pages
  - `/context`: React context for state management
  - `/data`: Mock data for development

- `/backend`: Python backend code
  - `app.py`: Flask application with API endpoints
  - `/data`: Dataset storage

## Dataset

The application uses a comprehensive book dataset with the following attributes:
- Book ID
- Title
- Author
- Publication Year
- Publisher
- Genre
- Rating
- Page Count
- Language
- Description

## Algorithms

### Cosine Similarity
Content-based filtering using vector similarity between book features.

### K-Nearest Neighbors (KNN)
Finds books similar to ones a user has liked based on feature proximity.

### Matrix Factorization (SVD)
Collaborative filtering that decomposes the user-item matrix to identify latent factors.

### Clustering
Groups similar books together based on shared characteristics.

## License

This project is for educational purposes only.