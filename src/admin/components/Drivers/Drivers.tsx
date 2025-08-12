import React, { useState, useEffect } from 'react';
import { useNotification } from '../UI/Notification';
import FilterBar from '../UI/FilterBar';
import DriverCard from './components/DriverCard';
import DriverDetail from './components/DriverDetail';
import { Driver, fetchDrivers, updateDriverStatus, updateDriverAvailability, driverStatusOptions } from '../../data/drivers';
import { ConfirmationModal } from '../UI/Modal';

const Drivers: React.FC = () => {
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAssignOrderModalOpen, setIsAssignOrderModalOpen] = useState(false);
  const [isAddDriverModalOpen, setIsAddDriverModalOpen] = useState(false);

  // Load drivers data
  useEffect(() => {
    const loadDrivers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDrivers();
        setDrivers(data);
        setIsLoading(false);
      } catch (error) {
        showNotification({
          type: 'error',
          message: 'Failed to load drivers',
          description: 'There was an error loading the drivers data. Please try again.',
          duration: 5000
        });
        setIsLoading(false);
      }
    };
    
    loadDrivers();
  }, [showNotification]);

  // Filter drivers based on search term and status filter
  useEffect(() => {
    const filtered = drivers.filter(driver => {
      const matchesStatus = statusFilter === 'all' || driver.status === statusFilter;
      const matchesSearch = 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
    
    setFilteredDrivers(filtered);
  }, [drivers, searchTerm, statusFilter]);

  const handleViewProfile = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDetailModalOpen(true);
  };

  const handleAssignOrder = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsAssignOrderModalOpen(true);
  };

  const handleAddNewDriver = () => {
    setIsAddDriverModalOpen(true);
  };

  const handleStatusChange = async (driver: Driver, newStatus: 'Active' | 'On Leave' | 'Inactive') => {
    try {
      await updateDriverStatus(driver.id, newStatus);
      
      // Update local state
      setDrivers(prevDrivers => 
        prevDrivers.map(d => 
          d.id === driver.id ? { ...d, status: newStatus } : d
        )
      );
      
      showNotification({
        type: 'success',
        message: 'Driver status updated',
        description: `${driver.name}'s status has been updated to ${newStatus}`,
        duration: 3000
      });
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Failed to update status',
        description: 'There was an error updating the driver status.',
        duration: 5000
      });
    }
  };

  const handleToggleAvailability = async (driver: Driver, available: boolean) => {
    try {
      await updateDriverAvailability(driver.id, available);
      
      // Update local state
      setDrivers(prevDrivers => 
        prevDrivers.map(d => 
          d.id === driver.id ? { ...d, isAvailable: available } : d
        )
      );
      
      showNotification({
        type: 'success',
        message: 'Availability updated',
        description: `${driver.name} is now ${available ? 'available' : 'unavailable'} for new orders`,
        duration: 3000
      });
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Failed to update availability',
        description: 'There was an error updating the driver availability.',
        duration: 5000
      });
    }
  };

  return (
    <div>
      <FilterBar
        title="Drivers"
        searchPlaceholder="Search drivers..."
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        statusOptions={driverStatusOptions}
        onStatusFilterChange={setStatusFilter}
        addButtonText="Add Driver"
        onAddClick={handleAddNewDriver}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onViewProfile={handleViewProfile}
                onAssignOrder={handleAssignOrder}
                onToggleAvailability={handleToggleAvailability}
              />
            ))}
          </div>

          {filteredDrivers.length === 0 && (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No drivers found matching your filters.</p>
            </div>
          )}

          <div className="bg-white rounded-lg p-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredDrivers.length}</span> of{' '}
              <span className="font-medium">{drivers.length}</span> drivers
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Driver Detail Modal */}
      <DriverDetail
        driver={selectedDriver}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onStatusChange={handleStatusChange}
      />

      {/* Assign Order Modal */}
      <ConfirmationModal
        isOpen={isAssignOrderModalOpen}
        onClose={() => setIsAssignOrderModalOpen(false)}
        title="Assign Order to Driver"
        confirmText="Assign"
        cancelText="Cancel"
        onConfirm={() => {
          showNotification({
            type: 'success',
            message: 'Order assigned',
            description: selectedDriver ? `Order has been assigned to ${selectedDriver.name}` : 'Order has been assigned',
            duration: 3000
          });
          setIsAssignOrderModalOpen(false);
        }}
      >
        <div className="p-4">
          <p className="mb-4">
            Select an order to assign to <strong>{selectedDriver?.name}</strong>:
          </p>
          <select className="w-full px-3 py-2 border rounded-md">
            <option value="">Select an order...</option>
            <option value="ORD-1001">Order #ORD-1001 - New York to Boston</option>
            <option value="ORD-1002">Order #ORD-1002 - Brooklyn to Queens</option>
            <option value="ORD-1003">Order #ORD-1003 - Manhattan to Bronx</option>
          </select>
        </div>
      </ConfirmationModal>

      {/* Add Driver Modal */}
      <ConfirmationModal
        isOpen={isAddDriverModalOpen}
        onClose={() => setIsAddDriverModalOpen(false)}
        title="Add New Driver"
        confirmText="Add Driver"
        cancelText="Cancel"
        onConfirm={() => {
          showNotification({
            type: 'success',
            message: 'Driver added',
            description: 'New driver has been added successfully',
            duration: 3000
          });
          setIsAddDriverModalOpen(false);
        }}
      >
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="New York, NY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicles (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Van, Small Truck"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default Drivers;