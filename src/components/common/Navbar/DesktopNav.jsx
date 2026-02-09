 // components/navbar/DesktopNav.jsx
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const DesktopNav = ({ navLinks, cartCount, isLoggedIn, onLogin, onLogout, buttonClass, AuthButton }) => {
  return (
    <div className="hidden lg:flex items-center justify-between w-full px-4 py-2 bg-[#2D1B0E]">
      {/* Navigation Links */}
      <div className="flex space-x-4">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={link.onClick}
            className="px-4 py-2 flex items-center gap-2 rounded-2xl border-2 text-amber-300 border-transparent hover:border-amber-400 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-600 hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {link.icon} {link.name}
          </button>
        ))}
      </div>

      {/* Cart + Auth */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="relative">
            <FiShoppingCart size={24} className="text-yellow-100" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <AuthButton
          isLoggedIn={isLoggedIn}
          onLogin={onLogin}
          onLogout={onLogout}
          className={buttonClass}
        />
      </div>
    </div>
  );
};

export default DesktopNav;
