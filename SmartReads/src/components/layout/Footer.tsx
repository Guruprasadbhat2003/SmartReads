import React from 'react';
import { Library, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white pt-12 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Library size={24} className="mr-2 text-primary-400" />
              <span className="font-serif font-bold text-xl">SmartReads</span>
            </div>
            <p className="text-dark-300 mb-4">
              Discover your next favorite book with our advanced machine learning algorithms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-dark-300 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-dark-300">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/data-insights" className="hover:text-primary-400 transition-colors">Data Insights</Link></li>
              <li><Link to="/algorithm-comparison" className="hover:text-primary-400 transition-colors">Algorithm Comparison</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-dark-300">
              <li><a href="#" className="hover:text-primary-400 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Dataset Information</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">ML Algorithms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-dark-300 mb-4">Subscribe to our newsletter for updates on new book recommendations.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="px-4 py-2 bg-dark-800 text-white rounded-l-md focus:outline-none flex-grow" 
              />
              <button className="bg-primary-600 hover:bg-primary-700 transition-colors px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400">
          <p>&copy; {currentYear} SmartReads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;