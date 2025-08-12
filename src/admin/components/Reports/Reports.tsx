import React, { useState } from 'react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { Select } from '../UI/Select';

export const Reports: React.FC = () => {
  const { analyticsData, loading, generateReport } = useAnalytics();
  const [selectedReport, setSelectedReport] = useState<string>('revenue');
  const [dateRange, setDateRange] = useState<string>('30');

  const reportTypes = [
    { value: 'revenue', label: 'Revenue Report' },
    { value: 'orders', label: 'Orders Report' },
    { value: 'drivers', label: 'Drivers Report' },
    { value: 'customers', label: 'Customers Report' },
  ];

  const dateRanges = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' },
  ];

  const handleGenerateReport = () => {
    const reportName = generateReport(selectedReport as any);
    // In a real app, this would trigger a download or show a preview
    console.log(`Generated report: ${reportName}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <Button onClick={handleGenerateReport} className="bg-blue-600 hover:bg-blue-700">
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Report Type</h3>
            <Select
              value={selectedReport}
              onChange={(value) => setSelectedReport(value)}
              options={reportTypes}
              placeholder="Select report type"
            />
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Date Range</h3>
            <Select
              value={dateRange}
              onChange={(value) => setDateRange(value)}
              options={dateRanges}
              placeholder="Select date range"
            />
          </div>
        </Card>
      </div>

      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(analyticsData.totalRevenue)}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-600">
                {analyticsData.totalOrders}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Active Deliveries</h3>
              <p className="text-2xl font-bold text-orange-600">
                {analyticsData.activeDeliveries}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-500">Growth Rate</h3>
              <p className="text-2xl font-bold text-purple-600">
                +{analyticsData.growthRate}%
              </p>
            </div>
          </Card>
        </div>
      )}

      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Revenue Report - Q1 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(new Date())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2.4 MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Download</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Orders Report - March 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(new Date(Date.now() - 86400000))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1.8 MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}; 