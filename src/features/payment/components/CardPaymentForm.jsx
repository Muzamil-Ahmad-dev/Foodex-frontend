 import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const CardPaymentForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cardName.trim()) return alert("Enter cardholder name");
    if (!stripe || !elements) return alert("Stripe not loaded yet");
    if (!total || total <= 0) return alert("Invalid payment amount");

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/payments/stripe`, {
        amount: Number(total),
      });

      if (!data?.success || !data?.clientSecret) {
        throw new Error("Payment initialization failed");
      }

      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardName },
          },
        }
      );

      if (error) throw new Error(error.message);

      if (paymentIntent?.status === "succeeded") {
        onPaymentSuccess("Paid", paymentIntent.id);
      } else {
        throw new Error(`Payment failed: ${paymentIntent?.status}`);
      }
    } catch (err) {
      alert(`Payment error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-[#3D2914] border border-amber-700/30 rounded-xl p-4 sm:p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cardholder Name */}
      <div className="mb-4">
        <label className="block text-sm text-amber-200 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className="w-full p-3 rounded bg-[#4A2F17] border border-amber-700/30 text-white placeholder-amber-200/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Card Element */}
      <div className="mb-4">
        <label className="block text-sm text-amber-200 mb-1">
          Card Details
        </label>
        <div className="p-4 rounded bg-[#4A2F17] border border-amber-700/30">
          <CardElement
            options={{
              hidePostalCode: false,
              style: {
                base: {
                  color: "#FDE68A",
                  fontSize: "16px",
                  "::placeholder": { color: "#FCD34D99" },
                },
                invalid: { color: "#F87171" },
              },
            }}
          />
        </div>
      </div>

      {/* Pay Button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-bold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-amber-400 hover:bg-amber-500 text-gray-900"
        }`}
      >
        {loading ? "Processing Payment..." : `Pay ₹${total}`}
      </motion.button>
    </motion.div>
  );
};

export default CardPaymentForm;