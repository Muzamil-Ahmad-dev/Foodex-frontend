 import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = import.meta.env.VITE_API_URL || 'https://foodex-backend--muzamilsakhi079.replit.app/api';

/* CREATE ORDER */
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/orders`, orderData);
      return res.data.order;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Order creation failed';
      return rejectWithValue(message);
    }
  }
);

/* FETCH ORDERS */
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      return res.data.orders;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Fetching orders failed';
      return rejectWithValue(message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    creatingOrder: false,
    fetchingOrders: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* CREATE ORDER */
      .addCase(createOrder.pending, (state) => {
        state.creatingOrder = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.creatingOrder = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.creatingOrder = false;
        state.error = action.payload;
      })

      /* FETCH ORDERS */
      .addCase(fetchOrders.pending, (state) => {
        state.fetchingOrders = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchingOrders = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;