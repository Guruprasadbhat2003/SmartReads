import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DataInsights from './pages/DataInsights';
import AlgorithmComparison from './pages/AlgorithmComparison';
import BookDetails from './pages/BookDetails';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/algorithm-comparison" element={<AlgorithmComparison />} />
              <Route path="/book/:id" element={<BookDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;