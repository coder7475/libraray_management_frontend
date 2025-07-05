import { configureStore } from "@reduxjs/toolkit";
import booksUIReducer from "@/global/slices/booksSlice";
import { bookApi } from "@/services/books";

export const store = configureStore({
  reducer: {
    booksUI: booksUIReducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(bookApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
