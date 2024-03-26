import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlices/authSlice.js'
import adminAuthReducer from './slices/adminSlices/adminAuthSlice.js'
import userInfoReducer from './slices/userSlices/userInfoSlice.js'
import adminInfoReducer from './slices/adminSlices/adminInfoSlice.js'
import localPeerConnectionReducer from './slices/userSlices/localPeerConnection.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    peerConnection:localPeerConnectionReducer,
    adminAuth: adminAuthReducer,
    adminInfo: adminInfoReducer
  },
});