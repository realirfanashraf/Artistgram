import { createSlice } from '@reduxjs/toolkit';

const peerConnectionSlice = createSlice({
  name: 'peerConnection',
  initialState: {
    connection: null,
  },
  reducers: {
    setPeerConnection: (state, action) => {
      state.connection = action.payload;
    },
  },
});

export const { setPeerConnection } = peerConnectionSlice.actions;

export const selectPeerConnection = (state) => state.peerConnection.connection;

export default peerConnectionSlice.reducer;
