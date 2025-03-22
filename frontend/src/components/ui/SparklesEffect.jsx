import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const Sparkles = ({ children }) => {
  const [sparkles, setSparkles] = useState([]);

  const generateSparkle = () => {
    return {
      id: String(random(10000, 99999)),
      createdAt: Date.now(),
      color: `hsl(${random(0, 360)}deg, 100%, 75%)`,
      size: random(10, 20),
      style: {
        top: random(0, 100) + "%",
        left: random(0, 100) + "%",
        zIndex: 2
      }
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = generateSparkle();
      setSparkles(sparkles => [...sparkles, sparkle]);
      
      setTimeout(() => {
        setSparkles(sparkles => 
          sparkles.filter(s => s.id !== sparkle.id)
        );
      }, 1000);
    }, 400);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      {sparkles.map(sparkle => (
        <motion.span
          key={sparkle.id}
          className="absolute inline-block"
          style={sparkle.style}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z" fill={sparkle.color}/>
          </svg>
        </motion.span>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default Sparkles;