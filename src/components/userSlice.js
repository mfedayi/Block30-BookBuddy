import api from "../store/api";
import { createSlice } from "@reduxjs/toolkit";

const usersAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: `/users/register`,
        method: "POST",
        body: {
          firstName,
          lastName,
          email,
          password,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getReservations: builder.query({
      query: () => ({
        url: "/reservations",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getLogin: builder.mutation({
      query: ({ email, password }) => ({
        url: `/users/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      providesTags: ["Users"],
    }),
  }),
});
const storeToken = (state, { payload }) => {
  localStorage.setItem("token", payload.token);
};
const userSlice = createSlice({
  name: "register",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.getLogin.matchFulfilled, storeToken);
  },
});

export default userSlice.reducer;
export const { useRegisterMutation, useGetProfileQuery, useGetLoginMutation, useGetReservationsQuery } =
  usersAPI;
