import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BooksUIState {
  page: number;
  limit: number;
  filter?: string; // genre
  sortBy?: string; // e.g., title, createdAt
  sort?: "asc" | "desc";
}

const initialState: BooksUIState = {
  page: 1,
  limit: 12,
  filter: undefined,
  sortBy: "createdAt",
  sort: "desc",
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
    setFilter(state, action: PayloadAction<string | undefined>) {
      state.filter = action.payload;
      state.page = 1; // reset page when filter changes
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setSort(state, action: PayloadAction<"asc" | "desc">) {
      state.sort = action.payload;
      state.page = 1;
    },
  },
});

export const { setPage, setLimit, setFilter, setSortBy, setSort } =
  booksUISlice.actions;
export default booksUISlice.reducer;
