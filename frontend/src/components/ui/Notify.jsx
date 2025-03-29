import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, CheckCircle } from 'lucide-react';
import AppContext from '../../context/AppContext'; 

const NotificationButton = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(AppContext); 
  const [notifications, setNotifications] = useState([]);

  // Set notifications from user.suggestions if available
  React.useEffect(() => {
    // if (user && user.suggestions) 
      // Transform suggestions into notification format

      console.log('user',user)

    //   const suggestionNotifications = user.suggestions.map((suggestion, index) => ({
    //     id: `suggestion-${index}`,
    //     user: {
    //       name: suggestion.from || 'System',
    //       avatar: suggestion.avatar || '/api/placeholder/40/40' // Placeholder if no avatar
    //     },
    //     action: suggestion.action || 'sent a suggestion',
    //     message: suggestion.message || suggestion.content,
    //     timestamp: suggestion.timestamp || 'Just now'
    //   }));
      
    //   setNotifications(suggestionNotifications);
    // }
  }, []);

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest('.notification-container')) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener when dropdown is open
  React.useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative notification-container">
      {/* Notification Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleDropdown}
        className="relative bg-gray-100 dark:bg-gray-800 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      >
        {isDropdownOpen ? (
          <BellRing className="w-6 h-6 text-primary" />
        ) : (
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
        
        {notifications.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs 
            rounded-full w-5 h-5 flex items-center justify-center"
          >
            {notifications.length}
          </motion.span>
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50"
          >
            {/* Dropdown Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-semibold flex items-center">
                <Bell className="mr-2 w-5 h-5 text-primary" />
                Notifications
              </h3>
              {notifications.length > 0 && (
                <button 
                  onClick={handleMarkAllRead}
                  className="text-sm text-gray-500 hover:text-primary flex items-center"
                >
                  <CheckCircle className="mr-1 w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[350px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={notification.user.avatar} 
                        alt={notification.user.name} 
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{notification.user.name}</span>{' '}
                          {notification.action}
                        </p>
                        {notification.message && (
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.message}
                          </p>
                        )}
                        <span className="text-xs text-gray-400 block mt-1">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 text-center border-t dark:border-gray-700">
                <button className="text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationButton;