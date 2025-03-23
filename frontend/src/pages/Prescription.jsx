"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Upload, LogOut, User } from "lucide-react";
import axios from "axios";

// Navbar Components kept the same...

// Prescription Marquee Components
const Marquee = ({
  children,
  reverse = false,
  pauseOnHover = false,
  className = "",
}) => {
  return (
    <div
      className={`flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${
        pauseOnHover ? "group" : ""
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
    <div
      className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4
                  border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]
                  dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-sm font-medium dark:text-white">{name}</h3>
      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
        {description}
      </p>
    </div>
  );
};

// Skeleton Card Component for Loading State
const SkeletonCard = () => {
  return (
    <div
      className="relative h-full w-64 overflow-hidden rounded-xl border p-4
                  border-gray-950/[.1] bg-gray-950/[.01]
                  dark:border-gray-50/[.1] dark:bg-gray-50/[.10]"
    >
      <div className="aspect-square w-full overflow-hidden rounded-lg mb-3 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
    </div>
  );
};

// Main Page Component
const PrescriptionPage = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [medicine, setMedicine] = useState([]);

  const uniqueMedicines = useMemo(() => {
    return medicine.filter(
      (val, index, self) => index === self.findIndex((m) => m.medicine === val.medicine)
    );
  }, [medicine]);

  // Language mapping for OCR model format
  const languageOptions = {
    en: "English",
    ch: "Chinese",
    fr: "French",
    de: "German",
    ko: "Korean",
    ja: "Japanese",
    hi: "Hindi (Devanagari)",
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

  // Create an array for skeleton cards (same length as mockPrescriptions)
  const skeletonCards = Array(6)
    .fill(0)
    .map((_, index) => ({ id: index }));

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowResults(true); // Show the skeleton immediately
    setPrescriptions([]); // Clear any existing prescriptions

    // Here you would send the file and language code to your OCR model
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      formData.append("language", language);
    }

    try {
      const url = String(import.meta.env.VITE_MEDIURL) + "api/process_ocr/";

      const response = await axios.post(url, formData);

      if (response.status == 200) {
        console.log(response.data.medicines);
        setMedicine(response.data.medicines);
        // const uniqueMedicines = medicine.filter(
        //   (val, index, self) =>
        //     index === self.findIndex((m) => m.medicine === val.medicine)
        // );

        // setMedicine(uniqueMedicines);
      } else {
        setMedicine([]);
        console.log("Error while fetching data");
      }
    } catch (err) {
      console.error("Error at prescription page", err);
    } finally {
      setIsLoading(false);
      setShowResults(false);
    }
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
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

              {/* Language Selection */}
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
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    !file || isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Processing..." : "Analyze Prescription"}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section>
          {isLoading ? (
            <Marquee pauseOnHover className="[--duration:20s]">
              {skeletonCards.map((skeleton) => (
                <SkeletonCard key={skeleton.id} />
              ))}
            </Marquee>
          ) : (
            medicine &&
            medicine.length > 0 && (
              <>
                {medicine.map((val, index) => (
                  <div key={index}>
                    <h3>{val.medicine}</h3>
                    {Array.isArray(val.substitutes) &&
                    val.substitutes.length > 0 ? (
                      <Marquee pauseOnHover className="[--duration:20s]">
                        {val.substitutes.map((input, pos) => (
                          <PrescriptionCard
                            key={pos}
                            img={`${pos % val.substitutes.length}.jpg`}
                            name={input}
                            description=""
                          />
                        ))}
                      </Marquee>
                    ) : (
                      <div className="py-4 text-center text-gray-500 dark:text-gray-400">
                        {typeof val.substitutes === "string"
                          ? val.substitutes
                          : "No substitutes available"}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )
          )}

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-gray-50 dark:from-gray-900"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-gray-50 dark:from-gray-900"></div>
        </section>
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
      <style jsx global>
        {styles}
      </style>
      <PrescriptionPage />
    </>
  );
}
