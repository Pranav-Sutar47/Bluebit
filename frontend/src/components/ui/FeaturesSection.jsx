import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-8 shadow-lg group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      {/* Background gradient that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      {/* Decorative element */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
          <div className="relative">
            {/* Glow effect background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            
            {/* Gradient circle background */}
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full">
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        
        {/* Animated line */}
        <motion.div 
          className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-6 opacity-0 group-hover:opacity-100"
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              THE PRODUCT
            </span>
          </h2>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What is Medical Prescription OCR?
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            <span className="font-semibold text-purple-800">Medical Prescription OCR</span> is an advanced technology that automatically recognizes and captures 
            relevant information from both handwritten and printed medical prescriptions. Klippa DocHorizon, with
            its built-in AI-powered OCR, is capable of precise data extraction and format conversion for easy
            integration with any data management or ERP systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <FeatureCard 
            icon={
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V13.2M3 13.2C3 12.0799 3 11.5198 3.21799 11.092C3.40973 10.7157 3.71569 10.4097 4.09202 10.218C4.51984 10 5.07989 10 6.2 10H17.8C18.9201 10 19.4802 10 19.908 10.218C20.2843 10.4097 20.5903 10.7157 20.782 11.092C21 11.5198 21 12.0799 21 13.2M3 13.2H21M8 7L8 3M16 7V3M12 7V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 15.5H9M12 15.5H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 18H11M14 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            title="Improve Workflow Efficiency"
            description="Enhance your efficiency through the automated extraction of crucial patient and prescription data. Do more in less time."
            delay={0.1}
          />

          {/* Feature 2 */}
          <FeatureCard 
            icon={
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title="Ensure the Safety of Patients"
            description="Capture prescription details with nearly 100% accuracy for precise patient treatment and accurate medical archives."
            delay={0.2}
          />

          {/* Feature 3 */}
          <FeatureCard 
            icon={
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7639 4L14.2361 5.52786M14.2361 5.52786C14.726 5.01798 15.0049 4.33329 15.0049 3.59259C15.0049 2.1503 13.8546 0 12.4123 0C10.97 0 9.81966 2.1503 9.81966 3.59259C9.81966 4.33329 10.0986 5.01798 10.5884 5.52786M14.2361 5.52786H10.5884M8.97825 4L10.5884 5.52786M15 11.0741H16.8852C17.7009 11.0741 18.6489 11.6843 18.9672 12.4444L20.8361 16.9874C21.3443 18.2608 20.4754 19.6296 19.0656 19.6296H4.93443C3.52459 19.6296 2.65574 18.2608 3.16393 16.9874L5.03279 12.4444C5.35115 11.6843 6.31148 11.0741 7.12705 11.0741H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 10.0741V19.6296" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M13.918 17.037C13.918 18.1416 13.0226 19.037 11.918 19.037C10.8135 19.037 9.91803 18.1416 9.91803 17.037" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            title="Streamline Prescription Processing"
            description="Eliminate the need for manual data entry so pharmacists or hospital personnel can focus on patient care."
            delay={0.3}
          />
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-md font-medium shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 8px 10px -6px rgba(59, 130, 246, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started With Our OCR Technology
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;