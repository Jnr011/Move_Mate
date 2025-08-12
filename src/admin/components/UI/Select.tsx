import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'outlined' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  className = '',
  variant = 'default',
  size = 'md',
  fullWidth = true,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-3',
    lg: 'text-base py-2.5 px-4'
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-transparent border-none shadow-none hover:bg-gray-50';
      case 'outlined':
        return 'bg-transparent border border-gray-300 hover:border-teal-600';
      case 'bordered':
        return 'bg-white border-2 border-gray-300 hover:border-teal-600';
      default:
        return 'bg-white border border-gray-300 shadow-sm hover:border-teal-600';
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : 'w-auto'} ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          className={`flex items-center justify-between rounded-md ${
            sizeClasses[size]
          } ${
            getVariantClasses()
          } ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${
            error ? 'border-red-300' : ''
          } ${
            isOpen ? 'ring-2 ring-teal-500 ring-opacity-50' : ''
          } transition-colors w-full`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            <span className={!selectedOption ? 'text-gray-400' : ''}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 ml-2 ${isOpen ? 'transform rotate-180' : ''} transition-transform`} />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto animate-fade-in-down">
            <ul
              className="py-1 text-base"
              role="listbox"
            >
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`
                    cursor-pointer select-none relative py-2 pl-3 pr-9 
                    ${option.value === selectedValue 
                      ? 'bg-teal-50 text-teal-900' 
                      : 'text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex items-center">
                    <span className={`block truncate ${option.value === selectedValue ? 'font-medium' : 'font-normal'}`}>
                      {option.label}
                    </span>
                  </div>
                  
                  {option.value === selectedValue && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-teal-600">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;