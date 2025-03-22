import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import axios from 'axios'
import AppContext from '@/context/AppContext';

const AuthButton = ({ user }) => {

    const {setLogin} = useContext(AppContext);

    const handleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const idToken = await result.user.getIdToken();
  
        const url = String(import.meta.env.VITE_BASEURL) + "auth/login/";
 
        const response = await axios.post(url, { idToken }, {
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.status === 200) {
          alert('User is authenticated');
          setLogin(true);
          localStorage.setItem('token',response.data.tokens.access);
        } else {
          alert('Error',response.data);
          setLogin(false);
        }
      } catch (error) {
        setLogin(false);
        console.error("Error during login:", error);
      }
    };

  // If user is logged in, show profile icon
  if (user) {
    return (
      <motion.div 
        className="flex items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <img 
            src={user.avatar || "/api/placeholder/40/40"} 
            alt="Profile" 
            className="h-10 w-10 rounded-full border-2 border-blue-500"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
        </div>
      </motion.div>
    );
  }

  // Otherwise, show login button
  return (
    <motion.button
      className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogin}
    >
      Login
    </motion.button>
  );
};

export default AuthButton;