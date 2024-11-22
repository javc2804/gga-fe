import { createSlice } from "@reduxjs/toolkit";
export const outInternalSlice = createSlice({
  name: "out-internal",
  initialState: {
    loading: true,
    list: {},
  },
  reducers: {
    createOutInternal: (state, { payload }) => {
      console.log(state, payload);
    },
    getListOutInternal: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { createOutInternal, getListOutInternal } =
  outInternalSlice.actions;
