import { useState, useEffect } from 'react';
import { orders } from '../data/orders';
import { drivers } from '../data/drivers';
import { users } from '../data/users';

export interface AnalyticsData {
  totalOrders: number;
  activeDeliveries: number;
  totalRevenue: number;
  growthRate: number;
  avgOrderValue: number;
  customerSatisfaction: number;
  driverUtilization: number;
  monthlyRevenue: number[];
  orderStatusDistribution: {
    pending: number;
    'in-progress': number;
    completed: number;
    cancelled: number;
  };
  topDrivers: Array<{
    id: string;
    name: string;
    deliveries: number;
    rating: number;
    earnings: number;
  }>;
  topCustomers: Array<{
    id: string;
    name: string;
    orders: number;
    totalSpent: number;
  }>;
}

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const completedOrders = orders.filter(order => order.status === 'completed');
      const activeOrders = orders.filter(order => order.status === 'in-progress');
      const totalRevenue = completedOrders.reduce((sum, order) => sum + order.amount, 0);
      const avgOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

      // Calculate top drivers
      const driverStats = drivers.map(driver => {
        const driverOrders = orders.filter(order => order.driverName === driver.name);
        const completedDriverOrders = driverOrders.filter(order => order.status === 'completed');
        const earnings = completedDriverOrders.reduce((sum, order) => sum + order.amount * 0.7, 0); // 70% driver cut

        return {
          id: driver.id,
          name: driver.name,
          deliveries: completedDriverOrders.length,
          rating: driver.rating,
          earnings,
        };
      }).sort((a, b) => b.deliveries - a.deliveries).slice(0, 5);

      // Calculate top customers
      const customerStats = users.map(user => {
        const customerOrders = orders.filter(order => order.customerName === user.name);
        const totalSpent = customerOrders.reduce((sum, order) => sum + order.amount, 0);

        return {
          id: user.id,
          name: user.name,
          orders: customerOrders.length,
          totalSpent,
        };
      }).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

      // Monthly revenue (simplified)
      const monthlyRevenue = [12000, 15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000];

      const data: AnalyticsData = {
        totalOrders: orders.length,
        activeDeliveries: activeOrders.length,
        totalRevenue,
        growthRate: 15.5, // Simulated growth rate
        avgOrderValue,
        customerSatisfaction: 4.6, // Average rating
        driverUtilization: 78.5, // Percentage
        monthlyRevenue,
        orderStatusDistribution: {
          pending: orders.filter(o => o.status === 'pending').length,
          'in-progress': orders.filter(o => o.status === 'in-progress').length,
          completed: orders.filter(o => o.status === 'completed').length,
          cancelled: orders.filter(o => o.status === 'cancelled').length,
        },
        topDrivers: driverStats,
        topCustomers: customerStats,
      };

      setAnalyticsData(data);
      setLoading(false);
    }, 1000);
  }, []);

  const generateReport = (type: 'revenue' | 'orders' | 'drivers' | 'customers') => {
    // Simulate report generation
    console.log(`Generating ${type} report...`);
    return `move-mate-${type}-report-${new Date().toISOString().split('T')[0]}.pdf`;
  };

  return {
    analyticsData,
    loading,
    generateReport,
  };
}; 