import React, { ReactNode } from 'react';
import { Search, Filter, Plus } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  title: string;
  searchPlaceholder: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  statusOptions: FilterOption[];
  onStatusFilterChange: (value: string) => void;
  addButtonText: string;
  onAddClick: () => void;
  children?: ReactNode;
}

const FilterBar: React.FC<FilterBarProps> = ({
  title,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  statusFilter,
  statusOptions,
  onStatusFilterChange,
  addButtonText,
  onAddClick,
  children,
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-9 pr-4 py-2 border rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button 
            className="flex items-center gap-1 px-4 py-2 text-gray-700 border rounded-lg"
            title="Apply filters"
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button 
            className="flex items-center gap-1 px-4 py-2 bg-teal-600 text-white rounded-lg"
            onClick={onAddClick}
          >
            <Plus size={16} />
            <span>{addButtonText}</span>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;