// noteInvoicesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteInvoicesState {
  noteInvoices: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteInvoicesState = {
  noteInvoices: [],
  loading: false,
  error: null,
};

export const noteInvoicesSlice = createSlice({
  name: "noteInvoices",
  initialState,
  reducers: {
    getNoteInvoicesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getNoteInvoicesSuccess: (state, action: PayloadAction<any[]>) => {
      state.noteInvoices = action.payload;
      state.loading = false;
    },
    getNoteInvoicesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getNoteInvoicesStart,
  getNoteInvoicesSuccess,
  getNoteInvoicesFailure,
} = noteInvoicesSlice.actions;

export default noteInvoicesSlice.reducer;
