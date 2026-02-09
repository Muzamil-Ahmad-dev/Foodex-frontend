 // components/navbar/MobileNav.jsx
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { GiChefToque } from "react-icons/gi";

const MobileNav = ({ navLinks, cartCount, isLoggedIn, onLogin, onLogout, buttonClass, AuthButton }) => {
  return (
    <>
      {/* Top minimal nav with animated logo */}
      <div className="lg:hidden flex justify-center items-center h-16 bg-[#2D1B0E] shadow-md relative">
        <GiChefToque className="text-amber-500 animate-bounce text-3xl" />
        <div className="absolute right-4">
          <AuthButton
            isLoggedIn={isLoggedIn}
            onLogin={onLogin}
            onLogout={onLogout}
            className={buttonClass}
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-[#2D1B0E] border-t border-amber-900/50 flex justify-around items-center py-2">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={link.onClick}
            className="flex flex-col items-center text-amber-300 text-xs transition-all duration-300 hover:text-white"
          >
            {link.icon}
            {link.name}
          </button>
        ))}

        <button className="relative flex flex-col items-center text-amber-300 text-xs">
          <FiShoppingCart size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1 rounded-full">
              {cartCount}
            </span>
          )}
          Cart
        </button>
      </div>
    </>
  );
};

export default MobileNav;
