import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};

export const createUSerAsync = createAsyncThunk(
  'user/createUSer',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    console.log(update);
    const response = await updateUser(update);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUSerAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createUSerAsync.fulfilled, (state, action) => {
        (state.loggedInUser = action.payload), (state.status = 'idle');
      })
      .addCase(checkUserAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        (state.loggedInUser = action.payload), (state.status = 'idle');
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.status = 'idle';
      });
  },
});

export const selectLoggedInUser = (state) => state.user.loggedInUser;
export const selectErrors = (state) => state.user.error;

export default userSlice.reducer;
export const {} = userSlice.actions;
