import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
};

export const createOrderAsync = createAsyncThunk(
  'orders/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const selectOrders = (state) => state.order;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const { resetCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
