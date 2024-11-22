import { createSlice } from "@reduxjs/toolkit";
export const compromisesSlice = createSlice({
  name: "compromises",
  initialState: {
    compromise: {},
    loading: false,
  },
  reducers: {
    getCompromise: (state, { payload }) => {
      state.compromise = payload;
      state.loading = false;
    },
    ClearCompromise: (state) => {
      state.compromise = {};
    },
    getCompromiseLoading: (state) => {
      state.compromise = {};
      state.loading = true;
    },
  },
});

export const { getCompromise, ClearCompromise, getCompromiseLoading } =
  compromisesSlice.actions;
