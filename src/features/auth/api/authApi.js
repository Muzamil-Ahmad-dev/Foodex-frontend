 import axios from "axios";

const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true, // ✅ send cookies for auth
});

export default api;
