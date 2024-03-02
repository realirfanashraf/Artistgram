import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [] 
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload); 
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post.id !== postId); 
    }
  }
});

export const { addPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
