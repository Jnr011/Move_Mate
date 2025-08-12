import { useState } from "react";
import { Truck, Clock, User, Package, Bell, Menu, Home, Settings, PieChart, Users } from "lucide-react";

interface MoveMateAppProps {
  isDesktop?: boolean;
}

const MoveMateApp = ({ isDesktop = false }: MoveMateAppProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "home", icon: Truck, label: "Home" },
    { id: "track", icon: Package, label: "Track" },
    { id: "history", icon: Clock, label: "History" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const desktopMenuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "orders", icon: Package, label: "Orders" },
    { id: "drivers", icon: Truck, label: "Drivers" },
    { id: "customers", icon: Users, label: "Customers" },
    { id: "analytics", icon: PieChart, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  if (isDesktop) {
    return (
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 bg-white p-4 rounded-lg shadow-sm min-h-[600px]">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                M
              </div>
              <h3 className="font-bold text-xl">MoveMate</h3>
            </div>
            
            <nav className="space-y-1">
              {desktopMenuItems.map((item) => (
                <button
                  key={item.id}
                  className={`w-full flex items-center space-x-2 p-3 rounded-md ${
                    item.id === 'dashboard' 
                      ? 'bg-teal-50 text-teal-600' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-9 p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="text-2xl font-bold mt-1">4,320</div>
                <div className="text-xs text-green-500 mt-1">+12% from last month</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Active Deliveries</div>
                <div className="text-2xl font-bold mt-1">156</div>
                <div className="text-xs text-green-500 mt-1">+5% from last week</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Revenue</div>
                <div className="text-2xl font-bold mt-1">$52,489</div>
                <div className="text-xs text-green-500 mt-1">+8% from last month</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Recent Orders</h3>
                  <button className="text-sm text-teal-600">View All</button>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center p-2 border-b">
                      <div>
                        <div className="font-medium">Order #{1000 + i}</div>
                        <div className="text-xs text-gray-500">Mar {20 - i}, 2025</div>
                      </div>
                      <div className="text-sm font-medium text-green-600">${(49.99 + i * 10).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Available Drivers</h3>
                  <button className="text-sm text-teal-600">View All</button>
                </div>
                <div className="space-y-3">
                  {[
                    {name: "John Doe", rating: "4.9", distance: "2.3"},
                    {name: "Alice Smith", rating: "4.8", distance: "3.1"},
                    {name: "Robert Johnson", rating: "4.7", distance: "1.8"},
                    {name: "Lisa Adams", rating: "4.9", distance: "4.2"},
                  ].map((driver, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2 border-b">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium">{driver.name}</div>
                        <div className="text-xs text-gray-500">
                          {driver.rating} ★ • {driver.distance} miles away
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version with fixed navbar and bottom nav
  return (
    <div className="bg-gray-50 flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 relative sticky top-0 z-10">
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl">MoveMate</span>
          </div>
          <div className="flex items-center space-x-3">
            <button title="Notifications" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              title="Menu"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-4 top-12 bg-white rounded-lg shadow-lg p-2 z-10">
            <div className="flex flex-col text-sm">
              <button className="py-2 px-3 text-left hover:bg-gray-100 rounded-md">
                Help
              </button>
              <button className="py-2 px-3 text-left hover:bg-gray-100 rounded-md">
                Settings
              </button>
              <button className="py-2 px-3 text-left hover:bg-gray-100 rounded-md">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-auto">
        {/* Search and Quick Actions */}
        <div className="p-4 bg-white">
          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <div className="text-gray-500 text-sm">
              Where do you want to move items to?
            </div>
            <div className="flex items-center mt-1">
              <input
                className="bg-transparent border-none focus:outline-none flex-grow text-sm font-medium"
                placeholder="Enter destination..."
              />
              <button className="bg-teal-500 text-white p-1 rounded-md text-xs">
                Find
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="bg-blue-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Book a Truck</span>
            </button>
            <button className="bg-teal-50 p-3 rounded-lg flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-sm font-medium">Track Order</span>
            </button>
          </div>
        </div>

        {/* Rest of mobile app content */}
        <div className="p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-sm">Recent Moves</h3>
            <button className="text-teal-600 text-sm">View All</button>
          </div>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">Furniture Delivery</div>
                  <div className="text-xs text-gray-500">
                    Mar 20, 2025 • Completed
                  </div>
                </div>
                <div className="text-green-600 font-medium">$49.99</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">Office Relocation</div>
                  <div className="text-xs text-gray-500">
                    Mar 15, 2025 • Completed
                  </div>
                </div>
                <div className="text-green-600 font-medium">$129.99</div>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Drivers */}
        <div className="p-4 bg-white">
          <h3 className="font-semibold mb-3 text-sm">Nearby Drivers</h3>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-12 h-12 bg-blue-300 flex items-center justify-center text-white font-bold">
                  JD
                </div>
              </div>
              <div className="flex-grow">
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500">
                  4.9 ★ • 2.3 miles away
                </div>
              </div>
              <button className="bg-teal-500 text-white py-1 px-3 rounded-full text-xs">
                Book
              </button>
            </div>

            <div className="flex items-center space-x-3 p-2 border border-gray-100 rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-12 h-12 bg-teal-300 flex items-center justify-center text-white font-bold">
                  AS
                </div>
              </div>
              <div className="flex-grow">
                <div className="font-medium">Alice Smith</div>
                <div className="text-xs text-gray-500">
                  4.8 ★ • 3.1 miles away
                </div>
              </div>
              <button className="bg-teal-500 text-white py-1 px-3 rounded-full text-xs">
                Book
              </button>
            </div>
          </div>
        </div>
        
        {/* Add more content to ensure scrolling */}
        <div className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-3 text-sm">Popular Routes</h3>
          <div className="space-y-3">
            {[
              { from: "New York", to: "Boston", price: "$199.99" },
              { from: "Chicago", to: "Detroit", price: "$149.99" },
              { from: "San Francisco", to: "Los Angeles", price: "$179.99" },
              { from: "Dallas", to: "Houston", price: "$89.99" }
            ].map((route, i) => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{route.from} → {route.to}</div>
                    <div className="text-xs text-gray-500">250+ moves this month</div>
                  </div>
                  <div className="text-teal-600 font-medium">{route.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Extra padding at bottom to ensure content doesn't get hidden behind nav bar */}
        <div className="h-16"></div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex justify-around items-center p-3 bg-white border-t border-gray-200 sticky bottom-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center ${
              activeTab === tab.id ? "text-teal-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoveMateApp;