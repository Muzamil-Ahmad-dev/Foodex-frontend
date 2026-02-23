 import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../features/orders/ordersSlice";
import { motion } from "framer-motion";

const statusColors = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Paid: "bg-green-500/20 text-green-400",
  "Out for Delivery": "bg-blue-500/20 text-blue-400",
  Delivered: "bg-emerald-500/20 text-emerald-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

const UserOrder = () => {
  const dispatch = useDispatch();
  const { orders, fetchingOrders, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (fetchingOrders) {
    return <p className="p-6 text-center text-gray-400">Loading orders...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-400">Error: {error}</p>;
  }

  if (!orders.length) {
    return <p className="p-6 text-center text-gray-400">No orders found</p>;
  }

  return (
    <div className="min-h-screen bg-[#3D2914] text-white p-4">
      <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">
        Order History
      </h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            className="bg-[#4A2F17]/80 border border-amber-700/30 rounded-xl p-5 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <p className="text-sm text-amber-200">
                Order ID:{" "}
                <span className="font-semibold">#{order.orderKey || order._id}</span>
              </p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                  statusColors[order.status] || "bg-gray-500/20 text-gray-300"
                }`}
              >
                {order.status || "Unknown"}
              </span>
            </div>

            {/* Items */}
            <div className="mb-4">
              <p className="font-semibold mb-2 text-amber-300">Items</p>
              <ul className="space-y-1 text-sm text-amber-100">
                {order.items.map((item, i) => {
                  const name = item?.menuItem?.name || "Unknown Item";
                  const quantity = item?.quantity || 0;
                  const price = item?.price || 0;
                  return (
                    <li key={i}>
                      {name} × {quantity} — Rs. {price * quantity}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-200">
              <p>
                <b>Payment:</b> {order.paymentMethod || "N/A"} (
                {order.paymentStatus || "N/A"})
              </p>
              <p>
                <b>Total:</b>{" "}
                <span className="font-semibold text-amber-300">
                  Rs. {order.totalAmount || 0}
                </span>
              </p>
              <p>
                <b>Contact:</b> {order.contactNumber || "N/A"}
              </p>
              <p>
                <b>Address:</b> {order.deliveryAddress || "N/A"}
              </p>
            </div>

            {/* Date */}
            <p className="mt-4 text-xs text-gray-400">
              Ordered on{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "Unknown Date"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserOrder;