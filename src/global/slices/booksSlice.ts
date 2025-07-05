import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IBook } from "@/services/types";

type ModalState =
  | { type: "edit"; book: IBook }
  | { type: "delete"; book: IBook }
  | { type: "borrow"; book: IBook }
  | null;

interface BooksUIState {
  page: number;
  limit: number;
  view: "grid" | "table";
  modal: ModalState;
}

const initialState: BooksUIState = {
  page: 1,
  limit: 10,
  view: "grid",
  modal: null,
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
    setView(state, action: PayloadAction<"grid" | "table">) {
      state.view = action.payload;
    },
    setModal(state, action: PayloadAction<ModalState>) {
      state.modal = action.payload;
    },
    clearModal(state) {
      state.modal = null;
    },
  },
});

export const { setPage, setLimit, setView, setModal, clearModal } =
  booksUISlice.actions;

export default booksUISlice.reducer;
