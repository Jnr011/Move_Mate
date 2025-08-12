import React, { useState } from 'react';
import { Save, Globe, Bell, Key, Shield, CreditCard, DollarSign, MapPin, Mail } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  // In a real app, these would be fetched from and saved to an API
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'MoveMate Inc.',
    supportEmail: 'support@movemate.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en-US',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    systemAlerts: true,
  });

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'general' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('general')}
              >
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  <span>General</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'notifications' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  <span>Notifications</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'security' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('security')}
              >
                <div className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  <span>Security</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'billing' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('billing')}
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>Billing</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'pricing' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('pricing')}
              >
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>Pricing</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'locations' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('locations')}
              >
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>Service Areas</span>
                </div>
              </button>
              <button
                className={`text-left px-4 py-3 border-l-4 ${
                  activeTab === 'privacy' 
                    ? 'border-teal-500 bg-teal-50 text-teal-700' 
                    : 'border-transparent hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Privacy & Data</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-bold mb-6">General Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={generalSettings.companyName}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Support Email
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        name="supportEmail"
                        value={generalSettings.supportEmail}
                        onChange={handleGeneralChange}
                        className="flex-1 px-3 py-2 border rounded-r-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Support Phone
                    </label>
                    <input
                      type="text"
                      name="supportPhone"
                      value={generalSettings.supportPhone}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={generalSettings.timezone}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">GMT/UTC</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Format
                      </label>
                      <select
                        name="dateFormat"
                        value={generalSettings.dateFormat}
                        onChange={handleGeneralChange}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      name="language"
                      value={generalSettings.language}
                      onChange={handleGeneralChange}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-bold mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Receive push notifications on your devices</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="pushNotifications"
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-gray-500">Get notified about order status changes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="orderUpdates"
                        checked={notificationSettings.orderUpdates}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-gray-500">Receive promotional emails and newsletters</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Alerts</h3>
                      <p className="text-sm text-gray-500">Get important system alerts about the platform</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="systemAlerts"
                        checked={notificationSettings.systemAlerts}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-bold mb-6">Security Settings</h2>
                <p className="text-gray-500 mb-4">Manage your account security settings.</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <button className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                      Update Password
                    </button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <div>
                    <h3 className="font-medium mb-2">Session Management</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Manage your active sessions and sign out from other devices.
                    </p>
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                      Sign Out All Devices
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab !== 'general' && activeTab !== 'notifications' && activeTab !== 'security' && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-500">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
                  </h3>
                  <p className="mt-2 text-gray-400">
                    This section would contain {activeTab} configuration options.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;