 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../features/orders/ordersSlice';

const UserOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading) {
    return <p className="p-4">Loading orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {!orders.length && <p>No orders found</p>}

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-3 rounded">
          <p><b>Status:</b> {order.status}</p>
          <p><b>Payment:</b> {order.paymentStatus}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;