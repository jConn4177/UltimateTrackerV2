import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
  user: null,
  status: "idle", // can be 'idle', 'loading', or 'failed'
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to set the user data upon registration
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "idle";
      state.error = null;
    },
    // Reducer to set the loading status when a registration request is in progress
    setRegistrationStatus: (state, action) => {
      state.status = action.payload;
    },
    // Reducer to set any error that might occur during registration
    setRegistrationError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // Reducer to clear the user data and reset the state
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

// Export the action creators
export const {
  setUser,
  setRegistrationStatus,
  setRegistrationError,
  clearUser,
} = userSlice.actions;

// Export the selector to get the user state
export const selectUser = (state) => state.user.user;

// Export the reducer
export default userSlice.reducer;
