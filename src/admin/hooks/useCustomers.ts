import { useState, useEffect } from 'react';
import { users } from '../data/users';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'suspended';
  location: string;
  lastOrderDate?: string;
}

export const useCustomers = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllCustomers(users);
      setFilteredCustomers(users);
      setLoading(false);
    }, 1000);
  }, []);

  const filterCustomers = (filters: {
    status?: string;
    search?: string;
    dateRange?: { start: string; end: string };
  }) => {
    let filtered = [...allCustomers];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(customer => customer.status === filters.status);
    }

    if (filters.search) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        customer.email.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    setFilteredCustomers(filtered);
  };

  const updateCustomerStatus = (customerId: string, status: Customer['status']) => {
    setAllCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId ? { ...customer, status } : customer
      )
    );
    setFilteredCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId ? { ...customer, status } : customer
      )
    );
  };

  const getCustomerStats = () => {
    const activeCustomers = allCustomers.filter(c => c.status === 'active').length;
    const totalRevenue = allCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgOrdersPerCustomer = allCustomers.reduce((sum, c) => sum + c.totalOrders, 0) / allCustomers.length;

    return {
      totalCustomers: allCustomers.length,
      activeCustomers,
      totalRevenue,
      avgOrdersPerCustomer: avgOrdersPerCustomer || 0,
    };
  };

  return {
    customers: filteredCustomers,
    loading,
    filterCustomers,
    updateCustomerStatus,
    getCustomerStats,
  };
}; 