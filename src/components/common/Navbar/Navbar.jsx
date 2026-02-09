 // components/navbar/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaPhoneAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { GiChefToque } from "react-icons/gi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const buttonClass =
    "px-3 py-1.5 flex items-center gap-2 rounded-2xl text-sm font-semibold " +
    "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow hover:scale-105 transition-all duration-300";

  const navLinks = [
    { name: "Home", to: "/", icon: <FaHome /> },
    { name: "About", to: "/about", icon: <FaInfoCircle /> },
    { name: "Menu", to: "/menu", icon: <MdMenuBook /> },
    { name: "Orders", to: "/orders", icon: <FaBoxOpen /> },
    { name: "Contact", to: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#2D1B0E] shadow-md">
      {/* Top Navbar */}
      <div className="flex justify-between items-center h-16 px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GiChefToque className="text-amber-500 text-3xl animate-bounce" />
          <span className="text-2xl text-amber-400 font-bold">Foodify</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg"
                    : "text-amber-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Cart + Auth Buttons */}
        <div className="flex items-center gap-4">
          <NavLink to="/cart" className="relative">
            <FiShoppingCart size={24} className="text-yellow-100" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className={buttonClass}>
                Login
              </NavLink>
              <NavLink to="/signup" className={buttonClass}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className={buttonClass}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="lg:hidden fixed bottom-0 w-full bg-[#2D1B0E] border-t border-amber-900/50 flex justify-around items-center py-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all duration-300 ${
                isActive ? "text-white scale-110" : "text-amber-300 hover:text-white"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}

        <NavLink
          to="/cart"
          className="relative flex flex-col items-center text-amber-300 text-xs hover:text-white transition-all duration-300"
        >
          <FiShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1 rounded-full">
              {cartCount}
            </span>
          )}
          Cart
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
