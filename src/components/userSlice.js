import api from "../store/api";

const usersAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getLogin: builder.query({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    registerUser: builder.mutation({
      query: ({ firstName, lastName, email, password }) => ({
        url: `/register`,
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
  }),
});

const storeToken = (state, {payload}) => {
  localStorage.setItem("token", payload.token);
};

export const {
  useGetProfileQuery,
  useGetLoginMutation,
  useRegisterUserMutation,
} = usersAPI;
