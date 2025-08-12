import { useState, useEffect } from 'react';
import { drivers } from '../data/drivers';

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  licenseNumber: string;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  totalDeliveries: number;
  earnings: number;
  location: string;
  documents: {
    license: boolean;
    insurance: boolean;
    vehicleRegistration: boolean;
  };
}

export const useDrivers = () => {
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAllDrivers(drivers);
      setFilteredDrivers(drivers);
      setLoading(false);
    }, 1000);
  }, []);

  const filterDrivers = (filters: {
    status?: string;
    vehicleType?: string;
    search?: string;
  }) => {
    let filtered = [...allDrivers];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(driver => driver.status === filters.status);
    }

    if (filters.vehicleType && filters.vehicleType !== 'all') {
      filtered = filtered.filter(driver => driver.vehicleType === filters.vehicleType);
    }

    if (filters.search) {
      filtered = filtered.filter(driver =>
        driver.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        driver.email.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }

    setFilteredDrivers(filtered);
  };

  const updateDriverStatus = (driverId: string, status: Driver['status']) => {
    setAllDrivers(prev => 
      prev.map(driver => 
        driver.id === driverId ? { ...driver, status } : driver
      )
    );
    setFilteredDrivers(prev => 
      prev.map(driver => 
        driver.id === driverId ? { ...driver, status } : driver
      )
    );
  };

  const getDriverStats = () => {
    const activeDrivers = allDrivers.filter(d => d.status === 'active').length;
    const totalEarnings = allDrivers.reduce((sum, d) => sum + d.earnings, 0);
    const avgRating = allDrivers.reduce((sum, d) => sum + d.rating, 0) / allDrivers.length;

    return {
      totalDrivers: allDrivers.length,
      activeDrivers,
      totalEarnings,
      avgRating: avgRating || 0,
    };
  };

  return {
    drivers: filteredDrivers,
    loading,
    filterDrivers,
    updateDriverStatus,
    getDriverStats,
  };
}; 