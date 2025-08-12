import React from 'react';
import { MapPin, Star, Phone } from 'lucide-react';
import { Driver } from '../../../data/drivers';

interface DriverCardProps {
  driver: Driver;
  onViewProfile: (driver: Driver) => void;
  onAssignOrder: (driver: Driver) => void;
  onToggleAvailability?: (driver: Driver, available: boolean) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ 
  driver, 
  onViewProfile, 
  onAssignOrder,
  onToggleAvailability
}) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-sm mr-1">{rating}</span>
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-lg mr-3">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-medium">{driver.name}</h3>
            <div className="text-sm text-gray-500">{driver.email}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(driver.status)}`}>
            {driver.status}
          </span>
          {onToggleAvailability && (
            <div className="flex items-center">
              <span className="text-xs mr-2">Available:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={driver.isAvailable}
                  onChange={() => onToggleAvailability(driver, !driver.isAvailable)}
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <span>{driver.location}</span>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="w-4 h-4 text-gray-500 mr-2" />
          <span>{driver.phone}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="text-gray-500 mr-2">Rating:</span>
            {renderRatingStars(driver.rating)}
          </div>
          <div>
            <span className="text-gray-500 mr-2">Deliveries:</span>
            <span className="font-medium">{driver.completedDeliveries}</span>
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 mr-2">Vehicles:</span>
          <span>{driver.vehicles.join(', ')}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 mr-2">Joined:</span>
          <span>{driver.joinDate}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t flex justify-between">
        <button 
          className="text-teal-600 hover:text-teal-800 text-sm font-medium"
          onClick={() => onViewProfile(driver)}
        >
          View Profile
        </button>
        <button 
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          onClick={() => onAssignOrder(driver)}
          disabled={!driver.isAvailable}
          title={!driver.isAvailable ? "Driver is not available" : "Assign an order to this driver"}
        >
          Assign Order
        </button>
      </div>
    </div>
  );
};

export default DriverCard;