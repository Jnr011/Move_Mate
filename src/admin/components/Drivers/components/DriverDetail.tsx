import React from 'react';
import { Driver } from '../../../data/drivers';
import { MapPin, Star, Phone, Mail, Package, Calendar, Truck } from 'lucide-react';
import { ConfirmationModal } from '../../UI/Modal';

interface DriverDetailProps {
  driver: Driver | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange?: (driver: Driver, newStatus: 'Active' | 'On Leave' | 'Inactive') => void;
}

const DriverDetail: React.FC<DriverDetailProps> = ({ 
  driver, 
  isOpen, 
  onClose,
  onStatusChange
}) => {
  if (!driver) return null;

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

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      title="Driver Profile"
      confirmText="Close"
      cancelText=""
      onConfirm={onClose}
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-2xl mb-4">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold">{driver.name}</h2>
            <p className="text-gray-500">{driver.email}</p>
            <div className="mt-2 flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>{driver.rating} Rating</span>
            </div>
            <div className="mt-4 w-full">
              <span className={`w-full px-3 py-1 inline-flex justify-center text-sm font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                {driver.status}
              </span>
            </div>
            {onStatusChange && (
              <div className="mt-4 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Change Status
                </label>
                <select 
                  className="w-full px-3 py-2 border rounded-md"
                  value={driver.status}
                  onChange={(e) => onStatusChange(driver, e.target.value as 'Active' | 'On Leave' | 'Inactive')}
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium border-b pb-2">Contact Information</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{driver.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <span>{driver.email}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <span>{driver.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium border-b pb-2">Performance</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-gray-500 mr-3" />
                  <span><strong>{driver.completedDeliveries}</strong> completed deliveries</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Joined <strong>{driver.joinDate}</strong></span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium border-b pb-2">Vehicle Information</h3>
              <div className="mt-4 space-y-3">
                {driver.vehicles.map((vehicle, index) => (
                  <div key={index} className="flex items-center">
                    <Truck className="w-5 h-5 text-gray-500 mr-3" />
                    <span>{vehicle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default DriverDetail;