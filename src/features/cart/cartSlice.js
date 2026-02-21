 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { _id, name, price, discountPrice, image, quantity }
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.total = state.items.reduce(
        (acc, i) => acc + (i.discountPrice || i.price) * i.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      state.total = state.items.reduce(
        (acc, i) => acc + (i.discountPrice || i.price) * i.quantity,
        0
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      state.total = state.items.reduce(
        (acc, i) => acc + (i.discountPrice || i.price) * i.quantity,
        0
      );
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i._id !== action.payload);
        }
      }
      state.total = state.items.reduce(
        (acc, i) => acc + (i.discountPrice || i.price) * i.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;