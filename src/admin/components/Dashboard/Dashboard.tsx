import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Truck, Package, Users, DollarSign, RefreshCw, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import Card from '../UI/Card';
import { useNotification } from '../UI/Notification';
import ChartContainer from '../UI/ChartContainer';
import Select from '../UI/Select';

const Dashboard: React.FC = () => {
  const { showNotification } = useNotification();
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real app, this data would come from an API
  const stats = [
    {
      id: 'orders',
      title: 'Total Orders',
      value: '4,320',
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      id: 'deliveries',
      title: 'Active Deliveries',
      value: '156',
      change: '+5%',
      trend: 'up',
      icon: Truck,
      color: 'teal'
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$52,489',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'customers',
      title: 'Customers',
      value: '2,420',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    }
  ];

  const recentOrders = [
    { id: '1001', date: 'Apr 28, 2025', customer: 'John Smith', status: 'Completed', amount: '$59.99' },
    { id: '1002', date: 'Apr 27, 2025', customer: 'Lisa Johnson', status: 'In Progress', amount: '$129.99' },
    { id: '1003', date: 'Apr 27, 2025', customer: 'Michael Brown', status: 'Scheduled', amount: '$89.50' },
    { id: '1004', date: 'Apr 26, 2025', customer: 'Emma Davis', status: 'Completed', amount: '$75.25' },
  ];

  const availableDrivers = [
    { name: 'John Doe', rating: '4.9', distance: '2.3', status: 'Available' },
    { name: 'Alice Smith', rating: '4.8', distance: '3.1', status: 'On Delivery' },
    { name: 'Robert Johnson', rating: '4.7', distance: '1.8', status: 'Available' },
    { name: 'Lisa Adams', rating: '4.9', distance: '4.2', status: 'On Break' },
  ];
  
  // Chart data for Revenue Overview
  const revenueData = [
    { name: 'Mon', revenue: 4000, orders: 24 },
    { name: 'Tue', revenue: 3500, orders: 22 },
    { name: 'Wed', revenue: 5000, orders: 32 },
    { name: 'Thu', revenue: 4800, orders: 29 },
    { name: 'Fri', revenue: 6000, orders: 35 },
    { name: 'Sat', revenue: 5500, orders: 30 },
    { name: 'Sun', revenue: 3800, orders: 25 },
  ];
  
  // Chart data for Order Types
  const orderTypesData = [
    { name: 'Standard', value: 60 },
    { name: 'Express', value: 25 },
    { name: 'Same Day', value: 15 },
  ];
  
  // Chart data for Customer Growth
  const customerGrowthData = [
    { name: 'Jan', customers: 1450 },
    { name: 'Feb', customers: 1650 },
    { name: 'Mar', customers: 1820 },
    { name: 'Apr', customers: 2030 },
    { name: 'May', customers: 2250 },
    { name: 'Jun', customers: 2420 },
  ];
  
  // Chart data for Delivery Performance
  const deliveryPerformanceData = [
    { name: 'Mon', onTime: 92, delayed: 8 },
    { name: 'Tue', onTime: 88, delayed: 12 },
    { name: 'Wed', onTime: 95, delayed: 5 },
    { name: 'Thu', onTime: 90, delayed: 10 },
    { name: 'Fri', onTime: 85, delayed: 15 },
    { name: 'Sat', onTime: 89, delayed: 11 },
    { name: 'Sun', onTime: 94, delayed: 6 },
  ];
  
  // Alert data
  const alerts = [
    { 
      id: '1', 
      type: 'warning', 
      title: 'High Demand Alert', 
      message: 'Unusually high order volume detected in Downtown area' 
    },
    { 
      id: '2', 
      type: 'error', 
      title: 'Driver Shortage', 
      message: 'Not enough drivers available in North District' 
    },
  ];
  
  // Date range options for charts
  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  const handleRefreshData = () => {
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      showNotification({
        type: 'success',
        message: 'Dashboard refreshed',
        description: 'Latest data has been loaded',
        duration: 3000
      });
    }, 1000);
  };
  
  const handleDateRangeChange = (value: string) => {
    setTimeRange(value);
    handleRefreshData();
  };

  // Initial load effect
  useEffect(() => {
    handleRefreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* Stats Grid with refresh button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dashboard Overview</h2>
        <div className="flex items-center space-x-3">
          <Select
            options={dateRanges}
            value={timeRange}
            onChange={handleDateRangeChange}
            variant="outlined"
            size="sm"
            fullWidth={false}
            icon={<Calendar size={16} />}
          />
          <button 
            onClick={handleRefreshData}
            disabled={isLoading}
            className="flex items-center space-x-1 text-sm text-teal-600 hover:text-teal-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.id} className="border border-gray-100">
            <div className="flex justify-between">
              <div>
                <div className="text-sm font-medium text-gray-500">{stat.title}</div>
                <div className="text-2xl font-bold mt-1">{stat.value}</div>
                <div className={`flex items-center text-xs mt-1 ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp size={16} className="mr-1" />
                  ) : (
                    <TrendingDown size={16} className="mr-1" />
                  )}
                  {stat.change} from last {timeRange}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Alerts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 border rounded-lg flex items-start ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : alert.type === 'error'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className={`mr-3 mt-1 ${
                  alert.type === 'warning' 
                    ? 'text-yellow-500' 
                    : alert.type === 'error'
                    ? 'text-red-500'
                    : 'text-blue-500'
                }`}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Revenue & Orders"
          type="line"
          data={revenueData}
          dataKeys={['revenue', 'orders']}
          xAxisKey="name"
          dateRanges={dateRanges}
          onDateRangeChange={handleDateRangeChange}
          onRefresh={handleRefreshData}
          height={300}
        />
        
        <ChartContainer
          title="Order Types"
          type="pie"
          data={orderTypesData}
          dataKeys={['value']}
          onRefresh={handleRefreshData}
          height={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartContainer
          title="Customer Growth"
          type="area"
          data={customerGrowthData}
          dataKeys={['customers']}
          xAxisKey="name"
          onRefresh={handleRefreshData}
          height={280}
        />
        
        <ChartContainer
          title="Delivery Performance"
          type="stacked-bar"
          data={deliveryPerformanceData}
          dataKeys={['onTime', 'delayed']}
          xAxisKey="name"
          onRefresh={handleRefreshData}
          height={280}
        />
      </div>

      {/* Recent Orders & Available Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card 
          title="Recent Orders" 
          headerAction={
            <button className="text-sm text-teal-600 hover:text-teal-800">View All</button>
          }
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-3 text-sm font-medium">#{order.id}</td>
                    <td className="py-3 text-sm text-gray-500">{order.date}</td>
                    <td className="py-3 text-sm">{order.customer}</td>
                    <td className="py-3 text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-medium text-right">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Available Drivers */}
        <Card 
          title="Available Drivers" 
          headerAction={
            <button className="text-sm text-teal-600 hover:text-teal-800">View All</button>
          }
        >
          <div className="space-y-4">
            {availableDrivers.map((driver, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">{driver.name}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <span className="flex items-center mr-2">
                      {driver.rating} <span className="text-yellow-400 ml-0.5">★</span>
                    </span>
                    <span className="flex items-center">
                      <MapPin size={12} className="mr-0.5 text-gray-400" /> {driver.distance} miles away
                    </span>
                  </div>
                </div>
                <div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    driver.status === 'Available' 
                      ? 'bg-green-100 text-green-800' 
                      : driver.status === 'On Delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {driver.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;