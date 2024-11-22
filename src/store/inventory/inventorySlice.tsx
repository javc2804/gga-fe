import { createSlice } from "@reduxjs/toolkit";
export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    list: {},
    totalDescription: 0,
    history: {},
  },
  reducers: {
    getInventory: (state, { payload }) => {
      state.list = payload;
    },
    getInventoryByDescription: (state, { payload }) => {
      state.totalDescription = payload;
    },
    getInventoryHistory: (state, { payload }) => {
      state.history = payload;
    },
  },
});

export const { getInventory, getInventoryByDescription, getInventoryHistory } =
  inventorySlice.actions;
