"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Upload, LogOut, User } from 'lucide-react';

// Navbar Components
const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by looking for token
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);

    const controlNavbar = () => {
      if (window.scrollY < lastScrollY || window.scrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header 
          className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 z-50"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">DoseWise</span>
                </a>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <NavLink href="/prescriptions">Prescriptions</NavLink>
                <NavLink href="/chatbot">Chatbot</NavLink>
              </nav>
              
              {/* Auth Section */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                        <User size={16} />
                      </div>
                      <ChevronDown size={16} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div 
                          className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg border border-gray-100"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            My Profile
                          </a>
                          <button 
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Logout
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a 
                    href="/login" 
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md hover:opacity-90 transition-opacity"
                  >
                    Login
                  </a>
                )}
                
                <a 
                  href="/consult" 
                  className="hidden md:block px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Consult Now
                </a>
              </div>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <a href={href} className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 group">
      {children}
      <motion.span 
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500" 
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.2 }}
      />
    </a>
  );
};

// Prescription Marquee Components
const Marquee = ({ children, reverse = false, pauseOnHover = false, className = "" }) => {
  return (
    <div 
      className={`flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${
        pauseOnHover ? 'group' : ''
      } ${className}`}
    >
      <div 
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 py-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {children}
      </div>
      <div 
        className={`flex min-w-full shrink-0 items-center justify-around gap-4 py-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const PrescriptionCard = ({ img, name, description }) => {
  return (
    <div className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4
                  border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]
                  dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]">
      <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-sm font-medium dark:text-white">{name}</h3>
      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">{description}</p>
    </div>
  );
};

// Main Page Component
const PrescriptionPage = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  
  // Language mapping for OCR model format
  const languageOptions = {
    "en": "English",
    "ch": "Chinese",
    "fr": "French",
    "de": "German",
    "ko": "Korean",
    "ja": "Japanese",
    "hi": "Hindi (Devanagari)"
  };
  
  // Mock prescription data
  const mockPrescriptions = [
    {
      id: 1,
      name: "Amoxicillin",
      description: "Take 1 capsule by mouth 3 times daily for 7 days",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
    {
      id: 2,
      name: "Lisinopril",
      description: "Take 1 tablet by mouth daily for blood pressure",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
    {
      id: 3,
      name: "Metformin",
      description: "Take 1 tablet twice daily with meals",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
    {
      id: 4,
      name: "Atorvastatin",
      description: "Take 1 tablet daily in the evening",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
    {
      id: 5,
      name: "Levothyroxine",
      description: "Take 1 tablet daily in the morning before breakfast",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
    {
      id: 6,
      name: "Amlodipine",
      description: "Take 1 tablet by mouth daily for blood pressure",
      img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FZerodeko-Capsules-Plastic-Supplies-Realistic%2Fdp%2FB0BWS3MRN8&psig=AOvVaw2B5_WOjPiRG2VZMxgfxPdx&ust=1742799427832000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIihkvjPn4wDFQAAAAAdAAAAABAE",
    },
  ];

  const firstRow = mockPrescriptions.slice(0, mockPrescriptions.length / 2);
  // const secondRow = mockPrescriptions.slice(mockPrescriptions.length / 2);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Here you would send the file and language code to your OCR model
    // Example of preparing data for API call:
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
      formData.append('language', language); // Using the language code format like 'en', 'ch', etc.
    }
    
    // Simulate API call
    console.log(`Sending image with language code: ${language}`);
    
    // Simulate API response
    setTimeout(() => {
      setIsLoading(false);
      setPrescriptions(mockPrescriptions);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <Navbar /> */}
      
      <main className="container mx-auto pt-24 px-6 pb-12">
        {/* Form Section */}
        <section className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
              Upload Your Prescription
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Prescription Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        JPEG, PNG or PDF (MAX. 10MB)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleFileChange}
                      accept="image/jpeg,image/png,application/pdf"
                    />
                  </label>
                </div>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {file.name}
                  </p>
                )}
              </div>
              
              {/* Language Selection - Updated to use language codes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Prescription Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {Object.entries(languageOptions).map(([code, name]) => (
                    <option key={code} value={code}>{name}</option>
                  ))}
                </select>
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    (!file || isLoading) ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Analyze Prescription'}
                </button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Results Section */}
        {prescriptions.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6 text-center">
              Your Prescription Details
            </h2>
            
            <div className="relative overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((prescription) => (
                  <PrescriptionCard 
                    key={prescription.id}
                    img={prescription.img}
                    name={prescription.name}
                    description={prescription.description}
                  />
                ))}
              </Marquee>
              
              {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((prescription) => (
                  <PrescriptionCard 
                    key={prescription.id}
                    img={prescription.img}
                    name={prescription.name}
                    description={prescription.description}
                  />
                ))}
              </Marquee> */}
              
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50 dark:from-gray-900"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50 dark:from-gray-900"></div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

// CSS Animations for Marquee with pause-on-hover
const styles = `
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 1rem));
  }
}

@keyframes marquee-reverse {
  from {
    transform: translateX(calc(-100% - 1rem));
  }
  to {
    transform: translateX(0);
  }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}

.animate-marquee-reverse {
  animation: marquee-reverse 20s linear infinite;
}

/* Pause animation on parent hover */
.group:hover .animate-marquee,
.group:hover .animate-marquee-reverse {
  animation-play-state: paused;
}
`;

// Export the page component
export default function Page() {
  return (
    <>
      <style jsx global>{styles}</style>
      <PrescriptionPage />
    </>
  );
}
