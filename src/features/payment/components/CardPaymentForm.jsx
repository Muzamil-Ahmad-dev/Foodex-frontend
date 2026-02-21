 import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://foodex-backend--muzamilsakhi079.replit.app/api';

const CardPayment = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cardName) return alert('Enter cardholder name');
    if (!stripe || !elements) return alert('Stripe not loaded yet');
    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent on backend
      const { data } = await axios.post(`${API_URL}/payments/stripe`, {
        amount: Number(total),
      });

      if (!data?.clientSecret) throw new Error('Payment initialization failed');

      const clientSecret = data.clientSecret;

      // 2️⃣ Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardName },
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
        onPaymentSuccess('Paid'); // proceed to create order
      } else {
        alert(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Payment error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded my-4">
      <input
        type="text"
        placeholder="Cardholder Name"
        className="border p-2 w-full mb-2"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <CardElement options={{ hidePostalCode: true }} />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? 'Processing Payment...' : `Pay PKR${total}`}
      </button>
    </div>
  );
};

export default CardPayment;