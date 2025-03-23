import React, { useState, useRef, useEffect } from "react";
import { sendMessageToGemini } from '../../services/gemini';

// Chat Message Component
const ChatMessage = ({ message, isBot }) => {
  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } mb-4`}
    >
      <div className="flex gap-3 max-w-[80%]">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
            isBot
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {isBot ? <BotIcon size={16} /> : <UserIcon size={16} />}
        </div>
        <div
          className={`p-4 rounded-lg ${
            isBot
              ? "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

// Loading Animation Component
const LoadingAnimation = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex gap-3 max-w-[80%]">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex-shrink-0">
          <BotIcon size={16} />
        </div>
        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty Chat State Component
const EmptyChatState = ({ onSuggestionClick }) => {
  const suggestions = [
    "What are the side effects of Amoxicillin?",
    "How do I properly take Lisinopril?",
    "What should I do if I miss a dose?",
    "Are there foods I should avoid with my medication?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white mb-4">
        <BotIcon size={32} />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
        Welcome to DoseWise Assistant
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        Ask me about medications, prescription details, or general health questions. I'm here to help!
      </p>
      <div className="space-y-3 max-w-md w-full">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="w-full p-3 text-left text-sm rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

// Icon Components (since we might not have Lucide available)
const SendIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const BotIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"></rect>
    <circle cx="12" cy="5" r="2"></circle>
    <path d="M12 7v4"></path>
    <line x1="8" y1="16" x2="8" y2="16"></line>
    <line x1="16" y1="16" x2="16" y2="16"></line>
  </svg>
);

const UserIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const LoaderIcon = ({ size = 24 }) => (
  <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

// Main Chat Component
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Function to handle sending a message
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      role: "user",
      content: inputValue.trim()
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the Gemini API service
      console.log("Sending message to Gemini:", userMessage.content);
      const response = await sendMessageToGemini(userMessage.content);
      
      console.log("Response from Gemini:", response);
      
      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response
        }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble processing your request right now. Please try again later."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle suggestion clicks
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setTimeout(() => {
      const formEvent = { preventDefault: () => {} };
      handleSendMessage(formEvent);
    }, 100);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white">
            <BotIcon size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">DoseWise Assistant</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by DoseWise</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <EmptyChatState onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isBot={message.role === "assistant"}
              />
            ))}
            {isLoading && <LoadingAnimation />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`p-3 rounded-lg ${
              isLoading || !inputValue.trim()
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90"
            } text-white transition-colors`}
          >
            {isLoading ? (
              <LoaderIcon size={20} />
            ) : (
              <SendIcon size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;