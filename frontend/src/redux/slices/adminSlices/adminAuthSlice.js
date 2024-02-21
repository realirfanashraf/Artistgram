import { createSlice } from '@reduxjs/toolkit';

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState: {
    isAdminAuthenticated: null,
  },
  reducers: {
    setAdminAuthenticated: (state, action) => {
      state.isAdminAuthenticated = action.payload;
    },
  },
});

export const { setAdminAuthenticated } = adminAuthSlice.actions;

export const selectIsAdminAuthenticated = (state) => state.adminAuth.isAdminAuthenticated;

export default adminAuthSlice.reducer;