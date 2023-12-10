import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import userReducer from "./features/users/userSlice";
import tournamentReducer from "./features/tournaments/tournamentSlice";
import authReducer from "./features/auth/authSlice";
import searchReducer from "./features/tournaments/searchSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    tournament: tournamentReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
