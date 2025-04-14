import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers;
    },
  }),
  tagTypes: ["Books", "Users"],
  endpoints: () => ({}),
});

export default api;
