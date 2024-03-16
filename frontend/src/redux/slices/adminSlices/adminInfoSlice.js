import { createSlice } from "@reduxjs/toolkit";

const adminInfoSlice = createSlice({
    name: 'adminInfo',
    initialState: {
        admin: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
    },
    reducers: {
        adminLogin: (state, action) => {
            state.admin = action.payload;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.admin = null;
            localStorage.removeItem('adminInfo');
        }
    }
});

export const { adminLogin, adminLogout } = adminInfoSlice.actions;

export default adminInfoSlice.reducer;
