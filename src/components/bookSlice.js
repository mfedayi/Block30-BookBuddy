import api from "../store/api";

const booksAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    getBook: builder.query({
      query: (id) => ({
        url: `/books${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    returnBook: builder.mutation({
      query: (id) => ({
        url: `/books${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),
    checkOutBook: builder.mutation({
      query: (id) => ({
        url: `/books${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useReturnBookMutation,
  useCheckOutBookMutation,
} = booksAPI;


