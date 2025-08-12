import { useState, useEffect } from 'react';
import { orders } from '../data/orders';

export interface Order {
  id: string;
  customerName: string;
  driverName: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  amount: number;
  date: string;
  items: string[];
}

export const useOrders = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllOrders(orders);
      setFilteredOrders(orders);
      setLoading(false);
    }, 1000);
  }, []);

  const filterOrders = (filters: {
    status?: string;
    dateRange?: { start: string; end: string };
    search?: string;
  }) => {
    let filtered = [...allOrders];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.search) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(filters.search!.toLowerCase()) ||
        order.driverName.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setAllOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    setFilteredOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return {
    orders: filteredOrders,
    loading,
    filterOrders,
    updateOrderStatus,
    totalOrders: allOrders.length,
  };
}; 