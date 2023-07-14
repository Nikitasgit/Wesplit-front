import { createSlice } from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    currentUser: null,
  },
  reducers: {
    getCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
});

export const { getCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
