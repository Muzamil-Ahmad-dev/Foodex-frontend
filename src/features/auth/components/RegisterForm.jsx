 "use client";

import React, { useState } from "react";
import { GiChefToque } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../authSlice";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) return;

    try {
      await dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
      ).unwrap();

      navigate("/orders");
    } catch {
      // handled by redux
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
          Create Account
        </h2>

        {error && (
          <p className="text-red-400 text-center mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" onChange={handleChange} placeholder="Full Name" className="input" />
          <input name="email" onChange={handleChange} placeholder="Email" className="input" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input" />
          <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" className="input" />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 rounded-xl ${
              loading ? "opacity-60" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-amber-300 mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-400 font-semibold">
            Login
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
