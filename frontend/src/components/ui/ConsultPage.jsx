import React, { useRef, useEffect, useState } from "react";
import ReactGlobe from "react-globe.gl";

export function ConsultPage() {
  const globeRef = useRef();
  const [globeSize, setGlobeSize] = useState(750); // Increased default size for large screens

  // Adjust globe size based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGlobeSize(400); // Increased size for small screens
      } else if (window.innerWidth < 1024) {
        setGlobeSize(600); // Increased size for medium screens
      } else {
        setGlobeSize(750); // Increased size for large screens
      }
    };

    // Set initial size
    handleResize();

    // Update size on window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure autoRotate is enabled for the globe only
  useEffect(() => {
    if (globeRef.current) {
      // Enable auto-rotation for the globe
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      
      // Disable background rotation by removing any animation classes
      const globeCanvas = document.querySelector('.scene-canvas');
      if (globeCanvas) {
        globeCanvas.style.background = 'none';
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: "url(//unpkg.com/three-globe/example/img/night-sky.png) no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      {/* Globe Container */}
      <div className="relative flex items-center justify-center h-screen">
        {/* Globe */}
        <ReactGlobe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          width={globeSize}
          height={globeSize}
          backgroundColor="rgba(0, 0, 0, 0)" // Transparent background
          atmosphereColor="rgba(65, 169, 255, 0.4)"
          enableGlow={true}
          glowCoefficient={0.1}
          glowPower={5}
          glowRadiusScale={0.2}
          animateIn={true}
          showGlobe={true}
          showAtmosphere={true}
          backgroundImageUrl={null} // Remove background image from the globe component
        />

        {/* Text Overlay - Reduced Size */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white text-sm sm:text-base md:text-lg lg:text-xl font-medium bg-black bg-opacity-50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg">
          Video Calling Coming Soon 🚀
        </div>
      </div>
    </div>
  );
}