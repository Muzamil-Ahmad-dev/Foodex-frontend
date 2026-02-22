 import React from "react";
import { motion } from "framer-motion";
import CartItems from "../../features/cart/components/CartItem";

const Cart = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#3D2914] text-white px-4 sm:px-6 md:px-8 py-10">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 text-amber-400"
          variants={itemVariants}
        >
          Your Cart
        </motion.h1>

        {/* Cart Items */}
        <motion.div
          className="bg-[#4A2F17]/70 rounded-2xl shadow-xl border border-amber-700/30 p-4 sm:p-6 md:p-8"
          variants={itemVariants}
        >
          <CartItems />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Cart;