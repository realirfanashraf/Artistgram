import { createSlice,createSelector } from "@reduxjs/toolkit";

 const userInfoSlice = createSlice({
    name:'userInfo',
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
        },
        updateProfilePicture:(state,action)=>{
            if(state.user !== null && state.user.ProfilePicture){
                state.user.ProfilePicture = action.payload
            }else{
                console.log("error in uploading")
            }
        }
    }
})

const selectUser = state => state.userInfo.user;
export const selectUserEmail = createSelector(
  selectUser,
  user => user && user.email
);




export const {userLogin,userLogout,updateProfilePicture} = userInfoSlice.actions
export default userInfoSlice.reducer

