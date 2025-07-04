import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IBook,
  IBookApiReseponse,
  IBookResponse,
  IBorrowResponse,
  IBorrows,
  ICreateBookApiResponse,
  IDeleteBook,
} from "./types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-apis.vercel.app/api",
  }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      IBookApiReseponse,
      { page: number; limit?: number }
    >({
      query: ({ page, limit = 8 }) => `books?page=${page}&limit=${limit}`,
      providesTags: ["Books"],
    }),
    getBookById: builder.query<IBookResponse, { _id: string }>({
      query: ({ _id }) => `books/${_id}`,
      providesTags: ["Books"],
    }),
    createBook: builder.mutation<ICreateBookApiResponse, IBook>({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation<
      IBookResponse,
      { id: string; data: Partial<IBook> }
    >({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<IDeleteBook, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    borrowBook: builder.mutation<
      IBorrowResponse,
      { book: string | undefined; quantity: number; dueDate: string }
    >({
      query: ({ book, quantity, dueDate }) => ({
        url: `borrow`,
        method: "POST",
        body: { book, quantity, dueDate },
      }),
      invalidatesTags: ["Books"],
    }),
    getBorrowSummury: builder.query<IBorrows, void>({
      query: () => `borrow`,
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummuryQuery,
} = bookApi;
