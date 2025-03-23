import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthButton from './AuthButton';
import ConsultButton from './ConsultButton';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      // Show navbar when scrolling up, hide when scrolling down
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">DoseWise</span>
                </Link>
              </div>
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <NavLink to="/prescriptions">Prescriptions</NavLink>
                <NavLink to="/chatbot">Chatbot</NavLink>
              </nav>
              {/* Auth and Consult Buttons */}
              <div className="flex items-center space-x-4">
                  <AuthButton/>
                <ConsultButton />
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

const NavLinks = ({ href, children }) => {
  return (
    <a href={href} className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group">
      {children}
      <motion.span 
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500" 
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </a>
  );
};

export default Navbar;