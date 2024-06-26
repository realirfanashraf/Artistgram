import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'
import adminAuthReducer from './slices/adminSlices/adminAuthSlice.js'
import userInfoReducer from './slices/userSlices/userInfoSlice.js'
import adminInfoReducer from './slices/adminSlices/adminInfoSlice.js'
import notificationReducer from './slices/userSlices/notificationSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    notifications: notificationReducer,
    adminAuth: adminAuthReducer,
    adminInfo: adminInfoReducer
  },
});