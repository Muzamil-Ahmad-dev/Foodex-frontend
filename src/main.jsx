 import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./routes/AppRoutes";
import "./index.css";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ✅ Use publishable key for frontend
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <AppRouter />
      </Elements>
    </Provider>
  </React.StrictMode>
);