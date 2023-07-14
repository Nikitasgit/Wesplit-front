import { createSlice } from "@reduxjs/toolkit";

export const currentGroupSlice = createSlice({
  name: "currentGroup",
  initialState: {
    currentGroup: null,
  },
  reducers: {
    getCurrentGroup: (state, { payload }) => {
      state.currentGroup = payload;
    },
  },
});

export const { getCurrentGroup } = currentGroupSlice.actions;
export default currentGroupSlice.reducer;
