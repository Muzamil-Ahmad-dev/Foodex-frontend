import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import categoriesReducer from '../features/categories/categoriesSlice';
import menuReducer from '../features/menu/menuSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    menu: menuReducer,
    cart: cartReducer,
     orders: ordersReducer,  

  },
})
