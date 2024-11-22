import { createSlice } from "@reduxjs/toolkit";
export const sparePartsSlice = createSlice({
  name: "spareParts",
  initialState: {
    list: {},
  },
  reducers: {
    getList: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { getList } = sparePartsSlice.actions;
