import { createSlice } from "@reduxjs/toolkit";
export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    list: {},
    loading: true,
  },
  reducers: {
    userList: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
  },
});

export const { userList } = UsersSlice.actions;
