import api from "../store/api";
console.log("bookSlice file executed");


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
        url: `/books/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    returnBook: builder.mutation({
      query: (id) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "Res"],
    }),

    checkOutBook: builder.mutation({
      query: (id) => ({
        url: `/reservations`,
        method: "POST",
        body: {
          bookId: id,
        }
      }),
      invalidatesTags: ["Books", "Res"],
    }),
  }),
});
console.log("exports: ", booksAPI);
console.log("hook:", booksAPI.useGetBooksQuery); // should NOT be undefined

// export default booksAPI;

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useReturnBookMutation,
  useCheckOutBookMutation,
} = booksAPI;
