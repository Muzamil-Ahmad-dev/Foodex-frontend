 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------- Axios instance -------------------
const api = axios.create({
  baseURL: "https://foodex-backend--muzamilsakhi079.replit.app/api/auth",
  withCredentials: true, // ✅ send cookies for refresh token
});

// Optional: attach access token to protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ------------------- Initial State -------------------
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ------------------- Async Thunks -------------------

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/register", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// FETCH PROFILE (session restore)
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/profile");
      return res.data.user;
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk("auth/logout", async () => {
  await api.post("/logout");
  localStorage.removeItem("accessToken"); // ✅ remove access token on logout
});

// ------------------- Slice -------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken); // ✅ store token
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem("accessToken", action.payload.accessToken); // ✅ store token
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH PROFILE
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("accessToken"); // ✅ ensure token removed
      });
  },
});

export default authSlice.reducer;
