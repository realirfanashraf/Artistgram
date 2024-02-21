import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
   
  },
});