import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BooksUIState {
  page: number;
  limit: number;
}

const initialState: BooksUIState = {
  page: 1,
  limit: 12,
};

const booksUISlice = createSlice({
  name: "booksUI",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setPage, setLimit } = booksUISlice.actions;

export default booksUISlice.reducer;
