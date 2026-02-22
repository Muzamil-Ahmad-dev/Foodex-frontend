 import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer/Footer";

// Pages
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/cart/cart";
import About from "../pages/About/About";
import Checkout from "../pages/Checkout/Checkout";
import UserOrder from "../pages/Orders/Orders";
 // Auth
import LoginPage from "../features/auth/components/LoginForm";
import SignUpPage from "../features/auth/components/RegisterForm";

function AppRouter() {
  return (
    <Router>
      <Navbar />

      <main className="main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<UserOrder />} />

          {/* Auth (still public) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* 404 */}
          <Route path="*" element={<h1 className="text-center mt-10">404 Not Found</h1>} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default AppRouter;