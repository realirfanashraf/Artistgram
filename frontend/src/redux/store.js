import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'
import adminAuthReducer from './slices/adminSlices/adminAuthSlice.js'
import userInfoReducer from './slices/userSlices/userInfoSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    adminAuth: adminAuthReducer
  },
});