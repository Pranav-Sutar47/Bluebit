"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import Chat from '@/components/ui/chat';

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto pt-24 px-6 pb-12">
        {/* Header */}
        <div className="mb-8 ">
          <div className="flex items-center space-x-2 mb-2">
            <a href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ChevronLeft size={20} />
            </a>
            {/* <h1 className="text-2xl md:text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              DoseWise Chatbot
            </h1> */}
          </div>
          {/* <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Ask questions about your medications, get dosage information, or learn about potential side effects.
            Our AI assistant is here to provide guidance on your prescriptions.
          </p> */}
        </div>
        
        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="h-[600px]">
              <Chat />
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <MessageCircle className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={18} />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Disclaimer:</strong> The information provided by this chatbot is for educational purposes only and 
                is not a substitute for professional medical advice. Always consult with your healthcare provider 
                regarding your medications and health concerns.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;

