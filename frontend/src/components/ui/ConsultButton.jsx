import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ConsultButton = () => {

  const navigate = useNavigate();

  return (
    <motion.button
      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={()=>navigate('/call')}
    >
      Consult Now
    </motion.button>
  );
};

export default ConsultButton;