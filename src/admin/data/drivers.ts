export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  rating: number;
  completedDeliveries: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  vehicles: string[];
  joinDate: string;
  isAvailable?: boolean;
}

export const driverStatusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'Active', label: 'Active' },
  { value: 'On Leave', label: 'On Leave' },
  { value: 'Inactive', label: 'Inactive' }
];

// Mock API functions
export const fetchDrivers = (): Promise<Driver[]> => {
  // Sample data
  const drivers: Driver[] = [
    { 
      id: '1001', 
      name: 'John Doe', 
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      rating: 4.9,
      completedDeliveries: 342,
      status: 'Active',
      vehicles: ['Small Truck', 'Van'],
      joinDate: 'Jan 15, 2024',
      isAvailable: true
    },
    { 
      id: '1002', 
      name: 'Alice Smith', 
      email: 'alice.smith@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Brooklyn, NY',
      rating: 4.8,
      completedDeliveries: 186,
      status: 'Active',
      vehicles: ['Van'],
      joinDate: 'Mar 8, 2024',
      isAvailable: true
    },
    { 
      id: '1003', 
      name: 'Robert Johnson', 
      email: 'robert.johnson@example.com',
      phone: '+1 (555) 345-6789',
      location: 'Queens, NY',
      rating: 4.7,
      completedDeliveries: 215,
      status: 'Active',
      vehicles: ['Large Truck', 'Small Truck'],
      joinDate: 'Feb 22, 2024',
      isAvailable: false
    },
    { 
      id: '1004', 
      name: 'Lisa Adams', 
      email: 'lisa.adams@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Manhattan, NY',
      rating: 4.9,
      completedDeliveries: 298,
      status: 'On Leave',
      vehicles: ['Van'],
      joinDate: 'Dec 5, 2023',
      isAvailable: false
    },
    { 
      id: '1005', 
      name: 'David Wilson', 
      email: 'david.wilson@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Bronx, NY',
      rating: 4.5,
      completedDeliveries: 127,
      status: 'Active',
      vehicles: ['Small Truck'],
      joinDate: 'Apr 18, 2024',
      isAvailable: true
    },
    { 
      id: '1006', 
      name: 'Sarah Martinez', 
      email: 'sarah.martinez@example.com',
      phone: '+1 (555) 678-9012',
      location: 'Staten Island, NY',
      rating: 4.6,
      completedDeliveries: 159,
      status: 'Inactive',
      vehicles: ['Van', 'Small Truck'],
      joinDate: 'Nov 30, 2023',
      isAvailable: false
    },
  ];
  
  return Promise.resolve(drivers);
};

export const updateDriverStatus = (id: string, status: 'Active' | 'On Leave' | 'Inactive'): Promise<boolean> => {
  // In a real app, this would make an API call to update the driver status
  console.log(`Updating driver ${id} status to ${status}`);
  return Promise.resolve(true);
};

export const updateDriverAvailability = (id: string, isAvailable: boolean): Promise<boolean> => {
  // In a real app, this would make an API call to update availability
  console.log(`Setting driver ${id} availability to ${isAvailable}`);
  return Promise.resolve(true);
};