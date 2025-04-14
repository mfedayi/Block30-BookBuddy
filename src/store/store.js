import "../components/bookSlice"; // just importing is enough to register it
import { configureStore } from "@reduxjs/toolkit";
import api from "./api";
import reducer from "../components/userSlice";

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
