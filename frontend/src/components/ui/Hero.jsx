import React from 'react';
import { motion } from 'framer-motion';
import SparklesEffect from './SparklesEffect';
import { useNavigate } from 'react-router-dom';
import { toast, useToast } from '@/hooks/use-toast';

const Hero = () => {

  const navigate = useNavigate();

  const {toast} = useToast();

  const handleClick = ()=>{
    if(localStorage.getItem('token'))
      navigate('/prescriptions');
    else 
    toast({
      className: "text-white bg-teal-800",
      title: "Plase Login first!"
    });
  }

  return (
    <section className="relative pt-32 ml-10 mr-10 pb-20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Animated background blobs */}
      <motion.div 
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-blue-200/30 blur-3xl"
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
        className="absolute bottom-20 left-[10%] w-80 h-80 rounded-full bg-cyan-200/30 blur-3xl"
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

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left content */}
          <div className="lg:w-1/2 lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <motion.div
                  className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Medical Prescription AI
                </motion.div>
              </div>
              
              <h1 className="text-[35px] font-[Work Sans] font-bold text-gray-800 mb-6">
                <SparklesEffect>
                  Smart Medical Prescription
                </SparklesEffect>
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  OCR Technology
                </span>
              </h1>
              
              <p className="text-[20px] font-[Work Sans] text-gray-600 mb-8">
                Automate your medical workflows by extracting essential data from prescriptions using our <span className="font-semibold">AI-powered OCR</span>.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                <motion.button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.2)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClick}
                >
                  Try For Free
                </motion.button>
                
                <motion.button 
                  className="border border-gray-300 hover:border-blue-400 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Watch Demo
                </motion.button>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">Reduce your turnaround time by <span className="font-bold">up to 70%</span></p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
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
                  <p className="text-gray-700">Benefit from <span className="font-bold">99%</span> data extraction accuracy</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">HIPAA compliant and <span className="font-bold">secure</span> processing</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Prescription Demo */}
          <div className="lg:w-1/2 mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-10 -right-6 bg-blue-500 text-white text-xs px-3 py-1 rounded-lg shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                >
                  AI-Powered
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-cyan-500 text-white text-xs px-3 py-1 rounded-lg shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  Secure & Fast
                </motion.div>
                
                {/* Main prescription card */}
                {/* <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <div className="text-sm text-blue-600 font-medium mb-1">DoseWise Medical Center</div>
                    <div className="text-sm text-blue-600 font-medium">Medical Prescription</div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Patient Name:</span>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Patient Age:</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Prescription Date:</span>
                      <span className="font-medium">03/22/2025</span>
                    </div>
                    
                    <div className="mt-4 border border-blue-200 rounded-lg p-3 bg-blue-50">
                      <div className="text-sm text-blue-600">Prescription:</div>
                      <div className="text-sm font-medium">Amoxicillin 500mg</div>
                      <div className="text-xs text-gray-500 mt-1">Take 1 tablet 3 times daily after meals</div>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <div className="text-gray-500">Signed by:</div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Dr. Maria A. Smith, MD.</span>
                        <svg className="h-10 w-20" viewBox="0 0 100 50">
                          <path
                            d="M10 25C20 10 40 40 50 25C60 10 80 40 90 25"
                            fill="none"
                            stroke="black"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div> */}
                
                {/* Extraction indicator */}
                <motion.div 
                  className="absolute right-4 bottom-20"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  {/* <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm px-3 py-1 rounded-full shadow-lg">
                    Prescription extracted
                  </span> */}
                </motion.div>
              </div>
              
              {/* Doctor with laptop */}
              <motion.div 
                className="mt-8 relative z-10"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://www.klippa.com/wp-content/uploads/2024/04/medical-prescription-ocr.png" 
                  alt="Doctor using DoseWise on laptop" 
                  className="rounded-2xl " 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;