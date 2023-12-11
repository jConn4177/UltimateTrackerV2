import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  preparedHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    console.log(getState().auth.token);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: { ...newUser },
      }),
    }),

    createTournament: builder.mutation({
      query: (tournamentData) => {
        return {
          url: "/tournaments",
          method: "POST",
          body: {
            name: tournamentData.name,
            format: tournamentData.format,
            venue: tournamentData.venue,
            start_date: tournamentData.startDate,
            end_date: tournamentData.endDate,
          },
        };
      },
    }),

    getTournaments: builder.query({
      query: () => "/tournaments",
      keepUnusedDataFor: 5,
    }),

    getTournamentById: builder.query({
      query: (id) => `/tournaments/${id}`,
      keepUnusedDataFor: 5,
    }),

    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 5,
    }),

    updateTournament: builder.mutation({
      query: ({ id, ...patchData }) => ({
        url: `/tournaments/${id}`,
        method: "PUT",
        body: patchData,
      }),
    }),
  }),
  // ... other endpoints ...
});

export const {
  useCreateTournamentMutation,
  useGetUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useUpdateTournamentMutation,
} = apiSlice;
