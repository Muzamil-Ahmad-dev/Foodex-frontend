 import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { createOrder } from "../../features/orders/ordersSlice";
import { clearCart } from "../../features/cart/cartSlice";
import CardPayment from "../../features/payment/components/CardPaymentForm";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

// ✅ Use Stripe publishable key here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, total } = useSelector(
    (state) => state.cart || { items: [], total: 0 }
  );
  const { creatingOrder } = useSelector(
    (state) => state.orders || { creatingOrder: false }
  );

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  if (!items || items.length === 0) return <p>Cart is empty</p>;

  // Updated placeOrder to accept object for card payment
  const placeOrder = async (paymentData) => {
    if (!address || !phone) return alert("Please provide address and phone number");
    setPlacingOrder(true);

    try {
      let paymentStatus = "Pending";
      let stripePaymentIntentId = null;

      // If paymentData is an object, extract values (CARD flow)
      if (typeof paymentData === "object") {
        paymentStatus = paymentData.paymentStatus || "Paid";
        stripePaymentIntentId = paymentData.stripePaymentIntentId || null;
      } else if (typeof paymentData === "string") {
        paymentStatus = paymentData;
      }

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
        stripePaymentIntentId,
      };

      const orderRes = await dispatch(createOrder(orderPayload));

      if (orderRes.meta.requestStatus !== "fulfilled") {
        alert(`Order failed: ${orderRes.payload || "Unknown error"}`);
        setPlacingOrder(false);
        return;
      }

      const orderId = orderRes.payload._id;

      if (paymentMethod === "COD") {
        await axios.post(`${API_URL}/payments/cod`, { orderId });
        alert("Order placed successfully! Payment on delivery.");
      } else {
        alert("Order placed successfully! Payment completed.");
      }

      dispatch(clearCart());
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert(`Order failed: ${err.message}`);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

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

      {paymentMethod === "CARD" && (
        <Elements stripe={stripePromise}>
          <CardPayment
            total={total}
            onPaymentSuccess={(paymentData) => placeOrder(paymentData)}
          />
        </Elements>
      )}

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