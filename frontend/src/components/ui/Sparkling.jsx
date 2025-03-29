import React from 'react';
import { motion } from 'framer-motion';

const SparklesEffect = ({ children }) => {
  return (
    <span className="relative">
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute -inset-1 rounded-lg bg-blue-50"
        animate={{
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </span>
  );
};

export default SparklesEffect;