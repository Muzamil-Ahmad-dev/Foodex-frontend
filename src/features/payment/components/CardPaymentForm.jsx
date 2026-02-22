 import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

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
      // 1️⃣ Create PaymentIntent on backend
      const { data } = await axios.post(`${API_URL}/payments/stripe`, {
        amount: Number(total),
      });

      if (!data?.success || !data?.clientSecret || !data?.paymentIntentId) {
        throw new Error("Payment initialization failed. Check backend logs.");
      }

      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm payment with Stripe Elements
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardName },
        },
      });

      if (error) throw new Error(error.message);

      if (paymentIntent?.status === "succeeded") {
        // ✅ Pass both status and PaymentIntent ID to Checkout
        onPaymentSuccess("Paid", paymentIntent.id);
      } else {
        throw new Error(`Payment failed with status: ${paymentIntent?.status}`);
      }
    } catch (err) {
      console.error("Stripe Payment Error:", err);
      alert(`Payment error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded my-4 shadow-sm bg-white">
      <input
        type="text"
        placeholder="Cardholder Name"
        className="border p-2 w-full mb-2 rounded"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <div className="border p-4 rounded mb-4 bg-gray-50">
        <CardElement options={{ hidePostalCode: false }} />
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className={`mt-2 w-full py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing Payment..." : `Pay ₹${total}`}
      </button>
    </div>
  );
};

export default CardPaymentForm;