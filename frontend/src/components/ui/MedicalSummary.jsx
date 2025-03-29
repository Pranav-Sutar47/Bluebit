import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock } from 'lucide-react';

const MedicalSummary = ({ historyData }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Shield size={18} className="text-blue-500 mr-2" />
        Medical Info Summary
      </h2>
      
      {historyData.length > 0 ? (
        <div className="space-y-4">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">Last updated</p>
              <p className="text-sm text-gray-500">{historyData[0]?.date || new Date().toLocaleDateString()}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100">
              <svg
                className="h-5 w-5 text-cyan-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">Current condition</p>
              <p className="text-sm text-gray-500">{historyData[0].currentDisease || 'None reported'}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">Allergies</p>
              <p className="text-sm text-gray-500">{historyData[0].allergyInformation || 'None reported'}</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-gray-600">No medical history available. Add your first record to get started.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalSummary;