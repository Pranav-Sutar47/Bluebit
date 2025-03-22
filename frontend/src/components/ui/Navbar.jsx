import React from 'react';
import { motion } from 'framer-motion';
import AuthButton from './AuthButton';
import ConsultButton from './ConsultButton';

const Navbar = ({ user }) => {
  return (
    <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">DoseWise</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/prescriptions">Prescriptions</NavLink>
            <NavLink href="/chatbot">Chatbot</NavLink>
          </nav>

          {/* Auth and Consult Buttons */}
          <div className="flex items-center space-x-4">
            <AuthButton user={user} />
            <ConsultButton />
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <a 
      href={href}
      className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group"
    >
      {children}
      <motion.span 
        className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-200"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
      />
    </a>
  );
};

export default Navbar;