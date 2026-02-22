 import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  const { items, total } = useSelector((state) => state.cart || { items: [], total: 0 });
  const { creatingOrder } = useSelector((state) => state.orders || { creatingOrder: false });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!items || items.length === 0) return <p>Cart is empty</p>;

  // ✅ Centralized place order function
  const placeOrder = async (paymentStatus = "Pending", stripePaymentIntentId = null) => {
    if (!address || !phone) return alert("Please provide address and phone number");

    setPlacingOrder(true);

    try {
      const orderPayload = {
        items: items.map((i) => ({
          menuItem: i._id,
          quantity: i.quantity,
          price: i.discountPrice || i.price,
        })),
        totalAmount: total,
        deliveryAddress: address,
        contactNumber: phone,
        paymentMethod,
        paymentStatus,
        stripePaymentIntentId, // ✅ Must send for CARD
      };

      // 1️⃣ Create order
      const orderRes = await dispatch(createOrder(orderPayload));

      if (orderRes.meta.requestStatus !== "fulfilled") {
        throw new Error(orderRes.payload || "Order creation failed");
      }

      const { orderKey } = orderRes.payload;

      // 2️⃣ COD notification
      if (paymentMethod === "COD") {
        await axios.post(`${API_URL}/payments/cod`, { orderKey });
        alert("Order placed successfully! Payment on delivery.");
      } else {
        alert("Order placed successfully! Payment completed.");
      }

      // 3️⃣ Clear cart & navigate
      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      console.error("Checkout Error:", err);
      alert(`Order failed: ${err.message}`);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Delivery Address & Phone */}
      <textarea
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />

      {/* Payment Method */}
      <h2 className="font-semibold mb-2">Payment Method</h2>
      <label className="block mb-1">
        <input
          type="radio"
          checked={paymentMethod === "COD"}
          onChange={() => setPaymentMethod("COD")}
        />{" "}
        Cash on Delivery
      </label>
      <label className="block mb-4">
        <input
          type="radio"
          checked={paymentMethod === "CARD"}
          onChange={() => setPaymentMethod("CARD")}
        />{" "}
        Card Payment
      </label>

      {/* Card Payment */}
      {paymentMethod === "CARD" && (
        <Elements stripe={stripePromise}>
          <CardPaymentForm
            total={total}
            onPaymentSuccess={(status, stripePaymentIntentId) =>
              placeOrder(status, stripePaymentIntentId)
            }
          />
        </Elements>
      )}

      {/* COD Payment Button */}
      {paymentMethod === "COD" && (
        <button
          onClick={() => placeOrder("Pending")}
          disabled={creatingOrder || placingOrder}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded w-full"
        >
          {placingOrder ? "Placing Order..." : `Place Order ₹${total}`}
        </button>
      )}
    </div>
  );
};

export default Checkout;