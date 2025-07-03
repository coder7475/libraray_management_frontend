// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBook, IBookApiReseponse, IBookReseponse, ICreateBookApiResponse } from './types'

// Define a service using a base URL and expected endpoints
export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-management-apis.vercel.app/api' }),
  tagTypes: ['Books', "Id"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBookApiReseponse, {page: number, limit?: number}>({
        query: ({ page, limit = 8 }) => `books?page=${page}&limit=${limit}`,
        providesTags: ['Books']
    }),
    getBookById: builder.query<IBookReseponse, { _id: string }>({
      query: ({ _id } ) => `books/${_id}`,
      providesTags: ['Books', 'Id']
    }),
    createBook: builder.mutation<ICreateBookApiResponse, IBook>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBooksQuery, useGetBookByIdQuery,useCreateBookMutation  } = bookApi