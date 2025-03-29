import React from 'react';
import { motion } from 'framer-motion';
import { X, History } from 'lucide-react';

const MedicalHistoryModal = ({ isOpen, onClose, historyData }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Medical History</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-100"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
          {historyData.length > 0 ? (
            <div className="space-y-4">
              {historyData.map((record, index) => (
                <motion.div 
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 hover:shadow-lg transition-all"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-blue-600 text-sm">Record from {record.date}</h3>
                    <div className="bg-white text-xs px-2 py-1 rounded-full shadow text-blue-600">
                      Entry #{record.id || index + 1}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-blue-500 font-medium">Current Disease</p>
                      <p className="text-gray-900 font-medium text-sm mt-1">{record.currentDisease || 'None'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-blue-500 font-medium">Past Disease</p>
                      <p className="text-gray-900 font-medium text-sm mt-1">{record.pastDisease || 'None'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-blue-500 font-medium">Allergies</p>
                      <p className="text-gray-900 font-medium text-sm mt-1">{record.allergyInformation || 'None'}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-blue-500 font-medium">Surgical Procedures</p>
                      <p className="text-gray-900 font-medium text-sm mt-1">{record.surgicalProcedure || 'None'}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="bg-blue-100 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <History size={24} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No medical history found</h3>
              <p className="text-gray-500 max-w-md mx-auto text-sm">Add your first medical record to keep track of your health information.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalHistoryModal;