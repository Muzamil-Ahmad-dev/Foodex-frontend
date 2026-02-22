 import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://foodex-backend--muzamilsakhi079.replit.app/api";

const CardPayment = ({ total, onPaymentSuccess }) => {
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

      if (!data?.clientSecret || !data?.paymentIntentId)
        throw new Error("Payment initialization failed");

      const { clientSecret, paymentIntentId } = data;

      // 2️⃣ Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: cardName },
          },
        }
      );

      if (error) {
        console.error("Stripe confirmCardPayment error:", error);
        alert(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // ✅ Payment successful
        alert("Payment successful!");

        // Pass both status and paymentIntentId to Checkout
        onPaymentSuccess({
          paymentStatus: "Paid",
          stripePaymentIntentId: paymentIntentId,
        });
      } else {
        alert(`Payment status: ${paymentIntent?.status || "unknown"}`);
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
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing Payment..." : `Pay PKR ${total}`}
      </button>
    </div>
  );
};

export default CardPayment;