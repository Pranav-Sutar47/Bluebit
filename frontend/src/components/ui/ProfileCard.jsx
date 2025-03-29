import React from 'react';
import { motion } from 'framer-motion';
import { History, Plus, FileText, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import ProfileInformation from './ProfileInfo';
import MedicalSummary from './MedicalSummary';

const ProfileCard = ({ 
  user, 
  isLoading, 
  historyData, 
  setIsViewHistoryOpen, 
  setIsAddHistoryOpen 
}) => {
  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden relative max-w-4xl mx-auto"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-32 sm:h-40 relative"></div>
        <div className="pt-20 pb-8 px-6 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="h-24 bg-gray-200 rounded w-full max-w-md"></div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden relative max-w-4xl mx-auto"
    >
      {/* Floating elements */}
      <motion.div 
        className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg z-10"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      >
        Secure Profile
      </motion.div>
        
      <motion.div 
        className="absolute bottom-2 left-4 bg-cyan-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg z-10"
        animate={{
          y: [0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: 1
        }}
      >
        AI Protected
      </motion.div>
      
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 h-32 sm:h-40 relative">
        <div className="absolute -bottom-16 sm:-bottom-20 left-6 sm:left-8">
          <motion.div 
            className="rounded-full h-32 w-32 sm:h-40 sm:w-40 border-4 border-white bg-white shadow-lg flex items-center justify-center overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.2)"
            }}
          >
            <Avatar className="h-full w-full flex items-center justify-center">
              <AvatarFallback className="text-4xl sm:text-5xl font-semibold text-gray-600">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>
      </div>
      
      <div className="pt-20 sm:pt-24 pb-8 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.username}</h1>
            <p className="text-gray-600 flex items-center text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              {user.email}
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-col xs:flex-row gap-3">
            {historyData.length > 0 && (
              <motion.button 
                onClick={() => setIsViewHistoryOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium text-sm transition-all"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <History size={16} className="mr-2" />
                View History
              </motion.button>
            )}
            <motion.button 
              onClick={() => setIsAddHistoryOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium text-sm transition-all shadow-md"
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} className="mr-2" />
              Add Medical History
            </motion.button>
          </div>
        </div>
        
        <ProfileInformation user={user} />
        
        <MedicalSummary historyData={historyData} />
      </div>
    </motion.div>
  );
};

export default ProfileCard;