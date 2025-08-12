import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Truck, 
  Users, 
  PieChart, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ConfirmationModal } from '../components/UI/Modal';
import { useNotification } from '../components/UI/Notification';
import NotificationDisplay from '../components/UI/NotificationDisplay';

const AdminLayout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { showNotification } = useNotification();

  const menuItems = [
    { id: 'dashboard', path: '/admin', icon: Home, label: 'Dashboard' },
    { id: 'orders', path: '/admin/orders', icon: Package, label: 'Orders' },
    { id: 'drivers', path: '/admin/drivers', icon: Truck, label: 'Drivers' },
    { id: 'customers', path: '/admin/customers', icon: Users, label: 'Customers' },
    { id: 'analytics', path: '/admin/analytics', icon: PieChart, label: 'Analytics' },
    { id: 'settings', path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    showNotification({
      type: 'success',
      message: 'Logged out successfully',
      description: 'You have been logged out of your account.'
    });
    navigate('/admin-login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser) return 'AD';
    return currentUser.name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of the admin dashboard?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmVariant="danger"
      />

      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <h1 className="font-bold text-lg">MoveMate Admin</h1>
        </div>
        <div className="flex items-center space-x-3">
          <NotificationDisplay />
          <button 
            onClick={toggleMenu} 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-sm min-h-screen sticky top-0">
          <div className="p-4 flex items-center space-x-2 border-b">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <h1 className="font-bold text-xl">MoveMate</h1>
          </div>
          
          <nav className="flex-grow p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    end={item.id === 'dashboard'}
                    className={({ isActive }) => `
                      flex items-center space-x-2 p-3 rounded-lg
                      ${isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <button 
              onClick={handleLogoutClick}
              className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar (overlay) */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={toggleMenu}>
            <aside className="w-64 bg-white h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-4 flex items-center space-x-2 border-b">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  M
                </div>
                <h1 className="font-bold text-lg">MoveMate</h1>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {getUserInitials()}
                  </div>
                  <div>
                    <div className="font-medium">{currentUser?.name}</div>
                    <div className="text-sm text-gray-500">{currentUser?.role.replace('_', ' ')}</div>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <NavLink
                        to={item.path}
                        end={item.id === 'dashboard'}
                        className={({ isActive }) => `
                          flex items-center space-x-2 p-3 rounded-lg
                          ${isActive ? 'bg-teal-50 text-teal-600' : 'text-gray-700 hover:bg-gray-50'}
                        `}
                        onClick={toggleMenu}
                      >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 border-t">
                <button 
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 p-3 rounded-lg text-gray-700 hover:bg-gray-50 w-full"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-6">
          <div className="hidden md:flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <NotificationDisplay />
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="w-9 h-9 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {getUserInitials()}
                </div>
                <div>
                  <div className="font-medium">{currentUser?.name}</div>
                  <div className="text-xs text-gray-500">{currentUser?.role.replace('_', ' ')}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Render the nested route component */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;