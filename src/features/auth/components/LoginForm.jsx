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
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/orders");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4">
      <div className="p-6 rounded-2xl w-80 sm:w-96 shadow-2xl border border-amber-800">
        <div className="flex justify-center gap-2 mb-4">
          <GiChefToque className="text-3xl text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-400">Foodie-Frenzy</h1>
        </div>

        <h2 className="text-center text-amber-300 mb-4">Login</h2>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="email" onChange={handleChange} placeholder="Email" className="input" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input" />

          <motion.button
            disabled={loading}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white py-2 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-amber-300 mt-4">
          No account? <Link to="/signup" className="text-orange-400">Sign up</Link>
        </p>

        <button onClick={() => navigate("/")} className="mt-4 flex items-center gap-2 text-amber-300">
          <FaHome /> Home
        </button>
      </div>
    </div>
  );
}
