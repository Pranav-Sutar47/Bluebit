import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import axios from 'axios'
import AppContext from '@/context/AppContext';

const AuthButton = () => {

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