export interface Order {
  id: string;
  date: string;
  customer: string;
  pickup: string;
  delivery: string;
  status: OrderStatus;
  amount: string;
  driver: string;
  items?: OrderItem[];
  notes?: string;
  estimatedDeliveryTime?: string;
  trackingNumber?: string;
  paymentMethod?: string;
  contactPhone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type OrderStatus = 'Completed' | 'In Progress' | 'Scheduled' | 'Cancelled' | 'Pending';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  weight: string;
  dimensions: string;
  fragile: boolean;
}

// Sample order data
export const ordersData: Order[] = [
  { 
    id: '1001', 
    date: 'Apr 28, 2025', 
    customer: 'John Smith', 
    pickup: '123 Main St, New York, NY', 
    delivery: '456 Broad St, New York, NY',
    status: 'Completed', 
    amount: '$59.99',
    driver: 'Robert Johnson',
    items: [
      {
        id: 'item-001',
        name: 'Small Package',
        quantity: 1,
        weight: '5 lbs',
        dimensions: '12" x 8" x 6"',
        fragile: false
      }
    ],
    notes: 'Leave at the front door if no one answers',
    estimatedDeliveryTime: '1:30 PM',
    trackingNumber: 'MM-1001-NY',
    paymentMethod: 'Credit Card',
    contactPhone: '(212) 555-1234',
    createdAt: 'Apr 27, 2025 10:15 AM',
    updatedAt: 'Apr 28, 2025 2:00 PM'
  },
  { 
    id: '1002', 
    date: 'Apr 27, 2025', 
    customer: 'Lisa Johnson', 
    pickup: '789 Park Ave, New York, NY', 
    delivery: '101 Broadway, New York, NY',
    status: 'In Progress', 
    amount: '$129.99',
    driver: 'Alice Smith',
    items: [
      {
        id: 'item-002',
        name: 'Large Package',
        quantity: 1,
        weight: '15 lbs',
        dimensions: '24" x 18" x 12"',
        fragile: true
      },
      {
        id: 'item-003',
        name: 'Document Envelope',
        quantity: 1,
        weight: '0.5 lbs',
        dimensions: '9" x 12" x 0.5"',
        fragile: false
      }
    ],
    notes: 'Call customer before delivery',
    estimatedDeliveryTime: '5:45 PM',
    trackingNumber: 'MM-1002-NY',
    paymentMethod: 'PayPal',
    contactPhone: '(212) 555-5678',
    createdAt: 'Apr 27, 2025 9:00 AM',
    updatedAt: 'Apr 27, 2025 10:30 AM'
  },
  { 
    id: '1003', 
    date: 'Apr 27, 2025', 
    customer: 'Michael Brown', 
    pickup: '202 5th Ave, New York, NY', 
    delivery: '303 Madison Ave, New York, NY',
    status: 'Scheduled', 
    amount: '$89.50',
    driver: 'John Doe',
    items: [
      {
        id: 'item-004',
        name: 'Medium Package',
        quantity: 2,
        weight: '8 lbs each',
        dimensions: '18" x 12" x 10"',
        fragile: false
      }
    ],
    notes: 'Business delivery, reception closes at 6 PM',
    estimatedDeliveryTime: '2:30 PM',
    trackingNumber: 'MM-1003-NY',
    paymentMethod: 'Corporate Account',
    contactPhone: '(212) 555-9012',
    createdAt: 'Apr 26, 2025 4:20 PM',
    updatedAt: 'Apr 27, 2025 8:15 AM'
  },
  { 
    id: '1004', 
    date: 'Apr 26, 2025', 
    customer: 'Emma Davis', 
    pickup: '404 Lexington Ave, New York, NY', 
    delivery: '505 3rd Ave, New York, NY',
    status: 'Completed', 
    amount: '$75.25',
    driver: 'Lisa Adams',
    items: [
      {
        id: 'item-005',
        name: 'Fragile Package',
        quantity: 1,
        weight: '3 lbs',
        dimensions: '10" x 10" x 10"',
        fragile: true
      }
    ],
    notes: 'Handle with care, contains glass items',
    estimatedDeliveryTime: '11:15 AM',
    trackingNumber: 'MM-1004-NY',
    paymentMethod: 'Credit Card',
    contactPhone: '(212) 555-3456',
    createdAt: 'Apr 25, 2025 3:40 PM',
    updatedAt: 'Apr 26, 2025 11:30 AM'
  },
  { 
    id: '1005', 
    date: 'Apr 25, 2025', 
    customer: 'David Wilson', 
    pickup: '606 7th Ave, New York, NY', 
    delivery: '707 8th Ave, New York, NY',
    status: 'Cancelled', 
    amount: '$0.00',
    driver: 'N/A',
    items: [
      {
        id: 'item-006',
        name: 'Small Package',
        quantity: 1,
        weight: '2 lbs',
        dimensions: '8" x 6" x 4"',
        fragile: false
      }
    ],
    notes: 'Customer cancelled due to change of plans',
    trackingNumber: 'MM-1005-NY',
    paymentMethod: 'N/A',
    contactPhone: '(212) 555-7890',
    createdAt: 'Apr 24, 2025 2:10 PM',
    updatedAt: 'Apr 25, 2025 9:45 AM'
  },
  { 
    id: '1006', 
    date: 'Apr 25, 2025', 
    customer: 'Sarah Martinez', 
    pickup: '808 9th Ave, New York, NY', 
    delivery: '909 10th Ave, New York, NY',
    status: 'In Progress', 
    amount: '$149.99',
    driver: 'Robert Johnson',
    items: [
      {
        id: 'item-007',
        name: 'Large Package',
        quantity: 1,
        weight: '20 lbs',
        dimensions: '30" x 20" x 15"',
        fragile: false
      }
    ],
    notes: 'Signature required upon delivery',
    estimatedDeliveryTime: '4:45 PM',
    trackingNumber: 'MM-1006-NY',
    paymentMethod: 'Credit Card',
    contactPhone: '(212) 555-2345',
    createdAt: 'Apr 24, 2025 5:30 PM',
    updatedAt: 'Apr 25, 2025 1:15 PM'
  },
  { 
    id: '1007', 
    date: 'Apr 24, 2025', 
    customer: 'Daniel Lee', 
    pickup: '111 42nd St, New York, NY', 
    delivery: '222 34th St, New York, NY',
    status: 'Completed', 
    amount: '$95.75',
    driver: 'John Doe',
    items: [
      {
        id: 'item-008',
        name: 'Document Package',
        quantity: 1,
        weight: '1 lb',
        dimensions: '15" x 12" x 1"',
        fragile: false
      }
    ],
    notes: 'Deliver to legal department, 15th floor',
    estimatedDeliveryTime: '10:30 AM',
    trackingNumber: 'MM-1007-NY',
    paymentMethod: 'Corporate Account',
    contactPhone: '(212) 555-6789',
    createdAt: 'Apr 23, 2025 4:50 PM',
    updatedAt: 'Apr 24, 2025 10:45 AM'
  },
];