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
console.log("exports: ", booksAPI);
console.log("hook:", booksAPI.useGetBooksQuery); // should NOT be undefined

// export default booksAPI;

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useReturnBookMutation,
  useCheckOutBookMutation,
} = booksAPI;
