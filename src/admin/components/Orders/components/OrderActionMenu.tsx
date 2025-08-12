import React, { useState, useRef, useEffect } from 'react';
import { Eye, Edit, Printer, Trash2, CheckCircle, Clock, XCircle, MoreHorizontal } from 'lucide-react';
import { Order, OrderStatus } from '../../../data/orders';
import { useNotification } from '../../UI/Notification';

interface OrderActionMenuProps {
  order: Order;
  onView: (order: Order) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  onDelete: (orderId: string) => void;
}

const OrderActionMenu: React.FC<OrderActionMenuProps> = ({ 
  order, 
  onView, 
  onStatusChange, 
  onDelete 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { showNotification } = useNotification();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePrint = () => {
    setIsOpen(false);
    showNotification({
      type: 'info',
      message: 'Printing order',
      description: `Printing order #${order.id}`,
      duration: 3000
    });
    // In a real app, this would trigger a print function
    window.print();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
        aria-label="Order actions"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 animate-fade-in-down">
          <div className="py-1 divide-y divide-gray-100">
            <div className="py-1">
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  onView(order);
                }}
              >
                <Eye size={16} className="mr-2" />
                View Details
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  // Edit functionality would be implemented in a real app
                  showNotification({
                    type: 'info',
                    message: 'Edit order',
                    description: 'Order edit functionality would open here',
                    duration: 3000
                  });
                }}
              >
                <Edit size={16} className="mr-2" />
                Edit Order
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handlePrint}
              >
                <Printer size={16} className="mr-2" />
                Print Order
              </button>
            </div>

            {/* Status change options */}
            <div className="py-1">
              {order.status !== 'Completed' && (
                <button
                  className="flex items-center px-4 py-2 text-sm text-green-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsOpen(false);
                    onStatusChange(order.id, 'Completed');
                  }}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Mark as Completed
                </button>
              )}
              
              {order.status !== 'In Progress' && order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <button
                  className="flex items-center px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsOpen(false);
                    onStatusChange(order.id, 'In Progress');
                  }}
                >
                  <Clock size={16} className="mr-2" />
                  Start Delivery
                </button>
              )}
              
              {order.status !== 'Cancelled' && (
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsOpen(false);
                    onStatusChange(order.id, 'Cancelled');
                  }}
                >
                  <XCircle size={16} className="mr-2" />
                  Cancel Order
                </button>
              )}
            </div>

            {/* Delete option */}
            <div className="py-1">
              <button
                className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setIsOpen(false);
                  onDelete(order.id);
                }}
              >
                <Trash2 size={16} className="mr-2" />
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderActionMenu;