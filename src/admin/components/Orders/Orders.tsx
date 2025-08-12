import React, { useState, useEffect } from 'react';
import { ordersData, Order, OrderStatus } from '../../data/orders';
import { useNotification } from '../UI/Notification';
import { ConfirmationModal } from '../UI/Modal';
import OrderFilters from './components/OrderFilters';
import OrdersTable from './components/OrdersTable';
import OrderDetail from './components/OrderDetail';

const Orders: React.FC = () => {
  const { showNotification } = useNotification();
  
  // State for filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  
  // State for orders data
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  
  // Modal states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  
  // Load orders data
  useEffect(() => {
    // In a real app, this would be an API call
    setOrders(ordersData);
  }, []);
  
  // Filter orders based on search term and status filter
  useEffect(() => {
    const filtered = orders.filter(order => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.delivery.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
    
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [orders, searchTerm, statusFilter]);
  
  // Handle pagination
  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setDisplayedOrders(filteredOrders.slice(start, end));
  }, [filteredOrders, currentPage, pageSize]);
  
  // Handle viewing order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };
  
  // Handle changing order status
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, updatedAt: 'Apr 29, 2025 ' + new Date().toLocaleTimeString() } 
        : order
    );
    
    setOrders(updatedOrders);
    
    showNotification({
      type: 'success',
      message: 'Order status updated',
      description: `Order #${orderId} has been marked as ${newStatus}`,
      duration: 3000
    });
  };
  
  // Handle deleting an order
  const handleDeleteClick = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = () => {
    if (orderToDelete) {
      const updatedOrders = orders.filter(order => order.id !== orderToDelete);
      setOrders(updatedOrders);
      
      showNotification({
        type: 'success',
        message: 'Order deleted',
        description: `Order #${orderToDelete} has been deleted`,
        duration: 3000
      });
      
      setOrderToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };
  
  // Handle adding a new order
  const handleAddNewOrder = () => {
    showNotification({
      type: 'info',
      message: 'New order',
      description: 'New order form would appear here',
      duration: 3000
    });
  };
  
  // Handle resetting filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Orders</h1>
        <OrderFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onAddNewOrder={handleAddNewOrder}
          onResetFilters={handleResetFilters}
        />
      </div>

      <OrdersTable 
        orders={displayedOrders}
        onViewOrder={handleViewOrder}
        onStatusChange={handleStatusChange}
        onDeleteOrder={handleDeleteClick}
        currentPage={currentPage}
        totalOrders={filteredOrders.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      
      {/* Order Detail Modal */}
      {selectedOrder && (
        <ConfirmationModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Order #${selectedOrder.id} Details`}
          confirmText="Close"
          cancelText=""
          onConfirm={() => setIsDetailModalOpen(false)}
          size="lg"
        >
          <OrderDetail order={selectedOrder} />
        </ConfirmationModal>
      )}
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        message={`Are you sure you want to delete Order #${orderToDelete}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        confirmVariant="danger"
      />
    </div>
  );
};

export default Orders;