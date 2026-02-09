 // components/navbar/AuthButton.jsx
import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const AuthButton = ({ isLoggedIn, onLogin, onLogout, className }) => {
  return isLoggedIn ? (
    <button onClick={onLogout} className={className}>
      <FaSignOutAlt /> Logout
    </button>
  ) : (
    <button onClick={onLogin} className={className}>
      <FaSignInAlt /> Login
    </button>
  );
};

export default AuthButton;
