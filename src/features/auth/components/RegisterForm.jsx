 "use client";

import React, { useState } from "react";
import { GiChefToque } from "react-icons/gi";
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
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B0E] px-4">
      <div className="p-6 rounded-2xl w-80 sm:w-96 shadow-2xl border border-amber-800">
        <div className="flex justify-center gap-2 mb-4">
          <GiChefToque className="text-3xl text-amber-500" />
          <h1 className="text-2xl font-bold text-amber-400">Foodie-Frenzy</h1>
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="name" onChange={handleChange} placeholder="Name" className="input" />
          <input name="email" onChange={handleChange} placeholder="Email" className="input" />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input" />
          <input name="confirmPassword" type="password" onChange={handleChange} placeholder="Confirm Password" className="input" />

          <motion.button disabled={loading} className="bg-orange-600 text-white py-2 rounded-xl">
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-amber-300 mt-4">
          Have an account? <Link to="/login" className="text-orange-400">Login</Link>
        </p>
      </div>
    </div>
  );
}
