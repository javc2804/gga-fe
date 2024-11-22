import { createSlice } from "@reduxjs/toolkit";
export const almacenSlice = createSlice({
  name: "almacen",
  initialState: {
    list: {},
  },
  reducers: {
    getTransactions: (state, { payload }) => {
      state.list = payload;
    },
  },
});

export const { getTransactions } = almacenSlice.actions;
