import { createSlice } from '@reduxjs/toolkit';

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState: {
    selectedUser: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;