import { createSlice} from "@reduxjs/toolkit";

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
        },
        updateUserProfileFields: (state, action) => {
            const { name, bio, location } = action.payload;
            if (state.user !== null) {
              state.user.name = name;
              state.user.bio = bio;
              state.user.location = location;
              localStorage.setItem('userInfo', JSON.stringify(state.user));
            } else {
              console.log("User information not found");
            }
          }
    }
})

export const {userLogin,userLogout,updateProfilePicture,updateUserProfileFields} = userInfoSlice.actions
export default userInfoSlice.reducer

