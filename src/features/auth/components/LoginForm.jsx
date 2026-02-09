 "use client";

import React, { useState } from "react";
import { GiChefToque } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../authSlice";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/orders"); // user is authenticated via cookie
    } catch {
      // error already handled by Redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4">
      <div className="bg-[#2D1B0E] p-6 rounded-2xl w-80 sm:w-96 shadow-2xl border-2 border-amber-900/50">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <GiChefToque className="text-3xl text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-400">Foodie-Frenzy</h1>
        </div>

        <h2 className="text-xl font-semibold text-center text-amber-300 mb-4">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 rounded-xl border border-amber-700 bg-[#3A2413] text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 outline-none"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="px-4 py-2 rounded-xl border border-amber-700 bg-[#3A2413] text-amber-100 placeholder-amber-400 focus:ring-2 focus:ring-amber-500 outline-none"
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 rounded-xl font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-amber-300 mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-orange-400 font-semibold">
            Sign up
          </Link>
        </p>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 mt-4 bg-[#3A2413] text-amber-200 px-5 py-2 rounded-lg"
        >
          <FaHome /> Back to Home
        </button>
      </div>
    </div>
  );
}
