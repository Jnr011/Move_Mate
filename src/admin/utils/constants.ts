export const ADMIN_CONSTANTS = {
  // Order statuses
  ORDER_STATUSES: {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },

  // Driver statuses
  DRIVER_STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
  },

  // Customer statuses
  CUSTOMER_STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
  },

  // Vehicle types
  VEHICLE_TYPES: [
    'Pickup Truck',
    'Box Truck',
    'Moving Van',
    'Flatbed Truck',
    'Refrigerated Truck',
  ],

  // Notification types
  NOTIFICATION_TYPES: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
  },

  // Pagination
  ITEMS_PER_PAGE: 10,

  // Date formats
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    INPUT: 'yyyy-MM-dd',
    DATETIME: 'MMM dd, yyyy HH:mm',
  },

  // API endpoints (for future use)
  API_ENDPOINTS: {
    ORDERS: '/api/orders',
    DRIVERS: '/api/drivers',
    CUSTOMERS: '/api/customers',
    ANALYTICS: '/api/analytics',
    NOTIFICATIONS: '/api/notifications',
  },

  // Colors for charts and UI
  CHART_COLORS: {
    PRIMARY: '#3B82F6',
    SECONDARY: '#1E40AF',
    SUCCESS: '#10B981',
    WARNING: '#F59E0B',
    ERROR: '#EF4444',
    INFO: '#06B6D4',
  },

  // Default settings
  DEFAULT_SETTINGS: {
    PLATFORM_FEE_PERCENTAGE: 30,
    DRIVER_PAYOUT_PERCENTAGE: 70,
    MINIMUM_ORDER_AMOUNT: 25,
    MAXIMUM_ORDER_AMOUNT: 1000,
    AUTO_APPROVE_DRIVERS: false,
    AUTO_APPROVE_ORDERS: false,
  },
};

export const ORDER_STATUS_LABELS = {
  [ADMIN_CONSTANTS.ORDER_STATUSES.PENDING]: 'Pending',
  [ADMIN_CONSTANTS.ORDER_STATUSES.IN_PROGRESS]: 'In Progress',
  [ADMIN_CONSTANTS.ORDER_STATUSES.COMPLETED]: 'Completed',
  [ADMIN_CONSTANTS.ORDER_STATUSES.CANCELLED]: 'Cancelled',
};

export const DRIVER_STATUS_LABELS = {
  [ADMIN_CONSTANTS.DRIVER_STATUSES.ACTIVE]: 'Active',
  [ADMIN_CONSTANTS.DRIVER_STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_CONSTANTS.DRIVER_STATUSES.SUSPENDED]: 'Suspended',
};

export const CUSTOMER_STATUS_LABELS = {
  [ADMIN_CONSTANTS.CUSTOMER_STATUSES.ACTIVE]: 'Active',
  [ADMIN_CONSTANTS.CUSTOMER_STATUSES.INACTIVE]: 'Inactive',
  [ADMIN_CONSTANTS.CUSTOMER_STATUSES.SUSPENDED]: 'Suspended',
}; 