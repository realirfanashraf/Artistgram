import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    reducers:{
        userLogin:(state,action) =>{
            state.user = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
        },
        userLogout:(state)=>{
            state.user = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {userLogin,userLogout} = userSlice.actions

export default userSlice.reducer;