import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    users: [], // Added state for all users
  },
  reducers: {
    // Action to set a single user
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to set all users
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, getUsers } = authSlice.actions;

export default authSlice.reducer;
