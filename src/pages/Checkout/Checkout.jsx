 import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import { createOrder } from "../../features/orders/ordersSlice";
import { clearCart } from "../../features/cart/cartSlice";
import CardPaymentForm from "../../features/payment/components/CardPaymentForm";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, total } = useSelector((state) => state.cart);
  const { creatingOrder } = useSelector((state) => state.orders);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!items || items.length === 0)
    return <p className="text-center text-gray-400 p-10">Cart is empty</p>;

  const placeOrder = async (paymentStatus = "Pending", stripePaymentIntentId = null) => {
    if (!address || !phone) return alert("Please provide address and phone");

    setPlacingOrder(true);
    try {
      const payload = {
        items: items.map((i) => ({
          menuItem: i._id,
          quantity: i.quantity,
          price: i.discountPrice || i.price,
        })),
        deliveryAddress: address,
        contactNumber: phone,
        paymentMethod,
        paymentStatus,
        ...(paymentMethod === "CARD" && { stripePaymentIntentId }),
      };

      const res = await dispatch(createOrder(payload));
      if (res.meta.requestStatus !== "fulfilled") throw new Error("Order failed");

      const { orderKey } = res.payload;

      if (paymentMethod === "COD") {
        await axios.post(`${API_URL}/payments/cod`, { orderKey });
      }

      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      alert(err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3D2914] text-white px-4 py-10">
      <motion.div
        className="max-w-3xl mx-auto bg-[#4A2F17]/80 rounded-2xl shadow-xl border border-amber-700/30 p-5 sm:p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-amber-400">
          Checkout
        </h1>

        {/* Address */}
        <div className="mb-4">
          <label className="block mb-1 text-sm text-amber-200">
            Delivery Address
          </label>
          <textarea
            className="w-full p-3 rounded bg-[#3D2914] border border-amber-700/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-1 text-sm text-amber-200">
            Phone Number
          </label>
          <input
            className="w-full p-3 rounded bg-[#3D2914] border border-amber-700/30 focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Payment Method */}
        <h2 className="font-semibold mb-3 text-lg text-amber-300">
          Payment Method
        </h2>

        <div className="space-y-2 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={paymentMethod === "CARD"}
              onChange={() => setPaymentMethod("CARD")}
            />
            Card Payment
          </label>
        </div>

        {/* Card Payment */}
        {paymentMethod === "CARD" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Elements stripe={stripePromise}>
              <CardPaymentForm
                total={total}
                onPaymentSuccess={(status, intentId) =>
                  placeOrder(status, intentId)
                }
              />
            </Elements>
          </motion.div>
        )}

        {/* COD Button */}
        {paymentMethod === "COD" && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={creatingOrder || placingOrder}
            onClick={() => placeOrder("Pending")}
            className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 rounded-xl shadow-md transition"
          >
            {placingOrder ? "Placing Order..." : `Place Order Rs ${total}`}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;