import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductsByFilters } from './productListAPI';

const initialState = {
  products: [],
  status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  'products/fetchProductsByFilter',
  async (filter, sort) => {
    const response = await fetchProductsByFilters(filter, sort);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      });
  },
});

export const selectProducts = (state) => state.product.products;

// export {} from productSlice.actions;
export default productSlice.reducer;
