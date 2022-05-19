import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getUserAllPosts } from "../utils/posts";

const allPosts = createAsyncThunk("posts/allposts", async () => {
  const allPosts = await getAllPosts();
  return allPosts;
});
const userAllPosts = createAsyncThunk("posts/allUserposts", async (userId) => {
  const posts = await getUserAllPosts(userId);

  return posts;
});
const postsSlice = createSlice({
  name: "allposts",
  initialState: {
    loading: false,
    allPosts: [],
  },
  reducers: {
    addPosts: (state, { payload }) => {
      state.allPosts = [payload, ...state.allPosts];
    },
    removePostFromAllPost: (state, { payload }) => {
      state.allPosts = state.allPosts.filter((post) => post._id !== payload);
    },
  },
  extraReducers: {
    [allPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [allPosts.fulfilled]: (state, { payload }) => {
      state.allPosts = payload;
      state.loading = false;
    },
    [userAllPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [userAllPosts.fulfilled]: (state, { payload }) => {
      state.allPosts = payload;
      state.loading = false;
    },
  },
});
console.log(postsSlice.actions);
export const { addPosts, removePostFromAllPost } = postsSlice.actions;
export default postsSlice.reducer;
export { allPosts, userAllPosts };
