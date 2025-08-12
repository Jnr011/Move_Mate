import React from 'react';
import { MapPin, Package, User, Truck, Clock, FileText, Phone, CreditCard, AlertTriangle } from 'lucide-react';
import { Order, OrderItem } from '../../../data/orders';

interface OrderDetailProps {
  order: Order;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-start pb-4 border-b">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">Order #{order.id}</h3>
            <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Created: {order.createdAt}</p>
          {order.updatedAt && (
            <p className="text-sm text-gray-500">Last Updated: {order.updatedAt}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold">{order.amount}</p>
          {order.paymentMethod && order.paymentMethod !== 'N/A' && (
            <div className="flex items-center justify-end text-sm text-gray-500 mt-1">
              <CreditCard size={14} className="mr-1" />
              {order.paymentMethod}
            </div>
          )}
        </div>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer & Contact */}
        <div className="space-y-4">
          <h4 className="text-base font-medium">Customer Information</h4>
          <div className="space-y-2">
            <div className="flex items-start">
              <User size={18} className="mr-2 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">{order.customer}</p>
                {order.contactPhone && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Phone size={14} className="mr-1" />
                    {order.contactPhone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="space-y-4">
          <h4 className="text-base font-medium">Delivery Information</h4>
          <div className="space-y-2">
            <div className="flex items-start">
              <Truck size={18} className="mr-2 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">{order.driver}</p>
                {order.estimatedDeliveryTime && (
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock size={14} className="mr-1" />
                    Estimated delivery: {order.date} at {order.estimatedDeliveryTime}
                  </div>
                )}
                {order.trackingNumber && (
                  <p className="text-sm text-gray-500 mt-1">Tracking #: {order.trackingNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route Information */}
      <div className="space-y-4 pb-4 border-b">
        <h4 className="text-base font-medium">Route</h4>
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin size={16} className="text-green-600" />
            </div>
            <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <MapPin size={16} className="text-red-600" />
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <p className="font-medium">Pickup Location</p>
              <p className="text-gray-600">{order.pickup}</p>
            </div>
            <div>
              <p className="font-medium">Delivery Location</p>
              <p className="text-gray-600">{order.delivery}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      {order.items && order.items.length > 0 && (
        <div className="space-y-4 pb-4 border-b">
          <h4 className="text-base font-medium">Order Items</h4>
          <div className="space-y-3">
            {order.items.map((item: OrderItem) => (
              <div key={item.id} className="flex items-start p-3 border rounded-lg">
                <div className="mr-3 mt-1">
                  <Package size={18} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex flex-wrap text-sm text-gray-500 mt-1">
                    <span className="mr-3">Weight: {item.weight}</span>
                    <span>Dimensions: {item.dimensions}</span>
                  </div>
                  {item.fragile && (
                    <div className="flex items-center text-amber-600 text-sm mt-1">
                      <AlertTriangle size={14} className="mr-1" />
                      Fragile
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {order.notes && (
        <div className="space-y-2">
          <h4 className="text-base font-medium">Notes</h4>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg">
            <FileText size={18} className="mr-2 text-gray-400 mt-0.5" />
            <p className="text-gray-600">{order.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;