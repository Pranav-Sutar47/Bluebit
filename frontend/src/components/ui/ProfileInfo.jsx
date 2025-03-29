import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const ProfileInformation = ({ user }) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <FileText size={18} className="text-blue-500 mr-2" />
        Profile Information
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div 
          className="bg-blue-50 rounded-xl p-4 hover:shadow-md transition-shadow"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-xs font-medium text-blue-600 mb-1">Username</label>
          <div className="bg-white border border-blue-100 rounded-md px-3 py-2 text-gray-700 font-medium text-sm">
            {user.name}
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-xs font-medium text-cyan-600 mb-1">Email Address</label>
          <div className="bg-white border border-cyan-100 rounded-md px-3 py-2 text-gray-700 font-medium text-sm">
            {user.email}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileInformation;