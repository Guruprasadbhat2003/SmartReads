import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Library, BarChart2, GitCompare, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/', icon: <Library className="mr-2" size={18} /> },
    { title: 'Data Insights', path: '/data-insights', icon: <BarChart2 className="mr-2" size={18} /> },
    { title: 'Algorithm Comparison', path: '/algorithm-comparison', icon: <GitCompare className="mr-2" size={18} /> },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="text-primary-800"
            >
              <Library size={28} className="mr-2" />
            </motion.div>
            <span className="font-serif font-bold text-2xl text-primary-800">SmartReads</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center font-medium transition hover:text-primary-600 ${
                  location.pathname === link.path
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-dark-600'
                }`}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="pl-10 pr-4 py-2 rounded-full border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-56"
              />
              <Search className="absolute left-3 top-2.5 text-dark-400" size={18} />
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-dark-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white py-4 px-4 shadow-lg rounded-b-lg"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-2 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dark-600 hover:bg-dark-50'
                  }`}
                >
                  {link.icon}
                  {link.title}
                </Link>
              ))}
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 rounded-full border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                />
                <Search className="absolute left-3 top-2.5 text-dark-400" size={18} />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;