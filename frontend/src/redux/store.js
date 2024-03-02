import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'
import adminAuthReducer from './slices/adminSlices/adminAuthSlice.js'
import userInfoReducer from './slices/userSlices/userInfoSlice.js'
import postReducer from './slices/userSlices/postSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    posts:postReducer,
    adminAuth: adminAuthReducer
  },
});