import { createSlice } from "@reduxjs/toolkit";
export const providersSlice = createSlice({
  name: "providers",
  initialState: {
    list: {},
  },
  reducers: {
    getList: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { getList } = providersSlice.actions;
