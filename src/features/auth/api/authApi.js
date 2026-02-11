 import axios from "axios";

const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true, // ✅ send cookies (refresh tokens)
});

// Optional: Add interceptor to attach access token for protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // store access token locally after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
