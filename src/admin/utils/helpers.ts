import { ADMIN_CONSTANTS } from './constants';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case ADMIN_CONSTANTS.ORDER_STATUSES.COMPLETED:
    case ADMIN_CONSTANTS.DRIVER_STATUSES.ACTIVE:
    case ADMIN_CONSTANTS.CUSTOMER_STATUSES.ACTIVE:
      return 'text-green-600 bg-green-100';
    case ADMIN_CONSTANTS.ORDER_STATUSES.IN_PROGRESS:
      return 'text-blue-600 bg-blue-100';
    case ADMIN_CONSTANTS.ORDER_STATUSES.PENDING:
      return 'text-yellow-600 bg-yellow-100';
    case ADMIN_CONSTANTS.ORDER_STATUSES.CANCELLED:
    case ADMIN_CONSTANTS.DRIVER_STATUSES.SUSPENDED:
    case ADMIN_CONSTANTS.CUSTOMER_STATUSES.SUSPENDED:
      return 'text-red-600 bg-red-100';
    case ADMIN_CONSTANTS.DRIVER_STATUSES.INACTIVE:
    case ADMIN_CONSTANTS.CUSTOMER_STATUSES.INACTIVE:
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MM${timestamp.slice(-6)}${random}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const sortByDate = <T extends { [key: string]: any }>(
  array: T[],
  dateField: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]).getTime();
    const dateB = new Date(b[dateField]).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const filterBySearch = <T extends { [key: string]: any }>(
  array: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item =>
    searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(term);
    })
  );
}; 