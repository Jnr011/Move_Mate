import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const iconMap = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };

  const colorMap = {
    success: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };

  const iconColorMap = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`flex items-start p-4 rounded-lg shadow-md border ${colorMap[type]} animate-fade-in-down`}
      role="alert"
    >
      <div className={`flex-shrink-0 mr-3 ${iconColorMap[type]}`}>
        {iconMap[type]}
      </div>
      
      <div className="flex-grow">
        <h4 className="text-sm font-medium">{message}</h4>
        {description && <p className="text-sm opacity-75 mt-1">{description}</p>}
      </div>
      
      <button
        onClick={handleClose}
        className="ml-4 text-gray-400 hover:text-gray-500"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Notification Container Component
interface NotificationContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  children,
  position = 'top-right'
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
  };

  return (
    <div className={`fixed z-50 m-4 space-y-2 ${positionClasses[position]}`}>
      {children}
    </div>
  );
};

// Notification Context
import { createContext, useContext } from 'react';

interface NotificationContextType {
  showNotification: (props: Omit<NotificationProps, 'onClose'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
  position?: NotificationContainerProps['position'];
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  position = 'top-right'
}) => {
  const [notifications, setNotifications] = useState<(NotificationProps & { id: string })[]>([]);

  const showNotification = (props: Omit<NotificationProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { ...props, id, onClose: () => removeNotification(id) }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationContainer position={position}>
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

export default Notification;