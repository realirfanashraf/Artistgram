import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: []
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

export const { addNotification, removeNotification, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
