import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Map, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Users,
  TrendingDown
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [expandedSection, setExpandedSection] = useState<string | null>('revenue');
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this data would come from an API
  const analyticsSummary = {
    revenue: {
      total: '$52,489',
      growth: '+8%',
      previous: '$48,600'
    },
    orders: {
      total: '4,320',
      growth: '+12%',
      previous: '3,857'
    },
    customers: {
      total: '2,420',
      growth: '+15%',
      previous: '2,104'
    },
    avgOrderValue: {
      total: '$105.85',
      growth: '+3%',
      previous: '$102.77'
    }
  };

  const popularRoutes = [
    { from: "New York", to: "Boston", count: 427, growth: "+12%" },
    { from: "Chicago", to: "Detroit", count: 356, growth: "+8%" },
    { from: "San Francisco", to: "Los Angeles", count: 314, growth: "+15%" },
    { from: "Dallas", to: "Houston", count: 289, growth: "+5%" },
    { from: "Miami", to: "Orlando", count: 246, growth: "+10%" },
  ];

  const routesForChart = popularRoutes.map(route => ({
    name: `${route.from} → ${route.to}`,
    value: route.count
  }));

  const topDrivers = [
    { name: "John Doe", completedDeliveries: 342, revenue: "$15,240", rating: 4.9 },
    { name: "Lisa Adams", completedDeliveries: 298, revenue: "$13,768", rating: 4.9 },
    { name: "Robert Johnson", completedDeliveries: 215, revenue: "$10,452", rating: 4.7 },
    { name: "Alice Smith", completedDeliveries: 186, revenue: "$8,975", rating: 4.8 },
    { name: "David Wilson", completedDeliveries: 127, revenue: "$5,892", rating: 4.5 },
  ];

  // Chart data for Revenue Trends
  const revenueData = [
    { name: 'Jan', revenue: 38000, orders: 580 },
    { name: 'Feb', revenue: 42000, orders: 620 },
    { name: 'Mar', revenue: 45000, orders: 670 },
    { name: 'Apr', revenue: 52489, orders: 720 },
    { name: 'May', revenue: 58000, orders: 800 }, // Projection
    { name: 'Jun', revenue: 62000, orders: 850 }, // Projection
  ];

  // Customer demographics data
  const customerDemographicData = [
    { name: 'New York', value: 35 },
    { name: 'California', value: 25 },
    { name: 'Texas', value: 15 },
    { name: 'Illinois', value: 12 },
    { name: 'Florida', value: 13 },
  ];

  // Customer growth data
  const customerGrowthData = [
    { name: 'Jan', customers: 1450 },
    { name: 'Feb', customers: 1650 },
    { name: 'Mar', customers: 1820 },
    { name: 'Apr', customers: 2030 },
    { name: 'May', customers: 2250 },
    { name: 'Jun', customers: 2420 },
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleExport = () => {
    setIsLoading(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      alert('Analytics data exported successfully!');
    }, 1500);
  };

  // Effect to refresh data when time range changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [timeRange]);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Analytics</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex border rounded-lg overflow-hidden">
            <button 
              className={`px-3 py-2 text-sm ${timeRange === 'week' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-2 text-sm ${timeRange === 'month' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-2 text-sm ${timeRange === 'quarter' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTimeRange('quarter')}
            >
              Quarter
            </button>
            <button 
              className={`px-3 py-2 text-sm ${timeRange === 'year' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 text-gray-700 border rounded-lg">
            <Calendar size={16} />
            <span>Custom Range</span>
          </button>
          <button 
            className="flex items-center gap-1 px-4 py-2 text-gray-700 border rounded-lg disabled:opacity-50"
            onClick={handleExport}
            disabled={isLoading}
          >
            <Download size={16} className={isLoading ? "animate-pulse" : ""} />
            <span>{isLoading ? "Exporting..." : "Export"}</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold mt-1">{analyticsSummary.revenue.total}</div>
              <div className="flex items-center text-xs mt-1 text-green-500">
                <TrendingUp size={16} className="mr-1" />
                {analyticsSummary.revenue.growth} from {timeRange === 'week' ? 'last week' : timeRange === 'month' ? 'last month' : timeRange === 'quarter' ? 'last quarter' : 'last year'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold mt-1">{analyticsSummary.orders.total}</div>
              <div className="flex items-center text-xs mt-1 text-green-500">
                <TrendingUp size={16} className="mr-1" />
                {analyticsSummary.orders.growth} from {timeRange === 'week' ? 'last week' : timeRange === 'month' ? 'last month' : timeRange === 'quarter' ? 'last quarter' : 'last year'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Customers</div>
              <div className="text-2xl font-bold mt-1">{analyticsSummary.customers.total}</div>
              <div className="flex items-center text-xs mt-1 text-green-500">
                <TrendingUp size={16} className="mr-1" />
                {analyticsSummary.customers.growth} from {timeRange === 'week' ? 'last week' : timeRange === 'month' ? 'last month' : timeRange === 'quarter' ? 'last quarter' : 'last year'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-100">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-medium text-gray-500">Avg. Order Value</div>
              <div className="text-2xl font-bold mt-1">{analyticsSummary.avgOrderValue.total}</div>
              <div className="flex items-center text-xs mt-1 text-green-500">
                <TrendingUp size={16} className="mr-1" />
                {analyticsSummary.avgOrderValue.growth} from {timeRange === 'week' ? 'last week' : timeRange === 'month' ? 'last month' : timeRange === 'quarter' ? 'last quarter' : 'last year'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-teal-100">
              <DollarSign className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
        <div 
          className="p-6 flex justify-between items-center cursor-pointer border-b"
          onClick={() => toggleSection('revenue')}
        >
          <h2 className="text-lg font-bold">Revenue Trends</h2>
          {expandedSection === 'revenue' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === 'revenue' && (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => {
                    return name === 'revenue' ? [`$${value}`, 'Revenue'] : [value, 'Orders'];
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0088FE"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="orders"
                  stroke="#00C49F"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-500">Current Period</div>
                <div className="font-bold">{analyticsSummary.revenue.total}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Previous Period</div>
                <div className="font-bold">{analyticsSummary.revenue.previous}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Growth</div>
                <div className="font-bold text-green-500">{analyticsSummary.revenue.growth}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Projection</div>
                <div className="font-bold text-blue-500">$58,150</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popular Routes & Top Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Popular Routes */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="p-6 flex justify-between items-center cursor-pointer border-b"
            onClick={() => toggleSection('routes')}
          >
            <h2 className="text-lg font-bold">Popular Routes</h2>
            {expandedSection === 'routes' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSection === 'routes' && (
            <div className="p-6">
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={routesForChart} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Orders" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Route</th>
                      <th className="px-6 py-3">Orders</th>
                      <th className="px-6 py-3">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {popularRoutes.map((route, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Map className="w-4 h-4 text-gray-400 mr-2" />
                            <span>{route.from} → {route.to}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{route.count}</td>
                        <td className="px-6 py-4 text-sm text-green-500">{route.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  View All Routes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Top Performing Drivers */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div 
            className="p-6 flex justify-between items-center cursor-pointer border-b"
            onClick={() => toggleSection('drivers')}
          >
            <h2 className="text-lg font-bold">Top Performing Drivers</h2>
            {expandedSection === 'drivers' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSection === 'drivers' && (
            <div className="p-6">
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={topDrivers}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'completedDeliveries') return [value, 'Deliveries'];
                        if (name === 'revenue') return [value, 'Revenue'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="completedDeliveries" name="Deliveries" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Driver</th>
                      <th className="px-6 py-3">Deliveries</th>
                      <th className="px-6 py-3">Revenue</th>
                      <th className="px-6 py-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {topDrivers.map((driver, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm mr-2">
                              {driver.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span>{driver.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{driver.completedDeliveries}</td>
                        <td className="px-6 py-4 text-sm">{driver.revenue}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center">
                            <span className="mr-1">{driver.rating}</span>
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-center">
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  View All Drivers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Customer Demographics */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div 
          className="p-6 flex justify-between items-center cursor-pointer border-b"
          onClick={() => toggleSection('demographics')}
        >
          <h2 className="text-lg font-bold">Customer Demographics</h2>
          {expandedSection === 'demographics' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === 'demographics' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Location Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerDemographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerDemographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(0)}%)`, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Customer Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={customerGrowthData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="customers" stroke="#8884d8" fill="#8884d8" name="Customers" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;