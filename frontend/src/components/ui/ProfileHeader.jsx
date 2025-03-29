import React from 'react';
import { motion } from 'framer-motion';
import SparklesEffect from './SparklesEffect';

const ProfileHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <motion.div
        className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        User Profile Dashboard
      </motion.div>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        <SparklesEffect>
          Medical Profile Management
        </SparklesEffect>
      </h1>
      <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
        Keep track of your medical history and maintain a comprehensive health profile
      </p>
    </motion.div>
  );
};

export default ProfileHeader;   