 import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./routes/AppRoutes";
import "./index.css";

// ✅ Stripe imports
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// ✅ Stripe public key (recommended via env)
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  "pk_test_51RUqxWC1iB5TdQiSEWzTXE9ExlC1aGBusgNuBj9ktBqht5ZXEEJmH2XXRmeLx3effEtCUx9Nk1EkDV65u4b3Ni4500MqMlisL4"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <AppRouter />
      </Elements>
    </Provider>
  </React.StrictMode>
);