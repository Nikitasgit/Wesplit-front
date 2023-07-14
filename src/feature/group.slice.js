import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getGroups = createAsyncThunk("getGroups", async (_, thunkAPI) => {
  axios
    .get("http://localhost:5001/group/")
    .then((res) => thunkAPI.dispatch(getGroupsSuccess(res.data)));
});
export const groupSlice = createSlice({
  name: "groups",
  initialState: {
    groupsData: [],
  },
  reducers: {
    getGroupsSuccess: (state, { payload }) => {
      state.groupsData = payload;
    },
  },
  editGroup: (state, { payload }) => {
    state.groupsData = state.groupsData.map((group) => {
      if (group._id === payload[1]) {
        return {
          ...group,
          message: payload[0],
        };
      } else {
        return group;
      }
    });
  },
});

export const { getGroupsSuccess, editGroup } = groupSlice.actions;
export default groupSlice.reducer;
