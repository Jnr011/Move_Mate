import React, { useState } from 'react';
import { Search, Filter, Plus, X, Calendar } from 'lucide-react';
import Select from '../../UI/Select';

interface OrderFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  onAddNewOrder: () => void;
  onResetFilters: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddNewOrder,
  onResetFilters
}) => {
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Completed', label: 'Completed' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Cancelled', label: 'Cancelled' },
    { value: 'Pending', label: 'Pending' }
  ];
  
  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search orders by ID, customer, or location..."
            className="pl-9 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          {searchTerm && (
            <button
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusFilterChange}
            variant="outlined"
            size="md"
            fullWidth={false}
          />
          <button 
            className={`flex items-center gap-1 px-4 py-2 text-gray-700 border rounded-lg ${isAdvancedFilterOpen ? 'bg-gray-50' : ''}`}
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button 
            className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={onAddNewOrder}
          >
            <Plus size={16} />
            <span>New Order</span>
          </button>
        </div>
      </div>
      
      {isAdvancedFilterOpen && (
        <div className="p-4 border rounded-lg bg-gray-50 animate-fade-in-down">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Advanced Filters</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onResetFilters}
            >
              Reset All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <Select
                options={dateOptions}
                value={dateRange}
                onChange={setDateRange}
                variant="default"
                size="md"
                icon={<Calendar size={16} />}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver
              </label>
              <select className="w-full px-3 py-2 border rounded-lg">
                <option value="">All Drivers</option>
                <option value="John Doe">John Doe</option>
                <option value="Alice Smith">Alice Smith</option>
                <option value="Robert Johnson">Robert Johnson</option>
                <option value="Lisa Adams">Lisa Adams</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;