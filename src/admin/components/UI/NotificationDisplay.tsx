import React, { useState } from 'react';
import { Bell, X, Check, AlertTriangle, Info, MessageSquare } from 'lucide-react';
import { useNotification } from '../UI/Notification';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const NotificationDisplay: React.FC = () => {
  const { showNotification } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'System Update',
      message: 'MoveMate system will be updated tonight at 2 AM',
      time: '10 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Order Completed',
      message: 'Order #1042 has been successfully delivered',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Driver Alert',
      message: 'Driver John Doe is running late on delivery #3842',
      time: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      message: 'You have a new message from Customer Support',
      time: '5 hours ago',
      read: true
    }
  ]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    showNotification({
      type: 'success',
      message: 'All notifications marked as read',
      duration: 3000
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-teal-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={toggleNotifications}
        className="relative p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        aria-label="View notifications"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fade-in-down">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-teal-600 hover:text-teal-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`relative p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-teal-50' : ''
                    }`}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-grow" onClick={() => markAsRead(notification.id)}>
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-gray-500"
                            aria-label="Remove notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                    {!notification.read && (
                      <span className="absolute top-4 right-4 w-2 h-2 bg-teal-500 rounded-full"></span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 border-t text-center">
            <button 
              className="text-sm text-teal-600 hover:text-teal-800"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDisplay;