import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teamsList: localStorage.getItem("teamsList")
    ? JSON.parse(localStorage.getItem("teamsList"))
    : [],
};

export const teamsListSlice = createSlice({
  initialState,
  name: "teamsListSlice",
  reducers: {
    getTeamsListDispatch: (state, action) => {
      localStorage.setItem("teamsList", JSON.stringify(action.payload));
      state.teamsList = action.payload;
    },
  },
});

export default teamsListSlice.reducer;

export const { getTeamsListDispatch } = teamsListSlice.actions;