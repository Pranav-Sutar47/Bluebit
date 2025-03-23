import React from 'react';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/ui/Hero';
import Features from '../components/ui/FeaturesSection';
import Footer from '../components/ui/Footer'

const LandingPage = () => {
  // You would normally get this from your auth provider
  //const user = null; // Set to null for logged out state, or an object with user data when logged in
  
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Footer/>
      {/* You can add more sections here as needed */}
      {/* For example: Testimonials, Pricing, FAQ, etc. */}
    </div>
  );
};

export default LandingPage;