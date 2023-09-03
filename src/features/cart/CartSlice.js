import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addToCart,
  deleteCartItem,
  fetchItemByUserId,
  updateCart,
} from './CartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async (userId) => {
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});
export const selectCart = (state) => state.cart.items;
export default cartSlice.reducer;
