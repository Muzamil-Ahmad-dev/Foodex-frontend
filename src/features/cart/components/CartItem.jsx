 import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react"; // ✅ Added icon

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total } = useSelector((state) => state.cart);

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#3D2914] text-amber-200">
        <ShoppingCart size={48} className="mb-4 text-amber-400" />
        <p className="text-lg font-semibold">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3D2914] text-white px-4 py-8">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-amber-400 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShoppingCart size={32} />
        Your Cart
      </motion.h1>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto space-y-6">
        {items.map((item) => (
          <motion.div
            key={item._id}
            className="flex flex-col sm:flex-row gap-4 bg-[#4A2F17]/80 border border-amber-700/30 rounded-xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <img
              src={item.image || "https://via.placeholder.com/120"}
              alt={item.name}
              className="w-full sm:w-28 h-28 object-cover rounded-lg"
            />

            {/* Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-amber-200 mt-1">
                Rs. {item.discountPrice || item.price}
              </p>
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:items-end gap-3">
              <div className="flex items-center gap-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-1 rounded bg-amber-400 text-gray-900 font-bold"
                  onClick={() => dispatch(decrementQuantity(item._id))}
                >
                  −
                </motion.button>

                <span className="font-semibold">{item.quantity}</span>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-1 rounded bg-amber-400 text-gray-900 font-bold"
                  onClick={() => dispatch(incrementQuantity(item._id))}
                >
                  +
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-sm text-red-400 hover:text-red-500"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-4xl mx-auto mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#4A2F17]/90 border border-amber-700/30 rounded-xl p-6 sticky bottom-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-2xl font-bold text-amber-300">
          Total: Rs. {total}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/checkout")}
          className="w-full sm:w-auto px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-500 transition"
        >
          Proceed to Checkout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Cart;