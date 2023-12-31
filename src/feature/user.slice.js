import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("getUsers", async (_, thunkAPI) => {
  axios
    .get("http://localhost:5001/user/")
    .then((res) => thunkAPI.dispatch(getUsersSuccess(res.data)));
});
export const userSlice = createSlice({
  name: "users",
  initialState: {
    usersData: [],
  },
  reducers: {
    getUsersSuccess: (state, { payload }) => {
      state.usersData = payload;
    },
    createUser: (state, { payload }) => {
      state.usersData.push(payload);
    },
  },
});

export const { getUsersSuccess, createUser } = userSlice.actions;
export default userSlice.reducer;
