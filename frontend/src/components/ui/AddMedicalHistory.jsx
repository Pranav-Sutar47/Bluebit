import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import LocationSearch from '@/components/ui/LocationSearch';

const AddMedicalHistoryModal = ({ 
  isOpen, 
  onClose, 
  medicalHistory, 
  handleInputChange, 
  handleSubmit, 
  isSubmitting, 
  submitSuccess,
  setSelectedLocation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Add Medical History</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-100"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-5">
          <div className="space-y-4">
            <div>
              <label htmlFor="currentDisease" className="block text-xs font-medium text-blue-600 mb-1">Current Disease</label>
              <input
                type="text"
                id="current_disease"
                name="current_disease"
                value={medicalHistory.current_disease}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                placeholder="Enter current conditions"
              />
            </div>
            
            <div>
              <label htmlFor="pastDisease" className="block text-xs font-medium text-blue-600 mb-1">Past Disease</label>
              <input
                type="text"
                id="past_disease"
                name="past_disease"
                value={medicalHistory.past_disease}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                placeholder="Enter past conditions"
              />
            </div>
            
            <div>
              <label htmlFor="allergyInformation" className="block text-xs font-medium text-blue-600 mb-1">Allergy Information</label>
              <input
                type="text"
                id="allergy_information"
                name="allergy_information"
                value={medicalHistory.allergy_information}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                placeholder="Enter allergies"
              />
            </div>
            
            <div>
              <label htmlFor="surgicalProcedure" className="block text-xs font-medium text-blue-600 mb-1">Surgical Procedure</label>
              <input
                type="text"
                id="surgical_procedure"
                name="surgical_procedure"
                value={medicalHistory.surgical_procedure}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                placeholder="Enter surgical procedures"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-600 mb-1">Location</label>
              <LocationSearch onSelectLocation={setSelectedLocation} />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <motion.button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg shadow-md text-xs font-medium text-white transition-colors relative ${
                submitSuccess ? 'bg-green-600' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
              }`}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.4), 0 4px 6px -2px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {submitSuccess ? (
                <span className="flex items-center">
                  <Check size={14} className="mr-1" />
                  Submitted
                </span>
              ) : isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <span>Submit</span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddMedicalHistoryModal;