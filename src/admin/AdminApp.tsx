import React, { JSX } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Orders from './components/Orders/Orders';
import Drivers from './components/Drivers/Drivers';
import Customers from './components/Customers/Customers';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './components/UI/Notification';

// Protected route component that checks for authentication
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading indicator while checking auth status
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page if not authenticated
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

// The main AdminApp wrapped with providers
const AdminApp: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider position="top-right">
        <AdminRoutes />
      </NotificationProvider>
    </AuthProvider>
  );
};

// The actual routes, protected by authentication
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="customers" element={<Customers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;