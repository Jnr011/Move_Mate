    import React, { useState } from 'react';
import { Search, Filter, Plus, MapPin, Phone } from 'lucide-react';

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // In a real app, this data would come from an API
  const customers = [
    { 
      id: '2001', 
      name: 'John Smith', 
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY',
      totalOrders: 14,
      totalSpent: '$1,245.89',
      status: 'Active',
      joinDate: 'Jan 10, 2024',
      lastOrder: 'Apr 28, 2025'
    },
    { 
      id: '2002', 
      name: 'Lisa Johnson', 
      email: 'lisa.johnson@example.com',
      phone: '+1 (555) 234-5678',
      address: '789 Park Ave, New York, NY',
      totalOrders: 8,
      totalSpent: '$892.50',
      status: 'Active',
      joinDate: 'Feb 15, 2024',
      lastOrder: 'Apr 27, 2025'
    },
    { 
      id: '2003', 
      name: 'Michael Brown', 
      email: 'michael.brown@example.com',
      phone: '+1 (555) 345-6789',
      address: '202 5th Ave, New York, NY',
      totalOrders: 5,
      totalSpent: '$456.75',
      status: 'Active',
      joinDate: 'Mar 5, 2024',
      lastOrder: 'Apr 27, 2025'
    },
    { 
      id: '2004', 
      name: 'Emma Davis', 
      email: 'emma.davis@example.com',
      phone: '+1 (555) 456-7890',
      address: '404 Lexington Ave, New York, NY',
      totalOrders: 12,
      totalSpent: '$1,123.45',
      status: 'Active',
      joinDate: 'Nov 20, 2023',
      lastOrder: 'Apr 26, 2025'
    },
    { 
      id: '2005', 
      name: 'David Wilson', 
      email: 'david.wilson@example.com',
      phone: '+1 (555) 567-8901',
      address: '606 7th Ave, New York, NY',
      totalOrders: 3,
      totalSpent: '$289.97',
      status: 'Inactive',
      joinDate: 'Apr 8, 2024',
      lastOrder: 'Apr 25, 2025'
    },
    { 
      id: '2006', 
      name: 'Sarah Martinez', 
      email: 'sarah.martinez@example.com',
      phone: '+1 (555) 678-9012',
      address: '808 9th Ave, New York, NY',
      totalOrders: 9,
      totalSpent: '$934.25',
      status: 'Active',
      joinDate: 'Dec 12, 2023',
      lastOrder: 'Apr 25, 2025'
    },
  ];

  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Customers</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="pl-9 pr-4 py-2 border rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          </div>
          <div className="flex gap-2">
            <select 
              className="px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-1 px-4 py-2 text-gray-700 border rounded-lg">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white rounded-lg">
              <Plus size={16} />
              <span>Add Customer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold text-lg mr-3">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium">{customer.name}</h3>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </div>
              </div>
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                {customer.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start text-sm">
                <MapPin className="w-4 h-4 text-gray-500 mr-2 shrink-0 mt-0.5" />
                <span className="leading-tight">{customer.address}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 text-gray-500 mr-2" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-500 mr-2">Orders:</span>
                  <span className="font-medium">{customer.totalOrders}</span>
                </div>
                <div>
                  <span className="text-gray-500 mr-2">Total Spent:</span>
                  <span className="font-medium">{customer.totalSpent}</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-gray-500 mr-2">Joined:</span>
                  <span>{customer.joinDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 mr-2">Last Order:</span>
                  <span>{customer.lastOrder}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t flex justify-between">
              <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                View Profile
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                Order History
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No customers found matching your filters.</p>
        </div>
      )}

      <div className="bg-white rounded-lg p-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredCustomers.length}</span> of{' '}
          <span className="font-medium">{customers.length}</span> customers
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customers;