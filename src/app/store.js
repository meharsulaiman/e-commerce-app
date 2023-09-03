import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productListSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/CartSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: authReducer,
    cart: cartReducer,
  },
});
