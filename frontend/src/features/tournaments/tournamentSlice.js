import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournament: null,
  status: "idle",
  error: null,
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament: (state, action) => {
      state.tournament = action.payload;
      state.status = "idle";
      state.error = null;
    },
    setTournamentRegistrationStatus: (state, action) => {
      state.status = action.payload;
    },
    setTournamentRegistrationError: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    clearTournament: (state) => {
      state.tournament = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  setTournament,
  setTournamentRegistrationStatus,
  setTournamentRegistrationError,
  clearTournament,
} = tournamentSlice.actions;

export const selectTournament = (state) => state.tournament.tournament;

export default tournamentSlice.reducer;
