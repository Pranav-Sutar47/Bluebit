
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, User, History, Check, ChevronRight, Shield, Clock, FileText } from 'lucide-react';

// SparklesEffect component
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

const ProfilePage = () => {
  const [user, setUser] = useState({
    email: '',
    username: ''
  });
  
  const [isViewHistoryOpen, setIsViewHistoryOpen] = useState(false);
  const [isAddHistoryOpen, setIsAddHistoryOpen] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState({
    currentDisease: '',
    pastDisease: '',
    allergyInformation: '',
    surgicalProcedure: ''
  });
  const [historyData, setHistoryData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data and medical history
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://127.0.0.1:8000/api/auth/get-user-details/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          setUser({
            email: data.email || '',
            username: data.username || ''
          });
          
          if (data.medicalHistory && data.medicalHistory.length > 0) {
            setHistoryData(data.medicalHistory);
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory({
      ...medicalHistory,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://127.0.0.1:8000/api/auth/update-medical-details/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(medicalHistory)
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmitSuccess(true);
        
        // Update history data with the new entry
        if (data.medicalHistory) {
          setHistoryData(data.medicalHistory);
        }
        
        setTimeout(() => {
          setIsAddHistoryOpen(false);
          setSubmitSuccess(false);
          setMedicalHistory({
            currentDisease: '',
            pastDisease: '',
            allergyInformation: '',
            surgicalProcedure: ''
          });
        }, 1500);
      } else {
        console.error('Failed to submit medical details');
      }
    } catch (error) {
      console.error('Error submitting medical details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-16 pb-12 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-blue-200/30 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-[10%] w-72 h-72 rounded-full bg-cyan-200/30 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            User Profile Dashboard
          </motion.div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            <SparklesEffect>
              Medical Profile Management
            </SparklesEffect>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Keep track of your medical history and maintain a comprehensive health profile
          </p>
        </motion.div>
        
        {/* Profile Card */}
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
            className="absolute bottom-4 left-4 bg-cyan-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg z-10"
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
                <User size={64} className="text-gray-400" />
              </motion.div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="pt-20 pb-8 px-6 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-8"></div>
                <div className="h-24 bg-gray-200 rounded w-full max-w-md"></div>
              </div>
            </div>
          ) : (
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
                    Add History
                  </motion.button>
                </div>
              </div>
              
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
                      {user.username}
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
                        <p className="text-sm text-gray-500">{historyData[0].date}</p>
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
            </div>
          )}
        </motion.div>
        
        {/* View History Modal */}
        {isViewHistoryOpen && (
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
                  onClick={() => setIsViewHistoryOpen(false)}
                  className="text-white hover:text-blue-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
                {historyData.length > 0 ? (
                  <div className="space-y-4">
                    {historyData.map((record) => (
                      <motion.div 
                        key={record.id}
                        className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 hover:shadow-lg transition-all"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium text-blue-600 text-sm">Record from {record.date}</h3>
                          <div className="bg-white text-xs px-2 py-1 rounded-full shadow text-blue-600">
                            Entry #{record.id}
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
        )}
        
        {/* Add History Modal */}
        {isAddHistoryOpen && (
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
                  onClick={() => setIsAddHistoryOpen(false)}
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
                      id="currentDisease"
                      name="currentDisease"
                      value={medicalHistory.currentDisease}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                      placeholder="Enter current conditions"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="pastDisease" className="block text-xs font-medium text-blue-600 mb-1">Past Disease</label>
                    <input
                      type="text"
                      id="pastDisease"
                      name="pastDisease"
                      value={medicalHistory.pastDisease}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                      placeholder="Enter past conditions"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="allergyInformation" className="block text-xs font-medium text-blue-600 mb-1">Allergy Information</label>
                    <input
                      type="text"
                      id="allergyInformation"
                      name="allergyInformation"
                      value={medicalHistory.allergyInformation}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                      placeholder="Enter allergies"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="surgicalProcedure" className="block text-xs font-medium text-blue-600 mb-1">Surgical Procedure</label>
                    <input
                      type="text"
                      id="surgicalProcedure"
                      name="surgicalProcedure"
                      value={medicalHistory.surgicalProcedure}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-blue-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-blue-50 text-sm"
                      placeholder="Enter surgical procedures"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <motion.button
                    type="button"
                    onClick={() => setIsAddHistoryOpen(false)}
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
        )}
      </div>
    </div>
  );
};

export default ProfilePage;