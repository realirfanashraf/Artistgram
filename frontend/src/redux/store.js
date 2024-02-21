import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'
import adminAuthReducer from './slices/adminSlices/adminAuthSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer
  },
});