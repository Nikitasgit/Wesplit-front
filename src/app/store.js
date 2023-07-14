import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../feature/currentUser.slice";
import currentGroupReducer from "../feature/currentGroup.slice";
import userReducer from "../feature/user.slice";
import groupReducer from "../feature/group.slice";
export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    users: userReducer,
    groups: groupReducer,
    currentGroup: currentGroupReducer,
  },
});
